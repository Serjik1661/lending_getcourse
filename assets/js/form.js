(function () {
  "use strict";

  function setFieldError(field, message) {
    const wrapper = field.closest(".field");
    const error = document.getElementById(`${field.id}-error`);
    if (wrapper) wrapper.classList.toggle("is-invalid", Boolean(message));
    if (error) error.textContent = message || "";
  }

  function setLooseError(id, message) {
    const error = document.getElementById(id);
    if (error) error.textContent = message || "";
  }

  function saveDemoLead() {
    // Do not persist personal data in the browser in demo mode.
    return true;
  }

  function initForm() {
    const form = document.getElementById("lead-form");
    if (!form) return;

    const status = document.getElementById("form-status");
    const fields = {
      name: document.getElementById("name"),
      phone: document.getElementById("phone"),
      email: document.getElementById("email"),
      message: document.getElementById("message"),
      privacy: document.getElementById("privacy"),
      terms: document.getElementById("terms-agree")
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let hasError = false;
      if (status) {
        status.textContent = "";
        status.classList.remove("is-error");
      }

      const name = fields.name.value.trim();
      const phone = fields.phone.value.trim();
      const email = fields.email.value.trim();
      const message = fields.message.value.trim();

      setFieldError(fields.name, "");
      setFieldError(fields.phone, "");
      setFieldError(fields.email, "");
      setFieldError(fields.message, "");
      setLooseError("privacy-error", "");
      setLooseError("terms-error", "");

      if (name.length < 2) {
        setFieldError(fields.name, "Укажите имя минимум из 2 символов.");
        hasError = true;
      }

      if (phone.replace(/\D/g, "").length < 10) {
        setFieldError(fields.phone, "Укажите телефон для связи.");
        hasError = true;
      }

      if (!window.CourseSite.isValidEmail(email)) {
        setFieldError(fields.email, "Укажите корректный email.");
        hasError = true;
      }

      if (!fields.privacy.checked) {
        setLooseError("privacy-error", "Нужно согласие с политикой обработки персональных данных.");
        hasError = true;
      }

      if (!fields.terms.checked) {
        setLooseError("terms-error", "Нужно принять пользовательское соглашение и оферту.");
        hasError = true;
      }

      if (hasError) {
        if (status) {
          status.textContent = "Проверьте выделенные поля.";
          status.classList.add("is-error");
        }
        return;
      }

      saveDemoLead({ name, phone, email, message });

      if (status) {
        status.textContent = "Заявка сохранена в demo-режиме. Сейчас откроется страница благодарности.";
      }

      const params = new URLSearchParams({ name });
      window.setTimeout(() => {
        window.location.href = `./thank-you.html?${params.toString()}`;
      }, 550);
    });
  }

  window.CourseSiteForm = { initForm };
})();
