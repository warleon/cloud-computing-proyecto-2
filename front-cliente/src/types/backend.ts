/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export type OrderStatus = "queued" | "cooking" | "packing" | "waiting_for_courier" | "delivering" | "delivered";

export interface Order {
  id: string;
  tenant_id: string;
  client_latitude: number;
  client_longitude: number;
  items: OrderItem[];
  status?: OrderStatus;
  secret_code: string;
  courier_id?: string | null;
  created_at?: string;
  updated_at?: string;
}
export interface OrderItem {
  product_id: string;
  quantity: number;
  price_each: number;
}
export interface Product {
  id: string;
  tenant_id: string;
  name: string;
  description?: string | null;
  price: number;
  category: string;
  image_url?: string | null;
  is_available?: boolean;
}
export interface Tenant {
  id: string;
  name: string;
  address?: string | null;
  latitude: number;
  longitude: number;
  phone?: string | null;
  is_active?: boolean;
}
