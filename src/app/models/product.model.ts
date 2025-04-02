// src/app/models/product.model.ts
export interface Product {
  _id?: string;  // MongoDB uses _id
  id?: number;   // Keep this for backward compatibility if needed
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  volume: string;
  inStock: boolean;
  featured: boolean;
  specifications?: {
    origin?: string;
    purity?: string;
    type?: string;
    extraction?: string;
    benefits?: string[];
  };
}