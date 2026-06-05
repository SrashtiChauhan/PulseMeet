# API Reference

PulseMeet exposes a secure REST API built using Next.js Route Handlers. These APIs power authentication, event management, attendee registrations, dashboard analytics, and attendee exports.

Unless otherwise specified, protected endpoints require a valid authenticated NextAuth.js session.

---

# 🔐 Authentication APIs

## POST `/api/register`

Creates a new user account.

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "role": "HOST"
}
```

### Response

```http
201 Created
```

---

## `/api/auth/[...nextauth]`

Managed internally by NextAuth.js.

Provides:

* User Login
* User Logout
* Session Validation
* JWT Management

---

# 📅 Event APIs

## GET `/api/events/all`

Returns all public events displayed on the landing page.

### Authentication

Public

### Response

```json
[
  {
    "title": "AI Innovation Hackathon 2026",
    "location": "Delhi",
    "date": "2026-06-20"
  }
]
```

---

## POST `/api/events`

Creates a new event.

### Authentication

Required (`HOST` role)

### Request Body

```json
{
  "title": "AI Innovation Hackathon",
  "description": "Build AI-powered applications.",
  "date": "2026-06-20",
  "time": "10:00",
  "location": "Delhi",
  "capacity": 100,
  "cutoffDate": "2026-06-15T00:00:00.000Z"
}
```

### Response

```http
201 Created
```

---

## GET `/api/events`

Returns all events created by the authenticated host.

### Authentication

Required (`HOST` role)

---

## GET `/api/events/[eventId]`

Returns complete information about a single public event.

### Authentication

Public

### Response

```json
{
  "event": {},
  "attendeeCount": 25
}
```

---

# 🎟️ Registration APIs

## POST `/api/events/[eventId]/register`

Registers an attendee for a specific event.

### Authentication

Required (`ATTENDEE` role)

### Validation Rules

* Event must exist
* Registration deadline must not be passed
* Event must not be manually closed
* Event capacity must not be exceeded
* Duplicate registrations are blocked

### Response

```http
201 Created
```

---

## GET `/api/attendee/events`

Returns all events registered by the authenticated attendee.

### Authentication

Required (`ATTENDEE` role)

---

# 👥 Attendee Management APIs

## GET `/api/events/[eventId]/attendees`

Returns attendee information for a specific event.

### Authentication

Required (`HOST` role)

### Authorization

Only the creator of the event can access attendee data.

### Response

```json
{
  "event": {},
  "attendees": []
}
```

---

## GET `/api/events/[eventId]/export`

Exports attendee data as a CSV file.

### Authentication

Required (`HOST` role)

### Authorization

Only the event creator can export attendee information.

### Export Fields

* Name
* Email
* Registration Timestamp

### Response

```http
200 OK
Content-Type: text/csv
```

---

# 🔒 Security Features

PulseMeet implements several security measures:

* Password hashing using bcryptjs
* JWT-based session management
* Role-based authorization
* Protected dashboard routes
* Event ownership validation
* Duplicate registration prevention
* Secure attendee data access

---

# API Design Principles

The API follows RESTful conventions and is designed for:

* Scalability
* Security
* Maintainability
* Clear role-based access control
* Community event management workflows
