# Task Management API

A modern REST API for managing tasks, boards, workspaces, and team collaboration. Built with Express.js, Prisma ORM, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Error Handling](#error-handling)

## ✨ Features

- **User Authentication**: Register, login, and JWT-based token management
- **Workspace Management**: Create and manage workspaces with team members
- **Board Management**: Organize boards within workspaces
- **Task Management**: Create, update, and track tasks within columns
- **Team Collaboration**: Add members to workspaces with different roles
- **Rate Limiting**: Built-in rate limiting for API security
- **Password Hashing**: Secure password storage with bcryptjs
- **CORS Support**: Cross-origin resource sharing enabled

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js** | Web framework |
| **Prisma** | ORM for database operations |
| **PostgreSQL** | Database |
| **JWT** | Authentication and authorization |
| **bcryptjs** | Password hashing |
| **Zod** | Data validation |
| **Morgan** | HTTP request logging |
| **Nodemon** | Development auto-reload |

## 📦 Prerequisites

- Node.js >= 16.x
- PostgreSQL >= 12.x
- npm or yarn package manager

## 📁 Project Structure

```
.task
├── prisma/
│   ├── migrations/              # Database migrations
│   │   ├── 20260223163005_init/
│   │   │   └── migration.sql
│   │   ├── 20260309155123_init/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma            # Database schema definition
├── src/
│   ├── app.js                   # Express app entry point
│   ├── handler/                 # HTTP request handlers
│   │   ├── auth.handler.js
│   │   ├── board.handler.js
│   │   ├── task.handler.js
│   │   └── workspace.handler.js
│   ├── service/                 # Business logic layer
│   │   ├── auth.service.js
│   │   ├── board.service.js
│   │   ├── task.service.js
│   │   └── workspace.service.js
│   ├── repository/              # Database queries (Prisma)
│   │   ├── board.repo.js
│   │   ├── task.repo.js
│   │   ├── user.repo.js
│   │   └── workspace.repo.js
│   ├── routes/
│   │   └── api.route.js         # Route definitions
│   ├── middleware/
│   │   └── auth.middleware.js   # JWT authentication middleware
│   ├── validation/              # Zod validation schemas
│   │   ├── auth.validation.js
│   │   ├── board.validation.js
│   │   ├── task.validation.js
│   │   └── workspace.validation.js
│   ├── utils/                   # Utility functions
│   │   ├── hashing.utils.js
│   │   └── jwt.utils.js
│   └── prisma/
│       └── prismaClient.js      # Prisma client instance
├── .env.example                 # Environment variables template
├── package.json                 # Project dependencies
├── package-lock.json            # Lock file for npm dependencies
├── prisma.config.ts             # Prisma configuration (if applicable)
├── README.md                     # Project documentation
├── API_DOCUMENTATION.md         # Detailed API reference
├── QUICK_START.md               # Quick setup guide
└── DEVELOPMENT.md               # Developer guide
```

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Zyprush18/task.git
cd task
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Environment File
```bash
cp .env.example .env
```

### 4. Configure Database Connection
Edit `.env` and add your PostgreSQL connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/task_db"
STATUS_APP="development"
JWT_SECRET="your-secret-key-here"
```

### 5. Setup Database
```bash
# Create and migrate database
npx prisma migrate

# Generate Prisma Client
npx prisma generate
```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The server will start at `http://localhost:5000`

### Production Mode
```bash
npm start
```

## 📊 Database Schema

### Users
Stores user account information.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| username | String | User's display name |
| email | String | Unique email address |
| password | String | Hashed password |
| created_at | DateTime | Account creation timestamp |
| updated_at | DateTime | Last update timestamp |
| deleted_at | DateTime | Soft delete timestamp |

### Workspace
Represents a workspace/project.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| name | String | Workspace name (max 50 chars) |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update timestamp |
| deleted_at | DateTime | Soft delete timestamp |

### WorkspaceMember
Associates users with workspaces and defines roles.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| role | Enum | `owner` or `member` |
| user_id | Int | Foreign key to Users |
| workspace_id | Int | Foreign key to Workspace |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update timestamp |
| deleted_at | DateTime | Soft delete timestamp |

### Board
Represents a task board within a workspace.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| name | String | Board name |
| workspace_id | Int | Foreign key to Workspace |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update timestamp |
| deleted_at | DateTime | Soft delete timestamp |

### Column
Represents a column within a board.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| name | String | Column name |
| board_id | Int | Foreign key to Board |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update timestamp |
| deleted_at | DateTime | Soft delete timestamp |

### Task
Represents a task within a column.

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Primary key |
| title | String | Task title |
| description | Text | Detailed description |
| position | String | Task position in column |
| column_id | Int | Foreign key to Column |
| created_at | DateTime | Creation timestamp |
| updated_at | DateTime | Last update timestamp |
| deleted_at | DateTime | Soft delete timestamp |

## 🔐 Authentication

### Token-Based Authentication

This API uses **JWT (JSON Web Tokens)** for authentication.

#### Access Token
- Issued on login/registration
- Short-lived (typical: 1 hour)
- Sent in `Authorization` header as `Bearer <token>`

#### Refresh Token
- Issued on login
- Long-lived (typical: 7 days)
- Stored in HTTP-only cookie
- Used to obtain new access tokens

### How to Authenticate

Include the access token in all protected endpoint requests:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

---

## 🔓 Authentication Endpoints

### Register User
Create a new user account.

**Endpoint:** `POST /register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**Request Validation:**
- `username`: String, minimum 3 characters
- `email`: Valid email format
- `password`: String, 6-12 characters

**Success Response (201 Created):**
```json
{
  "message": "success"
}
```

**Error Responses:**
```json
// Validation error
{
  "message": "Validation Error",
  "error": {
    "username": { "_errors": ["String must contain at least 3 character(s)"] }
  }
}

// Email already exists
{
  "message": "Email Already Exists"
}

// Server error
{
  "message": "internal server Error"
}
```

---

### Login
Authenticate user and receive tokens.

**Endpoint:** `POST /login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

**Success Response (201 Created):**
```json
{
  "message": "success login",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Cookies Set:**
- `refresh_token`: HTTP-only cookie containing refresh token

**Error Responses:**
```json
// Invalid email or password
{
  "message": "Invalid Email or Password"
}

// Validation error
{
  "message": "Validation Error",
  "error": { }
}
```

---

### Logout
Clear user session.

**Endpoint:** `POST /logout`

**Authentication:** Required (Bearer token)

**Success Response (200 OK):**
```json
{
  "message": "success logout"
}
```

---

### Refresh Token
Generate new access token using refresh token.

**Endpoint:** `POST /refresh`

**Cookies Required:**
- `refresh_token`: Refresh token from login

**Success Response (200 OK):**
```json
{
  "message": "succcess generate new access token",
  "new_access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
```json
// Missing refresh token
{
  "message": "refresh token is missing"
}

// Refresh token expired
{
  "message": "refresh token expire"
}
```

---

### Get Profile
Retrieve authenticated user's profile.

**Endpoint:** `GET /profile`

**Authentication:** Required (Bearer token)

**Success Response (200 OK):**
```json
{
  "message": "success",
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "created_at": "2026-03-10T10:30:00Z",
    "updated_at": "2026-03-10T10:30:00Z"
  }
}
```

---

## 📌 Workspace Endpoints

### Get All Workspaces
Retrieve all workspaces for the authenticated user.

**Endpoint:** `GET /workspace`

**Authentication:** Required (Bearer token)

**Success Response (200 OK):**
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "My Project",
      "created_at": "2026-03-10T10:30:00Z",
      "updated_at": "2026-03-10T10:30:00Z"
    }
  ]
}
```

---

### Create Workspace
Create a new workspace as owner.

**Endpoint:** `POST /workspace/create`

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "name": "My New Project"
}
```

