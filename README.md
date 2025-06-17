# 📝 Minimal Blogging Platform API

A simple RESTful API for a minimal blogging platform built using **Express**, **Prisma**, and **PostgreSQL**. It allows for the creation and management of users and their blog posts.

---

## 🚀 Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **Prisma ORM** – Database toolkit
- **PostgreSQL** – Relational database

---

## 📌 Project Description

This project implements a backend API for managing users and their blog posts. It supports operations such as creating users, adding posts, retrieving users with their posts, updating posts, and deleting both users and posts. It is suitable for learning full-stack development basics, REST principles, and Prisma ORM usage with PostgreSQL.

---

## 📬 Endpoints

###  Users and posts

#### `GET /users` , `GET/posts
- **Description:** Returns a list of all users. and also returns a list of all posts
- **Response Example:**
```json

  {
    "id": "uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "username": "johndoe"
  
[
  {
    "title": "this is leby",
    "content": "lebby is from sieko",
    "iscompleted": "false",
    "authorid": "UUID",
   
  }
]
