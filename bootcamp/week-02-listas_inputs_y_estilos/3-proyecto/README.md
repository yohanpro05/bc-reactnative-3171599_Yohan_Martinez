# App de Ferretería — Proyecto de Bootcamp

## Descripción del Dominio
Esta aplicación está diseñada para el dominio de **Ferretería**. Permite a los usuarios navegar por un catálogo de herramientas y materiales de construcción, ofreciendo un filtrado en tiempo real para encontrar productos específicos como equipos eléctricos, herramientas de medición y artículos para el hogar.

## Decisiones de Diseño
- **Tema Oscuro:** Se eligió una estética oscura utilizando las constantes `COLORS.background` y `COLORS.surface` para dar un aspecto profesional y técnico, acorde al tipo de productos[cite: 1].
- **Rendimiento:** Se implementó la lógica de filtrado con `useMemo` para asegurar que las búsquedas sean fluidas y no afecten el rendimiento de la app[cite: 1].
- **Experiencia de Usuario:** Se utilizaron tarjetas (`ItemCard`) claras con insignias de categoría para que el usuario identifique rápidamente el tipo de herramienta[cite: 1].

## Características Técnicas
- **Búsqueda en tiempo real:** Filtra los productos por nombre mientras el usuario escribe en el `TextInput`[cite: 1].
- **Estado Vacío Personalizado:** Guía al usuario con un mensaje amigable cuando no hay coincidencias en la búsqueda[cite: 1].
- **Layout Adaptable:** Configurado con `KeyboardAvoidingView` y `Flexbox` para que funcione correctamente tanto en la Web como en dispositivos móviles (Expo Go)[cite: 1].

## Capturas de Pantalla
| Vista del Catálogo | Búsqueda Filtrada | Sin Resultados |
| :---: | :---: | :---: |
| ![Catálogo](./assets/ss_general.png) | ![Filtro](./assets/ss_filtro.png) | ![Vacío](./assets/ss_empty.png) |