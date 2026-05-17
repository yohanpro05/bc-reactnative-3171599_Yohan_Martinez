import { FlatList, StyleSheet, Text, View } from 'react-native';

import { FAVORITES } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';

export function FavoritesScreen(): React.JSX.Element {
  /**
   * Renderiza cada herramienta favorita.
   */
  function renderFavorite({ item }: { item: Item }): React.JSX.Element {
    return (
      <View style={styles.card}>
        {/* Ícono de favorito */}
        <Text style={styles.heartIcon}>★</Text>
        <View style={styles.cardContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          
          {/* Detalles específicos del dominio de Ferretería */}
          <Text style={styles.itemBrand}>{item.brand}</Text>
          
          <Text style={styles.itemDescription} numberOfLines={1}>
            {item.description}
          </Text>
          
          <Text style={styles.itemPrice}>
            ${item.price.toLocaleString('es-CO')}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Título adaptado al dominio */}
      <Text style={styles.title}>Herramientas Guardadas</Text>
      
      <FlatList
        data={FAVORITES}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No has guardado herramientas favoritas aún
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.sm,
  },
  list: {
    paddingHorizontal: SPACING.base,
    paddingBottom: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  heartIcon: {
    fontSize: TYPOGRAPHY.size.xl,
    color: '#FFD700', // Color dorado para la estrella de favoritos
  },
  cardContent: {
    flex: 1,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.base,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
  },
  itemBrand: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.weight.medium,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    paddingTop: SPACING.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.base,
    color: COLORS.textMuted,
  },
});