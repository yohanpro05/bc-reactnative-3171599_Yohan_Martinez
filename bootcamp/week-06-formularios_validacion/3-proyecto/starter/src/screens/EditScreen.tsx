import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { productSchema, type ProductFormData } from '../schemas/itemSchema';
import { useItemById, useUpdateItem } from '../hooks/useItems';
import { useCategories } from '../hooks/useCategories';

type EditNavProp = NativeStackNavigationProp<RootStackParamList, 'Edit'>;
type EditRouteProp = RouteProp<RootStackParamList, 'Edit'>;

export function EditScreen(): React.JSX.Element {
  const navigation = useNavigation<EditNavProp>();
  const route = useRoute<EditRouteProp>();
  const { id } = route.params;

  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: product, isLoading: isLoadingProduct } = useItemById(id);
  const { data: categories } = useCategories();
  const { mutate: updateItem, isPending } = useUpdateItem();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: '', description: '', price: undefined, stock: 0, sku: '', category: '' },
  });

  useEffect(() => {
    if (product) {
      const catId = typeof product.category === 'object' && product.category !== null
        ? product.category._id
        : product.category;
      setSelectedCategory(catId as string);
      reset({
        name: product.name,
        description: product.description ?? '',
        price: product.price,
        stock: product.stock,
        sku: product.sku,
        category: catId as string,
      });
    }
  }, [product, reset]);

  function onSubmit(data: ProductFormData): void {
    updateItem(
      {
        id,
        name: data.name,
        description: data.description || undefined,
        price: data.price,
        stock: data.stock,
        sku: data.sku,
        category: data.category,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }

  const canSubmit = !isSubmitting && !isPending && isDirty;

  if (isLoadingProduct) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <FormField
          control={control}
          name="name"
          label="Nombre *"
          placeholder="Nombre del producto…"
          returnKeyType="next"
        />

        <FormField
          control={control}
          name="sku"
          label="SKU *"
          placeholder="Código SKU…"
          returnKeyType="next"
        />

        <View style={styles.fieldRow}>
          <View style={{ flex: 1 }}>
            <FormField
              control={control}
              name="price"
              label="Precio *"
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormField
              control={control}
              name="stock"
              label="Stock"
              placeholder="0"
              keyboardType="number-pad"
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Categoría *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chips}>
            {categories?.map((cat) => {
              const selected = selectedCategory === cat._id;
              return (
                <Pressable
                  key={cat._id}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => {
                    const newVal = selected ? '' : cat._id;
                    setSelectedCategory(newVal);
                    setValue('category', newVal, { shouldValidate: true });
                  }}
                >
                  <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                    {cat.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
          {errors.category && (
            <Text style={styles.errorText}>{errors.category.message}</Text>
          )}
        </View>

        <FormField
          control={control}
          name="description"
          label="Descripción"
          placeholder="Descripción opcional…"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <View style={styles.actions}>
          <Pressable
            style={[styles.button, !canSubmit && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!canSubmit}
          >
            {isSubmitting || isPending
              ? <ActivityIndicator size="small" color={COLORS.background} />
              : <Text style={styles.buttonText}>Guardar cambios</Text>
            }
          </Pressable>

          <Pressable style={styles.cancel} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: SPACING.xxl },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  field: { gap: SPACING.xs },
  fieldRow: { flexDirection: 'row', gap: SPACING.md },
  label: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 0.6 },
  chips: { flexDirection: 'row', gap: SPACING.sm, paddingVertical: SPACING.xs },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { ...TYPOGRAPHY.caption },
  chipTextSelected: { color: COLORS.background, fontWeight: '600' },
  errorText: { ...TYPOGRAPHY.caption, color: COLORS.error, minHeight: 16 },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700', color: '#FFFFFF' },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
