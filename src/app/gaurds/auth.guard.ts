// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresAdmin = route.data['requiresAdmin'] || false;
    
    if (this.authService.isLoggedIn) {
      if (requiresAdmin && !this.authService.isAdmin) {
        // User is logged in but not an admin
        this.router.navigate(['/']);
        return false;
      }
      
      // User is logged in (and is admin if required)
      return true;
    }
    
    // User is not logged in, redirect to login
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}