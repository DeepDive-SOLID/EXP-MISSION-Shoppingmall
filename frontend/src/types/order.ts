export interface Order {
  order_id: number;
  member_id: string;
  payment_id: number;
  order_dt: string;
  order_state: number;
  order_addr: string;
  order_addr_detail: string;
  travel_product?: OrderTravel;
  product?: OrderProduct;
  payment_name?: string;
}

export interface OrderTravel {
  order_id: number;
  payment_id: number;
  member_id: string;
  travel_id: number;
  order_travel_amount: number;
  travel_name?: string;
}

export interface OrderProduct {
  order_id: number;
  payment_id: number;
  member_id: string;
  product_id: number;
  order_product_amount: number;
  product_name?: string;
}
