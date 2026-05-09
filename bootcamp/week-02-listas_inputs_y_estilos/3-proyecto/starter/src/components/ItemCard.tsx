import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Product } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

interface ItemCardProps {
  item: Product;
  onPress: (item: Product) => void;
}

/**
 * Tarjeta reutilizable para mostrar un elemento del dominio (Ferretería).
 */
export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={() => onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={item.name}
    >
      {/* Nombre principal del elemento */}
      <Text style={styles.itemName}>{item.name}</Text>

      {/* Mostrar campos adicionales (Ferretería) */}
      <Text style={styles.fieldText}>Precio: ${item.price.toLocaleString('es-CO')}</Text>
      <Text style={[
        styles.fieldText, 
        item.stock < 5 && { color: COLORS.error, fontWeight: TYPOGRAPHY.weight.bold }
      ]}>
        Stock: {item.stock} unidades
      </Text>

      {/* Badge de categoría */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    marginHorizontal: SPACING.base,
    marginVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardPressed: {
    backgroundColor: COLORS.surfaceAlt,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  fieldText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.accentDim,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.accent,
    textTransform: 'capitalize',
  },
});
