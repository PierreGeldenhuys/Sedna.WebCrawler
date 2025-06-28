# 🕷️ Sedna Web Crawler

A modern web crawler application built with **Kotlin/Ktor** backend and **React TypeScript** frontend. The application crawls websites within a single domain and returns all internal pages found, following a vertically sliced architecture with comprehensive testing.

## 📋 Table of Contents

- [Tech Stack Overview](#-tech-stack-overview)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Running with Docker Compose](#-running-with-docker-compose)
- [Running Without Docker](#-running-without-docker)
- [Testing](#-testing)
- [Debugging Guide](#-debugging-guide)
- [Development Workflow](#-development-workflow)

## 🛠️ Tech Stack Overview

### Backend: Kotlin + Ktor
**Why chosen:** Ktor provides a lightweight, coroutine-based framework perfect for building scalable web services. Kotlin's null safety and concise syntax make it ideal for robust backend development.

#### Backend Files:
- **`backend/build.gradle.kts`** - Gradle build configuration with Ktor dependencies and JAR packaging setup
- **`backend/gradlew`** - Unix Gradle wrapper script for cross-platform builds
- **`backend/gradlew.bat`** - Windows Gradle wrapper script
- **`backend/settings.gradle.kts`** - Gradle project settings and module configuration
- **`backend/src/main/kotlin/com/example/webcrawler/Application.kt`** - Main Ktor application entry point with server configuration
- **`backend/src/main/kotlin/com/example/webcrawler/features/ping/api/PingRoutes.kt`** - HTTP route definitions for ping endpoint
- **`backend/src/main/kotlin/com/example/webcrawler/features/ping/application/PingHandler.kt`** - Business logic handler for ping operations
- **`backend/src/main/kotlin/com/example/webcrawler/features/ping/domain/PingCommand.kt`** - Domain command objects for ping feature
- **`backend/src/test/kotlin/com/example/webcrawler/features/ping/api/PingRoutesTest.kt`** - Integration tests for ping API endpoints
- **`backend/src/test/kotlin/com/example/webcrawler/features/ping/application/PingHandlerTest.kt`** - Unit tests for ping handler logic

### Frontend: React + TypeScript + Vite
**Why chosen:** React provides excellent component reusability, TypeScript ensures type safety, and Vite offers lightning-fast development with hot module replacement.

#### Frontend Files:
- **`frontend/package.json`** - NPM dependencies, scripts, and project metadata
- **`frontend/vite.config.ts`** - Vite bundler configuration for development and production builds
- **`frontend/tsconfig.json`** - TypeScript compiler configuration for the entire project
- **`frontend/tsconfig.app.json`** - TypeScript configuration specific to the application code
- **`frontend/tsconfig.node.json`** - TypeScript configuration for Node.js tools like Vite
- **`frontend/vitest.config.ts`** - Test runner configuration for unit and integration tests
- **`frontend/eslint.config.js`** - ESLint configuration for code quality and style enforcement
- **`frontend/tailwind.config.js`** - Tailwind CSS configuration for utility-first styling
- **`frontend/postcss.config.cjs`** - PostCSS configuration for CSS processing
- **`frontend/index.html`** - Main HTML template and application entry point
- **`frontend/src/main.tsx`** - React application bootstrap and root component mounting
- **`frontend/src/App.tsx`** - Main application component with routing and layout
- **`frontend/src/App.css`** - Global application styles and component styling
- **`frontend/src/tailwind.css`** - Tailwind CSS imports and custom utility classes
- **`frontend/src/setupTests.ts`** - Test environment configuration and global test utilities
- **`frontend/src/vite-env.d.ts`** - TypeScript definitions for Vite environment variables
- **`frontend/src/redux/store.ts`** - Redux Toolkit store configuration with RTK Query
- **`frontend/src/features/ping/index.ts`** - Feature barrel exports for clean imports
- **`frontend/src/features/ping/ConnectionStatus.tsx`** - React component displaying backend connectivity status
- **`frontend/src/features/ping/ConnectionStatus.test.tsx`** - React Testing Library tests for connection status component
- **`frontend/src/features/ping/usePing.ts`** - Custom React hook for ping API interactions using RTK Query
- **`frontend/src/features/ping/usePing.test.ts`** - Unit tests for ping hook functionality
- **`frontend/src/features/ping/pingApi.ts`** - RTK Query API slice for ping endpoint definitions
- **`frontend/src/features/ping/flow.md`** - Mermaid diagram documenting ping feature architecture and flow

### State Management: Redux Toolkit + RTK Query
**Why chosen:** Redux Toolkit eliminates Redux boilerplate while RTK Query provides powerful data fetching with caching, background updates, and optimistic updates.

### Testing: JUnit 5 + Vitest + React Testing Library
**Why chosen:** JUnit 5 offers modern testing features for Kotlin/Java, Vitest provides fast test execution for frontend, and RTL ensures accessible, user-focused testing.

### Containerization: Docker + Docker Compose
**Why chosen:** Docker ensures consistent environments across development and production, while Docker Compose simplifies multi-service orchestration.

#### Docker Files:
- **`docker-compose.yml`** - Production multi-service configuration with health checks and networking
- **`docker-compose.dev.yml`** - Development environment with hot reload and debug ports
- **`docker-compose.prod.yml`** - Production-optimized configuration with NGINX reverse proxy
- **`Dockerfile.backend`** - Multi-stage Docker build for Kotlin/Ktor backend application
- **`Dockerfile.frontend`** - Multi-stage Docker build for React frontend with NGINX serving
- **`nginx.conf`** - NGINX configuration for frontend serving and backend proxy

### Build Tools: Gradle + Vite
**Why chosen:** Gradle provides powerful dependency management and build automation for JVM projects, while Vite offers extremely fast frontend builds and development experience.

#### Configuration Files:
- **`.gitattributes`** - Git line ending configuration ensuring Unix scripts maintain LF endings
- **`copilot-instructions.md`** - Development guidelines and architectural conventions for AI-assisted development
- **`project-requirements.md`** - Feature requirements and TDD methodology documentation
- **`test-docker.ps1`** - PowerShell script for testing Docker setup on Windows
- **`test-docker.sh`** - Bash script for testing Docker setup on Unix systems

## 📁 Project Structure

```
Sedna.WebCrawler/
├── backend/                     # Kotlin/Ktor backend
│   ├── src/main/kotlin/         # Application source code
│   ├── src/test/kotlin/         # Test source code
│   ├── build.gradle.kts         # Gradle build configuration
│   └── gradlew                  # Gradle wrapper (Unix)
├── frontend/                    # React TypeScript frontend
│   ├── src/                     # Application source code
│   ├── public/                  # Static assets
│   ├── package.json             # NPM configuration
│   └── vite.config.ts           # Vite configuration
├── docker-compose.yml           # Production Docker configuration
├── docker-compose.dev.yml       # Development Docker configuration
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **Java 21+** (for backend)
- **Node.js 18+** (for frontend)
- **Docker & Docker Compose** (for containerized deployment)

### Clone and Setup
```bash
git clone <repository-url>
cd Sedna.WebCrawler
```

## 🐳 Running with Docker Compose

### Development Environment
```bash
# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up --build

# Run in background
docker-compose -f docker-compose.dev.yml up -d --build

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production Environment
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up --build

# Run in background
docker-compose -f docker-compose.prod.yml up -d --build

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Standard Environment
```bash
# Start standard environment
docker-compose up --build

# Run in background
docker-compose up -d --build

# Stop services
docker-compose down
```

**Endpoints:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Health Check: http://localhost:8080/ping

## 💻 Running Without Docker

### Backend (Kotlin/Ktor)
```bash
# Navigate to backend directory
cd backend

# Run tests
./gradlew test

# Start development server
./gradlew run

# Build JAR
./gradlew build

# Run JAR directly
java -jar build/libs/app.jar
```

**Backend runs on:** http://localhost:8080

### Frontend (React + Vite)
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Frontend runs on:** http://localhost:5173 (dev) or http://localhost:4173 (preview)

## 🧪 Testing

### Run All Tests
```bash
# With Docker
docker-compose -f docker-compose.dev.yml run backend ./gradlew test
docker-compose -f docker-compose.dev.yml run frontend npm test

# Without Docker
cd backend && ./gradlew test
cd frontend && npm test
```

### Backend Testing
```bash
cd backend

# Run all tests
./gradlew test

# Run specific test
./gradlew test --tests "PingHandlerTest"

# Run tests with coverage
./gradlew test jacocoTestReport

# Continuous testing
./gradlew test --continuous
```

### Frontend Testing
```bash
cd frontend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- ConnectionStatus.test.tsx
```

## 🐛 Debugging Guide

### Backend Debugging

#### 1. IntelliJ IDEA / VS Code
```bash
# Start with debug configuration
./gradlew run --debug-jvm

# Or configure IDE run configuration with debug enabled
```

#### 2. Docker Debug
```bash
# Start with debug port exposed
docker-compose -f docker-compose.dev.yml up

# Backend debug port: 5005
# Connect your IDE to localhost:5005
```

#### 3. Logging
```kotlin
// Add logging in Application.kt
install(CallLogging) {
    level = Level.INFO
}
```

#### 4. Health Check Debugging
```bash
# Check backend health
curl http://localhost:8080/ping

# Check with verbose output
curl -v http://localhost:8080/ping

# Check from within Docker
docker-compose exec backend curl http://localhost:8080/ping
```

### Frontend Debugging

#### 1. Browser DevTools
- Open DevTools (F12)
- Check Console for errors
- Use React DevTools extension
- Monitor Network tab for API calls

#### 2. VS Code Debugging
```json
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vite",
  "program": "${workspaceFolder}/frontend/node_modules/vite/bin/vite.js",
  "args": ["--host", "--debug"],
  "console": "integratedTerminal"
}
```

#### 3. Redux DevTools
- Install Redux DevTools browser extension
- Monitor state changes and actions
- Time-travel debugging available

#### 4. Hot Reload Issues
```bash
# Clear Vite cache
rm -rf frontend/node_modules/.vite

# Restart dev server
npm run dev
```

### Docker Debugging

#### 1. Container Inspection
```bash
# View running containers
docker ps

# Check container logs
docker-compose logs backend
docker-compose logs frontend

# Execute commands in running container
docker-compose exec backend bash
docker-compose exec frontend sh

# Inspect container details
docker inspect sedna-backend
```

#### 2. Network Issues
```bash
# Check network connectivity
docker-compose exec backend ping frontend
docker-compose exec frontend ping backend

# Check port bindings
docker port sedna-backend
docker port sedna-frontend
```

#### 3. Volume Issues
```bash
# Check mounted volumes
docker-compose exec backend ls -la
docker-compose exec frontend ls -la

# Rebuild with no cache
docker-compose build --no-cache
```

### Common Issues & Solutions

#### Backend Issues
1. **Port already in use**
   ```bash
   # Find and kill process using port 8080
   lsof -ti:8080 | xargs kill -9
   ```

2. **Java version mismatch**
   ```bash
   # Check Java version
   java -version
   
   # Use JAVA_HOME if needed
   export JAVA_HOME=/path/to/java21
   ```

#### Frontend Issues
1. **Node modules issues**
   ```bash
   # Clear and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Port conflicts**
   ```bash
   # Use different port
   npm run dev -- --port 5174
   ```

#### Docker Issues
1. **Permission denied**
   ```bash
   # Fix gradlew permissions
   chmod +x backend/gradlew
   ```

2. **Out of disk space**
   ```bash
   # Clean Docker system
   docker system prune -a
   ```

## 🔄 Development Workflow

### TDD Approach
1. **🔴 Red:** Write a failing test
2. **🟢 Green:** Write minimal code to pass
3. **🔵 Refactor:** Clean up while keeping tests green
4. **🔒 Commit:** Lock in the feature as immutable

### Git Workflow
```bash
# Feature development
git checkout -b feature/crawl-domain
git add .
git commit -m "feat: add domain crawling feature"
git push origin feature/crawl-domain
```

### Code Quality
- Follow TDD methodology
- Maintain test coverage above 80%
- Use vertical slice architecture
- Keep features immutable after completion

---

**Project Status:** ✅ Ping feature complete | 🚧 Domain crawling in progress

For detailed feature requirements and progress, see [`project-requirements.md`](./project-requirements.md).