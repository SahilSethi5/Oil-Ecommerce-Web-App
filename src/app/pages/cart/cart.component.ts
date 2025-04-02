// src/app/pages/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartItem, CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  
  constructor(private cartService: CartService) { }
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
  }
  
  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) {
      // Use product._id if available, otherwise fall back to id
      this.removeItem(item.product._id || 0);
    } else {
      this.cartService.updateItemQuantity(item.product._id || 0, quantity);
    }
  }
  
  removeItem(productId: string | number | undefined): void {
    if (productId !== undefined) {
      this.cartService.removeFromCart(productId);
    }
  }
  
  clearCart(): void {
    this.cartService.clearCart();
  }
  
  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }
}