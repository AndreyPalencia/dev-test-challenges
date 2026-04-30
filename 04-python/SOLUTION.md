### Bug 1: Improper Email Validation

- **File:** `script.py`
- **Lines:** 12-13

- **Cause:** The original logic only checked for the presence of the `@` character. This allowed invalid emails like `frank@` or `user@domain` (without a dot) to pass as valid.

- **Fix:** Implemented a robust **Regular Expression (Regex)**: `r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'`.

- **Explanation:** This ensures the email follows a standard structure (local-part @ domain . extension), meeting the "proper validation" requirement.


### Bug 2: Duplicate Email Counting
- **File:** `script.py`
- **Lines:** 16-24

- **Cause:** The script was counting every entry in the list. Since "Alice" and "Carol" share the same email address, the domain count was being artificially inflated.

- **Fix:** Integrated a `set()` named `unique_emails` to track processed addresses. Added an `if email in unique_emails: continue` check.

- **Explanation:** This ensures that each unique email address is only counted once, satisfying the "Remove duplicates before counting" requirement.


## Final Output Verification

With the implemented fixes, the script correctly ignores invalid formats, skips the duplicate `alice@gmail.com`, and groups the remaining valid users.

**Expected vs Actual Result:**

```python
{"gmail.com": 2, "yahoo.com": 1}