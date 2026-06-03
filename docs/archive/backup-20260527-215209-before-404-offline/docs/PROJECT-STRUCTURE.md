# Project Structure

Проект — статический HTML/CSS/JS лендинг.

## Корень

- `index.html` — главная страница.
- `contacts.html` — контакты и карта с отложенной загрузкой.
- `privacy.html`, `terms.html`, `medical-disclaimer.html` — юридические страницы.
- `offer.html`, `refund.html` — черновики, не включены в sitemap и закрыты от индексации.
- `thank-you.html` — техническая страница, не используется в публичном сценарии.
- `robots.txt`, `sitemap.xml`, `site.webmanifest` — SEO/служебные файлы.
- `serve_local.py`, `start_site.bat` — локальный запуск и проверка URL без `.html`.

## assets

- `assets/css/` — reset, variables, base, layout, components, sections, legal, responsive, styles.
- `assets/js/` — `utils.js`, `menu.js`, `site.js`, `cookie-consent.js`.
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
