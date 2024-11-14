# Use the official MySQL image from the Docker Hub
FROM mysql:8.0

# Set environment variables
ENV MYSQL_DATABASE=expensetracker
ENV MYSQL_ROOT_PASSWORD=rootpassword

# Expose the MySQL port
EXPOSE 3306