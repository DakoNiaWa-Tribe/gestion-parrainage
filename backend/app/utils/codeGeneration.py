import string
import random

def generate_random_code(length=8):
    characters = string.ascii_uppercase + string.digits
    random_code = ''.join(random.choice(characters) for _ in range(length))
    return random_code

def generate_random_digit_code(length=8):
    digit = string.digits
    random_code = ''.join(random.choice(digit) for _ in range(length))
    return random_code
