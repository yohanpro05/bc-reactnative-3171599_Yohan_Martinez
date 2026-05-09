export interface Product {
  id: string;
  name: string;
  category: 'Electricidad' | 'Herramientas' | 'Medición' | 'Hogar' | 'Pintura';
  price: number;
  stock: number;
}