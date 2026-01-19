# 🚀 MockAPI

A premium, professional environment for frontend developers to create, manage, and test APIs instantly. No backend required—just pure JSON agility. Built with a modern, scalable architecture using **Next.js 15**, **TypeScript**, and **MongoDB**.

---

## ✨ Key Features

### 🔐 Multi-Layer Authentication

- **Secure Email Verification**: Personalized "Hello [Name]" greetings powered by Nodemailer and Gmail SMTP.
- **72-Hour Sessions**: Robust session management with persistent Access, Refresh, and Secure tokens.
- **Atomic Identity Persistence**: User data and tokens are linked and saved permanently in MongoDB via atomic upserts.

### 🎨 Premium UI/UX

- **Interactive Demo Gallery**: Explore industry-standard JSON mocks (E-commerce, Social, Analytics) with custom syntax highlighting.
- **Glassmorphism Design**: High-end aesthetic with mesh gradients, backdrop blurs, and responsive dark mode.
- **Micro-Animations**: Smooth transitions and hover states for a professional feel.

### 🧠 Advanced Backend Logic

- **Mongoose Integration**: Flexible schema modeling with singleton connection management.
- **Token Authorization**: Secure JWT-based access with intelligent token reuse logic.
- **Diagnostic Logging**: Explicit server-side logs for database sync and persistence handshakes.

---

## 🚀 Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) (via Mongoose)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Mailing:** Nodemailer (Gmail SMTP)
- **Auth:** Custom JWT + NextAuth (Middleware ready)
- **Icons:** Lucide Icons
- **Validation:** Zod
- **Fetching:** Axios + TanStack Query

---

## ⚙️ Setup & Installation

### 1️⃣ Clone & Install

```bash
git clone https://github.com/RashedulHaqueRasel1/mock-api.git
cd mock-api
npm install
```

### 2️⃣ Environment Variables

Create a `.env.local` file in the root directory:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_SECRET=your_jwt_secret
NEXTAUTH_URL=http://localhost:3000

# Nodemailer (Gmail)
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start prototyping.

---

## ⚡ Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Run production build
- `npm run lint`: Run ESLint checks

---

## 🧑‍💻 Author

**Rashedul Haque Rasel**
Built with ❤️ using Next.js, TypeScript, and MongoDB.

📧 [rashedulhaquerasel1@gmail.com](mailto:rashedulhaquerasel1@gmail.com)
🌐 [Portfolio](https://rashedul-haque-rasel.vercel.app)
