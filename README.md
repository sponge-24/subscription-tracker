# SubDub - Subscription Tracker API

A Node.js REST API for managing user subscriptions, built with Express and MongoDB.

## Features

- User authentication (sign up, sign in, sign out)
- Secure password hashing with bcrypt
- JWT-based authentication and authorization
- Subscription management (CRUD)
- User management (CRUD)
- Rate limiting and bot detection with Arcjet
- Centralized error handling middleware
- Environment-based configuration

## Project Structure

```
.
├── app.js
├── package.json
├── .env.development.local
├── .env.production.local
├── config/
│   ├── arcjet.js
│   └── env.js
├── controllers/
│   ├── auth.controller.js
│   ├── subscription.controller.js
│   └── user.controller.js
├── database/
│   └── mongodb.js
├── middlewares/
│   ├── arcjet.middleware.js
│   ├── auth.middleware.js
│   └── error.middleware.js
├── models/
│   ├── subscription.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── subscription.routes.js
│   └── user.routes.js
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB Atlas or local MongoDB instance

### Installation

1. Clone the repository:

    ```sh
    git clone <your-repo-url>
    cd subscription-tracker
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    - Copy `.env.development.local` and/or `.env.production.local` and update the values as needed.

4. Start the development server:

    ```sh
    npm run dev
    ```

    Or start in production mode:

    ```sh
    npm start
    ```

## API Endpoints

### Auth

- `POST /api/v1/auth/sign-up` – Register a new user
- `POST /api/v1/auth/sign-in` – Login and receive JWT
- `POST /api/v1/auth/sign-out` – (Not implemented)

### Users

- `GET /api/v1/users/` – List all users
- `GET /api/v1/users/:id` – Get user by ID (requires auth)
- `POST /api/v1/users/` – Create user (placeholder)
- `PUT /api/v1/users/:id` – Update user (placeholder)
- `DELETE /api/v1/users/:id` – Delete user (placeholder)

### Subscriptions

- `GET /api/v1/subscriptions/` – List all subscriptions (placeholder)
- `GET /api/v1/subscriptions/:id` – Get subscription details (placeholder)
- `POST /api/v1/subscriptions/` – Create subscription (requires auth)
- `PUT /api/v1/subscriptions/:id` – Update subscription (placeholder)
- `DELETE /api/v1/subscriptions/:id` – Delete subscription (placeholder)
- `GET /api/v1/subscriptions/user/:id` – Get subscriptions for a user (requires auth)
- `PUT /api/v1/subscriptions/:id/cancel` – Cancel subscription (placeholder)
- `PUT /api/v1/subscriptions/upcoming-renewals` – Get upcoming renewals (placeholder)

## Environment Variables

See `.env.development.local` for example values:

- `PORT` – Server port
- `NODE_ENV` – Environment (development/production)
- `DB_URI` – MongoDB connection string
- `JWT_SECRET` – JWT secret key
- `JWT_EXPIRES_IN` – JWT expiration (e.g., "1d")
- `ARCJET_KEY` – Arcjet API key
- `ARCJET_ENV` – Arcjet environment

## Notes

- Passwords are hashed before storage.
- JWT is used for authentication; include `Authorization: Bearer <token>` in protected routes.
- Arcjet is used for rate limiting and bot detection.
- Error handling is centralized via middleware.

## License

MIT

---

> _Never store passwords in plain text!_