**Success Response (201 Created):**
```json
{
  "message": "success add new workspace"
}
```

---

### Get Workspace Details
Retrieve specific workspace with all members and boards.

**Endpoint:** `GET /workspace/:id_workspace`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_workspace` (required): Workspace ID

**Success Response (200 OK):**
```json
{
  "message": "success",
  "data": {
    "id": 1,
    "name": "My Project",
    "members": [...],
    "boards": [...],
    "created_at": "2026-03-10T10:30:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "not found workspace"
}
```

---

### Update Workspace
Update workspace name.

**Endpoint:** `PUT /workspace/:id_workspace`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_workspace` (required): Workspace ID

**Request Body:**
```json
{
  "name": "Updated Project Name"
}
```

**Success Response (200 OK):**
```json
{
  "message": "success update"
}
```

---

### Delete Workspace
Delete workspace and all associated data.

**Endpoint:** `DELETE /workspace/:id_workspace`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_workspace` (required): Workspace ID

**Success Response (200 OK):**
```json
{
  "message": "success delete"
}
```

---

### Add Workspace Member
Add a user to a workspace.

**Endpoint:** `POST /workspace/createMem/:id_workspace`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_workspace` (required): Workspace ID

**Request Body:**
```json
{
  "user_id": 2,
  "role": "member"
}
```

**Success Response (201 Created):**
```json
{
  "message": "success add member"
}
```

---

### Update Workspace Member Role
Change member's role in workspace.

**Endpoint:** `PUT /workspace/updateMem/:id_workspace`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_workspace` (required): Workspace ID

**Request Body:**
```json
{
  "user_id": 2,
  "role": "owner"
}
```

**Success Response (200 OK):**
```json
{
  "message": "success update"
}
```

---

### Remove Workspace Member
Remove user from workspace.

**Endpoint:** `DELETE /workspace/:id_workspace/deleteMem/:id_member`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_workspace` (required): Workspace ID
- `id_member` (required): Member ID

**Success Response (200 OK):**
```json
{
  "message": "success delete"
}
```

---

## 📋 Board Endpoints

### Get All Boards
Retrieve all boards accessible to user.

**Endpoint:** `GET /board`

**Authentication:** Required (Bearer token)

**Success Response (200 OK):**
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "name": "Todo",
      "workspace_id": 1,
      "columns": [...],
      "created_at": "2026-03-10T10:30:00Z"
    }
  ]
}
```

---

### Create Board
Create a new board.

**Endpoint:** `POST /board/create`

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "name": "New Board",
  "workspace_id": 1
}
```

