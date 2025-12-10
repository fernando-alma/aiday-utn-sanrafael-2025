<<<<<<< HEAD
const API_BASE = 'http://localhost/Hackdash-aiweekend/backend/public/';
const CURRENT_SLUG = "hola";
=======
const API_BASE = "http://localhost/Hackdash-aiweekend/backend/public/";
const CURRENT_SLUG = CONFIG.SLUG;
>>>>>>> origin/Feature/carrousel-logos/2025-12-05


document.addEventListener("DOMContentLoaded", () => {
    const capitalsForm = document.getElementById("capitalsForm");

    if (capitalsForm) {
        capitalsForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(this);
            formData.append('slug', CURRENT_SLUG);
            formData.append('status', 'in_progress');

            // ***************************************************************
            // VALIDACIÓN DE TODOS LOS CAMPOS REQUERIDOS (CRÍTICO)
            // ***************************************************************
            if (!formData.get('title') || 
                !formData.get('description') ||
                !formData.get('group_name') || 
                !formData.get('link_video') || 
                !formData.get('members_data') || 
                !formData.get('link_deploy')) {
                showNotification("Por favor, completa todos los campos requeridos.", 'error');
                return;
            }
            // ***************************************************************

            // Botón de envío
            const submitButton = this.querySelector("[type='submit']");
            const originalText = submitButton.textContent;

            submitButton.textContent = "Enviando...";
            submitButton.disabled = true;

            try {
                const response = await fetch(`${API_BASE}project/create`, {
                    method: 'POST',
                    body: formData
                });
                const data = await response.json();

                if (data.success) {
                    // Obtener ID del proyecto creado desde varias formas de respuesta posibles
                    const projectId = (data && (data.project?.id || data.data?.id || data.id || data.project_id || data.data?.project_id)) || null;

                    // SOLUCIÓN FRONTEND: Almacenar información del creador para tratarlo como owner funcionalmente
                    (async () => {
                        try {
                            if (projectId && typeof window.getUserData === 'function') {
                                const userData = window.getUserData();
                                if (userData && userData.userEmail) {
                                    console.log('🎯 SOLUCIÓN FRONTEND: Almacenando información del creador como owner funcional');
                                    
                                    // Almacenar información del creador en localStorage
                                    const creatorInfo = {
                                        projectId: projectId,
                                        email: userData.userEmail,
                                        name: userData.userName || userData.username || '',
                                        role: 'owner', // Rol funcional
                                        isCreator: true,
                                        createdAt: new Date().toISOString()
                                    };
                                    
                                    // Obtener lista existente de creadores
                                    let creators = JSON.parse(localStorage.getItem('projectCreators') || '[]');
                                    
                                    // Agregar o actualizar información del creador
                                    const existingIndex = creators.findIndex(c => c.projectId === projectId);
                                    if (existingIndex >= 0) {
                                        creators[existingIndex] = creatorInfo;
                                    } else {
                                        creators.push(creatorInfo);
                                    }
                                    
                                    localStorage.setItem('projectCreators', JSON.stringify(creators));
                                    console.log('✅ Información del creador almacenada:', creatorInfo);
                                    
                                    // Agregar al usuario como member (para que aparezca en la lista de miembros)
                                    const joinForm = new FormData();
                                    joinForm.append('project_id', projectId);
                                    joinForm.append('name', userData.userName || userData.username || '');
                                    joinForm.append('email', userData.userEmail);
                                    joinForm.append('role', 'member'); // El backend solo acepta member

                                    try {
                                        const sendReq = await fetch(`${API_BASE}project/sendJoinRequest`, { method: 'POST', body: joinForm });
                                        const sendData = await sendReq.json().catch(() => ({}));
                                        if (sendReq.ok && sendData && sendData.success) {
                                            // Buscar y aprobar la solicitud
                                            const listResp = await fetch(`${API_BASE}project/getJoinRequests?project_id=${projectId}`);
                                            const listData = await listResp.json().catch(() => ({}));
                                            if (listResp.ok && listData && listData.success && Array.isArray(listData.requests)) {
                                                const myReq = listData.requests.find(r => r && (r.email === userData.userEmail));
                                                if (myReq && myReq.id) {
                                                    // Aprobar la solicitud
                                                    const params = new URLSearchParams();
                                                    params.append('request_id', myReq.id);
                                                    const approveResp = await fetch(`${API_BASE}project/approveJoinRequest`, {
                                                        method: 'POST',
                                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                                                        body: params.toString()
                                                    });
                                                    const approveData = await approveResp.json().catch(() => ({}));
                                                    
                                                    if (approveResp.ok && approveData && approveData.success) {
                                                        console.log('✅ Usuario agregado como member (pero funcionalmente será owner)');
                                                        
                                                        // Actualizar membresía local
                                                        if (typeof window.updateProjectMembership === 'function') {
                                                            window.updateProjectMembership(projectId, true);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } catch (error) {
                                        console.log('⚠️ Error al agregar como member, pero el creador ya está registrado funcionalmente');
                                    }
                                }
                            }
                        } catch (error) {
                            console.error('❌ Error en solución frontend:', error);
                        }
                    })();

                    showNotification("¡Proyecto creado exitosamente!", 'success');
                    this.reset();
                    // Redirigir al landing después de crear el proyecto
                    setTimeout(() => {
                        window.location.href = 'index';
                    }, 1500);
                } else {
                    showNotification(data.message || "Error al crear el proyecto.", 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification("Error de conexión. Inténtalo de nuevo.", 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Botón cancelar
    const cancelButton = document.getElementById("cancelButton");
    if (cancelButton) {
        cancelButton.addEventListener("click", () => {
            window.history.back();
        });
    }
    
    // Lógica de Vista Previa
    const previewButton = document.getElementById("previewButton");
    if (previewButton) {
        previewButton.addEventListener("click", () => {
            const groupName = document.getElementById("group_name").value;
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const linkVideo = document.getElementById("link_video")?.value || 'N/A';
            const membersData = document.getElementById("members_data")?.value || 'N/A';
            const linkDeploy = document.getElementById("link_deploy")?.value || 'N/A';
            const pitch = document.getElementById("pitch").files[0]?.name || "Ningún pitch seleccionado";
            const image = document.getElementById("image").files[0]?.name || "Ninguna imagen seleccionada";
      
            if (!title || !description) {
              alert("Por favor, completa título y descripción para vista previa.");
              return;
            }
      
            alert(`Vista previa del proyecto:\n
              Grupo: ${groupName}\n
              Título: ${title}\n
              Descripción: ${description}\n
              Link Video: ${linkVideo}\n
              Integrantes: ${membersData.substring(0, 50)}...\n
              Deploy Link: ${linkDeploy}\n
              Pitch: ${pitch}\n
              Imagen: ${image}`);
        });
    }

    // Función placeholder de Notificación (si no está definida globalmente)
    if (typeof showNotification !== 'function') {
        window.showNotification = function(message, type = 'success') {
            console.log(`[Notificación ${type.toUpperCase()}]: ${message}`);
            // Implementación visual simple si es necesario debuggear el modal de notificaciones
        };
    }
});