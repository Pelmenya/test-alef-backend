# Настройки pgAdmin

    host.docker.internal user root

# Запуск

```
docker compose -f docker-compose.dev.yml up --build
```

# Сделать дамп бд (CMD)

```
docker exec -i postgres /bin/bash -c "PGPASSWORD=secret pg_dump --username root alef" > ./dump/dump.sql
```

# Развернуть дамп бд (CMD)

```
docker exec -i postgres /bin/bash -c "PGPASSWORD=secret psql --username root alef" < ./dump/dump.sql
```
