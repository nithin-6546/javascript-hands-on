# E-Commerce Backend Integration

This project contains a Node.js and Express backend tailored for an E-commerce application, integrated with a MongoDB database.

## Folder Structure

- **`APIs/`**: Contains the route handlers (e.g., users, products, orders).
- **`models/`**: Mongoose schemas defining the structure of the database documents.
- **`server.js`**: The main entry point to start the Express server and connect to MongoDB.
- **`request.http`**: A file to test the API endpoints using an extension like REST Client in VS Code.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the server:**
   ```bash
   npm start
   # or
   node server.js
   ```

Make sure you have your MongoDB server running or a valid connection string set up in the code/environment variables.
