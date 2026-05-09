import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ListRenderItem,
} from 'react-native';
import { Product } from '../types';
import { MOCK_PRODUCTS } from '../data/mockData';
import { ItemCard } from '../components/ItemCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

export function HomeScreen(): React.JSX.Element {
  // ============================================
  // ESTADO DE BÚSQUEDA
  const [query, setQuery] = useState<string>('');

  // ============================================
  // FILTRADO CON useMemo (Case-insensitive)
  const filteredItems = useMemo(() => { 
    return MOCK_PRODUCTS.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
  );
   }, [query]);

  // ============================================
  // EMPTY STATE
  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Sin resultados para "{query}"</Text>
      <Text style={styles.emptySubText}>
        Intenta buscar otro producto de ferretería o verifica la ortografía. 
      </Text>
    </View>
   ), [query]);

  // ============================================
  // RENDER ITEM
  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => ( 
    <ItemCard
    item={item}
    onPress={() => console.log('Seleccionado:', item.name)}
    />
   ), []);
   // SEPARADOR DE LISTA
  const renderSeparator = useCallback(() => (
    <View style={styles.separator} />
  ), []);

  return (
  <View style={styles.mainContainer}> 
    <KeyboardAvoidingView 
      style={styles.kvContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        
        {/* Contenedor del Buscador */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar herramientas, cables..."
            placeholderTextColor={COLORS.textSecondary}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
        </View>

        {/* Lista de productos */}
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContent}
          // Importante para web y móvil:
          style={{ flex: 1 }} 
          keyboardShouldPersistTaps="handled"
        />
        
      </View>
    </KeyboardAvoidingView>
  </View>
);
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  kvContainer: {
    flex: 1,
  },  
  inner: {
    flex: 1,
  },
  searchContainer: {
    zIndex:1,
    paddingHorizontal: SPACING.base,
    paddingTop: Platform.OS === 'android' ? SPACING.xxl : SPACING.md,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: SPACING.base,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    color: COLORS.textPrimary,
    fontSize: TYPOGRAPHY.size.base,
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  separator: {
    height: 1,
    marginHorizontal: SPACING.base,
    backgroundColor: COLORS.borderLight,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    paddingHorizontal: SPACING.xxl,
  },
  emptyText: {
    fontSize: TYPOGRAPHY.size.md,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubText: {
    fontSize: TYPOGRAPHY.size.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
