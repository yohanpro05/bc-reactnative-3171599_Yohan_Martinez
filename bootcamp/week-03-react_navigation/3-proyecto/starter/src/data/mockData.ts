import type { Item } from '../types';

// ============================================
// LISTA PRINCIPAL DE ELEMENTOS (Ferretería)
// ============================================
export const ITEMS: Item[] = [
  {
    id: 'FER-001',
    name: 'Taladro Percutor 1/2"',
    description: 'Motor de alto rendimiento para perforaciones en concreto y madera.',
    brand: 'DeWalt',
    price: 450000,
    stock: 12,
  },
  {
    id: 'FER-002',
    name: 'Juego de Llaves Bristol',
    description: 'Set de 9 piezas en acero cromo vanadio de alta resistencia.',
    brand: 'Stanley',
    price: 35000,
    stock: 25,
  },
  {
    id: 'FER-003',
    name: 'Pulidora Angular 4-1/2"',
    description: 'Compacta y potente para trabajos de corte y desbaste profesional.',
    brand: 'Makita',
    price: 280000,
    stock: 4, // Activará el color de advertencia en DetailScreen
  },
  {
    id: 'FER-004',
    name: 'Martillo de Uña 16oz',
    description: 'Mango de fibra de vidrio con agarre ergonómico antideslizante.',
    brand: 'Truper',
    price: 42000,
    stock: 50,
  },
  {
    id: 'FER-005',
    name: 'Destornillador de Impacto',
    description: 'Inalámbrico de 20V con luz LED integrada y 2 baterías.',
    brand: 'Black+Decker',
    price: 320000,
    stock: 8,
  },
  {
    id: 'FER-006',
    name: 'Cinta Métrica 8m/26ft',
    description: 'Hoja extra ancha con revestimiento de nailon para mayor durabilidad.',
    brand: 'Lufkin',
    price: 28500,
    stock: 15,
  },
  {
    id: 'FER-007',
    name: 'Nivel de Burbuja 24"',
    description: 'Estructura de aluminio reforzado con tres burbujas de alta precisión.',
    brand: 'Irimo',
    price: 55000,
    stock: 10,
  },
  {
    id: 'FER-008',
    name: 'Alicate Universal 8"',
    description: 'Bordes de corte templados por inducción para máxima vida útil.',
    brand: 'Bahco',
    price: 68000,
    stock: 18,
  },
];

// ============================================
// LISTA DE FAVORITOS
// ============================================
export const FAVORITES: Item[] = [
  ITEMS[0], // Taladro DeWalt
  ITEMS[2], // Pulidora Makita
  ITEMS[7], // Alicate Bahco
];