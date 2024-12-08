# File: security_compliance/security_utils.py

from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding
from cryptography.hazmat.backends import default_backend
import base64
import os


def encrypt_data(data: str, key: bytes) -> str:
    """
    Encrypts data transmissions to ensure they are secure.
    This function will apply encryption algorithms to data in transit to meet security standards.
    
    :param data: The string data to be encrypted.
    :param key: The encryption key.
    :returns: The encrypted data as a base64 encoded string.
    """
    try:
        # Ensure the key length is valid
        if len(key) not in {16, 24, 32}:
            raise ValueError("Invalid key length. Key must be 16, 24, or 32 bytes.")
        
        # Initialize cipher components
        iv = os.urandom(16)
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        encryptor = cipher.encryptor()
        
        # Pad the data
        padder = padding.PKCS7(128).padder()
        padded_data = padder.update(data.encode()) + padder.finalize()
        
        # Encrypt the data
        encrypted_data = encryptor.update(padded_data) + encryptor.finalize()
        
        # Encode with base64 to get a string representation
        encrypted_message = base64.b64encode(iv + encrypted_data).decode()

        return encrypted_message
    except Exception as e:
        raise RuntimeError(f"Encryption failed: {str(e)}")


def decrypt_data(encrypted_data: str, key: bytes) -> str:
    """
    Decrypts data transmissions to ensure that the data can be read after reception.
    This function will apply decryption algorithms to the encrypted incoming data.
    
    :param encrypted_data: The base64 encoded string of the encrypted data.
    :param key: The encryption key.
    :returns: The decrypted data as a string.
    """
    try:
        # Ensure the key length is valid
        if len(key) not in {16, 24, 32}:
            raise ValueError("Invalid key length. Key must be 16, 24, or 32 bytes.")

        # Decode the base64 encoded string
        encrypted_data_bytes = base64.b64decode(encrypted_data)
        
        # Extract IV and encrypted message
        iv = encrypted_data_bytes[:16]
        encrypted_message = encrypted_data_bytes[16:]
        
        # Initialize cipher components
        cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()
        
        # Decrypt the data
        padded_data = decryptor.update(encrypted_message) + decryptor.finalize()
        
        # Remove padding
        unpadder = padding.PKCS7(128).unpadder()
        data = unpadder.update(padded_data) + unpadder.finalize()
        
        return data.decode()
    except Exception as e:
        raise RuntimeError(f"Decryption failed: {str(e)}")
