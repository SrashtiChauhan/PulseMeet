# Functional Architecture Document (FAD) – PulseMeet

## 1. Introduction

This document defines the functional scope of PulseMeet, a modern event management and community engagement platform designed for hackathons, workshops, meetups, conferences, and community-driven events.

The document describes user roles, system modules, and key process flows supported by the platform.

---

## 2. User Roles

### Host (Organizer)

Organizers create and manage events on the platform.

Responsibilities:

* Create events
* Edit event details
* Manage attendees
* Export attendee data
* Monitor registrations

---

### Attendee

Attendees discover and register for public events.

Responsibilities:

* Browse events
* Register for events
* Access registered events
* Manage participation

---

### Visitor

Unauthenticated users who can browse public events.

Capabilities:

* View event listings
* View event details
* Create an account
* Login to register

---

## 3. Functional Modules

### 3.1 Authentication Module

Purpose:

Provide secure user authentication and authorization.

Features:

* User Registration
* User Login
* Session Management
* Role-Based Access Control
* Password Hashing

---

### 3.2 Event Management Module

Purpose:

Allow organizers to create and manage events.

Features:

* Event Creation
* Event Editing
* Event Deletion
* Capacity Management
* Registration Deadlines
* Event Visibility

---

### 3.3 Registration Module

Purpose:

Manage attendee registrations.

Features:

* Event Registration
* Duplicate Prevention
* Capacity Validation
* Registration Cutoff Validation
* Registration Tracking

---

### 3.4 Dashboard Module

Purpose:

Provide personalized dashboards for users.

Organizer Dashboard:

* View Created Events
* Manage Attendees
* Export CSV Reports

Attendee Dashboard:

* View Registered Events
* Access Event Information

---

## 4. Core Process Flows

### Event Creation Flow

1. Organizer logs into PulseMeet.
2. Organizer opens Create Event.
3. Organizer enters event information.
4. System validates input data.
5. Event is stored in MongoDB.
6. Organizer receives confirmation.
7. Public event page becomes accessible.

---

### Event Registration Flow

1. Attendee visits an event page.
2. Attendee selects Register.
3. System verifies authentication status.
4. System validates registration rules.
5. Registration record is created.
6. Attendee receives success confirmation.

---

### Attendee Export Flow

1. Organizer opens Event Dashboard.
2. Organizer selects Export CSV.
3. System validates ownership.
4. CSV file is generated.
5. Download begins automatically.

---

## 5. Security Requirements

PulseMeet enforces:

* Password Hashing
* JWT Session Management
* Route Protection
* Role-Based Authorization
* Event Ownership Verification
* Duplicate Registration Prevention

These controls ensure secure event management and attendee data protection.
