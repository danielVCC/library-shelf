# 📚 Library Shelf - Book Catalog

Welcome to **Library Shelf**, a book catalog developed with **Angular (frontend), Spring Boot (backend), and MySQL (database)**. The project allows managing books, authors, and categories, offering full CRUD operations.

## 🚧 Work in Progress

This project is currently a **Work in Progress (WIP)**. Some features may be incomplete or subject to change as development continues.

Additionally, certain parts of the application, such as **tests and documentation**, are still being improved and expanded.

## 🚀 Technologies Used

### **Frontend (Angular)**

- **Angular 17** with Standalone Components
- **Angular Router** for page navigation
- **Reactive Forms** for form handling
- **RxJS** for asynchronous API data management
- **Bootstrap** for styling and responsiveness

### **Backend (Spring Boot)**

- **Java 17** → Main programming language for backend development
- **Spring Boot 3.4** → Framework for building Java applications, simplifying configuration and development
- **Spring Data JPA** → Library for simplified database interaction using ORM (Hibernate)
- **Spring Web** → Spring module for building RESTful APIs
- **Hibernate 6.6** → JPA implementation used for object-relational mapping (ORM)

### **Database**

- **MySQL 8** → Relational database used for data storage
- **Amazon RDS** → AWS-managed database service used for MySQL hosting

## ✨ Features

✅ Listing books and authors with filters and sorting  
✅ Adding, editing, and removing books and authors  
✅ Book and author details page

---

## 📡 API Endpoints

### **📌 Author Endpoints**

| Method     | Endpoint            | Description               |
| ---------- | ------------------- | ------------------------- |
| **GET**    | `/api/authors`      | Lists all authors         |
| **GET**    | `/api/authors/{id}` | Retrieves an author by ID |
| **POST**   | `/api/authors`      | Adds a new author         |
| **PUT**    | `/api/authors/{id}` | Updates an author         |
| **DELETE** | `/api/authors/{id}` | Removes an author         |

### **📌 Book Endpoints**

| Method     | Endpoint                       | Description                          |
| ---------- | ------------------------------ | ------------------------------------ |
| **GET**    | `/api/books`                   | Lists all books                      |
| **GET**    | `/api/books/{id}`              | Retrieves a book by ID               |
| **GET**    | `/api/books/author/{authorId}` | Lists all books by a specific author |
| **POST**   | `/api/books`                   | Adds a new book                      |
| **PUT**    | `/api/books/{id}`              | Updates a book                       |
| **DELETE** | `/api/books/{id}`              | Removes a book                       |

### **📌 Category Endpoints**

| Method     | Endpoint               | Description                |
| ---------- | ---------------------- | -------------------------- |
| **GET**    | `/api/categories`      | Lists all categories       |
| **GET**    | `/api/categories/{id}` | Retrieves a category by ID |
| **POST**   | `/api/categories`      | Adds a new category        |
| **PUT**    | `/api/categories/{id}` | Updates a category         |
| **DELETE** | `/api/categories/{id}` | Removes a category         |

---
