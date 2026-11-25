# Proyecto de Clase: Portafolio Web Personal (HTML, CSS y JS Puro)

Este documento define la **arquitectura oficial, reglas técnicas y guía de construcción** del proyecto de Portafolio Web Personal.

---

## 1. Objetivo del Proyecto

Desarrollar un sitio web personal de **5 páginas independientes** que compartan una misma identidad visual (encabezado, menú de navegación, paleta de colores, tipografía y pie de página), utilizando únicamente tecnologías web nativas.

---

## 2. Reglas Técnicas Estrictas (Restricciones)

1. **Solo tecnologías nativas**: Únicamente **HTML5**, **CSS3** y **JavaScript puro (Vanilla JS)**.
2. **Sin frameworks ni librerías**: No usar Bootstrap, Tailwind, React, Vue, jQuery ni plantillas externas.
3. **Sin backend**: Toda la funcionalidad debe ejecutarse en el navegador del cliente.
4. **Sitio Multipágina (MPA)**: Cada sección principal es un archivo `.html` independiente.
5. **Convención de idioma**:
   * **Nombres de archivos, carpetas, IDs y clases CSS**: en **inglés** (`index.html`, `about.html`, `.nav-menu`, `.project-card`).
   * **Contenido visible para el visitante y comentarios del código**: en **español**.

---

## 3. Arquitectura de Carpetas y Archivos

```text
Proyecto-JavaScript/
│
├── README.md               # Especificación y guía del proyecto
├── index.html              # Página 1: Inicio (Presentación y resumen)
├── about.html              # Página 2: Sobre mí (Biografía, trayectoria y CV)
├── skills.html             # Página 3: Habilidades (Técnicas, herramientas y blandas)
├── projects.html           # Página 4: Proyectos (Galería de tarjetas de proyectos)
├── contact.html            # Página 5: Contacto (WhatsApp, LinkedIn, Correo y formulario)
│
├── css/
│   ├── global.css          # Variables (:root), reset, botones, header, nav y footer
│   └── pages.css           # Estilos específicos del contenido (<main>) de cada página
│
├── js/
│   ├── main.js             # Lógica global (menú móvil, enlace activo y año del footer)
│   └── contact.js          # Lógica de contacto (copiar correo, validar form, enviar a WhatsApp/mailto)
│
└── assets/
    ├── img/                # Foto de perfil e imágenes de proyectos
    └── docs/               # Currículum Vitae en PDF para descarga
```

---

## 4. Personalización Rápida

1. **Textos e información personal**: Edita los nombres, descripción, trayectoria, habilidades y proyectos directamente en los archivos `.html`.
2. **Colores y tipografía**: Modifica las variables en `:root` dentro de `css/global.css`.
3. **Datos de contacto**: Actualiza el correo y número de WhatsApp en `contact.html` y en las constantes `CONTACT_EMAIL` y `WHATSAPP_NUMBER` al inicio de `js/contact.js`.
4. **Imágenes y CV**: Reemplaza los archivos en `assets/img/` y `assets/docs/cv.pdf` por tus propios recursos.
