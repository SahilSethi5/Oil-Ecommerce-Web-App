// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { OrderConfirmationComponent } from './pages/order-confirmation/order-confirmation.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AdminOrdersComponent } from './pages/admin/orders/orders.component';
import { AuthGuard } from './gaurds/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-confirmation', component: OrderConfirmationComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { requiresAdmin: true },
    children: [
      { path: '', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'dashboard', redirectTo: 'orders', pathMatch: 'full' },
      { path: 'orders', component: AdminOrdersComponent }
    ] 
  },
  { path: '**', redirectTo: '' }
];