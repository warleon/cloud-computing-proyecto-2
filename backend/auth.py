# hasPermission.py
from typing import Dict, Any, Callable, Optional
from backend.commons import get_token_data, CORS_HEADERS
import os

Action = str  # "view" | "create" | "update" | "delete"
Role = str  # "reporter" | "admin" | "attendant"
Incident = Dict[str, Any]
User = Dict[str, Any]

STAGE = os.environ.get("STAGE", "")

PermissionCheck = Callable[[User, Any], bool]


ROLES = {
    "admin": {
        "users": {"view": True, "create": True, "update": True, "delete": True},
    },
    "user": {"tokens": {"delete": True}},
}

ARN_ACTION = {
    "POST/auth/token/delete": ("tokens", "delete"),
}


def validate_permission(
    user: User, resource: str, action: str, data: Optional[Dict] = None
) -> bool:
    """
    Returns True if the user has permission to perform `action` on `resource`.
    `user` is expected to have a 'roles' field that's a list of role names.
    """
    roles = user.get("roles", [])
    for role in roles:
        role_cfg = ROLES.get(role)
        if not role_cfg:
            continue
        res_cfg = role_cfg.get(resource)
        if not res_cfg:
            continue
        permission = res_cfg.get(action)
        if permission is None:
            continue
        if isinstance(permission, bool):
            if permission:
                return True
            else:
                continue
        # callable permission
        if callable(permission):
            if data is None:
                # data required for callable permission checks
                continue
            try:
                if permission(user, data):
                    return True
            except Exception:
                continue
    return False


def has_permission(event, context):
    """
    event is expected to be a regular HTTP Lambda event
    where Authorization header contains the token and
    httpMethod/path determine the resource.
    """
    headers = event.get("headers") or {}
    auth_header = headers.get("Authorization") or headers.get("authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return 401, "Unauthenticated, missing token"

    token = auth_header[len("Bearer ") :]
    method = (event.get("httpMethod") or "").upper()
    path = (event.get("path") or "").strip("/")
    arn_key = f"{method}/{path}"

    mapping = ARN_ACTION.get(arn_key)
    if not mapping:
        print("No ARN mapping for key", arn_key)
        return 500, f"Endpoint ${arn_key} not supported"

    resource, action = mapping

    data = get_token_data(token)
    if not data:
        return 401, "Unauthenticated, token not recognized"

    allowed = validate_permission(data.get("user"), resource, action)
    if not allowed:
        return 403, f"Unauthorized, user has no permissions to access ${arn_key}"

    return 200, ""
