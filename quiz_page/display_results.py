def display_results_function(quiz_object):
    """
    This function will display the results of the quiz to the user.
    It will take the quiz object as input and display the scores and feedback to the user.
    The function will also handle user input and update the quiz object accordingly.
    """
    # Display the scores and feedback to the user
    print(f"Your score: {quiz_object.score}")
    print(f"Feedback: {quiz_object.feedback}")

    # Handle user input and update the quiz object accordingly
    user_input = input("Do you want to retake the quiz? (y/n) ")
    if user_input.lower() == "y":
        quiz_object.retake_quiz()
    else:
        quiz_object.end_quiz()
