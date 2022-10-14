# Skills Union - Instructor Scheduling System (Node.js)

## Technologies

- TypeScript
- Node v16
- Express
- Prisma
- Postgres@14

## Database

Instead of connecting to a database installed on your local machine, this project uses a postgres docker image to run as your database. The data of the database within the container is being mapped to `./postgres-data` so that when you restart the docker, all the data are persisted.

To access the database in the container, use the `psql` command:

```sh
psql -h localhost -d suissdb  -p 5050 -U root -W
```

Enter password: `root` as indicated in `docker-compose.yml`

## Migration

If you pull a new source code that has new migration files `./prisma/migrations`, you have to run 

```sh
npx prisma migrate deploy
```

> The best practice recommended from Prisma is never change historical migration script. If we made a mistake in a migration, we should create a new mirgration (move forward) to correct it. Then, use the `squash` feature to merge those migrations.

## Running the App

Install [Docker](https://www.docker.com/) and make sure it is running. To start the project in Docker, run `docker compose up` in the root directory of this project.

Use `docker compose up` to run the application and access `http://localhost:8080`.

```sh
docker compose up
```