# 🛒 E-Commerce Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend](https://img.shields.io/badge/Frontend-ReactJS-blue?logo=react)](https://reactjs.org/)
[![Backend](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)](https://www.mongodb.com/)

A modern **e-commerce web app** with a sleek UI, shopping cart, wishlist, product search, and secure authentication.

---

## ✨ Features

### **🖥 Frontend (ReactJS)**

- 🎨 Responsive Design for all devices  
- 🔑 User Authentication (Login, Signup, Password Reset)  
- 🛍 Product Catalog with categories, tags & detailed descriptions  
- 🔍 Search Products by name or category  
- 📦 Product Details: High-quality images, highlights, reviews  
- 🛒 Shopping Cart: Add, update, remove items & calculate total price  
- 💖 Wishlist: Save products for later  
- 🔙 Back Button Navigation for easy browsing  
- ✨ Interactive UI with hover & transition effects  
- 🔔 Notifications with `react-hot-toast`  

### **⚡ Backend (Node.js + Express)**

- 🔗 RESTful API for products, users, carts, wishlist  
- 🛡 JWT Authentication for secure routes  
- 📝 CRUD Operations for products, cart items, wishlist  
- ⚠️ Error handling for invalid requests & server errors  

### **🗄 Database (MongoDB)**

- Stores users, products, cart, and wishlist items  
- Flexible schema via Mongoose  

---

## 🛠 Tech Stack

- **Frontend:** ReactJS, Tailwind CSS, React Router, Axios, react-hot-toast  
- **Backend:** Node.js, Express.js, JWT  
- **Database:** MongoDB with Mongoose  
- **Tools:** VS Code, Postman, Nodemon  
## Installation

### **Backend**

1. Clone the repository:

```bash
git clone https://github.com/yourusername/e-commerce-app.git
cd e-commerce-app/backend
```

Install dependencies:
```
npm install
```
Create a .env file with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```
npm run dev
```
Frontend

Navigate to the frontend directory:
```
cd ../frontend
```


Install dependencies:
```
npm install
```

Start the development server:
```
npm start
```

Folder Structure
```
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── server.js
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── assets
│   │   └── App.jsx
│   └── package.json
├── README.md
```

Usage

Visit http://localhost:5173 to view the app.

Authentication:

Sign up for a new account.

Login using your email and password.

Products:

Browse products, view details, and read reviews.

Add items to your cart or wishlist.

Cart & Wishlist:

Manage quantities, remove items, or clear cart.

Search:

Use the search bar to filter products by name or category

License
```
This project is licensed under the MIT License.
```
