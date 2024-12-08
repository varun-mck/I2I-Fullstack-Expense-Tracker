# security_compliance/logging_utils.py

import logging

# Configuring the logger
logger = logging.getLogger('compliance_logger')
logger.setLevel(logging.INFO)

# Create a file handler
handler = logging.FileHandler('compliance.log')
handler.setLevel(logging.INFO)

# Create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)

# Add the handlers to the logger
logger.addHandler(handler)

def log_info(message):
    """
    Logs informational messages, including compliance verification status.
    This function will record each step of the compliance verification process 
    and its results.
    
    Parameters:
    message (str): The informational message to be logged.
    
    Returns:
    None
    """
    if not isinstance(message, str):
        raise ValueError("The log message must be a string.")
    
    logger.info(message)

