import { z } from 'zod';

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .max(150, 'Máx. 150 caracteres'),

  description: z
    .string()
    .max(500, 'Máx. 500 caracteres')
    .optional()
    .or(z.literal('')),

  price: z.coerce
    .number()
    .positive('El precio debe ser mayor a 0'),

  stock: z.coerce
    .number()
    .int()
    .min(0, 'El stock no puede ser negativo'),

  sku: z
    .string()
    .min(1, 'El SKU es requerido')
    .max(50, 'Máx. 50 caracteres'),

  category: z
    .string()
    .min(1, 'Seleccioná una categoría'),
});

export type ProductFormData = z.infer<typeof productSchema>;
