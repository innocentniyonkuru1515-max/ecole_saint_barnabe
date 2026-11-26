// Menu mobile et petites interactions du site
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const opened = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
    menuButton.textContent = opened ? "✕" : "☰";
  });
}

// Année automatique dans le pied de page
const yearElement = document.getElementById("year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Les formulaires préparent un texte à copier : aucune donnée n'est envoyée à un serveur.
function prepareForm(formId, message) {
  const form = document.getElementById(formId);
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const summary = Array.from(values.entries())
      .map(([key, value]) => `${key} : ${value}`)
      .join("\n");
    const output = `${message}\n\n${summary}`;
    const status = form.querySelector(".form-message");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(output).then(() => {
        status.textContent = "Votre message a été copié. Vous pouvez le transmettre au secrétariat.";
      }).catch(() => {
        status.textContent = "Formulaire vérifié. Copiez les informations affichées ou contactez directement l'école.";
      });
    } else {
      status.textContent = "Formulaire vérifié. Veuillez copier vos informations et les transmettre à l'école.";
    }
  });
}
prepareForm("contactForm", "Message pour l'École Saint Barnabé");
prepareForm("admissionForm", "Pré-demande d'inscription – École Saint Barnabé");
