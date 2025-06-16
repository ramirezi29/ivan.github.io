""// Apple-style Optimized Script with UX Best Practices

document.addEventListener("DOMContentLoaded", () => {
  // ===========================
  // Navigation Toggle
  // ===========================
  const headerBtn = document.querySelector(".header__button");
  const headerBg = document.querySelector(".header__bg");
  const headerNav = document.querySelector(".header__nav");
  const headerHam = document.querySelector(".header__ham");

  if (headerBtn) {
    headerBtn.addEventListener("click", () => {
      headerBg?.classList.toggle("expand-bg");
      headerNav?.classList.toggle("show-nav");
      headerHam?.classList.toggle("header__ham-close");
    });
  }

  // ===========================
  // Email Reveal Logic
  // ===========================
  document.querySelectorAll(".send-email").forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const email = "iramirez22" + String.fromCharCode(64) + "gmail.com";
      const emailDisplay = document.querySelectorAll(".email-address")[index];
      if (emailDisplay) {
        emailDisplay.textContent = email;
        emailDisplay.style.opacity = "1";
      }
    });
  });

  // ===========================
  // Slider Component
  // ===========================
  document.querySelectorAll(".slider").forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const indicators = slider.querySelector(".slider__indicator");
    const nextBtn = slider.querySelector(".slider__next");
    const prevBtn = slider.querySelector(".slider__prev");
    const container = slider.querySelector(".slider-container");
    let current = 0;

    // Create indicator dots
    slides.forEach(() => {
      indicators?.insertAdjacentHTML(
        "beforeend",
        "<div class='slider__indicator-dot'></div>"
      );
    });
    const dots = slider.querySelectorAll(".slider__indicator-dot");

    const updateSlider = () => {
      const offset = container.clientWidth * current;
      container.style.transform = `translateX(-${offset}px)`;
      container.style.transition = "transform 0.5s ease";
      dots.forEach((dot, i) =>
        dot.classList.toggle("slider__indicator-dot-selected", i === current)
      );
    };

    nextBtn?.addEventListener("click", () => {
      current = (current + 1) % slides.length;
      updateSlider();
    });

    prevBtn?.addEventListener("click", () => {
      current = (current - 1 + slides.length) % slides.length;
      updateSlider();
    });

    // Touch support
    let startX = 0;
    container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener("touchend", (e) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX < -50) current = (current + 1) % slides.length;
      if (deltaX > 50) current = (current - 1 + slides.length) % slides.length;
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);
    updateSlider();
  });

  // ===========================
  // Lazy Load Images
  // ===========================
  const lazyImages = document.querySelectorAll("img[data-src]");
  const lazyLoad = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.onload = () => img.classList.remove("lazy-img");
      observer.unobserve(img);
    });
  };
  const imgObserver = new IntersectionObserver(lazyLoad, {
    rootMargin: "200px",
    threshold: 0.1,
  });
  lazyImages.forEach((img) => imgObserver.observe(img));

  // ===========================
  // Lazy Load Galleries
  // ===========================
  const galleries = document.querySelectorAll(".gallery");
  const loadGalleryImages = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll("img[data-src]").forEach((img) => {
        img.src = img.dataset.src;
        img.onload = () => img.classList.remove("lazy-img");
      });
      observer.unobserve(entry.target);
    });
  };
  const galleryObserver = new IntersectionObserver(loadGalleryImages, {
    rootMargin: "200px",
    threshold: 0.1,
  });
  galleries.forEach((gallery) => galleryObserver.observe(gallery));
});
""
