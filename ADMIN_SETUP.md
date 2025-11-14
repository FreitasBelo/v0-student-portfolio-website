# Admin Panel Setup Guide

## Features
Your portfolio now has a complete admin panel with:
- 🔐 Secure authentication with NextAuth.js
- 📊 Dashboard to manage all content
- 📝 Projects management
- 💼 Experience management
- 🎯 Skills management
- 🎨 Modern UI with shadcn/ui components

## Setup Instructions

### 1. Database Setup
First, make sure you have a PostgreSQL database. Update your `.env` file:

```env
DATABASE_URL="postgresql://neondb_owner:npg_SLC3YBr5XIeG@ep-steep-recipe-a71pet2z-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_URL="https://v0-student-portfolio-website.vercel.app"
NEXTAUTH_SECRET="D7HcZGd5aMXFSG0RUW4B3g7mXgMvOFgpcHx4EQHtpIM="
```

### 2. Run Migrations
```bash
pnpm prisma migrate dev --name init
```

### 3. Create Your Admin Account
Run this script to create your first admin user:

```bash
# On Windows PowerShell:
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password', 10).then(hash => console.log(hash))"
```

Then manually insert into your database or use this API endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/register -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"your-password\",\"name\":\"Admin\"}"
```

Or create a user directly via Prisma Studio:
```bash
pnpm prisma studio
```

### 4. Start Development Server
```bash
pnpm dev
```

### 5. Access Admin Panel
Visit: `http://localhost:3000/admin/login`

Login with your credentials and start managing your portfolio!

## Admin Routes
- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/projects` - Manage projects
- `/admin/experience` - Manage work experience
- `/admin/skills` - Manage skills

## API Endpoints
All API endpoints require authentication (except GET requests):

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

### Experience
- `GET /api/experience` - List experience
- `POST /api/experience` - Create experience

### Skills
- `GET /api/skills` - List skills
- `POST /api/skills` - Create skill

## Deployment on Vercel
When deploying to Vercel, add these environment variables in your project settings:
1. `DATABASE_URL` - Your production database URL
2. `NEXTAUTH_URL` - Your production URL (e.g., https://yoursite.vercel.app)
3. `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`

The deployment will automatically run migrations if configured correctly.

## Project Management
- `GET /api/projects/[id]` - Get a specific project
- `PUT /api/projects/[id]` - Update a specific project
- `DELETE /api/projects/[id]` - Delete a specific project

## Experience Management
- `GET /api/experience/[id]` - Get a specific experience
- `PUT /api/experience/[id]` - Update a specific experience
- `DELETE /api/experience/[id]` - Delete a specific experience

## Skills Management
- `GET /api/skills/[id]` - Get a specific skill
- `PUT /api/skills/[id]` - Update a specific skill
- `DELETE /api/skills/[id]` - Delete a specific skill

### Project Management with Parameters
- `GET /api/projects/[id]` - Get a specific project
- `PUT /api/projects/[id]` - Update a specific project
- `DELETE /api/projects/[id]` - Delete a specific project

### Experience Management with Parameters
- `GET /api/experience/[id]` - Get a specific experience
- `PUT /api/experience/[id]` - Update a specific experience
- `DELETE /api/experience/[id]` - Delete a specific experience

### Skills Management with Parameters
- `GET /api/skills/[id]` - Get a specific skill
- `PUT /api/skills/[id]` - Update a specific skill
- `DELETE /api/skills/[id]` - Delete a specific skill
