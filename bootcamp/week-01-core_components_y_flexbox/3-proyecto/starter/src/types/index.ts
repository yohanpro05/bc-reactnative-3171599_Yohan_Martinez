export interface Product {
  id: string;
  name: string;
  category: 'Herramientas' | 'Construcción' | 'Electricidad' | 'Pintura';
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
}