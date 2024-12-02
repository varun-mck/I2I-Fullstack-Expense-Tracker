# Spendwise

- Created a comprehensive full-stack expense tracking web application utilizing Spring Boot, React.js, and MySQL, enabling efficient day-to-day financial management.
- Integrated multi-role functionality with user authentication to ensure secure access for both users and administrators, including features such as sign-in, sign-up, password reset, and email verification.
- Designed user-friendly dashboards for managing transactions, tracking upcoming/recurring expenses, generating monthly summaries and statistics, and overseeing budgets.
- Added management features such as search, filter, and pagination for enhanced usability.
  
## Local development startup:

### Pre-requisites

- Install extension packs for <b>Java and Spring boot in vscode</b>. These should take care of building the springboot backend.
  - Java Extension Pack: https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack
  - Spring Boot Extension Pack: https://marketplace.visualstudio.com/items?itemName=vmware.vscode-boot-dev-pack
- Install <b>Node</b> version 20.16 and npm (node package manager) version 10.8.1. These should help with building and serving the React frontend project locally
- Install <b>docker and docker compose</b>. Docker and docker compose are packaged together if you download docker desktop
- Recommended to install <b>MySQL Workbench</b> (or a similar db viewer) to efficiently use and update the MySQL db
  - https://dev.mysql.com/downloads/workbench/

### Startup

1. While on the root directory in the project folder, run `docker compose up`. This will create a mysql container with the database <b>expensetracker</b> and initialize it with test data. 
  - admin: admin@gmail.com / testing123
  - user: user@gmail.com / testing123

2. Under backend/src/main/java/com/fullStack/expenseTracker `open the file ExpenseTrackerApplication.java`. Run the Java program by clicking the run button on the top right. 
<br>Which Java and spring boot version to use is configured in pom.xml. This will start the backend server.

4. Go into the frontend folder and run `npm install` to install the required node packages.

5. In the same frontend folder run `npm run start` to start the local react web application