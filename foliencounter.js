  const slides = Array.from(document.querySelectorAll("section"));
  const infoBox = document.getElementById("slide-info");

  function updateSlideNumber() {
    const hash = location.hash || "#slide1";
    const index = slides.findIndex(s => "#" + s.id === hash);
    if (index >= 0) {
      infoBox.textContent = `Folie ${index + 1} / ${slides.length}`;
    }
  }

  window.addEventListener("hashchange", updateSlideNumber);
  window.addEventListener("load", updateSlideNumber);


