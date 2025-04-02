// src/app/components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  cartItemCount: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount = this.cartService.getItemCount();
    });
  
    // Check if we're in browser environment before using timers
    if (isPlatformBrowser(PLATFORM_ID)) {
      // Check if user is logged in initially
      this.isLoggedIn = this.authService.isLoggedIn;
      
      // Use timer only in browser
      setInterval(() => {
        this.isLoggedIn = this.authService.isLoggedIn;
      }, 1000);
    }
  }
}