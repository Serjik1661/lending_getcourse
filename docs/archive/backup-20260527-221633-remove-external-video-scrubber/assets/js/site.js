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

  function formatVideoTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const restSeconds = totalSeconds % 60;
    return `${minutes}:${String(restSeconds).padStart(2, "0")}`;
  }

  function initVideoScrubber() {
    window.CourseSite.qsa("[data-video-scrubber]").forEach((scrubber) => {
      const card = scrubber.closest(".course-video-card");
      const video = card ? card.querySelector(".course-video") : null;
      const range = scrubber.querySelector("[data-video-range]");
      const current = scrubber.querySelector("[data-video-current]");
      const duration = scrubber.querySelector("[data-video-duration]");

      if (!video || !range || !current || !duration) return;

      let isDragging = false;

      const updateDuration = () => {
        const videoDuration = Number.isFinite(video.duration) ? video.duration : 0;
        range.max = videoDuration > 0 ? String(videoDuration) : "100";
        duration.textContent = formatVideoTime(videoDuration);
      };

      const updateProgress = () => {
        if (isDragging) return;
        range.value = String(video.currentTime || 0);
        current.textContent = formatVideoTime(video.currentTime || 0);
      };

      range.addEventListener("input", () => {
        isDragging = true;
        current.textContent = formatVideoTime(Number(range.value));
      });

      range.addEventListener("change", () => {
        video.currentTime = Number(range.value);
        isDragging = false;
        updateProgress();
      });

      range.addEventListener("pointerup", () => {
        video.currentTime = Number(range.value);
        isDragging = false;
      });

      video.addEventListener("loadedmetadata", () => {
        updateDuration();
        updateProgress();
      });
      video.addEventListener("durationchange", updateDuration);
      video.addEventListener("timeupdate", updateProgress);
      video.addEventListener("seeked", updateProgress);

      updateDuration();
      updateProgress();
    });
  }

  function init() {
    if (window.CourseSiteMenu) window.CourseSiteMenu.initMenu();
    if (window.CourseSiteForm) window.CourseSiteForm.initForm();
    initReveal();
    initFaq();
    initButtonRipples();
    initVideoScrubber();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
