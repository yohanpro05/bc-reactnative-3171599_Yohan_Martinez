import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../services/api';
import type { CreateProductPayload, Product } from '../types';

export const PRODUCTS_QUERY_KEY = ['products'] as const;

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: Product[] }>('/products');
      return data.data;
    },
  });
}

export function useProductById(id: string) {
  return useQuery<Product>({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: async () => {
      const { data } = await apiClient.get<Product>(`/products/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductPayload>({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<Product>('/products', payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
    onError: (error) => {
      console.error('Failed to create product:', error.message);
    },
  });
}
