# Context for AI Assistant (Gemini/Claude)
## Project: e-com-flow-engine

### 1. Core Purpose
- Автоматизация e-commerce процессов: логистика (Новая Почта), CRM (SalesDrive/Prom), AI-аналитика.
- Цель: создание масштабируемой системы для управления заказами и ценообразованием.

### 2. Tech Stack & Standards
- **Runtime:** Node.js (v18+)
- **Framework:** Express.js (Modular/Clean Architecture)
- **Language:** TypeScript (Strict mode)
- **Database:** MongoDB (Logs/Scraping), PostgreSQL (Transactions)
- **Logging:** Winston (с разделением по уровням и дочерними логгерами)
- **Validation:** Zod
- **Testing:** Jest (Integration & Smoke tests)

### 3. Architecture Principles
- **Providers:** Чистые обертки над внешними API (NovaPoshta.ts, Gemini.ts).
- **Services:** Бизнес-логика, объединяющая несколько провайдеров.
- **Shared:** Общие интерфейсы и типы данных (никаких 'any').
- **Error Handling:** Все ошибки должны логироваться через Winston с указанием контекста модуля.

### 4. Current Progress & Tasks
- [x] Base Infrastructure (Docker, TS, Winston)
- [x] Nova Poshta Provider: Tracking (Batching implemented)
- [ ] Nova Poshta Provider: Registry Management (In progress)
- [ ] Gemini AI Provider: Context-aware analysis
- [ ] CRM Adapters (SalesDrive/Prom)

### 5. Coding Rules for AI
- При написании кода всегда используй TypeScript интерфейсы из `src/shared/types`.
- Используй существующий `BaseClient` для новых провайдеров (DRY).
- Обязательно добавляй JSDoc для сложных методов.
- Пиши тесты сразу после реализации функционала.