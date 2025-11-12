# Portfolio Personal - Francisco Cereth Alarcon

Portfolio web personal moderno y responsive que muestra mis proyectos, habilidades e información de contacto como desarrollador de software.

## 🚀 Características

- **Diseño Moderno**: Interfaz limpia y profesional con gradientes y animaciones suaves
- **Totalmente Responsive**: Optimizado para dispositivos móviles, tablets y escritorio
- **Navegación Suave**: Scroll suave entre secciones
- **Formulario de Contacto Funcional**: Sistema de contacto integrado que abre el cliente de correo
- **Galería de Proyectos**: Visualización de proyectos con imágenes y descripciones
- **Sección de Hobbies**: Muestra intereses personales y pasatiempos

## 📋 Secciones

1. **Inicio (Hero)**: Presentación principal con botones de acción
2. **Sobre mí**: Información personal e intereses
3. **Proyectos**: Portfolio de proyectos desarrollados con tecnologías utilizadas
4. **Galería**: Imágenes de los proyectos destacados
5. **Contacto**: Formulario funcional y enlaces a redes sociales

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables CSS, flexbox y grid
- **JavaScript (Vanilla)**: Funcionalidad interactiva sin dependencias
- **Font Awesome**: Iconos vectoriales
- **Google Fonts (Inter)**: Tipografía moderna

## 📁 Estructura del Proyecto

```
My-resume/
├── index.html          # Página principal
├── styles.css          # Estilos del sitio
├── script.js           # Funcionalidad JavaScript
├── IMG/                # Imágenes del proyecto
│   ├── Almacen.png
│   ├── API.png
│   ├── download.png
│   └── lockers.png
└── README.md           # Este archivo
```

## 🎯 Funcionalidad del Formulario de Contacto

El formulario de contacto está completamente funcional y realiza las siguientes acciones:

### Validaciones
- ✅ Nombre: mínimo 2 caracteres
- ✅ Email: formato válido de correo electrónico
- ✅ Mensaje: mínimo 10 caracteres

### Proceso de Envío
1. El usuario completa el formulario
2. Se validan todos los campos
3. Si hay errores, se muestran mensajes informativos
4. Si todo es correcto, se abre el cliente de correo predeterminado con:
   - Asunto prellenado: "Contacto desde Portfolio - [Nombre]"
   - Cuerpo del mensaje con toda la información
   - Email del remitente incluido

### Configuración del Email

Para configurar tu email de contacto, edita el archivo `script.js` en la línea 58:

```javascript
const tuEmail = 'tu-email@gmail.com'; // Cambiar
```

## 🚀 Cómo Usar

1. **Clonar o descargar** el repositorio
2. **Abrir** `index.html` en tu navegador
3. **Configurar** tu email en `script.js` (línea 58)
4. **Personalizar** el contenido según tus necesidades

### Servidor Local (Opcional)

Si quieres ejecutarlo en un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre `http://localhost:8000` en tu navegador.

## 🎨 Personalización

### Colores
Los colores principales están definidos en variables CSS en `styles.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #ec4899;
    /* ... más variables */
}
```

### Contenido
- Edita `index.html` para cambiar textos, proyectos y enlaces
- Actualiza las imágenes en la carpeta `IMG/`
- Modifica los estilos en `styles.css`

## 📱 Responsive Design

El sitio está optimizado para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Escritorio (1024px+)

## 🔗 Enlaces

- **GitHub**: [CiscoPaquitoTracer](https://github.com/CiscoPaquitoTracer)
- **LinkedIn**: [Francisco Cereth Alarcón](https://www.linkedin.com/in/francisco-cereth-alarcon-581795286/)

## 📝 Proyectos Destacados

1. **Sistema Gestor de Almacén Nova** - Java + MySQL
2. **Sistema de Gestión de Lockers** - Kotlin + Android Studio
3. **API para Gestión de Bibliotecas** - Node.js + MySQL
4. **Competitividad Planes y Programas** - Laravel 12 + PHP

## 📄 Licencia

Este proyecto es de uso personal. Todos los derechos reservados.

---

**Desarrollado con ❤️ por Francisco Cereth Alarcon**
