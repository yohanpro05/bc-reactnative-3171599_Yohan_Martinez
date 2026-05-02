import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Product } from '../types';
import { ItemCard } from '../components/ItemCard';
import { PRODUCTS } from '../data/mockData';

export function HomeScreen(): React.JSX.Element {
  // Personalización para el dominio de Ferretería
  const DOMAIN_TITLE = 'Ferretería El Pro';
  const DOMAIN_SUBTITLE = 'Herramientas y suministros para expertos';

  /**
   * Maneja el evento de presionar una tarjeta.
   */
  function handleItemPress(product: Product): void {
    // Requisito de mostrar feedback al usuario
    Alert.alert(
      'Detalle del Producto',
      `Has seleccionado: ${product.name}\nPrecio: $${product.price.toLocaleString('es-CO')}`,
      [{ text: 'Entendido' }]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0d1117" />

      {/* Header de la App */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{DOMAIN_TITLE}</Text>
          <Text style={styles.headerSubtitle}>{DOMAIN_SUBTITLE}</Text>
        </View>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{PRODUCTS.length} Productos</Text>
        </View>
      </View>

      {/* Lista de Tarjetas */}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {PRODUCTS.map((product) => (
          <ItemCard
            key={product.id}
            item={product}
            onPress={handleItemPress}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
    backgroundColor: '#161b22',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ff9800', 
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8b949e',
    marginTop: 2,
  },
  badgeContainer: {
    backgroundColor: '#30363d',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40, 
  },
});