# Инструкция по настройке PostgreSQL для kamrankazimi.dev на сервере

## Часть 1: Настройка GitHub Secrets

### 1.1 Создайте секреты в GitHub

Перейдите: `https://github.com/kamran134/kamrankazimi/settings/secrets/actions`

Добавьте следующие секреты:

```
DATABASE_URL = postgresql://kamrankazimi:STRONG_PASSWORD_HERE@postgres:5432/kamrankazimi?schema=public
NEXTAUTH_SECRET = generate-random-secret-here-use-openssl-rand-base64-32
NEXTAUTH_URL = https://kamrankazimi.dev
```

**Как сгенерировать NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Часть 2: Настройка на сервере

### 2.1 Подключитесь к серверу

```bash
ssh root@your-server-ip
```

### 2.2 Создайте PostgreSQL контейнер для kamrankazimi

```bash
# Создайте директорию для данных PostgreSQL
mkdir -p ~/kamrankazimi/postgres_data

# Создайте docker-compose.yml для production
cat > ~/kamrankazimi/docker-compose.yml << 'EOF'
version: '3.8'

networks:
  volleytournament_default:
    external: true

services:
  postgres:
    image: postgres:16-alpine
    container_name: kamrankazimi-postgres
    restart: always
    environment:
      POSTGRES_USER: kamrankazimi
      POSTGRES_PASSWORD: ЗАМЕНИТЕ_НА_СИЛЬНЫЙ_ПАРОЛЬ
      POSTGRES_DB: kamrankazimi
    volumes:
      - ./postgres_data:/var/lib/postgresql/data
    networks:
      - volleytournament_default

  nextjs:
    image: ghcr.io/kamran134/kamrankazimi:latest
    container_name: kamrankazimi-next
    restart: always
    expose:
      - "3000"
    environment:
      - DATABASE_URL=postgresql://kamrankazimi:ЗАМЕНИТЕ_НА_ТОТ_ЖЕ_ПАРОЛЬ@postgres:5432/kamrankazimi?schema=public
      - NEXTAUTH_URL=https://kamrankazimi.dev
      - NEXTAUTH_SECRET=ЗАМЕНИТЕ_НА_SECRET_ИЗ_GITHUB_SECRETS
    depends_on:
      - postgres
    networks:
      - volleytournament_default
EOF
```

### 2.3 Замените пароли в файле

```bash
nano ~/kamrankazimi/docker-compose.yml
```

Замените:
- `ЗАМЕНИТЕ_НА_СИЛЬНЫЙ_ПАРОЛЬ` → ваш сильный пароль (тот же что в DATABASE_URL GitHub Secret)
- `ЗАМЕНИТЕ_НА_SECRET_ИЗ_GITHUB_SECRETS` → значение NEXTAUTH_SECRET из GitHub

### 2.4 Запустите сервисы

```bash
cd ~/kamrankazimi
docker-compose down  # Остановить старую версию
docker-compose pull  # Скачать новый образ
docker-compose up -d
```

### 2.5 Выполните миграцию базы данных

```bash
# Войдите в контейнер Next.js
docker exec -it kamrankazimi-next sh

# Внутри контейнера:
npx prisma migrate deploy
npx prisma db seed

# Выйдите из контейнера
exit
```

### 2.6 Проверка

```bash
# Проверьте логи
docker logs kamrankazimi-next
docker logs kamrankazimi-postgres

# Проверьте что контейнеры работают
docker ps | grep kamrankazimi
```

---

## Часть 3: Обновление GitHub Actions (опционально)

Если хотите автоматически накатывать миграции при деплое, обновите `.github/workflows/docker-publish.yml`:

```yaml
# Добавьте шаг после сборки образа:
- name: Run database migrations
  run: |
    docker exec kamrankazimi-next npx prisma migrate deploy
```

---

## Часть 4: Backup базы данных (важно!)

### 4.1 Создайте скрипт backup

```bash
cat > ~/kamrankazimi/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR=~/kamrankazimi/backups
mkdir -p $BACKUP_DIR
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
docker exec kamrankazimi-postgres pg_dump -U kamrankazimi kamrankazimi > $BACKUP_DIR/backup_$TIMESTAMP.sql
echo "Backup created: $BACKUP_DIR/backup_$TIMESTAMP.sql"
EOF

chmod +x ~/kamrankazimi/backup.sh
```

### 4.2 Настройте cron для автоматических бэкапов

```bash
crontab -e
```

Добавьте (бэкап каждый день в 2:00):
```
0 2 * * * /root/kamrankazimi/backup.sh
```

---

## Часть 5: Восстановление из SQLite (если нужно)

Если у вас были данные в SQLite и нужно их перенести:

```bash
# 1. Экспортируйте данные из старой базы (на локальной машине)
npm install -g prisma-migrate-seed-sqlite-to-postgres

# 2. Или вручную создайте SQL дамп и импортируйте
```

---

## Проверка работы

1. Откройте https://kamrankazimi.dev
2. Перейдите в https://kamrankazimi.dev/login
3. Войдите с данными:
   - Email: `admin@kamran.dev`
   - Password: `admin123`

---

## Troubleshooting

### Ошибка "Can't reach database server"

```bash
# Проверьте что PostgreSQL запущен
docker logs kamrankazimi-postgres

# Проверьте что контейнеры в одной сети
docker inspect kamrankazimi-next | grep -A 10 Networks
docker inspect kamrankazimi-postgres | grep -A 10 Networks
```

### Ошибка при миграции

```bash
# Пересоздайте базу
docker exec -it kamrankazimi-postgres psql -U kamrankazimi
DROP DATABASE kamrankazimi;
CREATE DATABASE kamrankazimi;
\q

# Выполните миграцию заново
docker exec -it kamrankazimi-next npx prisma migrate deploy
docker exec -it kamrankazimi-next npx prisma db seed
```

### Сменить пароль admin

```bash
docker exec -it kamrankazimi-next sh
npx prisma studio
# Откроется Prisma Studio на порту 5555
# Измените пароль в таблице Admin
```
