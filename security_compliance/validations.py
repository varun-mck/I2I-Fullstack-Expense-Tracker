# validations.py

import re

# List of sample regulatory requirements
REGULATORY_REQUIREMENTS = {
    "email": r"(^[\w\.-]+@[\w\.-]+\.\w+$)",  # Example regex for validating email addresses
    "phone": r"^\+?\d{10,15}$",  # Example regex for validating phone numbers (international format)
    "ssn": r"^\d{3}-\d{2}-\d{4}$"  # Example regex for validating US social security numbers
}

def validate_data(data: dict) -> bool:
    """
    Validates data against preset compliance and regulatory standards.
    This function will inspect the data format and content to ensure it meets the necessary legal and regulatory requirements.

    Parameters:
    data (dict): The data to validate. Key-value pairs where keys are the fields and values are the data.

    Returns:
    bool: True if the data meets all regulatory requirements, False otherwise.
    """

    for field, pattern in REGULATORY_REQUIREMENTS.items():
        value = data.get(field)
        if value:
            if not re.match(pattern, value):
                print(f"Validation error: Field '{field}' with value '{value}' does not match pattern '{pattern}'")
                return False
        else:
            print(f"Validation error: Field '{field}' is missing in the data")
            return False

    print("All data fields are valid.")
    return True
