import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Product } from '../types';
import type { RootStackParamList } from '../navigation/types';
import { useProducts } from '../hooks/useItems';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface ProductCardProps {
  item: Product;
  onPress: () => void;
}

function ProductCard({ item, onPress }: ProductCardProps): React.JSX.Element {
  const categoryName =
    typeof item.category === 'object' && item.category !== null
      ? item.category.name
      : '—';

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.7 }]}
      onPress={onPress}
      testID={`product-card-${item._id}`}
    >
      <View style={styles.cardAvatar}>
        <Text style={styles.cardAvatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.cardSubtitle} numberOfLines={1}>
          {categoryName}
        </Text>
      </View>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </Pressable>
  );
}

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeNavProp>();
  const { data, isLoading, isError, isFetching, refetch, error } = useProducts();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar la lista</Text>
        <Text style={styles.errorDetail}>{(error as Error)?.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      item={item}
      onPress={() =>
        navigation.navigate('Detail', {
          id: item._id,
          name: item.name,
        })
      }
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onRefresh={refetch}
        refreshing={isFetching && !isLoading}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No hay productos disponibles.</Text>
          </View>
        }
        ListHeaderComponent={
          data ? (
            <Text style={styles.countLabel}>
              {data.length} producto{data.length !== 1 ? 's' : ''}
            </Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.md, paddingBottom: SPACING.xl },
  separator: { height: SPACING.sm },
  countLabel: {
    ...TYPOGRAPHY.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  cardAvatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarText: { ...TYPOGRAPHY.h3, color: COLORS.accent },
  cardContent: { flex: 1, gap: SPACING.xs },
  cardTitle: { ...TYPOGRAPHY.body, fontWeight: '600' },
  cardSubtitle: { ...TYPOGRAPHY.caption },
  price: { ...TYPOGRAPHY.h3, color: COLORS.success },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  loadingText: { ...TYPOGRAPHY.caption },
  errorText: { ...TYPOGRAPHY.h3, color: COLORS.error },
  errorDetail: { ...TYPOGRAPHY.caption, textAlign: 'center' },
  retryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  retryButtonText: { ...TYPOGRAPHY.body, color: COLORS.background, fontWeight: '600' },
  emptyText: { ...TYPOGRAPHY.body, color: COLORS.textSecondary, textAlign: 'center' },
});
