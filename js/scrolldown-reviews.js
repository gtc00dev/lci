document.addEventListener("DOMContentLoaded", function () {

  const scrollBtn = document.querySelector(".scrolldown");
  const reviewsSection = document.querySelector(".reviews-grid");

  if (scrollBtn && reviewsSection) {
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();

      reviewsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  }

});