// src/app/services/whatsapp.service.ts
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {
  // Your WhatsApp number
  private whatsappNumber = "+919930256485"; // Replace with your actual WhatsApp number
  
  sendOrderToWhatsApp(order: Order): void {
    console.log('WhatsApp service sending order:', order);
    
    // Format the message
    let message = `*New Order*\n\n`;
    message += `*Customer:* ${order.customerInfo.name}\n`;
    message += `*Phone:* ${order.customerInfo.phone}\n`;
    message += `*Email:* ${order.customerInfo.email}\n\n`;
    
    message += `*Order Items:*\n`;
    order.items.forEach((item, index) => {
      message += `${index + 1}. ${item.productName} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\n*Subtotal:* $${order.subtotal.toFixed(2)}`;
    message += `\n*Tax:* $${order.tax.toFixed(2)}`;
    message += `\n*Shipping:* $${order.shipping.toFixed(2)}`;
    message += `\n*Total:* $${order.total.toFixed(2)}`;
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
  }
}