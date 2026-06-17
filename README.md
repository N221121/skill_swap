## 🔁 Skill Swap Platform

A full-stack web application that enables users to exchange skills with each other.
Users can list skills they can teach, request skills they want to learn, and connect with others for mutual learning.

## 🚀 Features
👤 User registration and login
🧑‍🏫 Add skills you can teach
🎯 Request skills from other users
✅ Accept / ❌ reject skill swap requests
✏️ Edit and delete skills
📊 View user dashboard with requests and activity
🔐 User validation using middleware

## 🛠️ Tech Stack
Frontend
HTML
CSS
JavaScript
Backend
Node.js
Express.js
Data Storage
In-memory data (JavaScript files in /backend/data)

## project structure
skill_swap/
│
├── backend/
│   ├── data/
│   │   ├── users.js
│   │   └── requests.js
│   │
│   ├── middleware/
│   │   └── validateUser.js
│   │
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── requestRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── .gitignore

## git clone https://github.com/N221121/skill-swap.git
cd skill-swap

## backend setup
cd backend
npm install
node server.js

## Frontend setup

Just open:
frontend/index.html
OR use Live Server in VS Code.

## 🔐 Middleware
Validates user requests
Ensures only registered users can access routes

## 📌 Future Improvements
🔥 Add MongoDB database
💬 Real-time chat between users
🔔 Notifications system
⭐ Skill rating system
🌐 Deploy frontend + backend online

## 👨‍💻 Author

Tejaswini kotha
Full Stack Developer

## ⭐ Project Goal

To build a simple but powerful peer-to-peer learning platform where users can exchange knowledge and grow together.
