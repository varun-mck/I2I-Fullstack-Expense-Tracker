# data_validation/validator.py

import re


def validate_data_format(data):
    """
    Verifies that the data conforms to the required format before any further processing.

    Args:
        data (dict): The dataset to validate.

    Returns:
        bool: True if the data format is valid, False otherwise.

    Raises:
        ValueError: If the data format is not valid.
    """
    if not isinstance(data, dict):
        raise ValueError("Data must be a dictionary.")
    
    required_keys = {'name', 'age', 'email'}
    if not required_keys.issubset(data.keys()):
        raise ValueError("Data is missing required keys: 'name', 'age', 'email'.")
    
    if not isinstance(data.get('name'), str):
        raise ValueError("Name must be a string.")
    
    if not isinstance(data.get('age'), int):
        raise ValueError("Age must be an integer.")
    
    if not isinstance(data.get('email'), str) or not re.match(r"[^@]+@[^@]+\.[^@]+", data['email']):
        raise ValueError("Email must be a valid email address.")
    
    return True


def validate_data_values(data):
    """
    Checks the values of the data fields against expected ranges, 
    types, and consistency rules.

    Args:
        data (dict): The dataset to validate.

    Returns:
        bool: True if the data values are valid, False otherwise.

    Raises:
        ValueError: If any data value is not valid.
    """
    if not (0 <= data.get('age') <= 120):
        raise ValueError("Age must be between 0 and 120.")
    
    return True


def validate_data_integrity(data):
    """
    Ensures the data is consistent across different parts of the dataset, using both format and value validation functionalities.

    Args:
        data (dict): The dataset to validate.

    Returns:
        bool: True if the data integrity is maintained, False otherwise.

    Raises:
        ValueError: If the data integrity is not maintained.
    """
    try:
        validate_data_format(data)
        validate_data_values(data)
    except ValueError as e:
        raise ValueError(f"Data integrity validation failed: {e}")
    
    return True


def run_data_validation(data):
    """
    This is the main function that will execute the data validation process,
    utilizing format and value validations, and ensuring data integrity.

    Args:
        data (dict): The dataset to validate.

    Returns:
        bool: True if the data is valid in terms of format, values, and integrity, False otherwise.

    Raises:
        ValueError: If the data is not valid.
    """
    try:
        validate_data_integrity(data)
    except ValueError as e:
        raise ValueError(f"Data validation failed: {e}")
    
    return True
