import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Taladro Percutor 1/2"',
    category: 'Herramientas',
    price: 250000,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=300&h=300&auto=format&fit=crop',
    description: 'Motor de 600W, ideal para concreto y madera.'
  },
  {
    id: '2',
    name: 'Pintura Acrílica Blanca 1gl',
    category: 'Pintura',
    price: 85000,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=300&h=300&auto=format&fit=crop',
    description: 'Alta cobertura y secado rápido.'
  },
  {
    id: '3',
    name: 'Multímetro Digital Pro',
    category: 'Electricidad',
    price: 120000,
    stock: 8,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjzIhLwMvXRf6qfNpgFLklcqTYm_9W0bRLdw&s',
    description: 'Medición de voltaje AC/DC, resistencia y continuidad con pantalla retroiluminada.'
  },
  {
    id: '4',
    name: 'Tubería PVC Presión 1/2"',
    category: 'Construcción',
    price: 15500,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=300&h=300&auto=format&fit=crop',
    description: 'Tramo de 6 metros para conducción de agua potable a alta presión.'
  }
];