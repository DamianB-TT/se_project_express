# WTWR (What to Wear?) — Backend

## About the Project

WTWR is a RESTful API server built with Node.js and Express that powers the "What to Wear?" application. It handles user authentication and authorization, clothing item management, and profile updates, with all data stored in a MongoDB database.

## Functionality

- User registration with hashed passwords and email uniqueness validation
- User login with JWT-based authentication (7-day token expiration)
- Protected routes requiring a valid JWT token
- Get and update the logged-in user's profile
- Get a list of all clothing items (public)
- Create a new clothing item with a name, weather type, and image URL
- Like and unlike clothing items
- Delete a clothing item (only the item's owner can delete it)
- Handles unknown routes with 404 error responses
- Handles server errors with 500 error responses

## Technologies & Techniques Used

- **Node.js** — JavaScript runtime environment
- **Express.js v4** — Web framework for routing and middleware
- **MongoDB & Mongoose** — Database and ODM for data modeling
- **bcryptjs** — Password hashing before storing to the database
- **jsonwebtoken** — Signing and verifying JWT tokens for authorization
- **validator** — Email and URL validation in Mongoose schemas
- **cors** — Cross-origin resource sharing for frontend integration
- **ESLint (Airbnb Style Guide)** — Code linting and consistency
- **Prettier** — Code formatting
- **Git & GitHub** — Version control
- **GitHub Actions** — Automated testing on push

## Project Structure

```text
se_project_express/
├── controllers/  # Route handler logic
├── middlewares/  # Authorization middleware
├── models/       # Mongoose schemas
├── routes/       # Express routers
├── utils/        # Error code constants and config
└── app.js        # Main application entry point
```

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with hot reload

`npm run lint` — to run the linter
