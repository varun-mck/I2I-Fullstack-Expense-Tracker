# Import any required libraries
import os
import sys
import logging

# Define any constants or configurations
CONFIG = {
    'DATABASE_URL': 'postgresql://localhost/mydatabase',
    'SECRET_KEY': 'mysecretkey',
}

# Define any functions or classes
class Quiz:
    def __init__(self, id):
        self.id = id
        self.questions = []

    def add_question(self, question):
        self.questions.append(question)

    def delete_question(self, question_id):
        if question_id in self.questions:
            self.questions.remove(question_id)
            return True
        else:
            return False

# Implement the display_quiz_function
def display_quiz_function(quiz):
    # Implement the display logic here
    pass

# Test the display_quiz_function
def test_display_quiz_function():
    quiz = Quiz(1)
    quiz.add_question('What is the capital of France?')
    quiz.add_question('What is the capital of Spain?')
    display_quiz_function(quiz)
    assert len(quiz.questions) == 2
