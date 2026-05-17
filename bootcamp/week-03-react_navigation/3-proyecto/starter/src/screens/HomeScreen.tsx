import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ITEMS } from '../data/mockData';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import type { Item } from '../types';
import type { HomeStackParamList } from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'HomeList'
>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  function handleItemPress(item: Item): void {
    navigation.navigate('HomeDetail', {
      id: item.id,
      name: item.name,
      price: item.price,    
      brand: item.brand,    
      stock: item.stock,    
    });
  }

  function renderItem({ item }: { item: Item }): React.JSX.Element {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
        onPress={() => handleItemPress(item)}
        testID={`item-${item.id}`}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toLocaleString('es-CO')}</Text>
        </View>

        <Text style={styles.itemBrand}>{item.brand}</Text>
        
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <Text style={styles.chevron}>{'›'}</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Inventario de Herramientas</Text>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay productos en el inventario</Text>
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
  headerTitle: {
    fontSize: TYPOGRAPHY.size.lg,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.base,
    paddingTop: SPACING.base,
    paddingBottom: SPACING.xs,
  },
  list: {
    padding: SPACING.base,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.base,
    borderWidth: 1,
    borderColor: COLORS.border,
    position: 'relative',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: SPACING.lg, 
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: COLORS.surfaceAlt,
  },
  itemName: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: TYPOGRAPHY.weight.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  itemPrice: {
    fontSize: TYPOGRAPHY.size.sm,
    fontWeight: TYPOGRAPHY.weight.bold,
    color: COLORS.success,
  },
  itemBrand: {
    fontSize: TYPOGRAPHY.size.xs,
    color: COLORS.accent,
    fontWeight: TYPOGRAPHY.weight.medium,
    textTransform: 'uppercase',
    marginBottom: SPACING.xs,
  },
  itemDescription: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginRight: SPACING.lg,
  },
  chevron: {
    position: 'absolute',
    right: SPACING.base,
    top: '40%',
    fontSize: TYPOGRAPHY.size.xl,
    color: COLORS.textMuted,
  },
  separator: {
    height: SPACING.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: SPACING.xxl,
  },
  emptyText: {
    color: COLORS.textMuted,
    fontSize: TYPOGRAPHY.size.base,
  }
});