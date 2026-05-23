# WTWR (What to Wear?) — Backend

## About the Project

WTWR is a RESTful API server built with Node.js and Express that powers
the "What to Wear?" application. It handles clothing item and user data,
providing endpoints to create, read, and delete resources stored in a
MongoDB database.

## Functionality

- Get a list of all clothing items
- Create a new clothing item with a name, weather type, and image URL
- Delete a clothing item by ID
- Get a list of all users
- Get a single user by ID
- Create a new user
- Handles unknown routes with descriptive 404 error responses
- Handles server errors with 500 error responses

## Technologies & Techniques Used

- **Node.js** — JavaScript runtime environment
- **Express.js v4** — Web framework for routing and middleware
- **MongoDB & Mongoose** — Database and ODM for data modeling
- **ESLint (Airbnb Style Guide)** — Code linting and consistency
- **Prettier** — Code formatting
- **Git & GitHub** — Version control
- **GitHub Actions** — Automated testing on push

## Project Structure

```text
se_project_express/
├── controllers/ # Route handler logic
├── models/ # Mongoose schemas
├── routes/ # Express routers
├── utils/ # Constants and helper utilities
└── app.js # Main application entry point
```

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with hot reload
