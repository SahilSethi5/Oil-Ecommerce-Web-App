import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders: Order[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only try to access localStorage in the browser
    if (this.isBrowser) {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        this.orders = JSON.parse(savedOrders);
      }
    }
  }

  placeOrder(order: Order): Observable<Order> {
    // Add order ID and date
    const newOrder: Order = {
      ...order,
      id: Date.now(),
      orderDate: new Date(),
      status: 'Pending'
    };
    
    this.orders.push(newOrder);
    
    // Only try to access localStorage in the browser
    if (this.isBrowser) {
      localStorage.setItem('orders', JSON.stringify(this.orders));
    }
    
    return of(newOrder);
  }

  getOrders(): Observable<Order[]> {
    return of(this.orders);
  }

  getOrder(id: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === id);
    return of(order);
  }

  // This method would typically be for admin functionality
  updateOrderStatus(orderId: number, status: string): Observable<boolean> {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      
      // Only try to access localStorage in the browser
      if (this.isBrowser) {
        localStorage.setItem('orders', JSON.stringify(this.orders));
      }
      
      return of(true);
    }
    return of(false);
  }
}