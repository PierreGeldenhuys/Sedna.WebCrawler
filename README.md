# 🕷️ Sedna Web Crawler

A **production-ready** modern web crawler application built with **Kotlin/Ktor** backend and **React TypeScript** frontend. The application crawls websites within a single domain and returns all internal pages found, featuring a beautiful Figma-inspired UI with comprehensive testing and scalable architecture.

## ✨ Key Features

🔍 **Intelligent Web Crawling** - Crawls up to 200 pages per domain with duplicate prevention and cross-domain filtering  
🎨 **Modern UI/UX** - Beautiful Figma-inspired design with animated floating controls and fixed layouts  
🧪 **Comprehensive Testing** - 29/29 tests passing (14 backend + 15 frontend)  
🚀 **Production Ready** - Docker deployment with NGINX reverse proxy  
⚡ **Real-time Feedback** - Live connection status and animated loading states


## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Testing](#-testing)
- [Running with Docker Compose](#-running-with-docker-compose)
- [Running Without Docker](#-running-without-docker)
- [Tech Stack Overview](#-tech-stack-overview)
- [Project Structure](#-project-structure)
- [Debugging Guide](#-debugging-guide)
- [Development Workflow](#-development-workflow)
- [Architecture & File Analysis](#architecture--file-analysis)

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
- **`backend/src/main/kotlin/com/example/webcrawler/features/crawl/api/CrawlRoutes.kt`** - HTTP route definitions for crawl endpoint with validation
- **`backend/src/main/kotlin/com/example/webcrawler/features/crawl/application/CrawlHandler.kt`** - Core crawling logic with Jsoup HTML parsing
- **`backend/src/main/kotlin/com/example/webcrawler/features/crawl/domain/CrawlCommand.kt`** - Domain command objects for crawl operations
- **`backend/src/main/kotlin/com/example/webcrawler/features/crawl/domain/CrawlResult.kt`** - Domain entities for crawl results and pages
- **`backend/src/test/kotlin/com/example/webcrawler/features/ping/api/PingRoutesTest.kt`** - Integration tests for ping API endpoints
- **`backend/src/test/kotlin/com/example/webcrawler/features/ping/application/PingHandlerTest.kt`** - Unit tests for ping handler logic
- **`backend/src/test/kotlin/com/example/webcrawler/features/crawl/api/CrawlRoutesTest.kt`** - Integration tests for crawl API endpoints
- **`backend/src/test/kotlin/com/example/webcrawler/features/crawl/application/CrawlHandlerTest.kt`** - Comprehensive unit tests for crawl handler with real websites

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
- **`frontend/index.html`** - Main HTML template and application entry point
- **`frontend/src/main.tsx`** - React application bootstrap and root component mounting
- **`frontend/src/App.tsx`** - Main application component with fixed header and connection status
- **`frontend/src/App.css`** - Global application styles and CSS animations
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
- **`frontend/src/features/crawl/index.ts`** - Crawl feature barrel exports
- **`frontend/src/features/crawl/CrawlPage.tsx`** - Main crawl interface with modern Figma-inspired design
- **`frontend/src/features/crawl/CrawlPage.test.tsx`** - Comprehensive React Testing Library tests for crawl functionality
- **`frontend/src/features/crawl/useCrawl.ts`** - Custom React hook for crawl API interactions
- **`frontend/src/features/crawl/crawlApi.ts`** - RTK Query API slice for crawl endpoint definitions

### Styling: Pure Inline Styles
**Why chosen:** Removed Tailwind CSS in favor of pure inline styles for better performance, no build dependencies, and precise control over the modern Figma-inspired design aesthetic.

### State Management: Redux Toolkit + RTK Query
**Why chosen:** Redux Toolkit eliminates Redux boilerplate while RTK Query provides powerful data fetching with caching, background updates, and optimistic updates.

### Testing: JUnit 5 + Vitest + React Testing Library
**Why chosen:** JUnit 5 offers modern testing features for Kotlin/Java, Vitest provides fast test execution for frontend, and RTL ensures accessible, user-focused testing.

### Containerization: Docker + Docker Compose
**Why chosen:** Docker ensures consistent environments across development and production, while Docker Compose simplifies multi-service orchestration.

#### Docker Files:
- **`docker-compose.yml`** - Production multi-service configuration with health checks and networking
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
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites
- **Java 21+** (for backend, only if running without Docker)
- **Node.js 18+** (for frontend, only if running without Docker)
- **Docker & Docker Compose** (recommended for easiest setup)

### Clone and Setup
```bash
git clone <repository-url>
cd Sedna.WebCrawler
```


### Run with Docker (Recommended)
You can use either the default `docker-compose.yml` (simple, no resource limits) or the production-optimized `docker-compose.prod.yml` (resource limits, logging, always-restart, etc.).

**Option 1: Default (simple, no resource limits)**
```bash
docker-compose up --build
```

**Option 2: Production (resource limits, logging, always-restart)**
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Run Without Docker (Dev Only)
```bash
# Start backend
cd backend && ./gradlew run
# In a new terminal, start frontend
cd frontend && npm install && npm run dev
```

**Frontend:** http://localhost:5173 (dev) or http://localhost:3000 (prod)
**Backend:** http://localhost:8080
## Architecture & File Analysis

### High-Level Architecture

- **Frontend (React/TypeScript/Vite):**
  - Dev: Served by Vite on port 5173 (hot reload, no NGINX)
  - Prod: Built static files served by NGINX on port 3000
  - NGINX proxies `/api/` requests to backend (see `nginx.conf`)
- **Backend (Kotlin/Ktor):**
  - Runs on port 8080
  - Handles `/ping` and `/crawl` endpoints
  - Implements concurrency, deduplication, crawl limits, and robust error/logging (SLF4J+Logback)
- **Docker/Compose:**
  - Dev Compose: (removed, not supported)
  - Prod Compose: NGINX serves frontend, proxies API, backend runs optimized
  - Health checks for both services

### File/Folder Overview

- `backend/` — Kotlin/Ktor backend (vertical slice: `features/ping`, `features/crawl`)
- `frontend/` — React/TypeScript frontend (vertical slice: `features/ping`, `features/crawl`)
- `nginx.conf` — NGINX config (used only in frontend production Docker image)
- `docker-compose.prod.yml` — Prod Compose (NGINX, optimized backend)
- `Dockerfile.frontend` — Multi-stage build, NGINX static serving
- `Dockerfile.backend` — Multi-stage build, fat JAR, non-root user

### Backend Crawl Logic Highlights
- **Concurrency:** Coroutine-based parallel crawling with configurable concurrency limit
- **Deduplication:** Fast Set-based deduplication, no duplicate URLs
- **Crawl Limits:** Max 200 pages per crawl, robust error/timeout handling
- **Logging:** SLF4J+Logback, all errors and crawl events logged, no file/console printlns
- **Resource Filtering:** Skips non-HTML resources before fetching

### Frontend Highlights
- **Modern UI:** Figma-inspired, pure inline styles, animated controls
- **Redux Toolkit + RTK Query:** State management and API calls
- **Comprehensive Testing:** 100% test pass rate, TDD enforced

---

For detailed requirements and vertical slice status, see [`project-requirements.md`](./project-requirements.md).

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

### Test Coverage Status ✅
- **Backend**: 14/14 tests passing (100% ✅)
  - 1 Ping handler unit test
  - 1 Ping route integration test
  - 8 Crawl handler unit tests (invalid URL, valid URL, domain filtering, deduplication, title extraction, malformed URL, crawl limit, timeout)
  - 4 Crawl route integration tests (valid, invalid JSON, invalid URL, domain filtering)
- **Frontend**: 15/15 tests passing (100% ✅)
  - 4 Ping connection status component tests (green, red, loading, interim)
  - 1 Ping hook test
  - 10 Crawl page tests (form, validation, loading, crawl count, error, input change, etc.)
- **Total**: 29/29 tests passing across full stack 🎉

### Run All Tests
```bash

# With Docker (run from project root)
docker-compose run backend ./gradlew test
docker-compose run frontend npm test

# Without Docker
cd backend && ./gradlew test
cd frontend && npm test
```

### Backend Testing
```bash
cd backend

# Run all tests (14 tests)
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


# Run all tests (15 tests)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- CrawlPage.test.tsx
```

**Frontend Test Coverage:**
- ✅ Ping connection status component tests (green, red, loading, interim)
- ✅ Ping hook test
- ✅ Crawl page: form, validation, loading, crawl count, error, input change, etc.

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

# Start with debug port exposed (edit docker-compose.yml to expose debug port if needed)
docker-compose up

# Backend debug port: 5005
# Connect your IDE to localhost:5005
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


---

## 🤖 GitHub Workflow, Copilot AI, & MCP Server Integration

### GitHub Workflow
- All code changes are made via feature branches and Pull Requests (PRs).
- PRs are reviewed and merged only after all tests pass and code review feedback is addressed.
- The repository uses vertical slice architecture: each feature is isolated and locked after completion (see `project-requirements.md`).
- All major changes, refactors, and enhancements are tracked via issues and PRs for full traceability.

### Copilot & AI Feedback Process
- GitHub Copilot is used as an AI coding assistant for:
  - Refactoring, code generation, and documentation
  - Responding to PR review comments and automating repetitive tasks
  - Analyzing architecture, suggesting improvements, and updating documentation
- Copilot is always instructed to:
  - Follow strict TDD (Test-Driven Development) and vertical slice conventions
  - Never modify completed/locked features (immutability rule)
  - Prioritize maintainability, correctness, and clear logging
  - Respond to PR review feedback and update code/docs as needed
- All Copilot actions are transparent and traceable in PRs and commit messages.

### How to Use/Request Copilot Feedback
1. Open a GitHub Issue or PR and describe the change or feedback needed.
2. Assign Copilot (or request AI review/feedback in the PR/issue).
3. Copilot will:
   - Analyze the codebase and requirements
   - Propose code changes, refactors, or documentation updates
   - Respond to review comments and iterate until all feedback is addressed
4. All Copilot actions are visible in the PR discussion and commit history.

### GitHub MCP Server Integration
- The GitHub MCP (Model Context Protocol) server provides a secure, real-time connection between the repository and Copilot/AI agents.
- This enables:
  - Automated PR review, code suggestions, and feedback directly in GitHub
  - Live context sharing (code, issues, PRs) for more accurate and relevant AI responses
  - Seamless assignment of Copilot to issues/PRs for hands-off automation
- The MCP server ensures Copilot always works with the latest code and project state, making AI feedback more robust and actionable.

For more details on Copilot's instructions and project rules, see [`copilot-instructions.md`](./copilot-instructions.md) and [`project-requirements.md`](./project-requirements.md).