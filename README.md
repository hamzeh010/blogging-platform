

# Blogging Platform

**Production Link**: [https://ai-gpt.ai/](https://ai-gpt.ai/)


```bash
A modern blogging platform built with **Next.js**, **React**, and **MongoDB**. This platform leverages **Redux Toolkit** for state management, **TailwindCSS** for styling, and **JWT** for authentication. It supports features like secure user authentication, blog creation, and a clean user interface.
```

## Getting Started

```bash
git clone https://github.com/your-username/blogging-platform.git
cd blogging-platform

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build

```

```bash
Configure Environment Variables

MONGO_URI=mongodb://localhost:27017/
DB_NAME=BlogDb

npm run dev

## Testing 

npm run test
```

## Features

- 🚀 **Next.js** for a performant, server-rendered React application.
- 🛠️ **Redux Toolkit** for robust state management.
- 🔒 Secure user authentication using **bcryptjs** and **JWT**.
- 💾 **MongoDB** integration for scalable database solutions.
- 🎨 **TailwindCSS** for modern styling.
- ✅ **ESLint** for linting and enforcing coding standards.
- 🛠️ Fully TypeScript-compatible.
- 🧪 Jest for unit and integration testing to ensure code reliability and coverage.
- 🐳 Docker for containerization and environment consistency.


## Prerequisites

Ensure you have the following installed:

- **Node.js**: `>=10.9.0`
- **NPM**: `>=22.11.0`
- **MongoDB**: A running MongoDB instance.



## Project Structure  
.
├── public          # Static assets
├── src
│   ├── components  # Reusable UI components
│   ├── pages       # Next.js pages
│   ├── store       # Redux store
│   ├── utils       # Utility functions
│   ├── styles      # TailwindCSS configurations and global styles
├── .env.local      # Environment variables
├── package.json    # Project metadata and dependencies
└── README.md       # Documentation


Singleton Design Pattern in Redux

In this project, we utilize the Singleton Design Pattern for managing the application state with Redux.

Why Singleton?
Single Store Instance: Redux maintains a single store for the entire application, which ensures that there is only one centralized place for state management. This aligns with the Singleton pattern, where the store is a unique and shared instance throughout the app.

Global State Management: The Redux store is shared globally across the app, providing consistent access to the state and ensuring that all components access and update the same instance.

Immutable State: The state managed by Redux is immutable, and only the store instance manages updates, ensuring a predictable and controlled environment for managing global state.

This approach allows for efficient state management, centralized debugging, and consistent state updates across the application.


# Blogging Platform

**Production Link**: [https://ai-gpt.ai/](https://ai-gpt.ai/)

A modern blogging platform built with **Next.js**, **React**, and **MongoDB**. This platform leverages **Redux Toolkit** for state management, **TailwindCSS** for styling, and **JWT** for authentication. It supports features like secure user authentication, blog creation, and a clean user interface.


Core Features
User Authentication:

User registration and login.
Authentication-secured blog post creation, editing, and deletion.
State Management:

Handled with Redux Toolkit for managing authentication and blog post data.
Blog Post Management:

View a list of blog posts.
Detailed blog post view.
Authenticated users can create, edit, and delete blog posts.
Backend API:

Built with Node.js, supporting CRUD operations for users and blog posts.
Comprehensive error handling and data validation.


Additional Features
Responsive Design: Optimized for various devices.
Design Pattern: Implements a Singleton pattern for centralized configuration management.
CI/CD Pipeline: Integrated GitHub Actions for linting, testing, and deployment.
Unit Tests: Coverage for critical components.


System Design
Architecture Overview
Frontend: React with Next.js for SSR and SEO-friendly routing.
Backend: Node.js with RESTful API endpoints for authentication and blog management.
Database: MongoDB for scalable and efficient data storage.
State Management: Redux Toolkit for global state handling.
Interaction
Frontend communicates with the backend via REST API endpoints.
CI/CD Pipeline ensures continuous integration and deployment to production.

