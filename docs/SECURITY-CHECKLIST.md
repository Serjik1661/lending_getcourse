# Security Checklist

Перед публикацией проверить:

- Нет `.env`, `.env.local`, `secrets.json`, приватных ключей, дампов и баз данных.
- Нет `eval`, `new Function`, `document.write`.
- Нет скрытых iframe и скрытых форм.
- Нет форм заявок на лендинге.
- Нет неизвестных `fetch`/AJAX/WebSocket-запросов.
- Нет Метрики, VK Pixel, Google Analytics, Facebook Pixel, рекламных SDK.
- Яндекс.Карта не грузится до согласия.
- Service worker не кэширует внешние домены, Яндекс.Карты, мессенджеры и GetCourse.
- При изменении кэшируемых файлов обновлена версия `CACHE_NAME` в `sw.js`.
- Все внешние ссылки имеют `target="_blank"` и `rel="noopener noreferrer"`.
- `offer.html`, `refund.html`, `thank-you.html` не индексируются, пока не утверждены.
- `sitemap.xml` содержит только публичные финальные страницы.
