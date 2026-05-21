# Gram-Sewa

Gram-Sewa is a frontend-only civic complaint tracking system built for a college project. It helps rural citizens report local infrastructure issues and allows local authorities to review, prioritize, and update complaint progress through a simple web dashboard.

## Overview

In many villages, civic problems such as broken roads, water supply failures, electricity outages, and sanitation issues are reported verbally, which makes tracking difficult. Gram-Sewa provides a structured digital workflow where citizens can file complaints with details and image proof, while authorities can manage those complaints with transparent status updates.

This project is a Phase 1 prototype. It uses browser `localStorage` for persistence and does not require a backend server.

## Features

- Citizen registration and login
- Authority/admin login and dashboard
- Complaint filing with title, category, description, village, ward, and image upload
- Citizen dashboard to track submitted complaints
- Authority dashboard to view and manage all complaints
- Status lifecycle:
  - Pending
  - In Review
  - In Progress
  - Resolved
- Priority assignment:
  - Low
  - Medium
  - High
  - Critical
- Authority remarks for complaint resolution
- CSV export and import
- Seeded demo users and sample complaints
- English and Hindi language switch
- Responsive mobile-first UI

## Tech Stack

- React
- Vite
- Tailwind CSS
- Lucide React Icons
- Browser localStorage

## Demo Credentials

### Authority/Admin

```text
Phone: 9876543210
Password: admin123
```

### Citizen

```text
Phone: 9123456780
Password: citizen123
```

Additional demo citizens:

```text
7982456130 / citizen123
8630914725 / citizen123
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

### 3. Build for production

```bash
npm run build
```

## Project Structure

```text
src/
  Assets/
    logo.png
  components/
    AboutPage.jsx
    AdminComplaintRow.jsx
    AdminDashboard.jsx
    AuthShell.jsx
    CitizenDashboard.jsx
    ComplaintCard.jsx
    ComplaintForm.jsx
    DashboardHero.jsx
    Header.jsx
    LanguageSwitch.jsx
    StatusBadge.jsx
    ui.jsx
  data/
    seedComplaints.json
    seedUsers.json
  App.jsx
  constants.js
  csv.js
  i18n.js
  main.jsx
  seedData.js
  storage.js
  styles.css
```

## localStorage Keys

The app stores runtime data in the browser using these keys:

```text
gramsewa_users
gramsewa_current_user
gramsewa_complaints
gramsewa_language
```

Seed users and complaints are loaded from JSON files when the app starts. Passwords from seed data are hashed before being stored in `localStorage`.

## Complaint Status Meaning

| Status | Meaning |
| --- | --- |
| Pending | Complaint has been submitted but not yet reviewed. |
| In Review | Authority has seen the complaint and is checking details. |
| In Progress | Action has started, such as inspection or repair planning. |
| Resolved | Issue has been completed or closed with remarks. |

## Phase 1 Scope

This version is intentionally frontend-only:

- No Express.js backend
- No MongoDB database
- No real authentication server
- Data is saved in browser storage
- CSV import/export is provided for data portability

## Future Enhancements

- Node.js and Express.js backend
- MongoDB database
- JWT authentication
- Map-based complaint location view
- SMS/email notifications
- PWA offline support
- Multilingual expansion
- Government portal integration

## Purpose

Gram-Sewa demonstrates how a simple digital platform can improve complaint documentation, visibility, and accountability in local rural governance.
