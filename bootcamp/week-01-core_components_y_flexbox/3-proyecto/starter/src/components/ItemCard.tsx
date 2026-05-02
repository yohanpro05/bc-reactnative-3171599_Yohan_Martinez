import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Product } from '../types';
interface ItemCardProps {
  item: Product;
  onPress: (item: Product) => void;
}

export function ItemCard({ item, onPress }: ItemCardProps): React.JSX.Element {
  return (
   <Pressable
      style={styles.card}
      android_ripple={{ color: '#333' }}
      onPress={() => onPress(item)}
    >
      {/* Imagen del Producto */}
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.cardImage} 
        resizeMode="cover" 
      />

      {/* Contenedor de Información */}
      <View style={styles.cardBody}>
        <View style={styles.headerRow}>
          <Text style={styles.categoryText}>{item.category.toUpperCase()}</Text>
          <Text style={styles.stockText}>Stock: {item.stock}</Text>
        </View>

        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.cardPrice}>
            ${item.price.toLocaleString('es-CO')}
          </Text>
          <View style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Ver más</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardPressed: {
    opacity: 0.8,
    backgroundColor: '#252525',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ff9800', 
    letterSpacing: 1,
  },
  stockText: {
    fontSize: 11,
    color: '#8b949e',
  },
  cardName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#abb2bf',
    marginBottom: 16,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4caf50', 
  },
  actionButton: {
    backgroundColor: '#ff9800',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
});