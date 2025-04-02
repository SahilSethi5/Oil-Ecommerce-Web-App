// src/app/pages/admin/orders/orders.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  statusFilter: string = 'all';
  searchQuery: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getAllOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading orders:', err);
        this.error = 'Failed to load orders. Please try again.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredOrders = this.orders
      .filter(order => {
        if (this.statusFilter === 'all') return true;
        return order.status === this.statusFilter;
      })
      .filter(order => {
        if (!this.searchQuery) return true;
        const query = this.searchQuery.toLowerCase();
        return (
          order.customerInfo.name.toLowerCase().includes(query) ||
          order.customerInfo.email.toLowerCase().includes(query) ||
          order.customerInfo.phone.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => {
        // Sort by date descending (newest first)
        return new Date(b.orderDate || 0).getTime() - new Date(a.orderDate || 0).getTime();
      });
  }

  updateOrderStatus(order: Order, newStatus: string): void {
    if (order._id) {
      this.orderService.updateOrderStatus((order._id), newStatus).subscribe({
        next: () => {
          order.status = newStatus;
        },
        error: (err) => {
          console.error('Error updating order status:', err);
        }
      });
    }
  }

  getFormattedDate(date: Date | string | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString();
  }

  getStatusClass(status: string | undefined): string {
    switch (status) {
      case 'Pending': return 'bg-warning';
      case 'Processing': return 'bg-info';
      case 'Shipped': return 'bg-primary';
      case 'Delivered': return 'bg-success';
      case 'Cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
}