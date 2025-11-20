# user/create.py
import json
from datetime import datetime

from backend.types import User
from backend.commons import (
    users_table,
    hash_password,
    now_iso,
    CORS_HEADERS,
    build_user_search_key,
)

from hasPermission import has_permission


def lambda_handler(event, context):
    # -----------------------------
    # AUTH CHECK
    # -----------------------------
    code, message = has_permission(event, context)
    if code != 200:
        return {
            "statusCode": code,
            "headers": CORS_HEADERS,
            "body": json.dumps({"message": message}),
        }

    # -----------------------------
    # PARSE BODY
    # -----------------------------
    body = event.get("body")
    if isinstance(body, str):
        try:
            body = json.loads(body)
        except Exception:
            return {
                "statusCode": 400,
                "headers": CORS_HEADERS,
                "body": json.dumps({"message": "invalid JSON body"}),
            }

    tenant = body.get("tenant")
    email = body.get("email")
    password = body.get("password")

    if not tenant or not email or not password:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"message": "tenant, email and password are required"}),
        }

    # -----------------------------
    # PASSWORD HASHING
    # -----------------------------
    password_hash, salt = hash_password(password)
    now = now_iso()
    user_id = email  # ID is email

    # -----------------------------
    # BUILD USER OBJECT (Pydantic)
    # -----------------------------
    user = User(
        id=user_id,
        tenant=tenant,
        email=email,
        roles=body.get("roles", []),
        fullName=body.get("fullName", ""),
        phone=body.get("phone", ""),
        notes=body.get("notes", ""),
        createdAt=datetime.fromisoformat(now),
        updatedAt=datetime.fromisoformat(now),
        searchKey=build_user_search_key(
            body.get("fullName", ""),
            email,
            body.get("roles", []),
        ),
        passwordHash=password_hash,
        salt=salt,
    )

    # Convert to DynamoDB item
    user_item = user.model_dump()

    # -----------------------------
    # WRITE TO DYNAMODB
    # -----------------------------
    try:
        users_table.put_item(
            Item=user_item,
            ConditionExpression="attribute_not_exists(id)",
        )

        # Remove sensitive fields before sending back
        safe_user = user.model_copy()
        safe_user.passwordHash = None
        safe_user.salt = None

        return {
            "statusCode": 201,
            "headers": CORS_HEADERS,
            "body": safe_user.model_dump_json(),
        }

    except Exception as e:
        return {
            "statusCode": 400,
            "headers": CORS_HEADERS,
            "body": json.dumps({"message": "could not create user", "error": str(e)}),
        }
