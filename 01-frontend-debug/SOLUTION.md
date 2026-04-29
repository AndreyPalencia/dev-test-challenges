### Bug 1: Fetch does not resolve and JSON is not processed correctly

- **File:** api.js  
- **Lines:** 4–5  

- **Cause:**  
The `fetch` call was missing `await`, so the promise was not resolved before attempting to process the response.  
Additionally, the conversion to JSON (`response.json()`) was not properly awaited.

- **Fix:**  
Added `await` to both the `fetch` call and the `response.json()` method to ensure the data is fully resolved before being used.

- **Explanation:**  
Without `await`, the code works with unresolved promises instead of actual data, causing the application to fail when trying to access user information.


### Bug 2: Incorrect validation due to assignment instead of comparison

- **File:** app.js  
- **Line:** 8  

- **Cause:**  
The condition used the assignment operator (`=`) instead of a comparison operator, which caused the value of `userId` to be overwritten and the condition to always evaluate incorrectly.

- **Fix:**  
Replaced the assignment operator (`=`) with a strict equality operator (`===`) to properly compare the value of `userId`.

- **Explanation:**  
Using `=` inside a conditional statement assigns a value instead of comparing it, which leads to incorrect logic execution.  
By using `===`, the code correctly checks whether `userId` is an empty string, ensuring proper validation before proceeding.


### Bug 3: Improper async handling and missing error management

- **File:** app.js  
- **Lines:** 18–26  

- **Cause:**  
The promise returned by `fetchUser(userId)` was stored in `cachedUser`, but there was no proper error handling for rejected promises.  
Additionally, the async flow was not safely controlled, which could lead to incorrect handling of unresolved or rejected promises.

- **Fix:**  
Wrapped the async logic in a `try/catch` block, ensured the promise stored in `cachedUser` is properly awaited, and reset `cachedUser` to `null` in case of failure to allow future retries.

- **Explanation:**  
Although caching a promise is a valid optimization, it must be handled carefully.  
The promise must be properly awaited to obtain the resolved data, and any rejection must be handled to prevent application failure.  
If a rejected promise remains cached, subsequent executions will continue to fail.  
By using `try/catch`, awaiting the promise correctly, and resetting the cache on error, the application ensures a controlled and reliable async flow.


### Bug 4: Incorrect validation logic for userId

- **File:** app.js  
- **Line:** 13  

- **Cause:**  
The validation used a complex and unclear condition (`userId > 0 === false`), which relied on implicit type coercion and made the logic harder to understand.  
Additionally, the input value was not explicitly converted to a number, which could lead to incorrect validation for non-numeric values.

- **Fix:**  
Converted the input value to a number using `Number(userId)` and replaced the condition with a clear validation using `isNaN(id) || id <= 0`.  
Also updated the code to consistently use the validated numeric value (`id`) instead of the original `userId`, including in the API call (`fetchUser(id)`).

- **Explanation:**  
Using explicit type conversion ensures that the validation behaves predictably for all inputs.  
The `isNaN(id)` check handles non-numeric values (e.g., "dd"), while `id <= 0` ensures the value is positive.  
By consistently using `id` instead of `userId`, the application avoids relying on implicit type coercion and ensures that only validated numeric data is used throughout the execution flow.

### Bug 5: XSS vulnerability in DOM rendering

- **File:** app.js  
- **Lines:** 28-29 

- **Cause:**  
The application originally used `innerHTML` to render user data directly into the DOM.  
This approach allows malicious content (e.g., injected scripts) to be interpreted and executed by the browser if the data is not trusted.

- **Fix:**  
Replaced the use of `innerHTML` with safe DOM manipulation using `textContent`, `createElement`, and `appendChild`.  
The content is now built as text nodes instead of HTML strings.

- **Explanation:**  
Using `innerHTML` exposes the application to Cross-Site Scripting (XSS) attacks because it interprets input as HTML.  
By switching to `textContent` and creating DOM elements manually, all user data is treated as plain text, preventing the execution of malicious scripts.  
This ensures that even if the API returns unsafe data, it will not be executed in the browser.