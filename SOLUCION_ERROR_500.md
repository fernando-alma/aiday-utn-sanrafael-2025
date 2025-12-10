# 🔧 Solución para Error 500 - Dashboard

## 🚨 **Problema identificado:**
Error 500 (Internal Server Error) al cargar los dashboards. Esto indica un problema en el servidor PHP.

## 🔍 **Diagnóstico paso a paso:**

### 1. **Probar la conexión a la base de datos**
Ve a: `http://localhost/Hackdash-aiweekend/api/test_db.php`

Esto te mostrará:
- ✅ Si la conexión funciona
- ✅ Qué tablas existen
- ✅ Si hay datos en las tablas
- ❌ Qué errores específicos hay

### 2. **Verificar la API directamente**
Ve a: `http://localhost/Hackdash-aiweekend/api/get_dashboards.php`

Ahora debería mostrar un mensaje más específico sobre el error.

## 🛠️ **Soluciones posibles:**

### **Opción A: Las tablas no existen**
Si el test_db.php muestra que las tablas no existen:

1. Ve a phpMyAdmin: `http://localhost/phpmyadmin`
2. Selecciona la base de datos `hackdash` (o créala si no existe)
3. Ejecuta el contenido del archivo `create_tables.sql`

### **Opción B: Problema de conexión**
Si hay error de conexión:

1. Verifica que MySQL esté corriendo en XAMPP
2. Verifica que el usuario `root` no tenga contraseña
3. Verifica que la base de datos `hackdash` exista

### **Opción C: Problema de permisos**
Si hay error de permisos:

1. Verifica que Apache tenga permisos para leer los archivos PHP
2. Verifica que el archivo `db.php` exista en la carpeta `api/`

## 📋 **Pasos para solucionar:**

### **Paso 1: Ejecutar el script SQL**
```sql
-- Copia y pega esto en phpMyAdmin
CREATE DATABASE IF NOT EXISTS hackdash CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE hackdash;

-- Tabla de dashboards
CREATE TABLE IF NOT EXISTS dashboards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dashboard_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (dashboard_id) REFERENCES dashboards(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO dashboards (slug, title, description) VALUES
('desarrollo-web', 'Desarrollo Web', 'Proyectos de desarrollo y diseño web para clientes'),
('marketing-digital', 'Marketing Digital', 'Campañas de marketing digital y redes sociales'),
('aplicaciones-moviles', 'Aplicaciones Móviles', 'Desarrollo de aplicaciones móviles nativas y híbridas');

-- Insertar proyectos de ejemplo
INSERT INTO projects (dashboard_id, title, description) VALUES
(1, 'E-commerce React', 'Desarrollo de tienda online con React y Node.js'),
(1, 'Portfolio Personal', 'Sitio web personal con HTML, CSS y JavaScript'),
(2, 'Campaña Instagram', 'Campaña publicitaria en Instagram para nueva marca');
```

### **Paso 2: Verificar la conexión**
Ve a: `http://localhost/Hackdash-aiweekend/api/test_db.php`

### **Paso 3: Probar la API**
Ve a: `http://localhost/Hackdash-aiweekend/api/get_dashboards.php`

### **Paso 4: Probar la aplicación**
Ve a: `http://localhost/Hackdash-aiweekend/frontend/blank.html`

## 🎯 **Resultado esperado:**

Después de ejecutar el script SQL, deberías ver:
- ✅ test_db.php muestra conexión exitosa
- ✅ get_dashboards.php devuelve JSON con datos
- ✅ blank.html muestra los dashboards correctamente

## 🆘 **Si el problema persiste:**

1. **Revisa los logs de error** de Apache en XAMPP
2. **Verifica que PHP esté habilitado** en XAMPP
3. **Asegúrate de acceder desde** `http://localhost` y no `file://`
4. **Verifica que estés logueado** antes de acceder a la aplicación

¡Una vez que ejecutes el script SQL, el error 500 debería desaparecer! 🚀 