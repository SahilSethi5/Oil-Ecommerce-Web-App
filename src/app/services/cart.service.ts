// src/app/services/cart.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only try to access localStorage in the browser
    if (this.isBrowser) {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
          this.cartSubject.next(this.cartItems);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    // Check if product exists in cart using either _id or id
    const existingItem = this.cartItems.find(item => 
      (item.product._id && product._id && item.product._id === product._id) || 
      (item.product.id && product.id && item.product.id === product.id)
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.updateCart();
  }

  updateItemQuantity(productId: string | number, quantity: number): void {
    const item = this.cartItems.find(item => {
      if (typeof productId === 'string' && item.product._id) {
        return item.product._id === productId;
      } else if (typeof productId === 'number' && item.product.id) {
        return item.product.id === productId;
      }
      return false;
    });
    
    if (item) {
      item.quantity = quantity;
      this.updateCart();
    }
  }

  removeFromCart(productId: string | number): void {
    this.cartItems = this.cartItems.filter(item => {
      if (typeof productId === 'string' && item.product._id) {
        return item.product._id !== productId;
      } else if (typeof productId === 'number' && item.product.id) {
        return item.product.id !== productId;
      }
      return true; // Keep item if ID type doesn't match
    });
    this.updateCart();
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }
  
  private updateCart(): void {
    this.cartSubject.next([...this.cartItems]);
    
    // Only try to access localStorage in the browser
    if (this.isBrowser) {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      } catch (error) {
        console.error('Error storing in localStorage:', error);
      }
    }
  }
}