# Mini-Loan App

This project is a simple mini-loan application that allows users to apply for loans, get them approved by admins, view their loans, and make weekly repayments. The application is built using React.js for the frontend, Express.js for the backend, MySQL as the database, Sequelize as the ORM, Tailwind CSS for styling, and Swagger for API documentation.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.
- MySQL: Install and configure MySQL.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/hemansh/mini-loan
   cd mini-loan
2. **Install dependencies for both frontend and backend:**
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd miniloan_frontend
    npm install
    ```
    
### Configuration

1. **Backend Configuration:**

    - Create a .env file in the backend directory and set the following variables:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=123
    DB_DATABASE=miniloan
    DB_DIALECT=mysql

    PORT=3001

    ADMIN_EMAIL=admin@admin.com
    ADMIN_PASSWORD=admin
    ```
2. **Database Setup:**
    
    - Create a MySQL database with the name specified in your .env file (miniloan by default)

### Usage

1. **Start the backend server:**
    ```
    cd backend
    npm start
    ```
2. **Start the frontend application:**
    ```
    cd miniloan_frontend
    npm start
    ```
The frontend will be accessible at http://localhost:3000 and Backend will be accessible at http://localhost:3001.

## API Documentation

Swagger is used for API documentation. Once the backend server is running, you can access the Swagger documentation at http://localhost:3001/api-docs.

## License
This project is licensed under the MIT License - see the LICENSE file for details.