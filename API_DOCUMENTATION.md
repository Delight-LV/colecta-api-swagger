# Colecta API Documentation

## Base URL
`https://{api-gateway-url}/api/v1`

## Authentication
All API requests require a valid `clientId` in the request body.

## Endpoints

### 1. Upload Contacts
Upload contact information for debtors.

**Endpoint:** `POST /upload/contacts`

**Request Body:**
```json
{
  "clientId": "string",
  "contacts": [
    {
      "contactName": "string",      // Optional
      "contactEmail": "string",     // Required if contactPhone not provided
      "contactPhone": "string",     // Required if contactEmail not provided
      "debitorName": "string",      // Required if regNr not provided
      "regNr": "string"            // Required if debitorName not provided
    }
  ],
  "userId": "string",              // Optional
  "userName": "string",            // Optional
  "userEmail": "string"            // Optional
}
```

**Response:**
```json
{
  "jobId": "uuid",
  "message": "Import job submitted successfully"
}
```

### 2. Upload Debtors
Upload debtor information.

**Endpoint:** `POST /upload/debitors`

**Request Body:**
```json
{
  "clientId": "string",
  "debitors": [
    {
      "debitorName": "string",     // Required if regNr not provided
      "regNr": "string",           // Required if debitorName not provided
      "contactName": "string",      // Optional
      "contactEmail": "string",     // Optional
      "contactPhone": "string"      // Optional
    }
  ],
  "userId": "string",              // Optional
  "userName": "string",            // Optional
  "userEmail": "string"            // Optional
}
```

**Response:**
```json
{
  "jobId": "uuid",
  "message": "Import job submitted successfully"
}
```

### 3. Upload Invoices
Upload invoice information.

**Endpoint:** `POST /upload/invoices`

**Request Body:**
```json
{
  "clientId": "string",
  "invoices": [
    {
      "invoiceNumber": "string",    // Required
      "dueDate": "string",         // Required (YYYY-MM-DD format)
      "dueAmount": number,         // Required (non-negative)
      "issueDate": "string",       // Optional (YYYY-MM-DD format)
      "category": "string",        // Optional
      "debitorName": "string",     // Required if regNr not provided
      "regNr": "string"           // Required if debitorName not provided
    }
  ],
  "userId": "string",              // Optional
  "userName": "string",            // Optional
  "userEmail": "string"            // Optional
}
```

**Response:**
```json
{
  "jobId": "uuid",
  "message": "Import job submitted successfully"
}
```

### 4. File Upload
Upload a file for processing (CSV, Excel, etc.).

**Endpoint:** `POST /upload/file`

**Request Body:**
```json
{
  "clientId": "string",
  "fileData": {
    "name": "string",
    "content": "base64-encoded-string",
    "type": "string"
  },
  "columnMapping": {
    // Column mapping configuration
  },
  "userId": "string",              // Optional
  "userName": "string",            // Optional
  "userEmail": "string"            // Optional
}
```

**Response:**
```json
{
  "jobId": "uuid",
  "message": "Import job submitted successfully"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required field: clientId"
}
```
or
```json
{
  "error": "Invalid request format. Must include either fileData and columnMapping, or one of: contacts, debitors, invoices"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to process import job",
  "details": "Error message details"
}
```

## Notes

1. All endpoints support CORS with `Access-Control-Allow-Origin: *`
2. File uploads must be base64 encoded
3. All import jobs are processed asynchronously
4. Job status can be tracked using the returned `jobId`
5. Date formats must be in YYYY-MM-DD format
6. Amounts must be non-negative numbers
7. For each entity (contact, debtor, invoice), either `regNr` or `debitorName` must be provided
8. For contacts, either `contactEmail` or `contactPhone` must be provided

## Processing Stages

Each import job goes through the following stages:
1. setup
2. debitors
3. invoices
4. reminders

The status of each stage can be tracked using the job tracking system 