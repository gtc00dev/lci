document.addEventListener("DOMContentLoaded", () => {
  const STORAGE_KEY = "eventosData";
  const eventos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");

  const modalEl = document.getElementById("modalEvento");
  if (!modalEl) return;

  const modal = new bootstrap.Modal(modalEl);

  const modalTitle = document.getElementById("modalEventoLabel");
  const modalDescripcion = document.getElementById("modalEventoDescripcion");
  const modalHorario = document.getElementById("modalEventoHorario");
  const modalUbicacion = document.getElementById("modalEventoUbicacion");

  let map = null;
  let marker = null;

  document.querySelectorAll("[data-evento]").forEach(button => {
    button.addEventListener("click", () => {
      const eventoKey = button.getAttribute("data-evento");
      const evento = eventos[eventoKey];

      if (!evento) {
        console.warn("Evento no encontrado:", eventoKey);
        return;
      }

      modalTitle.textContent = evento.titulo;
      modalDescripcion.textContent = evento.descripcion;
      modalHorario.textContent = evento.horario;
      modalUbicacion.textContent = evento.ubicacion;

      modal.show();

      modalEl.addEventListener(
        "shown.bs.modal",
        () => {
          if (!map) {
            map = L.map("mapEvento").setView([evento.lat, evento.lng], 15);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "&copy; OpenStreetMap contributors"
            }).addTo(map);

            marker = L.marker([evento.lat, evento.lng]).addTo(map);
          } else {
            map.setView([evento.lat, evento.lng], 15);
            marker.setLatLng([evento.lat, evento.lng]);
          }

          setTimeout(() => {
            map.invalidateSize();
          }, 200);
        },
        { once: true }
      );
    });
  });
});