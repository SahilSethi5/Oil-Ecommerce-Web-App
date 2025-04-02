// src/app/services/auth.service.ts
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

export interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isBrowser: boolean;

  // Admin credentials for demo
  private adminUser = {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    
    // Only access localStorage in browser
    if (this.isBrowser) {
      try {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
          const user: User = JSON.parse(userData);
          this.currentUserSubject.next(user);
        }
      } catch (error) {
        console.error('Error accessing localStorage:', error);
      }
    }
  }

  public get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  public get isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  login(email: string, password: string): Observable<boolean> {
    // For demo purposes using dummy admin login
    // In a real app, this would be an API call
    if (email === this.adminUser.email && password === this.adminUser.password) {
      const user: User = {
        name: this.adminUser.name,
        email: this.adminUser.email,
        role: this.adminUser.role
      };
      
      if (this.isBrowser) {
        try {
          localStorage.setItem('currentUser', JSON.stringify(user));
        } catch (error) {
          console.error('Error storing in localStorage:', error);
        }
      }
      
      this.currentUserSubject.next(user);
      return of(true);
    }
    
    return of(false);
  }

  logout(): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem('currentUser');
      } catch (error) {
        console.error('Error removing from localStorage:', error);
      }
    }
    
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}