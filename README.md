# Green API Автотесты

## Настройка окружения

Создайте файл `.env` в корне проекта и добавьте переменные:

```env
API_URL="https://<ВАШ_КОД>.api.greenapi.com"
INSTANCE_ID="<INSTANCE_ID>"
MEDIA_URL="https://<ВАШ_КОД>.media.greenapi.com"
TOKEN="<ВАШ_TOKEN>"
PHONE_NUMBER=<НОМЕР_ТЕЛЕФОНА>
PASSWORD=<ПАРОЛЬ_ОТ_GREEN_API>
EMAIL=<ВАШ_EMAIL>
```

### Установка Зависимостей
```bash
npm install
```

## Тесты

### API Test
```bash
npx jest tests/greenAPI.test.ts
```

### Selenium UI SendMessage Test
```bash
npx jest tests/greenAPISelenium.test.ts
```

## Структура
```
├── src/
│   └── greenAPIClient.ts          #Вспомогательные функции
├── tests/
│   ├── greenAPI.test.ts           # API-тесты
│   └── greenAPISelenium.test.ts   # UI-тест с Selenium
├── .env                           # Переменные окружения (нужно создать)
└── README.md
```