**Success Response (201 Created):**
```json
{
  "message": "success add new board"
}
```

---

### Get Board Details
Retrieve board with columns and tasks.

**Endpoint:** `GET /board/:id_board`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_board` (required): Board ID

**Success Response (200 OK):**
```json
{
  "message": "success",
  "data": {
    "id": 1,
    "name": "Todo",
    "workspace_id": 1,
    "columns": [
      {
        "id": 1,
        "name": "To Do",
        "tasks": [...]
      }
    ],
    "created_at": "2026-03-10T10:30:00Z"
  }
}
```

---

### Update Board
Update board name.

**Endpoint:** `PATCH /board/:id_board`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_board` (required): Board ID

**Request Body:**
```json
{
  "name": "Updated Board Name"
}
```

**Success Response (200 OK):**
```json
{
  "message": "success update"
}
```

---

### Delete Board
Delete board and all contained data.

**Endpoint:** `DELETE /board/:id_board`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_board` (required): Board ID

**Success Response (200 OK):**
```json
{
  "message": "success delete"
}
```

---

## 📊 Column Endpoints

### Create Column
Create a new column in a board.

**Endpoint:** `POST /board/create/column`

**Authentication:** Required (Bearer token)

**Request Body:**
```json
{
  "name": "In Progress",
  "board_id": 1
}
```

**Success Response (201 Created):**
```json
{
  "message": "success add new column"
}
```

---

### Update Column
Update column name.

**Endpoint:** `PUT /board/column/:id_column`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_column` (required): Column ID

**Request Body:**
```json
{
  "name": "Updated Column Name"
}
```

**Success Response (200 OK):**
```json
{
  "message": "success update"
}
```

---

### Delete Column
Delete column and all contained tasks.

**Endpoint:** `DELETE /board/:id_board/column/:id_column`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_board` (required): Board ID
- `id_column` (required): Column ID

**Success Response (200 OK):**
```json
{
  "message": "success delete"
}
```

---

## ✅ Task Endpoints

### Get All Tasks
Retrieve all tasks for the authenticated user.

**Endpoint:** `GET /task`

**Authentication:** Required (Bearer token)

**Success Response (200 OK):**
```json
{
  "message": "success",
  "data": [
    {
      "id": 1,
      "title": "Complete project setup",
      "description": "Set up all required dependencies",
      "position": "1",
      "column_id": 1,
      "created_at": "2026-03-10T10:30:00Z"
    }
  ]
}
```

---

### Create Task
Create a new task in a column.

**Endpoint:** `POST /task/:column_id/create`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `column_id` (required): Column ID

**Request Body:**
```json
{
  "title": "Design database schema",
  "description": "Create and document the complete database schema"
}
```

**Success Response (201 Created):**
```json
{
  "message": "success add new task"
}
```

**Request Validation:**
- `title`: String, required
- `description`: String, required

---

### Get Task Details
Retrieve specific task information.

**Endpoint:** `GET /task/:id_task`

**Authentication:** Required (Bearer token)

**URL Parameters:**
- `id_task` (required): Task ID

**Success Response (200 OK):**
```json
{
  "message": "success",
  "data": {
    "id": 1,
    "title": "Complete project setup",
    "description": "Set up all required dependencies",
    "position": "1",
    "column_id": 1,
    "created_at": "2026-03-10T10:30:00Z",
    "updated_at": "2026-03-10T10:30:00Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "not found task"
}
```

---

## ⚠️ Error Handling

### Standard Error Response Format

```json
{
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET request |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Validation failed, missing parameter |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error |

### Common Error Messages

| Error | Cause |
|-------|-------|
| `auth token is required` | Missing Authorization header |
| `auth token is missing` | Malformed Authorization header |
| `Validation Error` | Request body fails validation |
| `not found workspace` | Workspace doesn't exist |
| `Email Already Exists` | Email is already registered |
| `refresh token expire` | Refresh token has expired |

---

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ HTTP-only refresh token cookies
- ✅ CORS protection
- ✅ Rate limiting (50 requests per 10 minutes)
- ✅ Zod schema validation on all inputs
- ✅ Soft delete support for data retention

---

## 📝 Example Usage

### Complete User Journey

```bash
# 1. Register
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "secure123"
  }'

# 2. Login
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "secure123"
  }'
# Response: { "access_token": "...", "message": "success login" }

# 3. Create Workspace
curl -X POST http://localhost:5000/api/workspace/create \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "name": "My Project" }'

# 4. Create Board
curl -X POST http://localhost:5000/api/board/create \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Todo Board", "workspace_id": 1 }'

# 5. Create Column
curl -X POST http://localhost:5000/api/board/create/column \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "name": "To Do", "board_id": 1 }'

# 6. Create Task
curl -X POST http://localhost:5000/api/task/1/create \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete setup",
    "position": "Position task in column board",
    "description": "Set up all project requirements"
  }'
```


## 👥 Contributing

Contributions are welcome! Please follow the existing code patterns and add tests for new features.

