# Elite Cars 🏎️

Premium car rental platform built with the modern React ecosystem. 

This application provides a seamless experience for users to browse, search, and rent elite vehicles, while offering an administrative dashboard for comprehensive fleet and user management.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** TypeScript
- **Database:** PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js v5 (Auth.js)](https://authjs.dev/) (Credentials Provider, RBAC)
- **Styling:** Tailwind CSS v4, Framer Motion, clsx, tailwind-merge
- **Forms & Validation:** React Hook Form + Zod
- **Infrastructure:** Docker & Docker Compose

## 📦 Features

- **Role-Based Access Control (RBAC):** Separate experiences for `USER` and `ADMIN`.
- **Fleet Management:** Admin dashboard to add, edit, and remove cars.
- **Secure Authentication:** Credentials and session management via Auth.js.
- **Optimized UI:** Responsive design with Tailwind CSS and smooth animations using Framer Motion.
- **Image Handling:** Local upload management.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- Docker & Docker Compose
- PostgreSQL (if not using Docker)

### Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
# Database
POSTGRES_USER=admin
POSTGRES_PASSWORD=secretpassword
POSTGRES_DB=elite_cars
DATABASE_URL="postgresql://admin:secretpassword@localhost:5433/elite_cars?schema=public"

# NextAuth
AUTH_SECRET="generate-a-random-secret-key-here" # Run `npx auth secret` to generate
AUTH_URL="http://localhost:3001"
```

### 🐳 Running via Docker

The easiest way to start the project is using Docker:

1. Ensure Docker is running on your machine.
2. Run the following command in the root directory:
   ```bash
   docker-compose up --build -d
   ```
3. The application will be available at `http://localhost:3001`.

### 💻 Running Locally

If you prefer to run the project locally without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start your local PostgreSQL database and ensure the `.env` credentials are correct.
3. Apply migrations and generate the Prisma client:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. (Optional) Seed the database with initial data:
   ```bash
   npm run prisma:seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. The application will be available at `http://localhost:3000` (default Next.js dev server port).