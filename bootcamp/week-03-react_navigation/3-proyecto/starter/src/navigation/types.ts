// src/navigation/types.ts
import { NavigatorScreenParams } from "@react-navigation/native";

// ============================================
// TAB NAVIGATOR — anidado dentro de la pestaña Home
// ============================================

export type HomeStackParamList = {
  HomeList: undefined;
  // Detalle de la herramienta con campos de Ferretería
  HomeDetail: {
    id: string;
    name: string;
    price: number; 
    brand: string;
    stock: number;   
  };
};

// ============================================
// STACK NAVIGATOR — pantallas de nivel de raiz
// ============================================

export type RootTabParamList = {
  // Cambiamos el tipo de Home para que acepte el Stack anidado
 HomeStack: NavigatorScreenParams<HomeStackParamList>;
  Favorites: undefined;
};
