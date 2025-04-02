// src/app/pages/admin/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent {
  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}