(function () {
  "use strict";

  function initReveal() {
    const items = window.CourseSite.qsa(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
      observer.observe(item);
    });
  }

  function initFaq() {
    const details = window.CourseSite.qsa(".faq-list details");
    details.forEach((item) => {
      const summary = item.querySelector("summary");
      if (!summary) return;

      summary.addEventListener("click", (event) => {
        event.preventDefault();
        const wasOpen = item.open;

        details.forEach((other) => {
          if (other !== item) other.open = false;
        });

        item.open = !wasOpen;
      });
    });
  }

  function initButtonRipples() {
    window.CourseSite.qsa(".button").forEach((button) => {
      button.addEventListener("click", (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "button-ripple";
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        button.appendChild(ripple);
        window.setTimeout(() => ripple.remove(), 700);
      });
    });
  }

  function init() {
    if (window.CourseSiteMenu) window.CourseSiteMenu.initMenu();
    if (window.CourseSiteForm) window.CourseSiteForm.initForm();
    initReveal();
    initFaq();
    initButtonRipples();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
