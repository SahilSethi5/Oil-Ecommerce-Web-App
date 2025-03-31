// product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity: number = 1;
  activeTab: string = 'specifications';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.productService.getProduct(id).subscribe(product => {
          this.product = product;
          if (!product) {
            this.router.navigate(['/products']);
          }
        });
      }
    });
  }
  
  increaseQuantity(): void {
    this.quantity++;
  }
  
  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  
  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }
  
  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/checkout']);
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}