# AI-Powered Interview Preparation Engine (Backend Core)

This repository houses the decoupled, production-grade backend engine for the GenAI Interview Preparation platform. Built with Node.js, Express, and MongoDB, this service handles multipart binary file stream ingestion, structural PDF content text extraction, automated JSON-structured schema synthesis via Generative AI, and programmatic server-side document generation.

## 🏗️ Architectural Pattern & Core Systems

The server acts as a strict headless JSON API layer, utilizing an enterprise service-controller architecture to handle isolated domain tasks.

### 🔒 Specialized Security & Session Management
* **Token Blacklisting Architecture:** Implements a strict session termination protocol. Upon `GET /auth/logout`, the client-side HTTP-Only cookie wrapper is cleared, and the unique JWT signature token block is dynamically written into a MongoDB `blacklisttokens` collection. Protected routes crosscheck entries against this blacklist to block intercepted sessions.

### 🤖 LLM Engineering Layer (Structured Outputs)
* **Zod-to-JSON Pipeline:** Leverages `@google/genai` natively mapped with `zod-to-json-schema`. Rather than processing unpredictable unstructured text formatting prompts, the system forces the Gemini 2.5 Flash runtime engine to strictly adhere to an explicitly defined database-compliant JSON scheme layout.

### 📄 Programmatic Document Synthesis Service
* **Server-Side Rendering (Puppeteer):** Generates targeted, contextual resumes. The AI service compiles a tailored, clean HTML string matching corporate resume standards. This raw string is loaded directly into an isolated instance buffer (`page.setContent()`) using headless Chromium via `puppeteer`, which programmatically outputs a calibrated, print-ready A4 binary PDF buffer (`page.pdf()`) served straight to the client network pipe.

---

## 🛠️ Infrastructure Ingestion & Database Schema Maps

### Data Modeling Definitions (Mongoose ODM)

#### 1. User Model (`users`)
* `username` (String, Unique, Required)
* `email` (String, Unique, Required)
* `password` (String, Hashed using `bcryptjs`, Required)

#### 2. Interview Report Model (`interviewreports`)
* `user` (Mongoose ObjectRef mapping to `users`, Required)
* `title` (String, Required)
* `matchScore` (Number, bounded between `0-100`)
* `technicalQuestions` (Embedded Sub-document Array: `question`, `intention`, `answer`)
* `behavioralQuestions` (Embedded Sub-document Array: `question`, `intention`, `answer`)
* `skillGaps` (Embedded Sub-document Array: `skill`, `severity: low/medium/high`)
* `preparationPlan` (Embedded Sub-document Array: `day`, `focus`, `tasks: Array of Strings`)

---

## 🚀 Native Deployment & Engine Initialization

### 1. Environment Configurations (`.env`)
Create a localized environment file inside the root server folder containing these explicit string mappings:

```env
PORT=1236
MONGO_URI=your_mongodb_uri_for_databse
JWT_SECRET=long_jwt_key
GEMINI_API_KEY=your_google_gemini_ai_key

# Execute package manager sync to pull structural modules
npm install

# Initialize development runtime environment engine via Nodemon compilation
npm run dev
npx nodemon server.js



# AI-Powered Interview Preparation Platform (Frontend Core)

This repository contains the decoupled, highly structured client-side application for the GenAI Interview Preparation engine. Built on React, Vite, and Sass, the platform implements strict client-side data orchestration patterns to parse asynchronous stream returns, coordinate multipart binary form transfers, securely hook local session cookies, and handle multi-tab operational states.

## 🏗️ Architectural Pattern: 4-Layer System

To cleanly decouple state mutations, business operations, and presentation layouts, the codebase enforces a strict **4-Layer Architectural System**. This standard keeps operational layers entirely isolated from the raw view hierarchy.

