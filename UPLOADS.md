# Uploads Volume Setup

## Production Deployment

На production сервере нужно добавить volume для сохранения загруженных файлов.

В `docker-compose.yml` добавьте:

```yaml
services:
  nextjs:
    # ... остальные настройки
    volumes:
      - uploads:/app/public/uploads

volumes:
  uploads:
    driver: local
```

Или используйте bind mount для доступа с хоста:

```yaml
services:
  nextjs:
    # ... остальные настройки
    volumes:
      - ./uploads:/app/public/uploads
```

## Permissions

Убедитесь что директория имеет правильные права:

```bash
mkdir -p uploads
chown -R 1001:1001 uploads
chmod 755 uploads
```

## Backup

Для бэкапа загруженных файлов:

```bash
docker cp <container_name>:/app/public/uploads ./backup-uploads
```
