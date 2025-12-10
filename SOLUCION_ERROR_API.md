# Solución para el Error de API: "Unexpected token '<'"

## Problema Identificado

El error `SyntaxError: Unexpected token '<', "<?php head"... is not valid JSON` indica que el servidor está devolviendo código PHP en lugar de JSON. Esto sucede cuando:

1. **PHP no está configurado correctamente** en el servidor
2. **El archivo PHP tiene errores** que generan HTML de error
3. **La ruta del archivo es incorrecta**
4. **Problemas de permisos** en el servidor

## Archivos de Diagnóstico Creados

### 1. `api/test_simple.php`
- Prueba básica para verificar si PHP funciona
- URL: `http://localhost/Hackdash-aiweekend/api/test_simple.php`

### 2. `api/test_api.php`
- Diagnóstico completo del servidor y base de datos
- URL: `http://localhost/Hackdash-aiweekend/api/test_api.php`

## Pasos para Diagnosticar

### Paso 1: Verificar si PHP funciona
1. Abre tu navegador
2. Ve a: `http://localhost/Hackdash-aiweekend/api/test_simple.php`
3. Deberías ver JSON como:
```json
{
    "success": true,
    "message": "PHP está funcionando correctamente",
    "timestamp": "2025-01-XX XX:XX:XX"
}
```

### Paso 2: Diagnóstico completo
1. Ve a: `http://localhost/Hackdash-aiweekend/api/test_api.php`
2. Revisa la respuesta para identificar problemas específicos

### Paso 3: Verificar la configuración del servidor
1. Asegúrate de que XAMPP esté ejecutándose
2. Verifica que Apache y MySQL estén activos
3. Confirma que el proyecto esté en la carpeta correcta: `C:\xampp\htdocs\Hackdash-aiweekend`

## Posibles Soluciones

### Solución 1: Verificar XAMPP
```bash
# 1. Abrir XAMPP Control Panel
# 2. Detener Apache y MySQL
# 3. Iniciar Apache y MySQL nuevamente
# 4. Verificar que ambos estén en verde
```

### Solución 2: Verificar la base de datos
1. Abrir phpMyAdmin: `http://localhost/phpmyadmin`
2. Crear base de datos `hackdash` si no existe
3. Importar el archivo `create_project_tables.sql`

### Solución 3: Verificar permisos de archivos
```bash
# En Windows, asegúrate de que los archivos PHP sean legibles
# Los archivos .php deben tener permisos de lectura
```

### Solución 4: Verificar configuración de PHP
1. Crear archivo `api/phpinfo.php`:
```php
<?php phpinfo(); ?>
```
2. Acceder a: `http://localhost/Hackdash-aiweekend/api/phpinfo.php`
3. Verificar que PDO esté habilitado

## Mejoras Implementadas

### 1. Mejorado `get_dashboards.php`
- Deshabilitado `display_errors` para evitar HTML de error
- Agregado manejo de errores más robusto
- Headers configurados antes de cualquier salida

### 2. Mejorado `dashboard-crud.js`
- Mejor logging para debug
- Manejo separado de respuesta de texto y JSON
- Información detallada de errores

## Comandos de Verificación

### Verificar si el servidor responde:
```bash
curl http://localhost/Hackdash-aiweekend/api/test_simple.php
```

### Verificar la base de datos:
```sql
-- En phpMyAdmin o MySQL CLI
SHOW DATABASES;
USE hackdash;
SHOW TABLES;
```

## Debug en el Navegador

1. Abrir herramientas de desarrollador (F12)
2. Ir a la pestaña "Console"
3. Navegar a `blank.html`
4. Revisar los mensajes de error detallados

## Archivos Modificados

- `api/get_dashboards.php` - Mejorado manejo de errores
- `frontend/js/dashboard-crud.js` - Mejor logging y debug
- `api/test_simple.php` - Archivo de prueba básico (nuevo)
- `api/test_api.php` - Diagnóstico completo (nuevo)

## Nota Importante

Si sigues viendo código PHP en lugar de JSON, el problema está en la configuración del servidor web. Asegúrate de que:

1. **XAMPP esté ejecutándose correctamente**
2. **Los archivos estén en la carpeta correcta**
3. **La base de datos exista y tenga las tablas necesarias**
4. **PHP esté configurado para procesar archivos .php** 