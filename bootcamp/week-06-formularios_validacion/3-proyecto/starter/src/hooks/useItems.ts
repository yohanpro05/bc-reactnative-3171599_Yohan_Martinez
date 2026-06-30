import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../services/api';
import type { CreateProductPayload, Product, UpdateProductPayload } from '../types';

export const PRODUCTS_QUERY_KEY = ['products'] as const;

export function useItems() {
  return useQuery<Product[]>({
    queryKey: PRODUCTS_QUERY_KEY,
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: Product[] }>('/products');
      return data.data;
    },
  });
}

export function useItemById(id: string) {
  return useQuery<Product>({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => apiClient.get<Product>(`/products/${id}`).then(r => r.data),
    enabled: !!id,
  });
}

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, CreateProductPayload>({
    mutationFn: (payload) =>
      apiClient.post<Product>('/products', payload).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
    },
  });
}

export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation<Product, Error, UpdateProductPayload>({
    mutationFn: (payload) => {
      const { id, ...body } = payload;
      return apiClient.put<Product>(`/products/${id}`, body).then(r => r.data);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: [...PRODUCTS_QUERY_KEY, variables.id] });
    },
  });
}
