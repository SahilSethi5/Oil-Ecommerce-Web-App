// src/app/services/order.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = `${environment.apiUrl}/orders`;
  private orders: Order[] = [];
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only try to access localStorage in the browser
    if (this.isBrowser) {
      try {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          this.orders = JSON.parse(savedOrders);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }
  }

  // For compatibility with existing code
  placeOrder(order: Order): Observable<Order> {
    return this.createOrder(order);
  }

  createOrder(order: Order): Observable<Order> {
    // For now, we'll just store it locally
    const newOrder: Order = {
      ...order,
      id: Date.now(),
      orderDate: new Date(),
      status: 'Pending'
    };
    
    this.orders.push(newOrder);
    
    // Only access localStorage in browser
    if (this.isBrowser) {
      try {
        localStorage.setItem('orders', JSON.stringify(this.orders));
      } catch (error) {
        console.error('Error storing in localStorage:', error);
      }
    }
    
    return of(newOrder);
    
    // In a real implementation connected to a backend:
    // return this.http.post<Order>(this.apiUrl, order);
  }

  getAllOrders(): Observable<Order[]> {
    return of(this.orders);
    // In a real implementation:
    // return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: number): Observable<Order | undefined> {
    const order = this.orders.find(o => o.id === id);
    return of(order);
    // In a real implementation:
    // return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<boolean> {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      
      if (this.isBrowser) {
        try {
          localStorage.setItem('orders', JSON.stringify(this.orders));
        } catch (error) {
          console.error('Error storing in localStorage:', error);
        }
      }
      
      return of(true);
    }
    return of(false);
    
    // In a real implementation:
    // return this.http.put<Order>(`${this.apiUrl}/${id}/status`, { status });
  }
}