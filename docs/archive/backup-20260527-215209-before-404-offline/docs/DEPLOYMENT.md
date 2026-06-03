# Deployment

## Что заливать

- HTML-файлы публичных страниц.
- `assets/`.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicon.
- `serve_local.py` можно не заливать на продакшен; это только локальный сервер для проверки extensionless URL.

## Что не заливать

- `docs/archive/`.
- Локальные backup/temp/test/debug-файлы.
- `.git`, `.env`, секреты, дампы, базы данных.

## Перед деплоем

- Заменить `#getcourse-link-required` на рабочую ссылку GetCourse или оставить явный текст ожидания ссылки.
- Проверить юридические документы и TODO.
- Проверить robots/sitemap.
- Проверить, что `offer.html`, `refund.html`, `thank-you.html` не индексируются, если не утверждены.

## После деплоя

- Открыть главную, контакты, privacy, terms, medical-disclaimer.
- Проверить отсутствие 404 на CSS/JS/images.
- Очистить localStorage и проверить cookie-баннер.
- Проверить `cookieConsent = accepted` и `cookieConsent = necessary`.
- Проверить, что карта не грузится до согласия и грузится после «Показать карту».
- Проверить GetCourse-ссылку.
