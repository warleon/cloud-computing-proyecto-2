from pydantic import BaseModel
from enum import Enum
from datetime import datetime
from typing import List, Optional


class Tenant(BaseModel):
    id: str  # tenant ID
    name: str  # e.g., "Pizza Hut - Miraflores"
    address: Optional[str] = None
    latitude: float
    longitude: float
    phone: Optional[str] = None
    is_active: bool = True


class Product(BaseModel):
    id: str
    tenant_id: str  # the premise that sells this product
    name: str
    description: Optional[str] = None
    price: float
    category: str  # pizza, drinks, desserts, etc.
    image_url: Optional[str] = None
    is_available: bool = True


class OrderItem(BaseModel):
    product_id: str
    quantity: int
    price_each: float  # captured at time of purchase


class OrderStatus(str, Enum):
    QUEUED = "queued"
    COOKING = "cooking"
    PACKING = "packing"
    WAITING_FOR_COURIER = "waiting_for_courier"
    DELIVERING = "delivering"
    DELIVERED = "delivered"


class Order(BaseModel):
    id: str
    tenant_id: str
    client_latitude: float
    client_longitude: float
    items: List[OrderItem]
    status: OrderStatus = OrderStatus.QUEUED
    secret_code: str  # code customer must give to courier
    courier_id: Optional[str] = None
    created_at: datetime = datetime.utcnow()
    updated_at: datetime = datetime.utcnow()
