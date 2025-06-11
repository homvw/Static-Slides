let stepIndex = 0;

  function getCurrentSlide() {
    return document.querySelector(location.hash || '#slide1');
  }

  function getSteps(slide) {
    return slide.querySelectorAll('.step');
  }

  function showNextStep(slide) {
    const steps = getSteps(slide);
    if (stepIndex < steps.length) {
      steps[stepIndex].classList.add('visible');
      stepIndex++;
      return true;
    }
    return false;
  }

  function showPreviousStep(slide) {
    const steps = getSteps(slide);
    if (stepIndex > 0) {
      stepIndex--;
      steps[stepIndex].classList.remove('visible');
      return true;
    }
    return false;
  }

  document.addEventListener('keydown', function(event) {
    const slides = Array.from(document.querySelectorAll("section[id^='slide']"));
    let currentId = location.hash || '#slide1';
    let currentIndex = slides.findIndex(slide => '#' + slide.id === currentId);
    let currentSlide = slides[currentIndex];

    if (event.key === 'ArrowRight') {
      if (!showNextStep(currentSlide)) {
        // Schritte sind durch, gehe zur nächsten Folie
        if (currentIndex < slides.length - 1) {
          location.hash = '#' + slides[currentIndex + 1].id;
        }
      }
    }

    if (event.key === 'ArrowLeft') {
      if (!showPreviousStep(currentSlide)) {
        // Keine Schritte mehr übrig, gehe zur vorherigen Folie
        if (currentIndex > 0) {
          const prevSlide = slides[currentIndex - 1];
          const prevSteps = prevSlide.querySelectorAll('.step');

          // Wechsle zur vorherigen Folie
          location.hash = '#' + prevSlide.id;

          // Warten bis Folie sichtbar, dann Steps zeigen und StepIndex setzen
          setTimeout(() => {
            prevSteps.forEach(el => el.classList.add('visible'));
            stepIndex = prevSteps.length;
          }, 20);
        }
      }
    }
  });

  window.addEventListener('load', () => {
    if (!location.hash) {
      location.hash = '#slide1';
    }
  });

  window.addEventListener('hashchange', () => {
    // Schritte zurücksetzen
    const allSteps = document.querySelectorAll('.step');
    allSteps.forEach(el => el.classList.remove('visible'));

    const currentSlide = getCurrentSlide();
    const steps = getSteps(currentSlide);
    stepIndex = 0;
  });