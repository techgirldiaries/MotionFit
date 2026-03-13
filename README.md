# MotionFit Tracker

A modern workout tracker application built with Vue 3, Vite, Tailwind CSS, and Supabase.

[![Netlify Status](https://api.netlify.com/api/v1/badges/5c0e9bf3-75a1-4feb-80ce-2b10612c7ead/deploy-status)](https://app.netlify.com/sites/motionfit-tracker/deploys)

## Features

- 🏋️ Track strength training and cardio workouts
- 👤 User authentication with Supabase
- 📊 Personal workout history
- ✏️ Create, edit, and delete workouts
- 🔒 Secure with Row Level Security (RLS)

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS 3** - Utility-first CSS framework
- **Supabase** - Backend as a Service (Authentication & Database)
- **Vue Router 4** - Official router for Vue.js

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/techgirldiaries/MotionFit.git
cd MotionFit
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up your Supabase database (see [Database Setup](#database-setup) below)

### Development

Start the development server with hot-reload:

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### Production

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

### Linting

Lint and fix files:

```bash
npm run lint
```

## Database Setup

Run this SQL in your Supabase SQL Editor to create the required tables:

```sql
BEGIN;

CREATE TABLE IF NOT EXISTS public.workouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  workout_name TEXT NOT NULL,
  workout_type TEXT NOT NULL,
  exercises JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS workouts_user_id_idx ON public.workouts(user_id);
CREATE INDEX IF NOT EXISTS workouts_exercises_idx ON public.workouts USING GIN (exercises);

ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can create their own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can update their own workouts" ON public.workouts;
DROP POLICY IF EXISTS "Users can delete their own workouts" ON public.workouts;

CREATE POLICY "Users can view their own workouts"
  ON public.workouts FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL AND user_id = (SELECT auth.uid()));

CREATE POLICY "Users can create their own workouts"
  ON public.workouts FOR INSERT TO authenticated
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL AND user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own workouts"
  ON public.workouts FOR UPDATE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL AND user_id = (SELECT auth.uid()))
  WITH CHECK ((SELECT auth.uid()) IS NOT NULL AND user_id = (SELECT auth.uid()));

CREATE POLICY "Users can delete their own workouts"
  ON public.workouts FOR DELETE TO authenticated
  USING ((SELECT auth.uid()) IS NOT NULL AND user_id = (SELECT auth.uid()));

COMMIT;
```

## Configuration

For Vite configuration, see [vite.config.js](vite.config.js).

## License

Licensed under the PolyForm Noncommercial License - Commercial use is prohibited

Copyright (c) 2025 Oluwakemi Obadeyi
