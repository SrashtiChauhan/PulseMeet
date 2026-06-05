# Deployment Guide

This guide explains how to deploy PulseMeet to production using MongoDB Atlas and Vercel.

PulseMeet is designed as a modern full-stack Next.js application and can be deployed entirely using free-tier services.

---

# 🚀 Deployment Overview

### Services Used

| Service       | Purpose             |
| ------------- | ------------------- |
| MongoDB Atlas | Cloud Database      |
| GitHub        | Source Code Hosting |
| Vercel        | Application Hosting |

---

# Step 1 — Configure MongoDB Atlas

## Create an Atlas Account

1. Visit MongoDB Atlas.
2. Create a free account.
3. Create a new **M0 Free Cluster**.

---

## Create Database User

Navigate to:

```text
Security → Database Access
```

Create a database user and save:

```text
Username
Password
```

These credentials will be required for the database connection string.

---

## Configure Network Access

Navigate to:

```text
Security → Network Access
```

Add:

```text
0.0.0.0/0
```

This allows Vercel to access the database.

---

## Obtain Connection String

Navigate to:

```text
Connect → Drivers → Node.js
```

Example:

```text
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/pulsemeet?retryWrites=true&w=majority
```

Save this value.

---

# Step 2 — Create GitHub Repository

Create a new repository:

```text
pulsemeet
```

Example:

```text
https://github.com/YOUR_USERNAME/pulsemeet
```

---

## Push Local Project

```bash
git init

git add .

git commit -m "Initial PulseMeet Release"

git branch -M main

git remote add origin https://github.com/YOUR_USERNAME/pulsemeet.git

git push -u origin main
```

---

# Step 3 — Deploy to Vercel

## Import Repository

1. Sign in to Vercel.
2. Click:

```text
Add New Project
```

3. Select:

```text
pulsemeet
```

4. Import the repository.

---

# Step 4 — Configure Environment Variables

Before deployment, add the following environment variables:

| Variable        | Description                     |
| --------------- | ------------------------------- |
| MONGODB_URI     | MongoDB Atlas connection string |
| NEXTAUTH_SECRET | Secure random secret            |
| NEXTAUTH_URL    | Production application URL      |

---

## Example Configuration

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/pulsemeet

NEXTAUTH_SECRET=GENERATE_A_SECURE_SECRET

NEXTAUTH_URL=https://pulsemeet.vercel.app
```

---

# Step 5 — Deploy

Click:

```text
Deploy
```

Vercel automatically:

* Installs dependencies
* Builds the Next.js application
* Creates serverless API routes
* Deploys the production application

---

# 🔒 Production Security Checklist

Before sharing the application:

### Authentication

* Use a strong NEXTAUTH_SECRET
* Never commit .env.local files

### Database

* Restrict Atlas permissions where possible
* Monitor database access regularly

### Application

* Verify protected dashboard routes
* Verify attendee data is not publicly accessible
* Verify CSV exports exclude passwords

---

# ✅ Post-Deployment Verification

After deployment verify:

### Host Features

* Host Registration
* Host Login
* Event Creation
* Event Editing
* Event Dashboard
* CSV Export

### Attendee Features

* Attendee Registration
* Attendee Login
* Event Registration
* My Events Dashboard

### Security

* Password hashing
* Session management
* Route protection
* Duplicate registration prevention

---

# 🎉 Deployment Complete

Once all checks pass, PulseMeet is ready for production use.

The platform can now be used to host hackathons, workshops, meetups, community events, and technical conferences with a modern, scalable, and secure event management workflow.
