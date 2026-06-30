import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { itemSchema, type ItemFormData } from '../schemas/itemSchema';
import { useCreateItem } from '../hooks/useItems';

type CreateNavProp = NativeStackNavigationProp<RootStackParamList, 'Create'>;

const CATEGORIES = [
  { _id: '6a41e0df69d931c814f88ea2', name: 'Herramientas Manuales' },
  { _id: '6a41e0df69d931c814f88ea3', name: 'Electricidad' },
  { _id: '6a41e0df69d931c814f88ea4', name: 'Plomería' },
  { _id: '6a41e0df69d931c814f88ea5', name: 'Pintura' },
  { _id: '6a41e2a193361c47f77f0730', name: 'Jardinería' },
];

export function CreateScreen(): React.JSX.Element {
  const navigation = useNavigation<CreateNavProp>();
  const [selectedCategory, setSelectedCategory] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: { name: '', description: '', price: undefined, stock: 0, sku: '', category: '' },
  });

  const { mutate: createItem, isPending } = useCreateItem();

  function onSubmit(data: ItemFormData): void {
    createItem(
      {
        name: data.name,
        description: data.description || undefined,
        price: data.price,
        stock: data.stock,
        sku: data.sku,
        category: data.category,
      },
      { onSuccess: () => navigation.goBack() },
    );
  }

  const canSubmit = !isSubmitting && !isPending;

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
            {CATEGORIES.map((cat) => {
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
              : <Text style={styles.buttonText}>Crear producto</Text>
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
  field: { gap: SPACING.xs },
  fieldRow: { flexDirection: 'row', gap: SPACING.md },
  label: { ...TYPOGRAPHY.label },
  chips: { flexDirection: 'row', gap: SPACING.sm, paddingVertical: SPACING.xs },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 999,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipSelected: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { ...TYPOGRAPHY.caption },
  chipTextSelected: { color: '#fff', fontWeight: '600' },
  errorText: { fontSize: 12, color: COLORS.danger, minHeight: 16 },
  actions: { gap: SPACING.sm, marginTop: SPACING.sm },
  button: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.45 },
  buttonText: { ...TYPOGRAPHY.body, fontWeight: '700' },
  cancel: { alignItems: 'center', padding: SPACING.sm },
  cancelText: { ...TYPOGRAPHY.body, color: COLORS.textMuted },
});
