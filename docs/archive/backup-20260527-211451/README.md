# Propolis Course Landing

Статический лендинг образовательного курса о натуральной поддержке организма с водным экстрактом прополиса.

Продакшн-домен: `https://propolis-doctor.ru`

## Что внутри

- Главная страница курса.
- Юридические страницы: политика, соглашение, оферта, возврат, медицинский дисклеймер, контакты.
- Страница благодарности после demo-отправки формы.
- Локальные стили, скрипты, шрифты и медиа без CDN и сборки.
- Nginx-настройки для clean URL и security headers.

## Технологии

- HTML5
- CSS3
- Vanilla JavaScript
- Nginx (деплой на VPS)

## Локальный запуск

1. Откройте `index.html` в браузере.
2. Или запустите `start_site.bat` для локального HTTP-сервера (`http://127.0.0.1:8787`).

Сборка (`npm`, bundler) не требуется.

## URL-структура

Сайт использует clean URL:

- `/`
- `/contacts`
- `/privacy`
- `/terms`
- `/offer`
- `/refund`
- `/medical-disclaimer`
- `/thank-you`

Старые URL вида `*.html` должны редиректиться на clean URL через Nginx.

## Структура проекта

- `index.html` — главная.
- `contacts.html`, `privacy.html`, `terms.html`, `offer.html`, `refund.html`, `medical-disclaimer.html`, `thank-you.html` — страницы сайта.
- `assets/css/` — стили.
- `assets/js/` — скрипты.
- `assets/icons/`, `assets/images/`, `assets/fonts/`, `assets/videos/` — статические ассеты.
- `sitemap.xml`, `robots.txt`, `site.webmanifest` — SEO/PWA-файлы.
- `docs/` — документация по публикации и безопасности.

## Деплой на VPS

Рекомендуемый порядок:

1. Загрузить HTML-файлы, `sitemap.xml`, `robots.txt`, `site.webmanifest`, папку `assets/`.
2. Применить Nginx-конфиг из `docs/NGINX-SECURITY-CONFIG.md`.
3. Проверить конфиг и перезагрузить Nginx: `sudo nginx -t` и `sudo systemctl reload nginx`.
4. Включить автозапуск Nginx после перезагрузки VPS: `sudo systemctl enable nginx` и `sudo systemctl is-enabled nginx`.

## Безопасность

Проект настроен под:

- `Strict-Transport-Security`
- `Content-Security-Policy`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`
- Блокировку чувствительных путей и архивов (`.git`, `*.zip`, `*.rar` и т.д.)

См.:

- `docs/NGINX-SECURITY-CONFIG.md`
- `docs/VPS-HARDENING.md`
- `SECURITY.md`

## Примечание по форме

`assets/js/form.js` работает в demo-режиме и не сохраняет персональные данные в `localStorage`.
