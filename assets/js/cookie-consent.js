(function () {
  "use strict";

  const CONSENT_KEY = "cookieConsent";
  const ACCEPTED = "accepted";
  const NECESSARY = "necessary";
  const MAP_EVENT = "cookieConsent:accepted";
  const PRIVACY_URL = "/privacy";

  function getConsent() {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch (error) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      window.localStorage.setItem(CONSENT_KEY, value);
    } catch (error) {
      return;
    }
  }

  function dispatchAccepted() {
    document.dispatchEvent(new CustomEvent(MAP_EVENT));
  }

  function hideBanner() {
    const banner = document.querySelector(".cookie-banner");
    if (banner) banner.hidden = true;
  }

  function acceptAll() {
    setConsent(ACCEPTED);
    hideBanner();
    dispatchAccepted();
  }

  function acceptNecessary() {
    setConsent(NECESSARY);
    hideBanner();
  }

  function createButton(text, className, ariaLabel, onClick) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.setAttribute("aria-label", ariaLabel);
    button.addEventListener("click", onClick);
    return button;
  }

  function initCookieBanner() {
    if (getConsent()) return;

    const banner = document.createElement("section");
    banner.className = "cookie-banner";
    banner.setAttribute("aria-label", "Уведомление об использовании cookie");

    const content = document.createElement("div");
    content.className = "cookie-banner__content";

    const text = document.createElement("p");
    text.className = "cookie-banner__text";
    text.append("Мы используем необходимые cookie для работы сайта. Также на сайте могут использоваться внешние сервисы, например Яндекс.Карты, которые могут обрабатывать технические данные пользователя. Нажимая «Принять», вы соглашаетесь с использованием cookie и внешних сервисов в соответствии с ");

    const privacyLink = document.createElement("a");
    privacyLink.className = "cookie-banner__text-link";
    privacyLink.href = PRIVACY_URL;
    privacyLink.textContent = "Политикой конфиденциальности";
    privacyLink.setAttribute("aria-label", "Открыть Политику конфиденциальности");

    text.append(privacyLink, ".");

    const actions = document.createElement("div");
    actions.className = "cookie-banner__actions";

    const acceptButton = createButton(
      "Принять",
      "cookie-banner__button cookie-banner__button--primary",
      "Принять cookie и разрешить внешние сервисы",
      acceptAll
    );

    const necessaryButton = createButton(
      "Только необходимые",
      "cookie-banner__button cookie-banner__button--secondary",
      "Использовать только необходимые cookie",
      acceptNecessary
    );

    const detailsLink = document.createElement("a");
    detailsLink.className = "cookie-banner__link";
    detailsLink.href = PRIVACY_URL;
    detailsLink.textContent = "Подробнее";
    detailsLink.setAttribute("aria-label", "Подробнее о cookie в Политике конфиденциальности");

    actions.append(acceptButton, necessaryButton, detailsLink);
    content.append(text, actions);
    banner.append(content);
    document.body.append(banner);
  }

  function buildMapFrame(holder) {
    const src = holder.dataset.mapSrc;
    if (!src || holder.querySelector("iframe")) return;

    holder.textContent = "";

    const embed = document.createElement("div");
    embed.className = "contact-map-embed";

    const frame = document.createElement("iframe");
    frame.className = "contact-map-frame";
    frame.src = src;
    frame.width = "100%";
    frame.height = "400";
    frame.frameBorder = "0";
    frame.allowFullscreen = true;
    frame.loading = "lazy";
    frame.title = holder.dataset.mapTitle || "Карта Яндекс";

    embed.append(frame);
    holder.append(embed);
  }

  function initYandexMaps() {
    const maps = Array.from(document.querySelectorAll("[data-yandex-map]"));
    if (!maps.length) return;

    const loadAcceptedMaps = () => {
      maps.forEach(buildMapFrame);
    };

    if (getConsent() === ACCEPTED) {
      loadAcceptedMaps();
      return;
    }

    maps.forEach((holder) => {
      const showButton = holder.querySelector("[data-map-show]");
      const openButton = holder.querySelector("[data-map-open]");
      const openUrl = holder.dataset.mapOpenUrl;

      if (showButton) {
        showButton.addEventListener("click", () => {
          setConsent(ACCEPTED);
          hideBanner();
          loadAcceptedMaps();
        });
      }

      if (openButton && openUrl) {
        openButton.addEventListener("click", () => {
          window.open(openUrl, "_blank", "noopener,noreferrer");
        });
      }
    });

    document.addEventListener(MAP_EVENT, loadAcceptedMaps);
  }

  document.addEventListener("DOMContentLoaded", () => {
    initYandexMaps();
    initCookieBanner();
  });
})();
