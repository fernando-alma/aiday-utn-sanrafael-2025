# 🎨 Nueva Funcionalidad: Colores para Dashboards

## Descripción
Se ha agregado la funcionalidad para seleccionar colores al crear nuevos dashboards. Los usuarios ahora pueden elegir entre 8 colores diferentes para personalizar sus dashboards.

## Colores Disponibles
- 🔵 **Azul** (blue) - Color por defecto
- 🟢 **Verde** (green)
- 🟣 **Púrpura** (purple)
- 🔴 **Rojo** (red)
- 🟠 **Naranja** (orange)
- 🟡 **Amarillo** (yellow)
- 🩷 **Rosa** (pink)
- 🔷 **Índigo** (indigo)

## Cambios Realizados

### 1. Base de Datos
- Se agregó la columna `color` a la tabla `dashboards`
- Valor por defecto: `'blue'`
- Se actualizaron los datos de ejemplo con colores

### 2. API
- **`api/create_dashboard.php`**: Ahora acepta y valida el campo `color`
- **`api/get_dashboards.php`**: Incluye el campo `color` en la respuesta

### 3. Frontend
- **Modal de creación**: Agregado selector de colores con 8 opciones
- **Estilos CSS**: Nuevos estilos para las opciones de color
- **JavaScript**: Funcionalidad para seleccionar y cambiar colores
- **Visualización**: Los dashboards muestran el color seleccionado

## Instalación

### Para instalaciones nuevas:
1. Ejecuta el archivo `create_tables.sql` en phpMyAdmin
2. Los dashboards de ejemplo ya incluyen colores

### Para instalaciones existentes:
1. Ejecuta el archivo `add_color_column.sql` en phpMyAdmin
2. Esto agregará la columna `color` y actualizará los dashboards existentes

## Cómo Usar

1. Haz clic en **"+ Crear Dashboard"**
2. Completa el título y descripción
3. Selecciona un color haciendo clic en una de las opciones
4. Haz clic en **"Crear Dashboard"**

El color seleccionado se mostrará como un punto de color junto al título del dashboard en la lista principal.

## Archivos Modificados
- `create_tables.sql` - Estructura de BD actualizada
- `add_color_column.sql` - Script para actualizar BD existente
- `api/create_dashboard.php` - API para crear con color
- `api/get_dashboards.php` - API para obtener con color
- `frontend/blank.html` - UI con selector de colores
- `frontend/js/dashboard-crud.js` - Lógica para mostrar colores

## Validación
- Solo se aceptan colores válidos de la lista predefinida
- Si se envía un color inválido, se usa 'blue' por defecto
- Los colores se validan tanto en frontend como backend