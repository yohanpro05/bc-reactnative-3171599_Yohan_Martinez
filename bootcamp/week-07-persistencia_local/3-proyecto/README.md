# Proyecto Semana 07 — Persistencia Local

## 🎯 Objetivo

Implementar persistencia local en una app React Native usando MMKV (preferencias), AsyncStorage (caché offline) y SecureStore (datos sensibles), aplicados al dominio de **ferretería**.

## 📋 Tu Dominio Asignado

**Dominio**: Ferretería (Product: name, price, stock, sku, category, description, active)

## 🗂️ Estructura del Starter

```
starter/
├── App.tsx                              — QueryClientProvider + NavigationContainer
├── app.json
├── package.json
├── tsconfig.json
└── src/
    ├── navigation/
    │   ├── types.ts                     — RootStackParamList
    │   └── RootNavigator.tsx            — Stack: Home, Create, Settings
    ├── schemas/
    │   └── itemSchema.ts                — z.object + ItemFormData
    ├── storage/
    │   └── mmkv.ts                      — Instancia global de MMKV
    ├── components/
    │   └── FormField.tsx                — Controller + TextInput + error
    ├── screens/
    │   ├── HomeScreen.tsx               — lista con cache offline + banner + preferencias
    │   ├── CreateScreen.tsx             — formulario Create con RHF + Zod
    │   └── SettingsScreen.tsx           — MMKV preferences + SecureStore demo
    ├── hooks/
    │   ├── usePreferences.ts            — MMKV getters/setters síncronos
    │   └── useItems.ts                  — useItems con AsyncStorage cache + useCreateItem
    ├── services/
    │   └── api.ts                       — Axios instance → Express API
    ├── types/
    │   └── index.ts                     — Product, ItemsWithSource, CreateProductPayload
    └── theme/
        └── index.ts
```

## ✅ Requisitos Funcionales

1. **Preferencias con MMKV**: modo compacto, orden de lista (A→Z / Z→A), items por página. Cambios en tiempo real sin botón "Guardar".
2. **Cache offline con AsyncStorage**: `useItems` guarda la respuesta en AsyncStorage. Si la API falla, retorna datos cacheados con `source: 'cache'`.
3. **Banner offline**: cuando `source === 'cache'`, HomeScreen muestra un banner naranja con texto de advertencia.
4. **SecureStore**: guardar/leer/eliminar un PIN con visualización enmascarada (ej: "12••34").
5. **CreateScreen**: formulario con RHF + Zod, categorías en chips, mutation con TanStack Query.
6. **Build nativo**: la app debe correr con `npx expo run:android` (MMKV requiere native).

## 🚀 Cómo ejecutar

```bash
# 1. Iniciar API Express (week-06)
cd ../../bc-expressjs-3171599-Yohan_Martinez/bootcamp/week-06-mongodb_mongoose/3-proyecto/starter
pnpm dev

# 2. Build nativo
cd bc-reactnative-3171599-Yohan_Martinez/bootcamp/week-07-persistencia_local/3-proyecto/starter
pnpm install
npx expo run:android
```

## 📸 Screenshots

| Pantalla | Descripción |
|----------|-------------|
| ![Home](screenshots/01_home.png) | Lista de productos con datos de API |
| ![Settings](screenshots/02_settings.png) | Preferencias MMKV + SecureStore |
| ![Create vacío](screenshots/03_create_empty.png) | Formulario de creación inicial |
| ![Errores validación](screenshots/04_validation_errors.png) | Errores de validación Zod |
| ![Formulario lleno](screenshots/05_filled_form.png) | Formulario con datos completos |
| ![Offline cache](screenshots/06_offline_cache.png) | Banner de caché offline |

## 📊 Criterios de Evaluación

Ver [../../rubrica-evaluacion.md](../../rubrica-evaluacion.md)
