<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear proyecto</title>
    <link rel="stylesheet" href="public/css/styles.css">
    <link rel="stylesheet" href="public/css/project-create.css">
</head>
<body>

    <section class="form-section">
        <div class="form-container">
            <h1 class="form-title">Crear proyecto</h1>
            <form class="capitals-form" id="capitalsForm">
                
                <div class="form-group">
                    <label for="group_name">Nombre del Grupo</label>
                    <input type="text" id="group_name" name="group_name" placeholder="Ej: Equipo Alfa" required>
                </div>
                
                <div class="form-group">
                    <label for="title">Título del Proyecto</label>
                    <input type="text" id="title" name="title" placeholder="Ingresa el título del proyecto" required>
                </div>
                
                <div class="form-group">
                    <label for="description">Descripción del Proyecto</label>
                    <textarea id="description" name="description" placeholder="Ingresa la descripción (máx. 1000 caracteres)" rows="5" maxlength="1000" required></textarea>
                </div>
                
              
                <div class="form-group">
                    <label for="image">Imagen de Portada (image - 16:9)</label>
                    <input type="file" id="image" name="image" accept="image/*">
                </div>

                <div class="form-group">
                    <label for="link_video">Link de Video (YouTube)</label>
                    <input type="url" id="link_video" name="link_video" placeholder="Ej: https://youtu.be/..." required>
                </div>

                <div class="form-group">
                    <label for="members_data">Integrantes y LinkedIn</label>
                    <textarea id="members_data" name="members_data" placeholder="Ej: Juan Pérez, https://linkedin.com/in/juanp" rows="3" required></textarea>
                    <small>Introduce los datos de los integrantes. Idealmente en formato JSON o texto estructurado que el backend pueda procesar.</small>
                </div>

                <div class="form-group">
                    <label for="link_deploy">Link del Proyecto Deployado</label>
                    <input type="url" id="link_deploy" name="link_deploy" placeholder="Ej: https://mi-proyecto.vercel.app" required>
                </div>
                
                <div>
                    <button type="button" class="submit-button" id="cancelButton">Cancelar</button>
                    <button type="button" class="submit-button" id="previewButton">Vista previa</button>
                    <button type="submit" class="submit-button">Crear proyecto</button>
                </div>
            </form>
        </div>
    </section>

    <?php require_once("components/nav.php"); ?>
    
    <script src="public/js/project-create.js"></script>
</body>
</html>