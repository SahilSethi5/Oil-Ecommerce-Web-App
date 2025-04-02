// src/app/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // In Angular 17 functional interceptor, we need to use a different approach
  // to determine if we're running in a browser
  
  // Check if window exists (browser environment check)
  const isBrowser = typeof window !== 'undefined';
  
  // Only attempt to get the token in a browser environment
  if (isBrowser) {
    try {
      const authService = inject(AuthService);
      const token = authService.token;
      
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Error in auth interceptor:', error);
    }
  }

  return next(req);
};