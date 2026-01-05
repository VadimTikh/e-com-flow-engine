e-com-flow-engine/
├── src/
│   ├── api/                   # HTTP слой (маршруты, контроллеры, валидация)
│   │   ├── routes/            # express.Router() для каждого модуля
│   │   ├── controllers/       # Обработка запросов, вызов сервисов
│   │   └── middlewares/       # Auth, ErrorHandler, Validation (Zod/Joi)
│   ├── services/              # БИЗНЕС-ЛОГИКА (Ядро системы)
│   │   ├── ScraperService.ts  # Логика обхода сайтов
│   │   ├── OrderService.ts    # Синхронизация заказов между CRM и Почтой
│   │   └── AIService.ts       # Анализ данных через OpenAI
│   ├── providers/             # ВНЕШНИЕ ИНТЕГРАЦИИ (Adapters)
│   │   ├── NovaPoshta.ts      # Класс-клиент для НП
│   │   ├── SalesDrive.ts      # Класс-клиент для CRM
│   │   └── OpenAI.ts          # Обертка над API OpenAI
│   ├── models/                # СХЕМЫ ДАННЫХ
│   │   ├── mongodb/           # Mongoose модели (логи, скрапинг)
│   │   └── postgres/          # Prisma/TypeORM (финансы, заказы)
│   ├── queue/                 # ФОНОВЫЕ ЗАДАЧИ (BullMQ/Bee-Queue)
│   │   ├── workers/           # Обработчики очередей
│   │   └── jobs/              # Определения задач
│   ├── config/                # Конфигурация (env, constants)
│   ├── shared/                # Types, Interfaces, Utils, Logger
│   ├── app.ts                 # Инициализация Express
│   └── server.ts              # Точка входа (Listen)
├── tests/                     # Интеграционные тесты (Supertest + Jest)
├── docker-compose.yml         # App + Redis + Mongo + Postgres
├── .env.example
└── README.md                  # Твоя витрина