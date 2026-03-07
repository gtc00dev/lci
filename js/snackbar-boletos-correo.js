document.addEventListener("DOMContentLoaded", () => {
  const toastEl = document.getElementById("toastCorreo");
  if (!toastEl) return;

  const toastInstance = new bootstrap.Toast(toastEl, {
    delay: 2000
  });

  setTimeout(() => {
    toastInstance.show();
  }, 3000);
});