// products.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: string = 'all';
  sortBy: string = 'name';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  // In products.component.ts or home.component.ts
ngOnInit(): void {
  this.productService.getProducts().subscribe(products => {
    console.log('Products loaded:', products); // Add this for debugging
    this.products = products;
    this.filteredProducts = [...products];
  });
}

  filterProducts(): void {
    if (this.selectedCategory === 'all') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product => 
        product.category === this.selectedCategory);
    }
    this.sortProducts();
  }

  sortProducts(): void {
    switch (this.sortBy) {
      case 'name':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
    }
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}