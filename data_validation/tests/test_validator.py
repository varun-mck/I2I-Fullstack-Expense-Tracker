import unittest
from data_validation.validator import validate_data_format, validate_data_values, validate_data_integrity, run_data_validation

class TestValidator(unittest.TestCase):

    def test_validate_data_format(self):
        valid_data = {"field1": "value1", "field2": "value2"}
        invalid_data = {"field1": 123, "field2": None}
        
        self.assertTrue(validate_data_format(valid_data))
        self.assertFalse(validate_data_format(invalid_data))

    def test_validate_data_values(self):
        valid_data = {"field1": "value1", "field2": "value2"}
        invalid_data = {"field1": "", "field2": "value2"}
        
        self.assertTrue(validate_data_values(valid_data))
        self.assertFalse(validate_data_values(invalid_data))

    def test_validate_data_integrity(self):
        consistent_data = {"field1": "value1", "field2": "value2"}
        inconsistent_data = {"field1": "value1", "field2": ""}
        
        self.assertTrue(validate_data_integrity(consistent_data))
        self.assertFalse(validate_data_integrity(inconsistent_data))

    def test_run_data_validation(self):
        valid_data = {"field1": "value1", "field2": "value2"}
        invalid_data_format = {"field1": 123, "field2": None}
        invalid_data_values = {"field1": "", "field2": "value2"}
        inconsistent_data = {"field1": "value1", "field2": ""}
        
        self.assertTrue(run_data_validation(valid_data))
        self.assertFalse(run_data_validation(invalid_data_format))
        self.assertFalse(run_data_validation(invalid_data_values))
        self.assertFalse(run_data_validation(inconsistent_data))

if __name__ == '__main__':
    unittest.main()
