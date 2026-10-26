// Menu mobile
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Année du pied de page
document.getElementById('year').textContent = new Date().getFullYear();

// Formulaire de contact
// Pour l'instant, la validation se fait côté navigateur uniquement.
// Pour recevoir réellement les messages, brancher le formulaire sur un service
// (ex. Formspree, Netlify Forms) — voir le README.
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;

  form.querySelectorAll('[required]').forEach((field) => {
    const ok = field.value.trim() !== '' && field.checkValidity();
    field.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  });

  if (!valid) {
    status.textContent = 'Merci de remplir correctement les champs obligatoires.';
    status.className = 'form-status error';
    return;
  }

  status.textContent = 'Merci ! Votre message a bien été pris en compte.';
  status.className = 'form-status success';
  form.reset();
});
