# Nginx Security Configuration

Use this snippet in your HTTPS `server` block for `propolis-doctor.ru`.
It hardens static-site responses and blocks accidental file exposure.

```nginx
# Clean URLs without .html
location = /index.html { return 301 https://$host/; }
location ~ ^/(contacts|privacy|terms|offer|refund|medical-disclaimer|thank-you)\.html$ {
    return 301 https://$host/$1;
}
location ~ ^/(contacts|privacy|terms|offer|refund|medical-disclaimer|thank-you)/$ {
    return 301 https://$host/$1;
}
location ~ ^/(contacts|privacy|terms|offer|refund|medical-disclaimer|thank-you)$ {
    try_files /$1.html =404;
}

# Core security headers
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "DENY" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()" always;

# CSP for this static site (+ Yandex map iframe on contacts page)
add_header Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; media-src 'self'; frame-src https://yandex.ru https://*.yandex.ru; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests" always;

# Hide exact Nginx version in Server header
server_tokens off;

# Block sensitive paths/files from accidental publishing
location ~* /\. { deny all; }
location ~* /(artifacts|docs|__MACOSX)/ { deny all; }
location ~* \.(zip|rar|7z|tar|gz|bak|old)$ { deny all; }
location = /start_site.bat { deny all; }
```

Validation after reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
curl -I https://propolis-doctor.ru/
curl -I https://propolis-doctor.ru/contacts
curl -I https://propolis-doctor.ru/contacts.html
curl -I https://propolis-doctor.ru/.git/HEAD
curl -I https://propolis-doctor.ru/workmarks.zip
```
