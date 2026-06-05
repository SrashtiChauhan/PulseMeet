# PulseMeet

<div align="center">

### Modern Event Registration & Management Platform

Built with Next.js, React, TypeScript, MongoDB & NextAuth.js

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![NextAuth](https://img.shields.io/badge/NextAuth.js-Authentication-8B5CF6?style=for-the-badge)

<br/>

</div>

PulseMeet enables hosts to create and manage public events while allowing attendees to register, track participation, and access their registered events through a secure dashboard. The platform focuses on simplicity, security, scalability, and an intuitive user experience.

---

## Overview



The platform provides a complete event management workflow including:

* Host Authentication
* Event Creation & Management
* Public Event Pages
* Attendee Registration
* Protected Dashboards
* CSV Export Functionality
* Capacity Management
* Registration Deadline Controls
* Duplicate Registration Prevention

---

## Features

### Host Features

* Secure Host Registration and Login
* Create Public Events
* Edit Existing Events
* Delete Events
* View Event Dashboard
* Monitor Registrations
* Search Attendees
* Export Attendee Data as CSV
* Capacity Limit Configuration
* Registration Cutoff Date Configuration

### Attendee Features

* Secure Registration and Login
* Register for Public Events
* View Registered Events
* Access Event Details
* Track Participation

### Public Features

* Public Event Pages
* Shareable Event URLs
* Event Information Display
* Attendee Count Visibility

### Security Features

* Password Hashing using bcryptjs
* JWT-Based Authentication
* Protected Dashboard Routes
* Role-Based Access Control
* Event Ownership Verification
* Duplicate Registration Prevention
* Passwords Never Exposed in APIs or CSV Exports

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React 19
* TypeScript
* Tailwind CSS v4
* Framer Motion
* Lucide React

### Backend

* Next.js Route Handlers
* NextAuth.js
* bcryptjs

### Database

* MongoDB Atlas
* Mongoose ODM

### Deployment

* Vercel
* MongoDB Atlas

---

## Architecture

PulseMeet follows a modern full-stack architecture consisting of:

### Presentation Layer

* React Components
* Next.js App Router
* Tailwind CSS UI

### Application Layer

* Next.js Route Handlers
* Business Logic
* Validation
* Authorization

### Authentication Layer

* NextAuth.js
* JWT Sessions
* Password Verification

### Data Layer

* MongoDB
* Mongoose Models

---

## Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   ├── api/
│   ├── attendee/
│   ├── dashboard/
│   └── events/
│
├── components/
│
├── lib/
│
├── models/
│
├── types/
│
└── docs/
```

---

## Database Models

### User

Stores:

* Name
* Email
* Password (Hashed)
* Role (HOST / ATTENDEE)

### Event

Stores:

* Title
* Description
* Date
* Time
* Location
* Host Information
* Capacity
* Registration Cutoff
* Status

### Registration

Stores:

* Event Reference
* Attendee Reference

A unique constraint prevents duplicate registrations.

---

## API Capabilities

### Authentication

* User Registration
* User Login
* Session Management

### Event Management

* Create Event
* Edit Event
* Delete Event
* Fetch Events

### Registration

* Register for Event
* Prevent Duplicate Registrations
* Capacity Validation
* Cutoff Validation

### Dashboard

* View Attendees
* Search Attendees
* Export CSV

---

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=
```

---

## Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/SrashtiChauhan/PulseMeet.git
```

### 2. Navigate into Project

```bash
cd PulseMeet
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create:

```text
.env.local
```

Add:

```env
MONGODB_URI=

NEXTAUTH_SECRET=

NEXTAUTH_URL=
```

### 5. Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Documentation

Detailed project documentation is available in the `/docs` directory:

* API Documentation
* Architecture Documentation
* Deployment Guide
* Functional Architecture Document (FAD)
* Feature Traceability List (FTL)
* Product Requirements Document (PRD)
* System Architecture Document (SAD)
* Technical Architecture Document (TAD)

---

## Future Enhancements

Potential improvements include:

* Event Categories
* Event Images
* Social Authentication
* Email Notifications
* Analytics Dashboard
* Event Discovery Filters
* Attendance Tracking

---

##  Screenshots

### 🏠 Home Page

<p align="center">
  <img src="./public/screenshots/Home.png" alt="Home Page" width="100%" />
</p>

---

### 👨‍💼 Host Dashboard

<p align="center">
  <img src="./public/screenshots/HostDashboard.png" alt="Host Dashboard" width="100%" />
</p>

---

### 🌐 Public Event Page

<p align="center">
  <img src="./public/screenshots/PublicEventPage.png" alt="Public Event Page" width="100%" />
</p>

---

### 🎟️ Attendee Dashboard

<p align="center">
  <img src="./public/screenshots/AttendeeDashboard.png" alt="Attendee Dashboard" width="100%" />
</p>

---

## Author

**Srashti Chauhan**

Developed as part of the **Byamn Summer Web Development Internship 2026 Assessment**.

---

## License

This project is intended for educational and internship evaluation purposes.

