import boto3
import os
import json
import uuid

s3 = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")


def lambda_handler(event, context):
    # Obtener nombres del bucket y tabla desde variables de entorno
    bucket_name = os.environ["BUCKET_NAME"]
    table_name = os.environ["TABLE_NAME"]

    table = dynamodb.Table(table_name)

    # Cargar el JSON local del seed
    with open("products.json", "r", encoding="utf-8") as f:
        products = json.load(f)

    uploaded = []

    for product in products:
        image_filename = product["image"]
        image_path = f"images/{image_filename}"

        if not os.path.isfile(image_path):
            print(f"Image not found: {image_path}")
            continue

        # Subir imagen al bucket S3
        with open(image_path, "rb") as img_file:
            s3.put_object(
                Bucket=bucket_name,
                Key=image_filename,
                Body=img_file,
                ContentType="image/webp",
            )

        # Guardar datos en DynamoDB
        item = {
            "id": str(uuid.uuid4()),
            "product": product["product"],
            "description": product["description"],
            "price": str(product["price"]),
            "image": image_filename,
        }

        table.put_item(Item=item)

        uploaded.append(item)

    return {
        "statusCode": 200,
        "message": "Seed data uploaded successfully",
        "uploaded": uploaded,
    }
