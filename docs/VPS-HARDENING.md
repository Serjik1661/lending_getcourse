# VPS Hardening Checklist

Этот чеклист подготовлен для Ubuntu 22.04/24.04 и Nginx. Он покрывает базовый аудит и подготовку VPS под статический сайт.

## 1. Базовый аудит сервера

```bash
whoami
hostnamectl
uname -a
df -h
free -h
uptime
ss -tulpn
sudo lsof -i -P -n
sudo systemctl --type=service --state=running
```

## 2. Обновления системы

```bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
```

## 3. SSH и доступ

```bash
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo nano /etc/ssh/sshd_config
```

Рекомендуемые настройки:

- `PermitRootLogin no`
- `PasswordAuthentication no`
- `PubkeyAuthentication yes`
- `X11Forwarding no`
- `AllowTcpForwarding no` для обычного статического сервера

После правки:

```bash
sudo systemctl restart ssh
sudo systemctl status ssh
```

## 4. Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose
```

## 5. Fail2ban

```bash
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
sudo systemctl status fail2ban
```

## 6. Nginx для статического сайта

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
sudo nginx -t
```

Пример каталога:

```bash
sudo mkdir -p /var/www/propolis-site
sudo chown -R $USER:$USER /var/www/propolis-site
```

## 7. Права на файлы

```bash
find /var/www/propolis-site -type d -exec chmod 755 {} \\;
find /var/www/propolis-site -type f -exec chmod 644 {} \\;
```

## 8. TLS

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx
sudo systemctl status certbot.timer
```

## 9. Проверка логов

```bash
sudo journalctl -p 3 -xb
sudo tail -n 200 /var/log/nginx/error.log
sudo tail -n 200 /var/log/auth.log
```

## 10. Что считать нормальным состоянием

- Открыты только `22`, `80`, `443`
- Нет root-login по паролю
- Нет лишних сервисов в `ss -tulpn`
- Nginx проходит `nginx -t`
- UFW включён
- Fail2ban активен
- TLS-сертификат выпущен и обновляется

## 11. Что ещё нужно проверить перед боем

- В `robots.txt`, `sitemap.xml` и Open Graph нет `example.com`
- На сервер не загружены лишние локальные изображения и `artifacts/`
- Директория сайта не содержит `.git/`
- Нет листинга каталогов
- Сжатие и кеширование статики настроены в Nginx
