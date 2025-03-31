// order-confirmation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { WhatsappService } from '../../services/whatsapp.service';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent implements OnInit {
  order: Order | null = null;
  
  constructor(
    private router: Router,
    private whatsappService: WhatsappService
  ) {
    // Get order data from router state
    const navigation = this.router.getCurrentNavigation();
    this.order = navigation?.extras.state?.['order'] as Order;
    
    if (!this.order) {
      this.router.navigate(['/']);
    }
  }
  
  ngOnInit(): void {
  }
  
  sendToWhatsApp(): void {
    if (this.order) {
      this.whatsappService.sendOrderToWhatsApp(this.order);
    }
  }
}