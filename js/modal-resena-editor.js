document.addEventListener("DOMContentLoaded", () => {
  const editorEl = document.getElementById("editor");

  let quill;
  if (editorEl) {
    quill = new Quill("#editor", {
      theme: "snow",
      placeholder: "Escribe tu reseña…",
      modules: {
        toolbar: [
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link"],
          ["clean"]
        ]
      }
    });
  }

  const btnPublicar = document.getElementById("btnPublicarResena");
  const modalEl = document.getElementById("modalResena");
  const toastEl = document.getElementById("toastResena");

  if (!btnPublicar || !modalEl || !toastEl || !quill) return;

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
  const toastInstance = new bootstrap.Toast(toastEl, {
    delay: 3000
  });

  modalEl.addEventListener("shown.bs.modal", () => {
    if (window.innerWidth <= 576) {
      
      setTimeout(() => {
        quill.focus();
      }, 300);
    }
  });

  btnPublicar.addEventListener("click", () => {
    modalInstance.hide();

    modalEl.addEventListener(
      "hidden.bs.modal",
      () => {
        toastInstance.show();
      },
      { once: true }
    );
  });
});