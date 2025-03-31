export interface Product {
    id: number;
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