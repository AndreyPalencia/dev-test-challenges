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