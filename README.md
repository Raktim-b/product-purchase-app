<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:3B82F6,50:2563EB,100:1D4ED8&height=220&section=header&text=Product%20Purchase%20Management%20System&fontSize=38&fontColor=ffffff&animation=fadeIn&fontAlignY=38"/>
</p>

> A complete **Product Purchase Management System** built with **Node.js, Express.js, MongoDB, EJS, and Tailwind CSS**. The application provides separate **Admin** and **User** modules where administrators manage categories and products, while users can register, verify their email through OTP, browse products, purchase products, and view their purchase history.

<p align="center">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,javascript,tailwind,git,github,vscode,postman" />
</p>

---

# 📌 Project Overview

This project simulates a real-world product purchase platform where an administrator manages the inventory and users can securely purchase products.

The application demonstrates full-stack backend development concepts including authentication, email verification, CRUD operations, MongoDB aggregation, file uploads, server-side rendering, and responsive UI development.

---

# 🎯 Features

## 🔐 Authentication

- User Registration
- OTP Email Verification
- Login using OTP
- Secure Logout
- Protected Routes

---

## 📂 Category Management (Admin)

- Add Category
- Edit Category
- Soft Delete Category
- Restore Category
- View Categories

---

## 📦 Product Management (Admin)

- Add Product
- Edit Product
- Soft Delete Product
- Restore Product
- Product Listing
- Category Assignment
- Stock Management

---

## 🛍 Product Purchase (User)

- Browse Products
- View Product Details
- Select Quantity
- Buy Product
- Automatic Stock Reduction
- Purchase History

---

## 👤 User Module

- Product Listing
- Product Details Page
- Purchase Products
- View Purchase History

---

# ✨ Highlights

- OTP Authentication
- Email Verification
- Image Upload using Cloudinary
- MongoDB Aggregation
- MongoDB Lookup
- MVC Architecture
- Responsive Dashboard
- Server Side Rendering (EJS)

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Frontend

- EJS
- Tailwind CSS

## Authentication

- JWT
- OTP Verification

## File Upload

- Multer
- Cloudinary

## Development Tools

- Git
- GitHub
- VS Code
- Postman

---

# 📂 Project Structure

```text
app
│
├── config
│   ├── cloudinary.js
│   ├── db.js
│   └── emailVerify.js
│
├── controller
│   ├── auth
│   ├── category
│   ├── product
│   └── user
│
├── middleware
│   ├── authCheck.js
│   ├── fileUploades.js
│   └── roleCheck.js
│
├── model
│   ├── categoryModel.js
│   ├── loginOtpModel.js
│   ├── otpModel.js
│   ├── product.db.js
│   ├── purchaseModel.js
│   └── registration.db.js
│
├── routes
│   ├── auth
│   ├── category
│   ├── product
│   ├── user
│   └── index.js
│
├── util
│   ├── httpStatusCode.js
│   ├── loginOtpEmail.js
│   └── sendEmail.js
│
├── validation
│
public
│
├── css
├── script
└── upload
│
views
│
├── auth
├── category
├── product
└── user
│
app.js
```

---

# 🗄 Database Collections

## Users

```javascript
{
    name,
    email,
    password,
    role,
    isVerified
}
```

---

## Categories

```javascript
{
    name,
    image,
    status,
    isDeleted
}
```

---

## Products

```javascript
{
    name,
    category,
    price,
    stock,
    image,
    isDeleted
}
```

---

## Purchases

```javascript
{
    user,
    product,
    quantity,
    price,
    totalPrice,
    createdAt
}
```

---

## OTP

```javascript
{
    userId,
    otp,
    expiresAt
}
```

---

# 🔄 Application Workflow

```text
Admin Login
      │
      ▼
Create Category
      │
      ▼
Add Product
      │
      ▼
User Registration
      │
      ▼
OTP Verification
      │
      ▼
Login
      │
      ▼
Browse Products
      │
      ▼
View Product Details
      │
      ▼
Select Quantity
      │
      ▼
Purchase Product
      │
      ▼
Stock Updated
      │
      ▼
Purchase History
```

---

# 🎨 User Features

✔ Register

✔ Verify OTP

✔ Login

✔ Browse Products

✔ View Product Details

✔ Purchase Products

✔ View Purchase History

---

# ⚙ Admin Features

✔ Category Management

✔ Product Management

✔ Update Products

✔ Soft Delete

✔ Restore Products

✔ Stock Management

---

# 📈 Skills Demonstrated

- Node.js
- Express.js
- MongoDB
- Mongoose
- MVC Architecture
- Server Side Rendering (EJS)
- Tailwind CSS
- JWT Authentication
- OTP Authentication
- Email Verification
- MongoDB Aggregation
- MongoDB Lookup
- CRUD Operations
- Image Upload
- Cloudinary Integration

---

# 🚀 Future Improvements

- Shopping Cart
- Wishlist
- Online Payment Integration
- Order Tracking
- Dashboard Analytics
- Pagination
- Product Reviews
- Search & Filtering

---

# ▶ Installation

Clone the repository

```bash
git clone https://github.com/your-username/product-purchase-management-system.git
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
PORT=4037

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

EMAIL=your_email

EMAIL_PASSWORD=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

Run the project

```bash
npm run dev
```

or

```bash
npm start
```

---

# 💼 Skills for Resume

This project demonstrates practical experience with:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- OTP Authentication
- Email Verification
- EJS
- Tailwind CSS
- MVC Architecture
- CRUD Operations
- MongoDB Aggregation
- MongoDB Lookup
- File Upload
- Cloudinary

---

# 👨‍💻 Author

## Raktim Bhattacharya

**Backend Developer**

💻 **Node.js • Express.js • MongoDB • EJS • Tailwind CSS**

---

# ⭐ Why This Project?

Unlike a basic CRUD application, this project implements a complete product purchasing workflow with separate Admin and User modules.

It demonstrates practical backend concepts including authentication, OTP verification, MongoDB aggregation, product management, stock updates after purchases, purchase history, and a responsive server-rendered interface.

The project reflects a real-world inventory and product purchasing system suitable for showcasing full-stack backend development skills.

<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3B82F6,50:2563EB,100:1D4ED8&height=120&section=footer"/>
</p>
