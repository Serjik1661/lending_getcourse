# Security

## Что проверено

- Активный код не использует `eval`, `new Function`, `document.write`.
- На лендинге нет форм сбора персональных данных.
- `form.js` отключен и перенесен в архив: `docs/archive/unused-js-20260527/form.js`.
- Cookie-выбор хранится только в `localStorage.cookieConsent`.
- Яндекс.Карта не получает `src` до согласия пользователя.
- Яндекс.Метрика, VK Pixel, Google Analytics, Facebook Pixel и рекламные SDK не подключены.
- Секреты, API-ключи, токены, `.env` и приватные ключи в активной структуре не добавлялись.

## Внешние сервисы

- Яндекс.Карты: только на странице контактов и только после `cookieConsent = accepted` или клика `Показать карту`.
- Telegram, VK, MAX: обычные внешние ссылки, открываются в новой вкладке с `rel="noopener noreferrer"`.
- GetCourse: ссылка пока не предоставлена; используется TODO-якорь.

## Запрещено добавлять без отдельного разрешения

- Метрику, пиксели, рекламные SDK, CDN и внешние JS.
- Скрытые iframe, формы, upload/admin/debug/proxy/shell endpoints.
- API-ключи, токены, пароли, приватные ключи, `.env`.

## Проверка перед деплоем

- `rg -n "eval\(|new Function|document\.write|fetch\(|XMLHttpRequest|ym\(|gtag\(|fbq\(" .`
- `rg -n "api[_-]?key|token|password|secret|private-key|BEGIN .*PRIVATE" .`
- Проверить Network в браузере: до согласия не должно быть запросов к Яндекс.Картам.
