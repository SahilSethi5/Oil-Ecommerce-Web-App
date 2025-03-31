// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Sample product data
  private products: Product[] = [
    {
      id: 1,
      name: "Premium Olive Oil",
      description: "Cold-pressed extra virgin olive oil from Mediterranean olives. Rich in flavor and antioxidants.",
      price: 24.99,
      imageUrl: "https://via.placeholder.com/300x300?text=Olive+Oil",
      category: "cooking",
      volume: "500ml",
      inStock: true,
      featured: true,
      specifications: {
        origin: "Mediterranean",
        purity: "Extra Virgin",
        type: "Cold-pressed",
        extraction: "First cold press",
        benefits: ["Rich in antioxidants", "Heart-healthy"]
      }
    },
    {
      id: 2,
      name: "Organic Coconut Oil",
      description: "100% organic virgin coconut oil. Perfect for cooking, skincare, and haircare.",
      price: 18.99,
      imageUrl: "https://via.placeholder.com/300x300?text=Coconut+Oil",
      category: "multipurpose",
      volume: "450ml",
      inStock: true,
      featured: true,
      specifications: {
        origin: "Sri Lanka",
        purity: "Virgin",
        type: "Cold-pressed",
        extraction: "Expeller-pressed",
        benefits: ["Moisturizing", "Medium-chain fatty acids"]
      }
    },
    {
      id: 3,
      name: "Argan Oil",
      description: "Pure argan oil for hair and skin. Rich in vitamin E and essential fatty acids.",
      price: 29.99,
      imageUrl: "https://via.placeholder.com/300x300?text=Argan+Oil",
      category: "cosmetic",
      volume: "100ml",
      inStock: true,
      featured: true,
      specifications: {
        origin: "Morocco",
        purity: "100% Pure",
        type: "Cold-pressed",
        extraction: "Traditional pressing",
        benefits: ["Rich in vitamin E", "Moisturizing"]
      }
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    console.log('Getting products:', this.products); // Debug log
    return of(this.products);
  }

  getProduct(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    console.log('Getting product by id:', id, product); // Debug log
    return of(product);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.featured);
    console.log('Getting featured products:', featured); // Debug log
    return of(featured);
  }
}