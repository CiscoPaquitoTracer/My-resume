document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scroll para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efecto de scroll en el navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Función para manejar el envío del formulario
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validación de campos
    if (!validateForm(nombre, email, mensaje)) {
        return;
    }
    
    // Deshabilitar el botón de envío
    const submitButton = form.querySelector('.btn-submit');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // OPCIÓN 1: Usando EmailJS (recomendado)
    // Primero registrate en https://www.emailjs.com/ (gratis)
    // Luego agrega esto en tu HTML antes de </body>:
    // <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
    
    // Configura tus credenciales de EmailJS aquí:
    const SERVICE_ID = 'TU_SERVICE_ID'; // ⚠️ Cámbialo por tu Service ID
    const TEMPLATE_ID = 'TU_TEMPLATE_ID'; // ⚠️ Cámbialo por tu Template ID
    const PUBLIC_KEY = 'TU_PUBLIC_KEY'; // ⚠️ Cámbialo por tu Public Key
    
    // Inicializar EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(PUBLIC_KEY);
        
        // Preparar los parámetros del email
        const templateParams = {
            from_name: nombre,
            from_email: email,
            message: mensaje,
            to_email: 'fcereth@gmail.com'
        };
        
        // Enviar el email
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(() => {
                // Éxito
                showMessage('success', '¡Mensaje enviado con éxito! Te responderé pronto.');
                form.reset();
            })
            .catch((error) => {
                // Error
                console.error('Error:', error);
                showMessage('error', 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            })
            .finally(() => {
                // Restaurar botón
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
                
                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    hideMessage();
                }, 5000);
            });
    } else {
        // Si EmailJS no está cargado, usar alternativa
        showMessage('error', 'El servicio de email no está configurado. Por favor, contacta a través de: fcereth@gmail.com');
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

// Función para validar el formulario
function validateForm(nombre, email, mensaje) {
    // Remover mensajes anteriores
    hideMessage();
    
    // Validar nombre
    if (nombre.length < 2) {
        showMessage('error', 'Por favor, ingresa un nombre válido (mínimo 2 caracteres).');
        return false;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('error', 'Por favor, ingresa un correo electrónico válido.');
        return false;
    }
    
    // Validar mensaje
    if (mensaje.length < 10) {
        showMessage('error', 'Por favor, ingresa un mensaje con al menos 10 caracteres.');
        return false;
    }
    
    return true;
}

// Función para mostrar mensajes
function showMessage(type, text) {
    // Remover mensaje anterior si existe
    hideMessage();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${text}</span>
    `;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(messageDiv, form.firstChild);
    
    // Animación de entrada
    setTimeout(() => {
        messageDiv.classList.add('show');
    }, 10);
}

// Función para ocultar mensajes
function hideMessage() {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.classList.remove('show');
        setTimeout(() => {
            existingMessage.remove();
        }, 300);
    }
}