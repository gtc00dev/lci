document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.navbar-menu');
  const openBtn = document.querySelector('.hamburguer-menu');
  const closeBtn = document.querySelector('.sidenav-close');

  if (!menu || !openBtn || !closeBtn) return;

  openBtn.addEventListener('click', () => {
    menu.classList.add('is-open');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('is-open');
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('is-open') &&
        !menu.contains(e.target) &&
        !openBtn.contains(e.target)) {
      menu.classList.remove('is-open');
    }
  });
});