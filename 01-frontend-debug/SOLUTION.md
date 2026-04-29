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