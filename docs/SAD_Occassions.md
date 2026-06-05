# System Architecture Document (SAD)

# PulseMeet – Event Registration & Community Platform

---

## 1. System Overview

PulseMeet is a full-stack event management platform designed to connect organizers and attendees through a centralized event registration workflow.

The platform provides:

* Event Creation
* Event Discovery
* Registration Management
* Attendee Tracking
* CSV Export Functionality

while maintaining security, scalability, and responsiveness.

---

## 2. High-Level System Architecture

```text
Client Browser
       │
       ▼
Next.js Application
       │
 ┌─────┼─────┐
 │           │
 ▼           ▼
NextAuth   Route Handlers
(Auth)       (API)
 │             │
 └─────┬───────┘
       ▼
MongoDB Database
```

---

## 3. Component Overview

### Client Layer

Responsible for:

* Event Discovery
* Authentication Forms
* Dashboards
* Event Registration

Technologies:

* React
* Next.js
* Tailwind CSS

---

### Authentication Layer

Responsible for:

* Login
* Registration
* Session Management
* Role Verification

Technology:

* NextAuth.js

---

### API Layer

Responsible for:

* Event CRUD Operations
* Registration Processing
* CSV Export
* Dashboard Data

Technology:

* Next.js Route Handlers

---

### Database Layer

Responsible for:

* User Data
* Event Data
* Registration Data

Technology:

* MongoDB
* Mongoose

---

## 4. Data Flow

### Event Creation

Host
→ Dashboard
→ API Route
→ MongoDB
→ Event Created

---

### Event Registration

Attendee
→ Event Page
→ Registration API
→ Validation
→ MongoDB
→ Confirmation

---

### CSV Export

Host Dashboard
→ Export Request
→ API Route
→ CSV Generation
→ File Download

---

## 5. State Management Strategy

### Client State

Managed using:

* React State
* Form State
* Toast Notifications

### Server State

Managed using:

* MongoDB
* Server Components
* API Responses

MongoDB serves as the primary source of truth.

---

## 6. Security Architecture

### Authentication

* NextAuth.js Sessions
* JWT-Based Authentication

### Authorization

* Role-Based Access Control
* Event Ownership Verification

### Data Protection

* bcrypt Password Hashing
* Protected API Routes
* Secure CSV Exports

---

## 7. Deployment Architecture

### Hosting

* Vercel

### Database

* MongoDB Atlas

### CDN

* Vercel Edge Network

### Scaling Model

The serverless architecture allows automatic scaling of application resources based on traffic demands.

---

## 8. Reliability Considerations

PulseMeet implements:

* Duplicate Registration Prevention
* Capacity Enforcement
* Registration Deadline Validation
* Secure Session Handling

These mechanisms ensure consistent platform behavior even under concurrent access.

---

## 9. Architecture Summary

PulseMeet follows a modern serverless architecture that combines Next.js, MongoDB, and NextAuth.js to deliver a scalable, secure, and maintainable event management platform.
