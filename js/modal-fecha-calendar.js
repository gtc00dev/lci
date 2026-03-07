document.addEventListener("DOMContentLoaded", () => {
  let calendar;
  let fechaSeleccionada = null;

  const modalFecha = document.getElementById("modalFecha");
  const btnConfirmarFecha = document.getElementById("btnConfirmarFecha");
  const btnFechaTrigger = document.querySelector(".modal-fecha .modal-text");
  const calendarContainer = document.getElementById("calendarFecha");

  if (!modalFecha || !btnConfirmarFecha || !btnFechaTrigger || !calendarContainer) return;

  modalFecha.addEventListener("shown.bs.modal", () => {
    if (calendar) return;

    calendar = flatpickr(calendarContainer, {
      inline: true,
      locale: "es",
      defaultDate: new Date(),
      onChange: ([date]) => {
        fechaSeleccionada = date;
      }
    });
  });

  btnConfirmarFecha.addEventListener("click", () => {
    if (!fechaSeleccionada) {
      alert("Selecciona una fecha");
      return;
    }

    btnFechaTrigger.textContent =
      fechaSeleccionada.toLocaleDateString("es-MX", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
      });

    bootstrap.Modal.getInstance(modalFecha).hide();
  });
});