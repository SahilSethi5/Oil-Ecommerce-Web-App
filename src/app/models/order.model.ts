export interface OrderItem {
  productId: string;  // Change to string for MongoDB IDs
  productName: string;
  quantity: number;
  price: number;
}

// src/app/models/order.model.ts
export interface Order {
  _id?: string;
  id?: number;
  items: OrderItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  orderDate?: Date;
  status?: string;
}