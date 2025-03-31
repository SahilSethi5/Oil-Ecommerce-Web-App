// src/app/pages/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartItem, CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { WhatsappService } from '../../services/whatsapp.service';
import { Order, OrderItem } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  checkoutForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private orderService: OrderService,
    private whatsappService: WhatsappService,
    private router: Router
  ) {
    this.checkoutForm = this.formBuilder.group({
      customerInfo: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        address: this.formBuilder.group({
          street: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          zipCode: ['', Validators.required],
          country: ['', Validators.required]
        })
      }),
      paymentMethod: ['cashOnDelivery', Validators.required]
    });
  }
  
  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      
      if (this.cartItems.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }
  
  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }
  
  getTax(): number {
    return this.getSubtotal() * 0.07; // 7% tax
  }
  
  getShipping(): number {
    return this.getSubtotal() > 50 ? 0 : 5.99; // Free shipping over $50
  }
  
  getTotal(): number {
    return this.getSubtotal() + this.getTax() + this.getShipping();
  }
  
  placeOrder(): void {
    if (this.checkoutForm.valid) {
      const orderItems: OrderItem[] = this.cartItems.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      }));
      
      const order: Order = {
        items: orderItems,
        customerInfo: this.checkoutForm.value.customerInfo,
        paymentMethod: this.checkoutForm.value.paymentMethod,
        subtotal: this.getSubtotal(),
        tax: this.getTax(),
        shipping: this.getShipping(),
        total: this.getTotal()
      };
      
      this.orderService.placeOrder(order).subscribe(newOrder => {
        // Send order to WhatsApp
        this.whatsappService.sendOrderToWhatsApp(newOrder);
        
        // Clear cart and redirect to confirmation
        this.cartService.clearCart();
        this.router.navigate(['/order-confirmation'], { state: { order: newOrder } });
      });
    }
  }
}