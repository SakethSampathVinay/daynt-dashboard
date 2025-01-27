#Daynt Dashboard

Daynt Dashboard is a full-stack web application designed to manage user data through an interactive and user-friendly interface. The application provides a secure login system and a dashboard for performing CRUD (Create, Read, Update, Delete) operations on user information. The age of users is automatically calculated based on their date of birth, and all actions are accompanied by real-time feedback using toast notifications.

Features of the Application

User Authentication: Secure login and signup using JWT-based authentication.
Dashboard:
View a data table with columns for:
Name
Date of Birth
Age (auto-calculated)
Actions (Edit and Delete)
Fetch and display a list of 20 users from the backend.

CRUD Operations:
Add User: Add a new user by entering their name and date of birth.
Edit User: Update existing user details directly in the dashboard.
Delete User: Remove a user from the system with a single click.


Real-Time Feedback:
Toast notifications for success or error messages during user actions.
Dynamic Data Loading: Skeleton loaders or activity indicators while data is fetched or updated.
Responsive Design: User interface optimized for various screen sizes.

Technologies Used
Frontend:
React.js: For building the user interface.
Vite: A fast build tool and development environment.
React-Router: For navigation between pages.
React-Toastify: For displaying toast notifications.
CSS: For styling the components.

Backend:
Node.js: For server-side development.
Express.js: For creating APIs.
MongoDB: For storing user data.
Mongoose: For MongoDB object modeling.
JWT: For authentication and authorization.

Application Type
Type: Full-stack web application.
Purpose: A user management system to perform CRUD operations with a focus on simplicity, usability, and secure data handling.