# Deployment

## Что заливать

- HTML-файлы публичных страниц.
- `assets/`.
- `404.html`, `offline.html`, `sw.js`.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicon.
- `serve_local.py` можно не заливать на продакшен; это только локальный сервер для проверки URL без `.html`.

## Что не заливать

- `docs/archive/`.
- Локальные backup/temp/test/debug-файлы.
- `.git`, `.env`, секреты, дампы, базы данных.
- `serve_local.py`, если на VPS уже настроен Nginx.
- README и docs, если публичная папка сайта должна содержать только файлы сайта.

## Перед деплоем

- Заменить `#getcourse-link-required` на рабочую ссылку GetCourse или оставить явный текст ожидания ссылки.
- Проверить юридические документы и TODO.
- Проверить robots/sitemap.
- Проверить, что `offer.html`, `refund.html`, `thank-you.html` не индексируются, если не утверждены.
- Увеличить версию `CACHE_NAME` в `sw.js`, если менялись файлы, которые кэширует service worker.
- На VPS настроить `error_page 404 /404.html;` в Nginx. Сейчас сервер не трогался.

## После деплоя

- Открыть главную, контакты, privacy, terms, medical-disclaimer.
- Проверить отсутствие 404 на CSS/JS/images.
- Очистить localStorage и проверить cookie-баннер.
- Проверить `cookieConsent = accepted` и `cookieConsent = necessary`.
- Проверить, что карта не грузится до согласия и грузится после «Показать карту».
- Проверить GetCourse-ссылку.
- Проверить `/test-404-random-page`: должен быть статус 404 и страница `404.html`.
- Проверить service worker и offline fallback в DevTools.

## Проверка VPS перед публикацией

1. Убедиться, что в публичной папке сайта нет `.git`.
2. Убедиться, что нет `.env`.
3. Убедиться, что нет `backup`, `archive`, `temp`.
4. Убедиться, что нет `logs`.
5. Убедиться, что нет файлов с паролями/ключами.
6. Проверить, что Nginx не отдаёт скрытые файлы.
7. Проверить, что 404 настроен на `/404.html`.
8. Проверить, что HTTPS работает.
9. Проверить, что HTTP редиректит на HTTPS.
10. Проверить security headers: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options` или `frame-ancestors`, `Referrer-Policy`, `Permissions-Policy`.
11. Проверить, что директории не листятся.
12. Проверить права файлов.
13. Проверить, что нет открытых служебных портов.
14. Проверить, что SSH доступ ограничен.
15. Проверить, что root-пароль не передаётся в переписках и скриншотах.
