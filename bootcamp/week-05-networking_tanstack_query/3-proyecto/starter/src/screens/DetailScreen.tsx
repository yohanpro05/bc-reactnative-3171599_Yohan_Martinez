import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { RootStackParamList } from '../navigation/types';
import { useProductById } from '../hooks/useItems';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

function FieldRow({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.fieldRow}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text style={styles.fieldValue}>{String(value)}</Text>
    </View>
  );
}

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailRouteProp>();
  const { id } = route.params;

  const { data: product, isLoading, isError, refetch } = useProductById(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el detalle</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Producto no encontrado</Text>
      </View>
    );
  }

  const categoryName =
    typeof product.category === 'object' && product.category !== null
      ? product.category.name
      : String(product.category);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Text style={styles.heroLetter}>{product.name.charAt(0)}</Text>
        </View>
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.sku}>SKU: {product.sku}</Text>
      </View>

      <View style={styles.fieldsCard}>
        <FieldRow label="Precio" value={`$${product.price.toFixed(2)}`} />
        <FieldRow label="Stock" value={`${product.stock} unidades`} />
        <FieldRow label="Categoría" value={categoryName} />
        <FieldRow label="Estado" value={product.active ? 'Activo' : 'Inactivo'} />
      </View>

      {product.description ? (
        <View style={styles.fieldsCard}>
          <Text style={styles.descLabel}>Descripción</Text>
          <Text style={styles.descValue}>{product.description}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: SPACING.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    backgroundColor: COLORS.background,
  },
  hero: { alignItems: 'center', gap: SPACING.sm },
  heroIcon: {
    width: 88,
    height: 88,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroLetter: { fontSize: 36, fontWeight: '700', color: COLORS.accent },
  title: { ...TYPOGRAPHY.h2, textAlign: 'center' },
  sku: { ...TYPOGRAPHY.label, textTransform: 'uppercase', letterSpacing: 1 },
  fieldsCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fieldLabel: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },
  fieldValue: { ...TYPOGRAPHY.body, fontWeight: '600' },
  descLabel: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginBottom: SPACING.xs },
  descValue: { ...TYPOGRAPHY.body, lineHeight: 22 },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
});
