# Student Task Manager (Production Upgrade)

## Features

- User Registration
- User Login
- Forgot Password
- JWT Authentication
- Protected Routes
- Dashboard
- Add Task
- Update Task
- Delete Task
- Task Status Tracking
- User-specific Tasks
- Logout

## API Endpoints

### Authentication APIs

POST /auth/register  
POST /auth/login  
PUT /auth/forgot-password  

### Task APIs

GET /tasks  
POST /tasks  
PUT /tasks/:id  
DELETE /tasks/:id  

## Database Schema

### User Schema

- _id
- name
- email
- password
- createdAt

### Task Schema

- _id
- title
- description
- status
- userId
- createdAt

## Architecture Diagram

User  
↓  
React Frontend  
↓  
Node.js + Express Backend  
↓  
JWT Authentication Middleware  
↓  
MongoDB Database  

## Security Features

- Password Hashing using bcrypt
- JWT Token Authentication
- Protected Routes
- User-specific Data Isolation

## Project Flow

Register  
↓  
Login  
↓  
Dashboard  
↓  
Add Task  
↓  
Update Task  
↓  
Delete Task  
↓  
Logout