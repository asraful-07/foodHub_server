# FoodHub Backend API

> A robust and scalable RESTful API for a modern food delivery platform built with Node.js, Express, TypeScript, and PostgreSQL.

[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5+-blue.svg)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-v4+-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-v5+-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v14+-336791.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

FoodHub Backend is a comprehensive API service designed to power a modern food delivery platform. It provides robust endpoints for user management, restaurant operations, order processing, and real-time delivery tracking. Built with enterprise-grade security and scalability in mind, this backend serves as the foundation for a seamless food ordering experience.

### Key Highlights

- **Secure Authentication**: JWT-based authentication with refresh token rotation and bcrypt password hashing
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Database ORM**: Prisma for type-safe database queries and migrations
- **RESTful Architecture**: Clean, consistent API design following REST principles
- **Scalable Structure**: Modular architecture for easy maintenance and scaling
- **Production Ready**: Comprehensive error handling, logging, and security measures

## ✨ Features

### User Management

- User registration and authentication
- Role-based access control (Customer, Restaurant Owner, Delivery Partner, Admin)
- Profile management and preferences
- Password reset and email verification

### Restaurant Operations

- Restaurant registration and management
- Menu and item management
- Operating hours and availability settings
- Rating and review system

### Order Processing

- Real-time order placement and tracking
- Order status management workflow
- Payment integration ready
- Order history and receipts

### Delivery Management

- Delivery partner assignment
- Real-time location tracking
- Delivery status updates
- Route optimization ready

### Additional Features

- Advanced search and filtering
- Favorites and order history
- Notifications system integration
- Analytics and reporting endpoints

## 🛠 Tech Stack

### Core Technologies

- **Runtime**: Node.js (v18+)
- **Language**: TypeScript (v5+)
- **Framework**: Express.js (v4+)
- **Database**: PostgreSQL (v14+)
- **ORM**: Prisma (v5+)

### Authentication & Security

- **JWT**: JSON Web Tokens for stateless authentication
- **Bcrypt**: Secure password hashing
- **Helmet**: Security headers middleware
- **CORS**: Cross-Origin Resource Sharing configuration
- **Express Rate Limit**: API rate limiting

### Validation & Utilities

- **Zod** / **Joi**: Request validation
- **Morgan**: HTTP request logger
- **Dotenv**: Environment variable management
- **Cookie Parser**: Cookie parsing middleware

### Development Tools

- **Nodemon**: Auto-restart during development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **ts-node**: TypeScript execution

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Package manager
- **PostgreSQL**: v14.0 or higher ([Download](https://www.postgresql.org/download/))
- **Git**: Version control ([Download](https://git-scm.com/))

## 🚀 Installation

### 1. Clone the Repository

```bash
git https://github.com/asraful-07/foodHub_server
cd foodhub-backend
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

## 🗄️ Database Setup

### 1. Create PostgreSQL Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE foodhub_db;

# Exit psql
\q
```

### 2. Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# (Optional) Seed database
npx prisma db seed
```

### 3. View Database in Prisma Studio

```bash
npx prisma studio
```

This opens a GUI at `http://localhost:5555` to view and edit your data.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The server will start at `http://localhost:5001` with hot-reload enabled.

## 🔐 Authentication

FoodHub uses JWT-based authentication with the following flow:

### Registration Flow

1. User submits registration details
2. Password is hashed using bcrypt (10 rounds)
3. User record is created in database
4. Access token (15min) and refresh token (7d) are generated
5. Tokens are sent via HTTP-only cookies

## 🚀 Deployment

### Environment Preparation

1. Set `NODE_ENV=production` in your environment
2. Update `DATABASE_URL` to production database
3. Set strong, unique JWT secrets
4. Configure CORS for your frontend domain

### Deployment Options

#### Option 1: Railway / Render

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

#### Option 2: AWS / DigitalOcean

1. Set up PostgreSQL instance
2. Deploy Node.js application
3. Configure reverse proxy (Nginx)
4. Set up SSL certificate

#### Option 3: Docker

```dockerfile
# Dockerfile included in repository
docker build -t foodhub-backend .
docker run -p 5000:5000 foodhub-backend
```

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL/TLS enabled
- [ ] Rate limiting configured
- [ ] Logging set up
- [ ] Error monitoring (Sentry, etc.)
- [ ] Database backups scheduled
- [ ] Health check endpoint active

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow ESLint and Prettier configurations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Project Lead**: Your Name
- **Backend Developer**: Your Name
- **Contributors**: [All Contributors](https://github.com/yourusername/foodhub-backend/graphs/contributors)

## 📞 Support

For support and questions:

- **Email**: support@foodhub.com
- **Documentation**: [docs.foodhub.com](https://docs.foodhub.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/foodhub-backend/issues)

## 🙏 Acknowledgments

- Express.js community
- Prisma team
- PostgreSQL contributors
- All open-source contributors

---

**Made with ❤️ by the FoodHub Team**

[⬆ Back to Top](#foodhub-backend-api)
