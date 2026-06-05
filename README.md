# MERN Book Catalog

Full-stack MERN application for managing an online book catalog.

## Features

- React frontend with functional components and hooks
- React Router pages for catalog, book details, login, and register
- Redux Toolkit and RTK Query for auth state and API calls
- Login/register with JWT authentication
- Authenticated book management UI
- Book CRUD operations: list, details, create, update, and delete
- Node.js, Express, MongoDB, and Mongoose backend
- Backend structure split into routes, controllers, models, and middlewares
- Password hashing with bcrypt and salt
- Protected routes with JWT middleware

## Backend API

- `POST /api/users` - register user
- `POST /api/users/login` - login user
- `GET /api/users/current` - get current authenticated user
- `GET /api/books` - get all books
- `GET /api/books/:id` - get one book
- `POST /api/books` - create a book, authenticated user only
- `PUT /api/books/:id` - update a book, authenticated user only
- `DELETE /api/books/:id` - delete a book, authenticated user only

## Project Structure

```text
backend/
  connect/
  controllers/
  middlewares/
  models/
  routes/
frontend/
  src/
    components/
    store/
```
