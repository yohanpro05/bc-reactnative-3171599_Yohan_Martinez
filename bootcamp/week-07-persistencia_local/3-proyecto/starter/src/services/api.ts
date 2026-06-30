import axios from 'axios';
import type { CreateProductPayload, Product } from '../types';

const api = axios.create({
  baseURL: process.env['EXPO_PUBLIC_API_URL'] ?? 'http://localhost:3000/api/v1',
  timeout: 8000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchItems(): Promise<Product[]> {
  const { data } = await api.get<{ data: Product[] }>('/products');
  return data.data;
}

export async function fetchItemById(id: string): Promise<Product> {
  const { data } = await api.get<Product>(`/products/${id}`);
  return data;
}

export async function createItem(
  payload: CreateProductPayload,
): Promise<Product> {
  const { data } = await api.post<Product>('/products', payload);
  return data;
}
