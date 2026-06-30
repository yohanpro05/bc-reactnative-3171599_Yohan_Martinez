import { z } from 'zod';

export const itemSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es requerido' })
    .min(1, 'El nombre no puede estar vacío')
    .max(150, 'Máximo 150 caracteres'),
  description: z
    .string()
    .max(500, 'Máximo 500 caracteres')
    .optional()
    .or(z.literal('')),
  price: z.coerce.number().positive('El precio debe ser mayor a 0'),
  stock: z.coerce.number().int().min(0, 'El stock no puede ser negativo'),
  sku: z
    .string({ required_error: 'El SKU es requerido' })
    .min(1, 'El SKU no puede estar vacío')
    .max(50, 'Máximo 50 caracteres'),
  category: z.string().min(1, 'Seleccioná una categoría'),
});

export type ItemFormData = z.infer<typeof itemSchema>;
