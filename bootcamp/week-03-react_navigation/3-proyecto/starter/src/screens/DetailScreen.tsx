import { useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { HomeStackParamList } from '../navigation/types';

// Tipo del route hook para leer los params tipados
type DetailScreenRouteProp = RouteProp<HomeStackParamList, 'HomeDetail'>;

export function DetailScreen(): React.JSX.Element {
  const route = useRoute<DetailScreenRouteProp>();
  
  // Desestructuramos los campos de la Ferretería
  const { id, name, price, brand, stock } = route.params;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.name}>{name}</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>SKU: {id}</Text>
      </View>

      {/* Campo: Marca */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Marca</Text>
        <Text style={styles.fieldValue}>{brand}</Text>
      </View>

      {/* Campo: Precio */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Precio de Venta</Text>
        <Text style={styles.fieldValue}>
          ${price.toLocaleString('es-CO')}
        </Text>
      </View>

      {/* Campo: Stock */}
      <View style={styles.field}>
        <Text style={styles.fieldLabel}>Unidades en Inventario</Text>
        <Text style={[
          styles.fieldValue, 
          { color: stock < 5 ? COLORS.error : COLORS.success }
        ]}>
          {stock} unidades
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.base,
    gap: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.size.xl,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accentDim,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.md,
  },
  badgeText: {
    fontSize: TYPOGRAPHY.size.xs,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.accent,
  },
  field: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fieldLabel: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fieldValue: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.weight.semibold,
  },
});