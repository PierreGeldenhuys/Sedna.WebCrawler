# 🧠 Copilot Instructions – Sedna Web Crawler (Ktor + React TS)

This file guides GitHub Copilot Agent (and contributors) in understanding the stack, folder structure, and development flows for both the **Ktor backend** and **React TypeScript frontend**.

---

## 🧱 Stack Overview

### 🔙 Backend (Kotlin + Ktor)

| Layer           | Tech                            |
|----------------|----------------------------------|
| Framework      | Ktor 3.2.0 (Netty engine)        |
| Language       | Kotlin 2.2.0 (JVM 21)           |
| Parsing        | Jsoup (HTML document parsing)    |
| Async Model    | Kotlin Coroutines                |
| Architecture   | Vertical Slice + Simple Handlers |
| Build Tool     | Gradle (Kotlin DSL)              |
| Tests          | JUnit 5 + MockK + Ktor TestEngine|

---

### ⚛️ Frontend (React + TypeScript)

| Layer           | Tech                            |
|----------------|----------------------------------|
| Framework      | React 19 + Vite 7                |
| Language       | TypeScript                       |
| State Mgmt     | Redux Toolkit + RTK Query        |
| Styling        | Tailwind CSS 4.x                 |
| Tests          | Vitest + React Testing Library   |

---

## 🧩 Vertical Slice Project Structure

### 📂 Backend Structure (Vertical Slice + Simple Handlers)

```
backend/
├── src/
│   ├── main/kotlin/com/example/webcrawler/
│   │   ├── Application.kt                       ← Main Ktor application entry point with CORS
│   │   ├── features/
│   │   │   └── ping/
│   │   │       ├── domain/
│   │   │       │   └── PingCommand.kt           ← Sealed command class (Request)
│   │   │       ├── application/
│   │   │       │   └── PingHandler.kt           ← Handles PingCommand, returns status code
│   │   │       └── api/
│   │   │           └── PingRoutes.kt            ← Ktor route definition
│   │   └── infrastructure/                      ← Currently empty, for future services
│   │       └── jsoup/                          ← Future Jsoup crawler implementation
│   │           └── JsoupHtmlCrawler.kt
│   └── test/kotlin/com/example/webcrawler/
│       └── features/
│           └── ping/
│               ├── application/
│               │   └── PingHandlerTest.kt       ← Unit test for handler logic
│               └── api/
│                   └── PingRoutesTest.kt        ← Integration test for route
```

**📂 Frontend Structure (Vertical Slice per Feature)**

```
frontend/
├── src/
│   ├── App.tsx                                  ← Main app with header and ping status
│   ├── App.css                                  ← App-specific styles
│   ├── main.tsx                                 ← Entry point with Redux Provider
│   ├── tailwind.css                             ← Global Tailwind styles
│   ├── features/
│   │   └── ping/
│   │       ├── ConnectionStatus.tsx             ← Red/green dot component
│   │       ├── ConnectionStatus.test.tsx        ← Component test (co-located)
│   │       ├── usePing.ts                       ← RTK Query hook wrapper
│   │       ├── usePing.test.ts                  ← Hook test (co-located)
│   │       ├── pingApi.ts                       ← RTK Query API definition
│   │       └── index.ts                         ← Barrel exports for clean imports
│   ├── redux/
│   │   └── store.ts                             ← Redux store with RTK Query
│   └── assets/                                  ← Static assets
```

## 🧪 Testing Strategy

### ✅ Backend Tests (JUnit 5 + MockK)

- Place tests under `src/test/kotlin/...` matching the feature structure
- Test each `Handler` in isolation with unit tests
- Use `testApplication` with Ktor to test routes as integration tests
- All tests are co-located with their features for vertical slice organization

**Current Tests:**
- `PingHandlerTest.kt` - Unit test for ping handler logic
- `PingRoutesTest.kt` - Integration test for `/ping` GET route

---

### ✅ Frontend Tests (Vitest + RTL)

- Use **Vitest** and **React Testing Library**
- Tests are co-located with components/hooks in feature folders
- Focus on user interactions and component behavior
- Mock external APIs for isolated testing

**Current Tests:**
- `ConnectionStatus.test.tsx` - Component test for ping status dot
- `usePing.test.ts` - Hook test for RTK Query ping functionality

---

