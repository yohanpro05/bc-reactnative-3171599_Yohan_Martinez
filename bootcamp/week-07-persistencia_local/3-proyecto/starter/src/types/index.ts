export interface Category {
  _id: string;
  name: string;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
  category: Category | string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ItemsWithSource {
  items: Product[];
  source: 'network' | 'cache';
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
}
