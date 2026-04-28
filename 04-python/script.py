
users = [
    {"name": "Alice", "email": "alice@gmail.com"},
    {"name": "Bob",   "email": "bob@yahoo.com"},
    {"name": "Carol", "email": "alice@gmail.com"},   
    {"name": "Dave",  "email": "dave@gmail.com"},
    {"name": "Eve",   "email": "not-an-email"},      
    {"name": "Frank", "email": "frank@"},            
]

def validate_email(email):
    
    return "@" in email

def group_by_domain(users):
    result = {}
    for user in users:
        email = user["email"]
        if validate_email(email):
            
            domain = email          
            
            result[domain] = 1      
    return result

output = group_by_domain(users)
print(output)
