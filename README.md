# Sports Venue Dashboard

A dashboard application for analyzing business metrics and revenue data of a sports venue platform.  
Built as part of a coding assignment with a focus on clean data modeling, accurate analytics, and a professional UI.

---

## 🚀 Live Demo

👉 <PASTE YOUR DEPLOYED VERCEL URL HERE>

---

## 🛠 Tech Stack

### Frontend
- React
- Vite
- TypeScript
- Tailwind CSS
- React Query
- Recharts
- Lucide Icons

### Backend / Database
- Supabase (PostgreSQL)
- Supabase JavaScript Client
- SQL (for schema and seed data)

### Deployment
- Vercel (Frontend)
- Supabase (Database & API)

---

## 📊 Features

- Business KPI dashboard
- Total, booking, and coaching revenue analytics
- Active vs inactive members
- Trial users and conversion tracking
- Cancelled bookings count
- Refunded / disputed transactions tracking
- Revenue grouped by venue (bar chart)
- Clean, professional admin-style UI

---

## 🧱 Database Schema

The application uses the following core tables:

- `venues`
- `members`
- `bookings`
- `transactions`

Relationships are enforced using foreign keys and UUID primary keys.  
Row Level Security (RLS) is enabled with public read-only access for dashboard queries.

---

## 📡 Data Flow

