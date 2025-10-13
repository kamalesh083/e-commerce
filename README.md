# E-Commerce Web Application

A modern e-commerce web application built with **ReactJS**, **Node.js**, **Express**, and **MongoDB**, featuring a sleek UI, shopping cart, product search, wishlist functionality, and authentication.

---

## Features

### **Frontend (ReactJS)**

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.
- **User Authentication**: Login, signup, and password reset functionality.
- **Product Catalog**: Browse products with categories, tags, and detailed descriptions.
- **Search Functionality**: Search products by name or category.
- **Product Details Page**: High-quality images, highlights, and customer reviews.
- **Shopping Cart**: Add, update, or remove items from cart with total price calculation.
- **Wishlist**: Users can save products to view later.
- **Back Button Navigation**: Easily return to the previous page.
- **Interactive UI**: Smooth animations and hover effects for buttons and cards.
- **Notifications**: Real-time success/error messages with `react-hot-toast`.

### **Backend (Node.js + Express)**

- **RESTful API** for products, users, carts, and wishlist management.
- **JWT Authentication** for secure API routes.
- **CRUD Operations**: Create, read, update, and delete products, cart items, and wishlist items.
- **Error Handling**: Graceful handling of invalid requests or server errors.

### **Database (MongoDB)**

- Stores user data, products, cart contents, and wishlist items.
- Flexible schema with Mongoose for easy updates and validations.

---

## Tech Stack

- **Frontend**: ReactJS, Tailwind CSS, React Router, React Hot Toast, Axios
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: MongoDB with Mongoose
- **Tools**: VS Code, Postman, Nodemon

---

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
