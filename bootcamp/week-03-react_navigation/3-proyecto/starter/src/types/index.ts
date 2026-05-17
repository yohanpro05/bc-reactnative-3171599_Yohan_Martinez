// src/types/index.ts
// Define los tipos de datos del dominio.
// Adapta la interfaz Item a tu dominio asignado.

// ============================================
// INTERFACE PRINCIPAL DEL DOMINIO
// ============================================

export interface Item {
  id: string;
  name: string;
  price: number; 
  brand: string;
  stock: number; 
  description: string;
}
