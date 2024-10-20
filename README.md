# TON Wallet App

Это веб-приложение для привязки крипто кошелька TonKeeper и выполнения переводов в TestNet сети TON.

## Требования

- Docker
- Docker Compose

## Установка и запуск

1. Клонируйте репозиторий:
   ```
   git clone https://github.com/your-username/ton-wallet-app.git
   cd ton-wallet-app
   ```

2. Соберите и запустите контейнер:
   ```
   docker-compose up --build
   ```

3. Откройте браузер и перейдите по адресу `http://localhost:3000`

## Разработка

Для локальной разработки без Docker:

1. Установите зависимости:
   ```
   npm install
   ```

2. Запустите приложение в режиме разработки:
   ```
   npm run dev
   ```

3. Откройте браузер и перейдите по адресу `http://localhost:3000`

## Лицензия

[MIT](https://choosealicense.com/licenses/mit/)
