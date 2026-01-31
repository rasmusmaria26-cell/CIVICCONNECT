# 🏛️ CivicConnect

**CivicConnect** is a premium, minimalist platform designed to bridge the gap between citizens and urban authorities. Built with an **Organic Minimalist** architectural aesthetic, it prioritizes trust, clarity, and efficient civic management.

![CivicConnect Architectural Icon](frontend/public/logo.png)

## 🌿 The Design: "Sandal & Ivory"
The platform features a bespoke design system that rejects dark, futuristic "AI-style" glows in favor of:
- **Ivory & Stone Palette**: A warm, professional color scheme using `#FFFFFF` and `#FAF9F6`.
- **Architectural Surfaces**: Layered layouts with subtle dot-grids for a drafting-blueprint feel.
- **Physics-Based UI**: Natural, weighted transitions powered by `Framer Motion`.

---

## 🚀 Quick Start (For Developers)

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [Git](https://git-scm.com/)

### 1. Clone the Project
```bash
git clone https://github.com/rasmusmaria26-cell/CIVICCONNECT.git
cd CIVICCONNECT
```

### 2. Backend Setup
```bash
cd backend
npm install
# Initialize the database (SQLite)
npx prisma generate
npx prisma db push
# Start the server
node src/index.js
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

---

## 🏗️ Core Features

- **Citizen Dashboard**: High-contrast report management, "Community Pulse" metrics, and location-aware report filing.
- **Authority Terminal**: Data-dense urban management matrix, departmental KPIs, and administrative resolution workflows.
- **Secure Auth**: Robust JWT-based authentication with role-based routing (Citizen vs. Authority).
- **Responsive Architecture**: Fully optimized for mobile and desktop infrastructure management.

## 🛠️ Technology Stack
- **Frontend**: React 19, Vite, Framer Motion, Lucide Icons, Axios.
- **Backend**: Express.js, Prisma ORM, SQLite, JWT, Bcrypt.
- **Styling**: Vanilla CSS (Architectural Grid System).

---

> [!TIP]
> **Default Credentials**: You can register as either a "Citizen Participant" or an "Urban Authority" directly from the Join/Login screens to explore different terminal views.

Developed with ❤️ for the future of civic organization.
