# Blogging Platform

A modern blogging platform built with **Next.js**, **React**, and **MongoDB**. This platform leverages **Redux Toolkit** for state management, **TailwindCSS** for styling, and **JWT** for authentication. It supports features like secure user authentication, blog creation, and a clean user interface.

## Features

- 🚀 **Next.js** for a performant, server-rendered React application.
- 🛠️ **Redux Toolkit** for robust state management.
- 🔒 Secure user authentication using **bcryptjs** and **JWT**.
- 💾 **MongoDB** integration for scalable database solutions.
- 🎨 **TailwindCSS** for modern styling.
- ✅ **ESLint** for linting and enforcing coding standards.
- 🛠️ Fully TypeScript-compatible.

## Prerequisites

Ensure you have the following installed:

- **Node.js**: `>=10.9.0`
- **NPM**: `>=22.11.0`
- **MongoDB**: A running MongoDB instance.

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/blogging-platform.git
cd blogging-platform


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


### Core Features
- **User Authentication**:
  - User registration and login.
  - Authentication-secured blog post creation, editing, and deletion.

- **State Management**:
  - Handled with **Redux Toolkit** for managing authentication and blog post data.

- **Blog Post Management**:
  - View a list of blog posts.
  - Detailed blog post view.
  - Authenticated users can create, edit, and delete blog posts.

- **Backend API**:
  - Built with **Node.js**, supporting CRUD operations for users and blog posts.
  - Comprehensive error handling and data validation.

### Additional Features
- **Responsive Design**: Optimized for various devices.
- **Design Pattern**: Implements a Singleton pattern for centralized configuration management.
- **CI/CD Pipeline**: Integrated GitHub Actions for linting, testing, and deployment.
- **Unit Tests**: Coverage for critical components.

---

## System Design

### Architecture Overview
1. **Frontend**: React with Next.js for SSR and SEO-friendly routing.
2. **Backend**: Node.js with RESTful API endpoints for authentication and blog management.
3. **Database**: MongoDB for scalable and efficient data storage.
4. **State Management**: Redux Toolkit for global state handling.

### Interaction
- **Frontend** communicates with the backend via REST API endpoints.
- **CI/CD Pipeline** ensures continuous integration and deployment to production.

---

## Prerequisites

- **Node.js**: `>=10.9.0`
- **NPM**: `>=22.11.0`
- **MongoDB**: A running MongoDB instance.
- **Git**: Installed for repository cloning.
- **Docker**: Optional for containerized setup.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blogging-platform.git
cd blogging-platform

npm install

Create a .env.local file in the root directory and configure it as follows:

MONGO_URI=mongodb://localhost:27017/
DB_NAME=BlogDb


Start the Server

npm run start