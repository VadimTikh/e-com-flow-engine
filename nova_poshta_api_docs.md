# Nova Poshta API Documentation

## Overview

Nova Poshta API is a set of tools for automating logistics processes with Nova Poshta company. It serves as a single entry point for all clients and services.

## Authentication

**API Key** is required for all requests. Generate your key in the business cabinet:
- Navigate to: Settings → Security → Create Key
- Use this key in the `apiKey` field of all requests

## Entry Points

| Format | URL |
|--------|-----|
| JSON | `https://api.novaposhta.ua/v2.0/json/` |
| XML | `https://api.novaposhta.ua/v2.0/xml/` |

> **Important:** Format must be lowercase (e.g., `/json/` not `/JSON/`)

## Request Format

- Protocol: HTTPS
- Methods: POST or GET
- Content-Type: `application/json` for JSON requests
- **Response always returns HTTP 200**, even for logical errors (check `success` field and `errors` array)

## Standard Request Structure

```json
{
  "apiKey": "[YOUR_API_KEY]",
  "modelName": "ModelName",
  "calledMethod": "methodName",
  "methodProperties": {
    // method-specific parameters
  }
}
```

## Standard Response Structure

```json
{
  "success": true,
  "data": [],
  "errors": [],
  "warnings": [],
  "info": [],
  "messageCodes": [],
  "errorCodes": [],
  "warningCodes": [],
  "infoCodes": []
}
```

---

## Error Codes Reference

| Code | Error Text (EN) | Error Text (UA) |
|------|-----------------|-----------------|
| 20000100007 | Activation error | Помилка активації |
| 20000100008 | An unknown error occurred. Try again later. | Виникла невідома помилка. Спробуйте пізніше |
| 20000100010 | Can not create Vip user | Неможливо створити обліковий запис |
| 20000100012 | Error ApiKey generating | Помилка створення API-ключа |
| 20000100013 | get LoyaltyCard fail | Не вдалося отримати номер картки лояльності |
| 20000100014 | Incorrect data. | Некоректні дані |

---

## ScanSheetGeneral Model (Registries/Реєстри)

This model handles shipment registries (scan sheets) for batch processing of waybills.

### Registry Constraints

- Documents can only be added if sender data (city, counterparty, address) is identical for all shipments
- Each document can only belong to ONE registry at a time
- Cannot add documents if printed form was received with print date earlier than registry date
- Cannot add documents after waybill creation or scanning at Nova Poshta branch
- Cannot add documents marked for deletion
- After printing registry, adding documents is blocked

---

### Method: insertDocuments

**Purpose:** Add waybills (express documents) to a registry.

**Model:** `ScanSheetGeneral`

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| DocumentRefs | array | Yes | Array of document identifiers (REFs) to add |
| Ref | string[36] | No* | Registry identifier (if adding to existing registry) |
| Date | string | No* | Date for new registry creation (format: DD.MM.YYYY) |

> *Either `Ref` or `Date` should be provided

#### Request Example

```json
{
  "apiKey": "[YOUR_API_KEY]",
  "modelName": "ScanSheetGeneral",
  "calledMethod": "insertDocuments",
  "methodProperties": {
    "DocumentRefs": [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000000"
    ],
    "Ref": "00000000-0000-0000-0000-000000000000",
    "Date": "01.01.2022"
  }
}
```

#### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| Description | string[128] | Registry name (if specified during creation) |
| Ref | string[36] | Registry identifier (REF) |
| Number | string[36] | Registry number |
| Date | string[36] | Registry date |
| Errors | array | Logical errors for save/update operations |
| Warnings | array | Additional error information |
| Data | object | Information about documents that failed to add |
| Success | array | Successfully added documents with Ref and Number |

#### Response Example

```json
{
  "success": true,
  "data": [{
    "Description": "№1",
    "Ref": "00000000-0000-0000-0000-000000000000",
    "Number": "105-00003134",
    "Date": "01.01.2022",
    "Errors": [],
    "Warnings": [],
    "Data": null,
    "Success": [
      {
        "Ref": "2f48a93a-14d4-11ee-a60f-48df37b921db",
        "Number": "20450733330073"
      }
    ]
  }],
  "errors": [],
  "warnings": [],
  "info": [],
  "messageCodes": [],
  "errorCodes": [],
  "warningCodes": [],
  "infoCodes": []
}
```

---

### Method: getScanSheet

**Purpose:** Get information about a single registry.

**Model:** `ScanSheetGeneral`

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| Ref | string[36] | Yes | Registry identifier (REF) |
| CounterpartyRef | string[36] | Yes | Counterparty identifier (REF) |

#### Request Example

```json
{
  "apiKey": "[YOUR_API_KEY]",
  "modelName": "ScanSheetGeneral",
  "calledMethod": "getScanSheet",
  "methodProperties": {
    "Ref": "00000000-0000-0000-0000-000000000000",
    "CounterpartyRef": "00000000-0000-0000-0000-000000000000"
  }
}
```

#### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| Ref | string[36] | Registry identifier |
| Number | string[36] | Registry number |
| DateTime | string[36] | Creation date (ISO 8601) |
| Count | string[36] | Number of documents in registry |
| CitySenderRef | string[36] | Sender city REF |
| CitySender | string[36] | Sender city name |
| SenderAddressRef | string[36] | Sender address REF |
| SenderAddress | string[36] | Sender address description |
| SenderRef | string[36] | Sender counterparty REF |
| Sender | string[36] | Sender counterparty description |

#### Response Example

