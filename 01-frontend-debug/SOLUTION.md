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