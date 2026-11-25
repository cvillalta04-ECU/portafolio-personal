/* ==========================================================================
   js/main.js
   Lógica global compartida en todas las páginas del portafolio:
   1. Menú hamburguesa en dispositivos móviles.
   2. Resaltado automático del enlace activo según la URL actual.
   3. Año dinámico en el pie de página.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------------------------------------------------
     1. Menú móvil: alternar la clase .open en #nav-menu
     ---------------------------------------------------------------------- */
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Cerrar el menú automáticamente al seleccionar una página en móvil
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ----------------------------------------------------------------------
     2. Enlace activo: leer window.location.pathname y asignar .active
     ---------------------------------------------------------------------- */
  const rawPath = window.location.pathname;
  const currentPage = rawPath.split("/").pop() || "index.html";
  const allNavLinks = document.querySelectorAll(".nav-link");

  allNavLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });

  /* ----------------------------------------------------------------------
     3. Año dinámico en el footer
     ---------------------------------------------------------------------- */
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = String(new Date().getFullYear());
  }
});
