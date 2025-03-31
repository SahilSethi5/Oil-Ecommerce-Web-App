export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }
  
  export interface Order {
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