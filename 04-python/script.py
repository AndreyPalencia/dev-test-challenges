import re 

users = [
    {"name": "Alice", "email": "alice@gmail.com"},
    {"name": "Bob",   "email": "bob@yahoo.com"},
    {"name": "Carol", "email": "alice@gmail.com"},   
    {"name": "Dave",  "email": "dave@gmail.com"},
    {"name": "Eve",   "email": "not-an-email"},      
    {"name": "Frank", "email": "frank@"},            
]

def validate_email(email):
    
    regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

    if re.match(regex, email):
        domain = email.split('@')[-1]
        return True, domain
    return False, None


def group_by_domain(users):
    result = {}
    unique_emails = set()

    for user in users:

        email = user["email"]
        if email in unique_emails:
            continue

        is_valid, domain = validate_email(email)

        if is_valid:
            unique_emails.add(email)
            result[domain] = result.get(domain, 0) + 1   
    return result

output = group_by_domain(users)
print(output)
