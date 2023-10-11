# Social media Telegram bot

## Create Telegram bot

Create a Telegram bot and get the bot token.

![create telegram bot](./docs/create-telegram-bot.jpg)

## Configuration:

Copy .env.example and rename to .env.

```bash
cp .env.example .env
```

Configure bot token, jwt secret key and database.
The jwt secret key can be anything include a random string.

.env: 

```bash
BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQURSTUVWXYZ
JWT_SECRET_KEY=123

DB_HOST=mariadb
DB_DIALECT=mariadb
DB_NAME=db_name
DB_USERNAME=root
DB_PASSWORD=root
```

## Quick start with Docker

Get the application running.

### Running Docker:

If you already have Docker & Docker compose, run the docker compose command to get the application running below.

Docker version: 24.0.4, Docker compose version: 1.29.2. (Docker version don't have to be exactly the same but some lower version might not working).
Build Docker image and run Docker container.

```bash
docker-compose up -d --build
```

Run the bash in Docker container and execute seed with dump data.

```bash
docker exec -it teb-be /bin/bash
npx sequelize-cli db:seed:all
```

## Quick start in local

Get the application running in your local with node and npm.

### Install Node dependency:

Installing dependency via npm.

npm version >= 8, node version >= 18.

```bash
npm install
```

### Running:

Running the application.

```bash
npm run start
```

### Running in development mode:

Running the application in development mode. This will refresh the app when code change.

```bash
npm run dev
```
