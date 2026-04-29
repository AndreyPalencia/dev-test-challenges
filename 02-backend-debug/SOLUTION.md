### Bug 1: Missing await in async database call

- **File:** server.js
- **Lines:** 18 (GET /data)

- **Cause:**
The function getDataFromDB() was called without await, so it returned a Promise instead of resolved data. This caused the response to behave incorrectly and return undefined or invalid structure.

- **Fix:**
Added await before calling the async function:
`const data = await getDataFromDB();`

- **Explanation:**
Without await, the API was returning a pending Promise instead of actual data. This caused the frontend to receive undefined or incorrect values.

### Bug 2: Incorrect HTTP status codes and response structure

- **File:** server.js
- **Lines:** 20-26

- **Cause:**
The API originally used incorrect status handling and response structure, including returning 200 OK even when data was missing, and relying on a response format that did not match the DB output.

- **Fix:**
Changed status to 404 when no data is found
Fixed response structure to use correct data object
`if (!data) {
  return res.status(404).json({ error: 'No data found' });
}`

`return res.status(200).json({ result: data });`

- **Explanation:**
HTTP status codes must reflect real state. 404 is correct for missing data, and response structure must match actual DB output.


### Bug 3: Missing async error handling in GET /data

- **File:** server.js
- **Lines:** 18-26

- **Cause:**
Async route lacked proper error propagation mechanism, which could cause unhandled failures.

- **Fix:**
Added try/catch and passed errors to Express middleware:
`try {
  const data = await getDataFromDB();
  return res.status(200).json({ result: data });
} catch (err) {
  next(err);
}`

- **Explanation:**
Using try/catch with next(err) ensures errors are handled by centralized Express middleware instead of crashing or hanging the request.


### Bug 4: Missing global error handler and 404 middleware

- **File:** server.js
- **Lines:** Bottom of file

- **Cause:**
The API lacked centralized error handling and fallback route handling.

- **Fix:**
To add:
Error middleware
`app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
  });
});`

404 middleware
`app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});`

- **Explanation:**
Error middleware handles unexpected failures in a controlled way
404 middleware handles unknown routes and improves API consistency