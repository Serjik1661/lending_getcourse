# Project Structure

Проект — статический HTML/CSS/JS лендинг.

## Корень

- `index.html` — главная страница.
- `contacts.html` — контакты и карта с отложенной загрузкой.
- `privacy.html`, `terms.html`, `medical-disclaimer.html` — юридические страницы.
- `offer.html`, `refund.html` — черновики, не включены в sitemap и закрыты от индексации.
- `thank-you.html` — техническая страница, не используется в публичном сценарии.
- `404.html` — страница ошибки, закрыта от индексации.
- `offline.html` — offline fallback для service worker, закрыта от индексации.
- `sw.js` — минимальный service worker для offline fallback.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — SEO/служебные файлы.
- `serve_local.py`, `start_site.bat` — локальный запуск и проверка URL без `.html`.

## assets

- `assets/css/` — reset, variables, base, layout, components, sections, legal, responsive, styles.
- `assets/js/` — `utils.js`, `menu.js`, `site.js`, `cookie-consent.js`, `register-sw.js`, `offline.js`.
- `assets/images/` — изображения секций.
- `assets/icons/` — иконки, favicon, соцсети.
- `assets/videos/` — видео курса.

## docs

- `CUSTOMER-APPROVAL.md` — что должен подтвердить заказчик.
- `LEGAL-TODO.md` — незакрытые юридические пункты.
- `GETCOURSE-TODO.md` — где и что проверить по GetCourse.
- `SECURITY-CHECKLIST.md` — ручные проверки безопасности.
- `DEPLOYMENT.md` — порядок публикации.
- `archive/` — резервные копии и отключенные файлы.

## Где менять

- Тексты главной: `index.html`.
- Контакты: `contacts.html` и футеры.
- GetCourse-ссылку: все `#getcourse-link-required`.
- Маркетплейсы: все `#marketplace-link-required`.
- Cookie/карта: `assets/js/cookie-consent.js` и `assets/css/components.css`.
- Service worker: `sw.js`; при изменении кэшируемых файлов менять `CACHE_NAME`.

## Что публиковать на VPS

- HTML-страницы сайта, включая `404.html` и `offline.html`.
- `assets/`, `sw.js`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicon.

## Что НЕ публиковать на VPS

- `docs/archive/`, backup/temp/debug/test/QA-файлы и скриншоты.
- `.git`, `.env`, секреты, дампы, базы данных, логи.
- `serve_local.py`, если на VPS используется Nginx.
- README и docs, если публичная папка должна содержать только сайт.
