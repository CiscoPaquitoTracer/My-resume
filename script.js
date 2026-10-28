document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Smooth scroll para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            // Enlaces "#" (como proyectos pendientes) no tienen destino
            if (href === '#') {
                return;
            }
            const target = document.querySelector(href);
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
    
    // Envío con FormSubmit (https://formsubmit.co) en modo AJAX:
    // el mensaje se manda sin salir de la página ni abrir otra pestaña.
    // La primera vez FormSubmit manda un correo de activación a este email.
    const FORM_ENDPOINT = 'https://formsubmit.co/ajax/fcereth@gmail.com';

    fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            email: email,
            mensaje: mensaje,
            _subject: `Contacto desde Portfolio - ${nombre}`,
            _replyto: email,
            _template: 'table',
            _captcha: 'false'
        })
    })
        .then((response) => response.json().then((data) => ({ ok: response.ok, data })))
        .then(({ ok, data }) => {
            if (ok && String(data.success) === 'true') {
                showMessage('success', '¡Mensaje enviado con éxito! Te responderé pronto.');
                form.reset();
            } else {
                throw new Error(data.message || 'Respuesta inválida del servidor');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            showMessage('error', 'Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o escríbeme a fcereth@gmail.com');
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