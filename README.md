# CPF Service API 🏗️

## 📌 Overview

This is a **REST API** built using **Node.js, Express, TypeScript, and PostgreSQL**.
It follows **Clean Architecture** and **SOLID principles**, ensuring **scalability, maintainability, and testability**.

### 🔥 Features

✅ CPF Validation and Storage
✅ CNPJ Validation and Storage
✅ RESTful API with Express
✅ PostgreSQL Database (via Prisma or `pg`)
✅ Follows **Clean Architecture** & **SOLID Principles**
✅ **Unit and Integration Tested** with Jest
✅ CI/CD Pipeline with GitHub Actions
✅ Modular Coding

---

## 🏛 **Clean Architecture Overview**

The project follows **Robert C. Martin’s Clean Architecture** approach:

```bash
/src
│── /entities         # 🏗️ Entities (Business Rules)
│    ├── cpf.ts     # CPF entity with validation logic
│
│── /application    # 🚀 Use Cases (Business Logic)
│    ├── CreateCPFUseCase.ts  # Create a CPF with validation
│    ├── GetAllCPFsUseCase.ts # Retrieve all CPFs
│    ├── DeleteCPFUseCase.ts  # Delete a CPF
│    ├── SwitchBlockCpfUseCase.ts  # Format CPF for display
│
│── /repositories # 🛠️ Database & External Services (Adapters)
│    ├── db.ts           # Database connection (Prisma or pg)
│    ├── cpf.repository.ts # Handles CPF persistence
│
│── /interfaces     # 🎭 Interface Adapters (Controllers & Routes)
│    ├── cpf.controller.ts  # Handles CPF API requests
│    ├── cpf.routes.ts      # CPF-related API endpoints
│
│── /tests          # 🧪 Testing (Unit & Integration)
│    ├── /__mocks__       # Mocks for Prisma/pg
│    ├── /entities      # Tests for CPF entity
│    ├── /application # Tests for use cases
│    ├── /repositories # Tests for repository layer
│    ├── /integration # API-level tests with Supertest
│── server.ts       # 🚀 App entry point & Express initialization
```

✅ **Separation of Concerns**  
✅ **Easier Testing**  
✅ **Modular and Scalable**

---

## 💡 **SOLID Principles in Action**

1. **S**ingle Responsibility Principle → Each class has a single responsibility.
2. **O**pen-Closed Principle → Code is **extendable without modifying existing logic**.
3. **L**iskov Substitution Principle → Use cases can be replaced without breaking the system.
4. **I**nterface Segregation Principle → Separation between different API responsibilities.
5. **D**ependency Inversion Principle → High-level modules depend on **abstractions**.

---

## 🛠️ **Technologies Used**

- **Node.js** + **Express** (Backend API)
- **TypeScript** (Static Typing)
- **PostgreSQL** (Database)
- **Prisma OR pg (node-postgres)** (Database ORM/Client)
- **Jest + Supertest** (Unit & Integration Testing)
- **Docker + Docker Compose** (Containerization)
- **GitHub Actions** (CI/CD for automated testing)

---

## 🚀 **Getting Started**

### **1️⃣ Clone the repository**

```sh
git clone https://github.com/your-repo/cpf-service.git
cd cpf-service
```

### \*\*2️⃣ Install Dependencies

```sh
npm install
```

3️⃣ Configure Environment Variables
Create a .env file and set: (this repo might have one just for testing purposes, i know we should never do this but it's just for testing)

```sh
DATABASE_URL=postgresql://user:password@localhost:5432/cpf_database
PORT=3000
```

4️⃣ Run the Application

```sh
npm run build && npm start
```

The API will be available at:
➡️ http://localhost:3000

## 🐳 Running with Docker

### 1️⃣ Change the .env DATABASE_URL to the one in the docker-compose.yml (should be default)

```sh
DATABASE_URL=postgresql://user:password@db:5432/cpf_database
```

### 2️⃣ Start Containers

```sh
docker-compose up -d
```

### 3️⃣ Check if the API + database is running

(optional, also can be done through UI client of docker)

```sh
docker ps
```

## 🧪 Testing

1️⃣ Run Unit Tests

```sh
npm run test
```

## 🚀 CI/CD Pipeline

✅ GitHub Actions runs all tests on every push or pull request.
✅ Ensures the code is always tested before deployment.

## 📄 License

This project is licensed under the MIT License.



