// src/types/index.ts
// Interface principal del dominio: Ferretería.

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
}
