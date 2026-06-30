import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../theme';
import { usePreferences } from '../hooks/usePreferences';

const SENSITIVE_KEY = 'ferre_pin';
const MOCK_SENSITIVE = '1234';

export function SettingsScreen(): React.JSX.Element {
  const {
    sortOrder,
    setSortOrder,
    compactMode,
    setCompactMode,
    itemsPerPage,
    setItemsPerPage,
  } = usePreferences();

  const [isSaved, setIsSaved] = useState(false);
  const [maskedValue, setMaskedValue] = useState<string | null>(null);

  async function handleSaveSensitive(): Promise<void> {
    await SecureStore.setItemAsync(SENSITIVE_KEY, MOCK_SENSITIVE);
    setIsSaved(true);
    Alert.alert('Guardado', 'PIN guardado en SecureStore.');
  }

  async function handleReadSensitive(): Promise<void> {
    const value = await SecureStore.getItemAsync(SENSITIVE_KEY);
    if (value) {
      const masked = value.slice(0, 2) + '••' + value.slice(-2);
      setMaskedValue(masked);
    } else {
      Alert.alert('No encontrado', 'No hay PIN guardado aún.');
    }
  }

  async function handleDeleteSensitive(): Promise<void> {
    await SecureStore.deleteItemAsync(SENSITIVE_KEY);
    setIsSaved(false);
    setMaskedValue(null);
    Alert.alert('Eliminado', 'El PIN fue removido de SecureStore.');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Preferencias de la app</Text>
      <Text style={styles.sectionHint}>
        Persisten con MMKV. Cambian en tiempo real sin guardar.
      </Text>

      <View style={styles.row}>
        <View style={styles.rowInfo}>
          <Text style={styles.rowLabel}>Modo compacto</Text>
          <Text style={styles.rowDesc}>
            Muestra menos información por producto
          </Text>
        </View>
        <Switch
          value={compactMode}
          onValueChange={setCompactMode}
          trackColor={{ false: COLORS.border, true: COLORS.accent }}
          thumbColor={COLORS.background}
        />
      </View>

      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Orden de la lista</Text>
        <View style={styles.segmented}>
          {(['asc', 'desc'] as const).map((opt) => (
            <Pressable
              key={opt}
              style={[styles.segment, sortOrder === opt && styles.segmentActive]}
              onPress={() => setSortOrder(opt)}
            >
              <Text style={[styles.segmentText, sortOrder === opt && styles.segmentTextActive]}>
                {opt === 'asc' ? 'A → Z' : 'Z → A'}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={[styles.row, styles.rowColumn]}>
        <Text style={styles.rowLabel}>Productos por página</Text>
        <View style={styles.segmented}>
          {([5, 10, 20] as const).map((n) => (
            <Pressable
              key={n}
              style={[styles.segment, itemsPerPage === n && styles.segmentActive]}
              onPress={() => setItemsPerPage(n)}
            >
              <Text style={[styles.segmentText, itemsPerPage === n && styles.segmentTextActive]}>
                {n}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Text style={[styles.sectionTitle, { marginTop: SPACING.xl }]}>
        Datos sensibles (SecureStore)
      </Text>
      <Text style={styles.sectionHint}>
        Se muestra enmascarado — nunca el valor completo.
      </Text>

      {maskedValue && (
        <View style={styles.maskedContainer}>
          <Text style={styles.rowLabel}>PIN leído:</Text>
          <Text style={styles.maskedValue}>{maskedValue}</Text>
        </View>
      )}

      <View style={styles.secureActions}>
        <Pressable style={styles.btnSecure} onPress={handleSaveSensitive}>
          <Text style={styles.btnSecureText}>Guardar PIN</Text>
        </Pressable>
        <Pressable style={[styles.btnSecure, styles.btnSecureAlt]} onPress={handleReadSensitive}>
          <Text style={[styles.btnSecureText, { color: COLORS.accent }]}>Leer</Text>
        </Pressable>
        <Pressable style={[styles.btnSecure, styles.btnDanger]} onPress={handleDeleteSensitive}>
          <Text style={[styles.btnSecureText, { color: COLORS.danger }]}>Eliminar</Text>
        </Pressable>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Tip: En una app real guardarías el JWT o PIN en SecureStore, nunca en AsyncStorage.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl, gap: SPACING.sm },
  sectionTitle: { fontSize: 17, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs },
  sectionHint: { ...TYPOGRAPHY.caption, marginBottom: SPACING.md, fontStyle: 'italic' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
  },
  rowColumn: { flexDirection: 'column', alignItems: 'flex-start', gap: SPACING.sm },
  rowInfo: { flex: 1, marginRight: SPACING.md },
  rowLabel: { ...TYPOGRAPHY.body, fontWeight: '600' },
  rowDesc: { ...TYPOGRAPHY.caption, marginTop: 2 },
  segmented: { flexDirection: 'row', gap: SPACING.xs },
  segment: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  segmentActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  segmentText: { ...TYPOGRAPHY.caption },
  segmentTextActive: { color: '#fff', fontWeight: '700' },
  maskedContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  maskedValue: {
    ...TYPOGRAPHY.body,
    fontWeight: '700',
    color: COLORS.accent,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  secureActions: { flexDirection: 'row', gap: SPACING.sm },
  btnSecure: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    alignItems: 'center',
  },
  btnSecureAlt: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  btnDanger: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  btnSecureText: { ...TYPOGRAPHY.caption, fontWeight: '700', color: '#fff' },
  infoBox: {
    backgroundColor: COLORS.surface,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    borderRadius: RADIUS.sm,
    padding: SPACING.md,
    marginTop: SPACING.md,
  },
  infoText: { ...TYPOGRAPHY.caption },
});
