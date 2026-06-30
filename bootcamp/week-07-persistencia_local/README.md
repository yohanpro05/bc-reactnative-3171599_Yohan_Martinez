# Semana 07 — Persistencia Local

> **Fase 2 — Core RN** | Semana 7 de 18 | ⏱️ 8 horas

## 🎯 Objetivos de aprendizaje

Al finalizar esta semana, el estudiante será capaz de:

- Almacenar preferencias del usuario con **MMKV** (lectura/escritura síncrona)
- Cachear datos de API localmente con **AsyncStorage** para modo offline
- Guardar y recuperar datos sensibles con **SecureStore**
- Mostrar data offline con un banner visual indicando la fuente (caché vs red)
- Implementar switches de configuración en tiempo real (modo compacto, orden, paginación)

## 📚 Requisitos previos

- Semana 05 completada — TanStack Query + retry + staleTime
- Semana 06 completada — React Hook Form + Zod
- Build nativo (`npx expo run:android`) — MMKV no funciona en Expo Go

## 🗂️ Estructura de la semana

| Carpeta | Contenido | Tiempo |
|---------|-----------|--------|
| `1-teoria/` | MMKV, AsyncStorage, SecureStore | 2h |
| `2-practicas/` | 2 ejercicios guiados | 3h |
| `3-proyecto/` | Proyecto integrador | 3h |

## 📝 Contenidos

### Teoría

| Archivo | Tema |
|---------|------|
| [01-mmkv.md](1-teoria/01-mmkv.md) | MMKV — almacenamiento síncrono tipo KV |
| [02-asyncstorage.md](1-teoria/02-asyncstorage.md) | AsyncStorage — caché asíncrona para datos de API |
| [03-securestore.md](1-teoria/03-securestore.md) | SecureStore — datos sensibles con encriptación |

### Prácticas

| Ejercicio | Tema |
|-----------|------|
| [ejercicio-01-mmkv](2-practicas/ejercicio-01-mmkv/README.md) | Preferencias con MMKV en tiempo real |
| [ejercicio-02-asyncstorage-cache](2-practicas/ejercicio-02-asyncstorage-cache/README.md) | Cache offline + banner de fuente |

### Proyecto

[3-proyecto/README.md](3-proyecto/README.md) — App con persistencia local, modo offline y datos sensibles

## ⏱️ Distribución del tiempo (8 horas)

| Actividad | Tiempo | Descripción |
|-----------|--------|-------------|
| Teoría 01 | 1h | MMKV — síncrono, rápido, sin serialización |
| Teoría 02 | 1h | AsyncStorage — caché de queries |
| Teoría 03 | 30m | SecureStore — tokens y PINs |
| Ejercicio 01 | 1.5h | Preferencias en tiempo real |
| Ejercicio 02 | 1.5h | Cache offline + banner |
| Proyecto | 2.5h | App completa con persistencia |

## 📌 Entregables

- [ ] Ejercicio 01: preferencias con MMKV en tiempo real
- [ ] Ejercicio 02: caché offline con AsyncStorage y banner
- [ ] Proyecto: app con MMKV, AsyncStorage cache y SecureStore
- [ ] App corriendo en build nativo Android

## 🔗 Navegación

[← Semana 06 — Formularios y Validación](../week-06-formularios_validacion/README.md) | [Semana 08 — Gestión de Estado Global →](../week-08-estado_global/README.md)
