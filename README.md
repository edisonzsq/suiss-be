# Skills Union - Instructor Scheduling System (Node.js)

## Technologies

- TypeScript
- Node v16
- Express
- Prisma
- Postgres@14
- Docker

## Quick Start

You will need 2 Terminals.

Terminal 1:
```sh
docker compose up --build
```

Terminal 2:
```sh
npm install
npx prisma migrate deploy # push migration changes to postgres container
npx prisma generate # generate an instance of prisma in node_modules based on ./prisma/schema.prisma file
npm run dev # start the app
```

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

If you change some config file apart from code, you might need to rebuild the image. Then, use `docker compose up --build`.

```sh
docker compose up --build
```

## WARNING

If you are using M1 Chip, there is incompatibility issue between Docker Alpine + Mac M1 Chip + Prisma Query Library. Read more [here](https://github.com/prisma/prisma/issues/9572).

There is no solutions tentatively other than simply:

### (1) Only use Postgres in `docker-compose.yml`

```yml
# This docker-compose.yml is only for development environment.

version: '3.8'
services:

  postgres:
    image: postgres:14.1-alpine
    restart: always
    environment:
      # You can set the value of environment variables
      # in your docker-compose.yml file
      # Our Node app will use these to connect
      # to the database
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=root
      - POSTGRES_DB=suissdb
    ports:
      # Standard port for PostgreSQL databases
      - "5050:5432"
    
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
```

And run:

```sh
docker compose up # add --build flag to rebuild image when needed
```

The original `docker-compose.yml` file:

```yml
# This docker-compose.yml is only for development environment.

version: '3.8'
services:
  # These are the configurations for our Node app
  # When Docker Compose starts this container it will automatically
  # use the Dockerfile in the directory to configure it
  app:
    build: .
    depends_on:
      # Our app does not work without our database
      # so this ensures our ddeatabase is loaded first
      - postgres
    ports:
      - "8080:8080"
    volumes:
      # Maps our current project directory `.` to
      # our working directory in the container
      - .:/app
      - ./src:/app/src

  # This is the configuration for our PostgreSQL database container
  # Note the `postgres` name is important, in out Node app when we refer
  # to  `host: "postgres"` that value is mapped on the network to the 
  # address of this container.
  postgres:
    image: postgres:14.1-alpine
    restart: always
    environment:
      # You can set the value of environment variables
      # in your docker-compose.yml file
      # Our Node app will use these to connect
      # to the database
      - POSTGRES_USER=root
      - POSTGRES_PASSWORD=root
      - POSTGRES_DB=suissdb
    ports:
      # Standard port for PostgreSQL databases
      - "5050:5432"
    
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
```

### (2) Run the application without docker

Run the following commands on terminal to start application:

```sh
npm install
npm run dev
```