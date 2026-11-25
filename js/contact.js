/* ==========================================================================
   js/contact.js
   Lógica exclusiva de contact.html (sin backend):
   1. Copiar el correo electrónico al portapapeles.
   2. Validar los campos del formulario y mostrar mensajes en #form-feedback.
   3. Enviar el mensaje mediante mailto: o mediante enlace directo de WhatsApp.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Datos personales configurables de Carmen Azucena Villalta Gómez
  const CONTACT_EMAIL = "cvillalta04@gmail.com";
  const WHATSAPP_NUMBER = "593994583580"; // Código de país Ecuador (+593) + 994583580

  const copyEmailBtn = document.getElementById("copy-email-btn");
  const contactForm = document.getElementById("contact-form");
  const sendWhatsappBtn = document.getElementById("send-whatsapp-btn");
  const formFeedback = document.getElementById("form-feedback");

  /* ----------------------------------------------------------------------
     1. Botón para copiar correo al portapapeles
     ---------------------------------------------------------------------- */
  if (copyEmailBtn) {
    const labelTarget = copyEmailBtn.querySelector(".btn-label") || copyEmailBtn;
    const originalText = labelTarget.textContent.trim();
    let restoreTimer = null;

    copyEmailBtn.addEventListener("click", async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(CONTACT_EMAIL);
        } else {
          // Respaldo compatible cuando se abre el archivo local (file://)
          const tempInput = document.createElement("textarea");
          tempInput.value = CONTACT_EMAIL;
          tempInput.setAttribute("readonly", "");
          tempInput.style.position = "absolute";
          tempInput.style.left = "-9999px";
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        labelTarget.textContent = "¡Correo copiado!";
        if (restoreTimer) {
          clearTimeout(restoreTimer);
        }
        restoreTimer = setTimeout(() => {
          labelTarget.textContent = originalText;
        }, 2500);
      } catch (error) {
        showFeedback(
          "No se pudo copiar automáticamente. Puedes copiarlo manualmente: " + CONTACT_EMAIL,
          "error"
        );
      }
    });
  }

  /* ----------------------------------------------------------------------
     Funciones auxiliares de validación y retroalimentación visual
     ---------------------------------------------------------------------- */
  function showFeedback(message, type) {
    if (!formFeedback) return;
    formFeedback.textContent = message;
    formFeedback.className = "form-feedback " + type;
  }

  function validateFormData() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      showFeedback("Por favor, completa todos los campos antes de enviar.", "error");
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback("Por favor, ingresa un correo electrónico válido.", "error");
      return null;
    }

    return { name, email, subject, message };
  }

  /* ----------------------------------------------------------------------
     2 y 3A. Envío por correo electrónico (evento submit + mailto:)
     ---------------------------------------------------------------------- */
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = validateFormData();
      if (!data) return;

      const bodyText =
        "Hola, mi nombre es " +
        data.name +
        " (" +
        data.email +
        ").\n\n" +
        data.message;

      const mailtoUrl =
        "mailto:" +
        encodeURIComponent(CONTACT_EMAIL) +
        "?subject=" +
        encodeURIComponent(data.subject) +
        "&body=" +
        encodeURIComponent(bodyText);

      showFeedback("Abriendo tu cliente de correo con el mensaje preparado...", "success");
      window.location.href = mailtoUrl;
    });
  }

  /* ----------------------------------------------------------------------
     2 y 3B. Envío por WhatsApp (#send-whatsapp-btn + wa.me)
     ---------------------------------------------------------------------- */
  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener("click", () => {
      const data = validateFormData();
      if (!data) return;

      const whatsappText =
        "Hola, te escribo desde tu portafolio web.\n" +
        "Nombre: " +
        data.name +
        "\n" +
        "Correo: " +
        data.email +
        "\n" +
        "Asunto: " +
        data.subject +
        "\n" +
        "Mensaje: " +
        data.message;

      const whatsappUrl =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(whatsappText);

      showFeedback("Abriendo WhatsApp en una nueva pestaña...", "success");
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }
});
