export type OrderType = 'NEW' | 'OLD';
export type DeliveryStatus = 'READY' | 'SENT';

export interface Order {
  code: string;
  type: OrderType;
}

export interface Delivery {
  id: string;
  status: DeliveryStatus;
  orders: Order[];
}