```json
{
  "success": true,
  "data": [{
    "Ref": "00000000-0000-0000-0000-000000000000",
    "Number": "105-00003134",
    "DateTime": "2015-03-20T13:45:19+00:00",
    "Count": "2",
    "CitySenderRef": "00000000-0000-0000-0000-000000000000",
    "CitySender": "Київ",
    "SenderAddressRef": "00000000-0000-0000-0000-000000000000",
    "SenderAddress": "м. Київ, Відділення №87 (до 30 кг), вул. Княжий Затон, 14б",
    "SenderRef": "00000000-0000-0000-0000-000000000000",
    "Sender": "CBS-369138"
  }],
  "errors": [],
  "warnings": [],
  "info": [],
  "messageCodes": [],
  "errorCodes": [],
  "warningCodes": [],
  "infoCodes": []
}
```

---

### Method: getScanSheetList

**Purpose:** Get list of all registries.

**Model:** `ScanSheetGeneral`

#### Request Parameters

No parameters required.

#### Request Example

```json
{
  "apiKey": "[YOUR_API_KEY]",
  "modelName": "ScanSheetGeneral",
  "calledMethod": "getScanSheetList",
  "methodProperties": {}
}
```

#### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| Ref | string[36] | Registry identifier (REF) |
| Number | string[50] | Registry number |
| DateTime | string[50] | Creation date (ISO 8601) |
| Printed | string[50] | Print status: `1` = printed, `0` = not printed |

#### Response Example

```json
{
  "success": true,
  "data": [{
    "Ref": "00000000-0000-0000-0000-000000000000",
    "Number": "105-00003134",
    "DateTime": "2021-03-20T13:45:19+00:00",
    "Printed": "0"
  }],
  "errors": [],
  "warnings": [],
  "info": [],
  "messageCodes": [],
  "errorCodes": [],
  "warningCodes": [],
  "infoCodes": []
}
```

---

### Method: deleteScanSheet

**Purpose:** Delete (disband) a registry. Documents included in the registry are released but not deleted.

**Model:** `ScanSheetGeneral`

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ScanSheetRefs | array[36] | Yes | Array of registry identifiers to delete |

#### Request Example

```json
{
  "apiKey": "[YOUR_API_KEY]",
  "modelName": "ScanSheetGeneral",
  "calledMethod": "deleteScanSheet",
  "methodProperties": {
    "ScanSheetRefs": [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000000"
    ]
  }
}
```

#### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| Ref | string[36] | Deleted registry identifier |
| Number | string[36] | Deleted registry number |
| Error | string[36] | Error message if deletion failed |

#### Response Example

```json
{
  "success": true,
  "data": [{
    "Ref": "00000000-0000-0000-0000-000000000000",
    "Number": "00000000-0000-0000-0000-000000000000",
    "Error": "ScanSheet is invalid"
  }],
  "errors": [],
  "warnings": [],
  "info": [],
  "messageCodes": [],
  "errorCodes": [],
  "warningCodes": [],
  "infoCodes": []
}
```

---

### Method: removeDocuments

**Purpose:** Remove waybills from a registry.

**Model:** `ScanSheetGeneral`

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| DocumentRefs | array[36] | Yes | Array of document identifiers to remove |
| Ref | string[36] | No | Registry identifier (REF) |

#### Request Example

```json
{
  "apiKey": "[YOUR_API_KEY]",
  "modelName": "ScanSheetGeneral",
  "calledMethod": "removeDocuments",
  "methodProperties": {
    "DocumentRefs": [
      "00000000-0000-0000-0000-000000000000",
      "00000000-0000-0000-0000-000000000000"
    ],
    "Ref": "00000000-0000-0000-0000-000000000000"
  }
}
```

#### Response Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| DocumentRefs | object | Operation result containing: |
| → Errors | array | Errors encountered during removal |
| → Success | array | Successfully removed documents |
| → Success[].Ref | string | Removed document identifier |
| → Success[].Number | string | Removed document number |
| → Success[].Document | string | Registry identifier from which document was removed |

#### Response Example

```json
{
  "success": true,
  "data": [{
    "DocumentRefs": {
      "Errors": [],
      "Success": [{
        "Ref": "b5bfee68-0000-1111-2223-48df37b921da",
        "Number": "20450123456789",
        "Document": "751299fb-0000-2222-3333-48df37b921da"
      }]
    }
  }],
  "errors": [],
  "warnings": [],
  "info": [],
  "messageCodes": [],
  "errorCodes": [],
  "warningCodes": [],
  "infoCodes": []
}
```

---

## Quick Reference: ScanSheetGeneral Methods

| Method | Purpose | Key Parameters |
|--------|---------|----------------|
| `insertDocuments` | Add documents to registry | DocumentRefs, Ref/Date |
| `getScanSheet` | Get single registry info | Ref, CounterpartyRef |
| `getScanSheetList` | List all registries | (none) |
| `deleteScanSheet` | Delete registry | ScanSheetRefs |
| `removeDocuments` | Remove documents from registry | DocumentRefs, Ref |

---

## Usage Notes for AI Agents

1. **Always check `success` field** - HTTP status is always 200
2. **Check `errors` array** for logical errors even when `success: true`
3. **REF values** are UUID format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
4. **Date format** for requests: `DD.MM.YYYY`
5. **DateTime format** in responses: ISO 8601 (`YYYY-MM-DDTHH:mm:ss+00:00`)
6. **Registry workflow:**
    - Create/add documents → `insertDocuments`
    - View registry details → `getScanSheet`
    - List all registries → `getScanSheetList`
    - Remove documents → `removeDocuments`
    - Delete entire registry → `deleteScanSheet`