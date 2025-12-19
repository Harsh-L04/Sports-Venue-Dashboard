# 🏟️ Sports Venue Dashboard

A modern analytics dashboard for monitoring business performance and revenue metrics across a sports venue platform.  
Built as a coding assignment with a strong emphasis on **clean data modeling**, **accurate analytics**, and a **professional admin-style UI**.

---

## 🚀 Live Demo

👉 https://sports-venue-dashboard.vercel.app/

---

## 🛠 Tech Stack

### Frontend
- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **React Query**
- **Recharts**
- **Lucide Icons**

### Backend / Database
- **Supabase** (PostgreSQL)
- **Supabase JavaScript Client**
- **SQL** (schema design & seed data)

### Deployment
- **Vercel** (Frontend)
- **Supabase** (Database & API)

---

## 📊 Features

### Business KPIs
- Total revenue
- Booking revenue
- Coaching revenue

### Membership Analytics
- Active vs inactive members
- Trial users
- Trial-to-paid conversion tracking

### Booking Insights
- Total bookings
- Cancelled bookings count

### Transaction Monitoring
- Refunded transactions
- Disputed payments

### Venue Performance
- Revenue grouped by venue (bar chart)

### UI / UX
- Clean, professional admin-style dashboard
- Responsive layout
- Clear, readable data visualizations

---

## 🧱 Database Schema

The application uses a relational PostgreSQL schema designed for analytics and reporting.

### Core Tables
- `venues`
- `members`
- `bookings`
- `transactions`

### Schema Highlights
- UUID primary keys
- Enforced foreign key relationships
- Normalized structure for accurate reporting
- Designed for efficient aggregation and analytics queries

---

## 🔐 Security

- Row Level Security (RLS) enabled
- Public **read-only** access for dashboard queries
- Write operations restricted at the database level

---

## 📦 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
