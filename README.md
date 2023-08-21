# Social media Telegram bot

## Quick start with Docker

Get the application running.

### Configuration:

```bash
cp .env.example .env
```

.env: 

```bash
BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQURSTUVWXYZ

DB_HOST=mariadb
DB_DIALECT=mariadb
DB_NAME=db_name
DB_USERNAME=root
DB_PASSWORD=root
```

### Running Docker:

If you already have Docker & Docker compose running the docker compose command to get the application running below.

Docker version: 24.0.4, Docker compose version: 1.29.2. (Docker version don't have to be exactly the same but some version might not working)

```bash
docker-compose up
```

## Quick start

Get the application running.

### Configuration:

```bash
cp .env.example .env
```

.env: 

```bash
BOT_TOKEN=1234567890:ABCDEFGHIJKLMNOPQURSTUVWXYZ

DB_HOST=localhost
DB_DIALECT=mariadb
DB_NAME=db_name
DB_USERNAME=root
DB_PASSWORD=root
```

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
