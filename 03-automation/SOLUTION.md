# Solution — Module 03: Automation Workflow

## 1. Technical Logic & Workflow Steps

My n8n workflow is designed to process user registrations asynchronously and securely, following these logical steps:

*   **Trigger (Webhook):** Receives the JSON payload containing `name`, `email`, and `source`.
*   **Validation (Code Node):** I implemented a JavaScript block to validate the email using a robust Regular Expression (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). This ensures the email follows a standard format (user@domain.ext) before consuming database resources.
*   **Duplicate Check (Data Table Node):** Before attempting to create a record, the workflow performs a filtered search by `email` in the `users` table.
*   **Conditional Routing (IF Nodes):** 
    *   If the format is invalid, the flow routes to a `400 Bad Request` response.
    *   If the email already exists in the database, it routes to a "Duplicate" `400` response.
*   **Data Persistence:** If the record is both valid and unique, it is stored in the database, and the workflow returns a `200 OK` success response.

## 2. Handling Failures & Edge Cases

To ensure the workflow meets production-grade standards, I implemented the following:

*   **Retry Logic:** The database insertion node ("Agregar el nuevo usuario") is configured with **2 automatic retries** to handle transient network issues or database timeouts.
*   **Error Logging:** I utilized a global **Error Trigger** connected to a dedicated `error_logs` table. Any failure within the workflow automatically captures:
    *   **Timestamp:** Using the `$now` expression.
    *   **Error Details:** The error message and stack trace via `$json.execution.error`.
    *   **Context:** The name of the specific node where the execution failed.
*   **Edge Case Handling:** If the Webhook body is empty or missing fields, the Code Node detects this immediately as `isValid: false`, preventing execution errors in downstream nodes.

## 3. Standardized Responses

The workflow consistently returns a structured JSON response as required by the specifications:

*   **Success:** 
    ```json
    { "status": "saved", "message": "El usuario se creó con éxito" }
    ```
*   **Duplicate:** 
    ```json
    { "status": "duplicate", "message": "El usuario ya existe" }
    ```
*   **Invalid:** 
    
    ```json
        { "status": "invalid", "message": "Formato de correo inválido" }
    ```