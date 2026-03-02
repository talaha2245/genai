# GenAI Chat

A real-time messaging application that lets users sign up, find friends, and exchange messages through an instant WebSocket-powered chat interface.

## Features

- **User Authentication** – Register and log in with a username and password (bcrypt-hashed).
- **Find Friends** – Search for other registered users to start a conversation.
- **Real-time Messaging** – Messages are delivered instantly via WebSockets without page refreshes.
- **Conversation History** – Previous messages are persisted in MongoDB and loaded on demand.
- **Responsive UI** – Built with React, TailwindCSS, and shadcn/ui components.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite, TailwindCSS, Jotai, React Router |
| Backend | Node.js, Express 5, TypeScript, WebSocket (`ws`) |
| Database | MongoDB (Mongoose ODM) |
| Auth | JSON Web Tokens (JWT), bcrypt |

## Project Structure

```
genai/
├── backend/          # Express + WebSocket server
│   └── src/
│       ├── Controller/   # Route handler logic
│       ├── Model/        # Mongoose schemas (User, Message, Conversation)
│       ├── Routes/       # Express routers
│       └── index.ts      # Server entry point
└── frontend/         # React + Vite SPA
    └── src/
        ├── components/   # Reusable UI components
        ├── pages/        # Route-level page components
        ├── store/        # Jotai global state atoms
        └── types/        # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or Atlas)

### Backend

```bash
cd backend
npm install
# Create a .env file:
#   Connection_string=mongodb://localhost:27017/genai
#   JWT_screat=your_jwt_secret
#   PORT=3001
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Overview

All REST endpoints are prefixed with `/api/v1`.

| Method | Path | Description |
|--------|------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Log in and receive an auth cookie |
| GET | `/auth/logout` | Clear the auth cookie |
| GET | `/user/me` | Get the current logged-in user |
| PUT | `/user/me` | Update the current user's profile |
| GET | `/user/me/:id` | Get another user's details by their ID |
| GET | `/user/:name` | Search users by name |
| GET | `/user/` | List all users |
| GET | `/conversation` | Get all conversations for the current user |
| POST | `/conversation` | Send a message (creates conversation if needed) |
| GET | `/conversation/:id` | Get all messages with a specific user |
| GET | `/conversation/message/:id` | Get a single message by ID |

## WebSocket

Connect to `ws://localhost:3001?userId=<yourUserId>` after login to receive real-time `new_message` events.
