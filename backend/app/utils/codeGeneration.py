import string
import random

def generate_random_code(length=8):
    characters = string.ascii_uppercase + string.digits
    random_code = ''.join(random.choice(characters) for _ in range(length))
    return random_code