### 🧪 Running Tests

#### Backend Testing
```powershell
cd c:\Code\Sedna\Sedna.WebCrawler\backend
./gradlew test
# View results at: c:\Code\Sedna\Sedna.WebCrawler\backend\build\reports\tests\test\index.html
```

#### Frontend Testing
```powershell
cd c:\Code\Sedna\Sedna.WebCrawler\frontend
npm test
# Run with coverage: npm test -- --coverage
```

---

## ✅ Development Flow

### 🔄 Current Architecture Pattern

The project uses a **simplified vertical slice architecture** without complex mediator patterns:

#### Backend Flow:
1. Route receives HTTP request
2. Route creates handler instance and calls `handle()` method 
3. Handler processes command and returns response
4. Route converts handler response to HTTP response

#### Frontend Flow:
1. Component uses RTK Query hook (e.g., `usePing()`)
2. Hook triggers API call via RTK Query
3. Component renders based on loading/error/success states
4. Connection status updates automatically

### 🔄 Development Steps

#### Adding New Backend Features:
1. Create domain command class
2. Implement handler with `handle()` method
3. Add route that calls handler
4. Wire route in `Application.kt`
5. Write unit test for handler
6. Write integration test for route

#### Adding New Frontend Features:
1. Create RTK Query API definition
2. Create hook wrapper for clean component usage
3. Build component with proper loading/error states
4. Add component and hook tests
5. Create barrel export (`index.ts`)

---

## 🎯 Current Project Status

### ✅ Completed Features

**Ping Connectivity Feature:**
- ✅ Backend: `PingCommand`, `PingHandler`, `/ping` GET route
- ✅ Frontend: `ConnectionStatus` component, `usePing` hook, RTK Query integration
- ✅ Testing: All backend and frontend tests passing
- ✅ UI: Clean header with connection status dot and "Sedna Crawler" branding

### 🚧 Next Feature: Web Crawling

As defined in `project-requirements.md`, the next major feature is implementing web crawling functionality:
- Domain-limited crawling (same domain only)
- Jsoup integration for HTML parsing  
- `/crawl` POST endpoint
- Frontend form for URL input and results display

---

## 🛠 Development Commands & Path Handling

### 🔧 Common Commands

#### Backend Commands:
```powershell
# Navigate to backend and run tests
cd c:\Code\Sedna\Sedna.WebCrawler\backend
./gradlew test

# Run specific test
./gradlew test --tests "PingHandlerTest"

# Start backend server
./gradlew run
```

#### Frontend Commands:
```powershell
# Navigate to frontend and run tests  
cd c:\Code\Sedna\Sedna.WebCrawler\frontend
npm test

# Start development server
npm run dev

# Build for production
npm run build
```

### 📁 Path Handling Requirements

- **Command Generation:**
  - ALWAYS use full absolute paths when working with files or directories
  - Never rely on relative paths or assume current directory
  - Format for PowerShell: `c:\Code\Sedna\Sedna.WebCrawler\backend\src` instead of `./src`
  - Use full paths for directory changes: `cd c:\Code\Sedna\Sedna.WebCrawler\backend`
  - Bundle related commands together with proper directory context:
    ```powershell
    $repoRoot = "c:\Code\Sedna\Sedna.WebCrawler"
    cd $repoRoot\backend
    ./gradlew test
    ```

---

## 📋 Key Implementation Notes

### 🔑 Backend Architecture Decisions

- **No Mediator Pattern**: Direct handler instantiation in routes for simplicity
- **Simple Command Pattern**: Sealed classes for type-safe command definitions  
- **Minimal DDD**: Focus on vertical slices rather than complex domain modeling
- **CORS Enabled**: Backend configured to allow frontend communication

### 🔑 Frontend Architecture Decisions

- **RTK Query Only**: No Redux slices, purely API state management
- **Co-located Tests**: Tests live next to their corresponding features
- **Barrel Exports**: Clean imports via `index.ts` files
- **Tailwind Styling**: Modern utility-first CSS framework
- **Minimal UI**: Clean header with connection status, ready for feature expansion

### 🔑 Testing Philosophy

- **Test Structure Mirrors Code**: Tests follow the same vertical slice organization
- **Integration Over Unit**: Focus on testing user-facing behavior
- **Co-location**: Tests live with the code they test for maintainability