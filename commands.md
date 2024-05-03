host.docker.internal user root 

docker compose -f docker-compose.dev.yml up --build

# Directory is optional (defaults to cwd)

docker exec -i postgres /bin/bash -c "PGPASSWORD=secret pg_dump --username root alef" > ./dump/dump.sql
docker exec -i postgres /bin/bash -c "PGPASSWORD=secret psql --username root alef" < ./dump/dump.sql