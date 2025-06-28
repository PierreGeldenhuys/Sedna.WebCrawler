# 📘 project-requirements.md

This document defines the **feature requirements** for the Ktor + React TypeScript web crawler application, designed around a vertically sliced architecture.  
> ⚠️ Every Copilot-assisted or manual iteration must honor the conventions defined in `copilot-instructions.md`.

---

## 🔄 Sync Instructions

Each Copilot session:
- Begins by reviewing this `project-requirements.md` file.
- Selects the next unchecked `[ ]` item.
- Implements the requirement using **Test-Driven Development (TDD)** and vertical slice structure.
- Updates the file to reflect the current status.

## 🚫 Vertical Immutability Rule

**CRITICAL:** Once a vertical slice feature is marked as complete `[x]` and committed, it must NOT be modified in future iterations. Each feature vertical should be treated as immutable after completion to maintain system stability and prevent regression. New functionality should be added as separate verticals.

### 🔒 Immutability Guidelines:
- **No modifications** to completed feature folders (e.g., `features/ping/`)
- **No changes** to tests in completed verticals
- **No refactoring** of completed handler/component logic
- **Bug fixes** should be treated as new verticals with their own tests
- **Extensions** should be new verticals that compose with existing ones

---

## ✅ Status Key

- [ ] Not Started  
- [~] In Progress  
- [x] Complete  

---

## 🧪 Test-Driven Development (TDD) Methodology

This project follows **strict TDD practices**:

1. **🔴 Red:** Write a failing test first
2. **🟢 Green:** Write minimal code to make the test pass
3. **🔵 Refactor:** Clean up code while keeping tests green
4. **🔒 Commit:** Lock in the vertical slice as immutable

### TDD Benefits:
- **Ensures testability** by design
- **Prevents over-engineering** by implementing only what's needed
- **Provides safety net** for refactoring
- **Documents behavior** through executable specifications
- **Improves design** by thinking about usage first  

### 📊 Mermaid Diagram Requirement:
Each vertical slice must include a **Mermaid diagram** documenting the feature's flow and architecture:
- **Location**: `frontend/src/features/{featureName}/flow.md`
- **Content**: User interaction flow, API calls, state changes, and component relationships
- **Format**: Mermaid flowchart or sequence diagram
- **Purpose**: Visual documentation for future developers and onboarding  

---

## 🧱 Feature: Project Scaffolding and Ping Connectivity

> **Goal:** Set up both projects and ensure frontend and backend can communicate via a `ping` command and handler, using test-driven development.  
> **Note:** This feature was completed before strict TDD methodology was established, but is organized here in TDD phases for consistency.

### 🧪 Phase 1: Test Setup (Tests First)
- [x] Write unit test for `PingHandler`
- [x] Write integration test for `/ping` route using KtorTestApplicationEngine
- [x] FE: Write RTL test simulating frontend ping flow

### 🏗️ Phase 2: Backend Implementation (Make Tests Pass)
- [x] Scaffold Ktor backend with Gradle, `Application.kt`, and vertical slice layout under `features/ping`
- [x] Add `PingCommand` (sealed class)
- [x] Add `PingHandler` that returns 200 OK
- [x] Add `/ping` GET route (direct handler call, not Mediator pattern)
- [x] Verify all backend tests pass

### ⚛️ Phase 3: Frontend Implementation (Make Tests Pass)
- [x] Scaffold frontend React + Vite + Redux Toolkit using vertical slice layout under `features/ping`
- [x] FE: Add `usePing()` RTK Query hook
- [x] FE: Add UI that displays connection status (red/green dot)
- [x] Verify all frontend tests pass

### ✅ Phase 4: Integration & Completion
- [x] Run full test suite (backend + frontend)
- [x] Manual end-to-end verification
- [x] Feature marked as complete and committed
- [x] Create Mermaid diagram documenting ping flow (`frontend/src/features/ping/flow.md`)

**🔒 IMMUTABLE:** This vertical slice is now locked and cannot be modified.

---

## 🌐 Feature: Crawl Single Domain

> **Goal:** Build out the core crawler feature to return all internal links within the same domain, excluding external URLs.  
> **TDD Approach:** Write tests first, then implement just enough code to make tests pass.

### 🧪 Phase 1: Test Setup (Write Tests First)
- [ ] Write unit test for `CrawlHandler` (test-first approach)
- [ ] Write integration test for `/crawl` POST route (test-first approach)
- [ ] FE: Write RTL test for crawl interaction (test-first approach)

### 🏗️ Phase 2: Backend Implementation (Make Tests Pass)
- [ ] Create `CrawlCommand` (with `url: String`)
- [ ] Add `Page`, `Link`, and `CrawlTarget` value objects/entities
- [ ] Implement `CrawlHandler` to call `CrawlService` (infrastructure: Jsoup)
- [ ] Ensure no duplicates or cross-domain links are returned
- [ ] Add `/crawl` POST route that accepts a URL and returns pages
- [ ] Verify all backend tests pass

### ⚛️ Phase 3: Frontend Implementation (Make Tests Pass)
- [ ] FE: Create `useCrawl()` RTK mutation
- [ ] FE: Create `CrawlPage` with input form and results list
- [ ] FE: Add form validation and feedback for loading / errors
- [ ] Verify all frontend tests pass

### ✅ Phase 4: Integration & Completion
- [ ] Run full test suite (backend + frontend)
- [ ] Manual end-to-end verification
- [ ] Create Mermaid diagram documenting crawl flow (`frontend/src/features/crawl/flow.md`)
- [ ] Mark feature as complete and commit

---

## 📄 Interview Brief Context

This app is based on the following technical assessment:

> Write a simple web crawler in either Java or Kotlin. The crawler should be limited to one domain — so when crawling Sedna.com it would crawl all pages within the domain, but not follow external links, such as LinkedIn and Twitter accounts. Given a URL, it should output a list of all pages found at that domain.

### Evaluation Criteria:
- Technical aptitude and approach
- Reasoning and decision-making
- Understanding of web fundamentals
- Consideration of code quality

Submissions must be pushed to GitHub and shared as a link.