# PVT — Social Media Platform 🚀

A full-stack social media web application built using React.js, Node.js, Express.js, and MongoDB.

**Status:** 🚧 Currently in development

## 📌 About the Project

PVT is a social media platform where users can create posts, share images, and interact with content from other users. The application features a clean, grey-and-white interface with a sidebar, a central post feed, and a recent posts section.

The frontend is built using React.js and connects to a backend developed with Node.js and Express.js. MongoDB is used to store application data, while Cloudinary handles image uploads.

## 🖥️ Screenshots

### 1. Home Feed

The main interface displays user information, posts, voting buttons, and recent posts.

<img width="1892" height="970" alt="image" src="https://github.com/user-attachments/assets/8150abf2-f9af-4497-8d79-627c0e9494a8" />


### 2. Create Post

<img width="1176" height="456" alt="image" src="https://github.com/user-attachments/assets/ba5ee438-a651-4375-9b23-dd43b4dbfc9c" />

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend**
- Node.js
- Express.js
- REST APIs

**Database and Image Uploads**
- MongoDB
- Mongoose
- Cloudinary
- Multer

**Authentication**
- JSON Web Tokens (JWT)

## ✨ Features

- User signup and login
- User profile information and profile photos
- Create and display posts
- Upload post images using Cloudinary
- Upvote and downvote posts
- Display posts from different users
- Recent posts section
- React frontend connected to the backend API
- MongoDB integration for storing users and posts
- Simple grey-and-white user interface

## 📂 Project Structure

```text
pvt/
├── controllers/
├── models/
├── routes/
├── utils/
├── app.js
├── server.js
├── package.json
└── pvt-FD/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── CreatePost.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Post.jsx
    │   │   ├── Rightbar.jsx
    │   │   └── Sidebar.jsx
    │   ├── pages/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── api.js
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- MongoDB database
- Cloudinary account

### 1. Install backend dependencies

From the project root directory:

```bash
npm install
```

Configure the required backend environment variables before starting the server.

### 2. Start the backend

```bash
npm run start
```

### 3. Install frontend dependencies

Open another terminal:

```bash
cd pvt-FD
npm install
```

### 4. Start the frontend

```bash
npm run dev
```

Open the local URL displayed in the terminal. Ensure the API URL in `src/api.js` points to your running backend.

## 🔐 Environment Variables

Configure your MongoDB connection string, JWT secret, Cloudinary credentials, and other required settings in your local environment file.

Never upload credentials or secrets to GitHub.

## 📚 What I'm Learning

- Building reusable components with React.js
- Connecting frontend components to backend APIs
- Developing REST APIs with Node.js and Express.js
- Managing data with MongoDB and Mongoose
- Implementing authentication and authorization
- Handling image uploads using Multer and Cloudinary
- Debugging and improving a full-stack application

## 🚧 Current Development Status

I am currently working on this project, improving existing functionality, fixing bugs, and adding new features as I continue learning full-stack web development.
