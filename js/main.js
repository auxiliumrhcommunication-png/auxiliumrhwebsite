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

// Formulaire de contact (page Contact uniquement)
// Le site n'a pas de serveur : le formulaire ouvre la messagerie du visiteur
// avec un e-mail pré-rempli adressé au cabinet.
const form = document.getElementById('contact-form');

if (form) {
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

    const data = new FormData(form);
    const nom = data.get('nom').trim();
    const entreprise = data.get('entreprise').trim();
    const subject = `Demande de contact — ${nom}${entreprise ? ` (${entreprise})` : ''}`;
    const body = [
      data.get('message').trim(),
      '',
      '—',
      `Nom : ${nom}`,
      `E-mail : ${data.get('email').trim()}`,
      entreprise ? `Entreprise : ${entreprise}` : null,
    ].filter((line) => line !== null).join('\n');

    const recipient = form.dataset.recipient;
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    status.textContent = `Votre messagerie devrait s'ouvrir avec votre message. Il ne reste qu'à cliquer sur « Envoyer ». Si rien ne s'ouvre, écrivez-nous directement à ${recipient}.`;
    status.className = 'form-status success';
  });
}
