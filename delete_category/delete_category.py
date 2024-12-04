def delete_category(category_name):
    # Check if the category is in use
    if check_category_in_use(category_name):
        raise ValueError("Category is in use")

    # Delete the category from the database
    delete_from_database(category_name)

def check_category_in_use(category_name):
    # Check if the category is being used in any products
    if is_category_in_use(category_name):
        return True
    return False

def delete_from_database(category_name):
    # Delete the category from the database
    pass

def is_category_in_use(category_name):
    # Check if the category is being used in any products
    pass
