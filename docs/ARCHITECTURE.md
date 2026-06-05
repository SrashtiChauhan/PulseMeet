# System Architecture & Database Schema

PulseMeet follows a modern full-stack architecture built on Next.js App Router, MongoDB, NextAuth.js, and TypeScript. The application separates responsibilities across authentication, event management, attendee registration, and dashboard analytics while maintaining a clean and scalable structure.

---

# 🏗️ High-Level Architecture

PulseMeet consists of four primary layers:

### 1. Presentation Layer

Responsible for rendering user interfaces and handling client-side interactions.

**Technologies**

* React 19
* Next.js App Router
* Tailwind CSS
* Framer Motion
* Lucide React

### 2. Application Layer

Handles business logic, validation, authorization, and API processing.

**Technologies**

* Next.js Route Handlers
* TypeScript
* NextAuth.js

### 3. Data Layer

Responsible for database operations and data modeling.

**Technologies**

* MongoDB
* Mongoose ODM

### 4. Authentication Layer

Provides secure user authentication and role-based authorization.

**Technologies**

* NextAuth.js
* JWT Sessions
* bcryptjs Password Hashing

---

# 📂 Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── api/
│   │   ├── auth/
│   │   ├── events/
│   │   └── register/
│   │
│   ├── attendee/
│   │   └── my-events/
│   │
│   ├── dashboard/
│   │   ├── create-event/
│   │   ├── [eventId]/
│   │   └── page.tsx
│   │
│   ├── events/
│   │   └── [eventId]/
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
│
├── components/
│   ├── Navbar.tsx
│   └── Shared UI Components
│
├── lib/
│   ├── auth.ts
│   └── mongoose.ts
│
└── models/
    ├── User.ts
    ├── Event.ts
    └── Registration.ts
```

---

# 🗄️ Database Design

PulseMeet uses MongoDB with three primary collections.

## User Collection

Stores organizer and attendee accounts.

### Fields

| Field    | Type   | Description            |
| -------- | ------ | ---------------------- |
| name     | String | User display name      |
| email    | String | Unique email address   |
| password | String | bcrypt-hashed password |
| role     | Enum   | HOST or ATTENDEE       |

### Purpose

* Authentication
* Authorization
* Role Management

---

## Event Collection

Stores event information created by organizers.

### Fields

| Field       | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| title       | String   | Event title                 |
| description | String   | Event description           |
| date        | String   | Event date                  |
| time        | String   | Event time                  |
| location    | String   | Venue or virtual link       |
| hostId      | ObjectId | Event creator               |
| capacity    | Number   | Maximum attendees           |
| cutoffDate  | Date     | Registration deadline       |
| isClosed    | Boolean  | Manual registration control |

### Purpose

* Public event discovery
* Event management
* Capacity enforcement

---

## Registration Collection

Creates a relationship between attendees and events.

### Fields

| Field      | Type     | Description     |
| ---------- | -------- | --------------- |
| eventId    | ObjectId | Linked event    |
| attendeeId | ObjectId | Linked attendee |

### Unique Constraint

```javascript
{
  eventId: 1,
  attendeeId: 1
}
```

This prevents duplicate registrations for the same event.

---

# 🔐 Authentication Architecture

PulseMeet uses NextAuth.js Credentials Authentication.

## Login Flow

1. User submits email and password.
2. Credentials Provider validates the account.
3. Password is verified using bcryptjs.
4. JWT session is generated.
5. User ID and role are embedded into the session token.
6. Protected pages validate session permissions before granting access.

---

# 🛡️ Security Design

The platform implements multiple security measures:

### Authentication Security

* Password hashing with bcryptjs
* JWT-based sessions
* Secure credential validation

### Authorization Security

* Role-based access control
* Host-only dashboard access
* Event ownership verification

### Data Security

* Passwords never exposed in APIs
* Passwords excluded from CSV exports
* Protected attendee information

### Registration Security

* Duplicate registration prevention
* Capacity validation
* Registration cutoff validation
* Event closure validation

---

# 📈 Scalability Considerations

PulseMeet is designed to support future enhancements such as:

* Event categories
* Banner image uploads
* Email notifications
* Social authentication
* Analytics dashboards
* Ticketing systems
* Community-based event discovery

The modular architecture enables these features to be added with minimal impact on existing functionality.
