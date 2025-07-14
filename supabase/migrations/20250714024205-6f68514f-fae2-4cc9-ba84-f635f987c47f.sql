-- Create enrollment table to track user event enrollments
CREATE TABLE public.enrollments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
  event_id INTEGER NOT NULL REFERENCES public."Event"(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, event_id)
);

-- Add missing columns to Event table
ALTER TABLE public."Event" ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';
ALTER TABLE public."Event" ADD COLUMN IF NOT EXISTS participants INTEGER DEFAULT 0;
ALTER TABLE public."Event" ADD COLUMN IF NOT EXISTS max_participants INTEGER DEFAULT 50;
ALTER TABLE public."Event" ADD COLUMN IF NOT EXISTS distance TEXT;
ALTER TABLE public."Event" ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add missing columns to Medicine table  
ALTER TABLE public."Medicine" ADD COLUMN IF NOT EXISTS time_of_day TEXT;
ALTER TABLE public."Medicine" ADD COLUMN IF NOT EXISTS next_due TIMESTAMP WITH TIME ZONE;
ALTER TABLE public."Medicine" ADD COLUMN IF NOT EXISTS taken BOOLEAN DEFAULT FALSE;

-- Create guardian connections table
CREATE TABLE public.guardian_connections (
  id SERIAL PRIMARY KEY,
  senior_id INTEGER NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
  guardian_id INTEGER NOT NULL REFERENCES public."User"(id) ON DELETE CASCADE,
  relation TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(senior_id, guardian_id)
);

-- Add user role column
ALTER TABLE public."User" ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'senior' CHECK (role IN ('senior', 'guardian', 'admin'));

-- Insert some sample data
INSERT INTO public."Event" (title, description, date, time, location, category, participants, max_participants, distance) VALUES
('Morning Yoga', 'Start your day with gentle yoga exercises', '2025-01-15'::date, '07:00:00'::time, 'Community Park', 'Health & Wellness', 12, 20, '0.5 km'),
('Health Checkup', 'Comprehensive health screening for seniors', '2025-01-16'::date, '10:00:00'::time, 'Senior Center', 'Healthcare', 8, 15, '1.2 km'),
('Social Gathering', 'Connect with fellow community members', '2025-01-17'::date, '15:00:00'::time, 'Community Hall', 'Social', 25, 30, '0.8 km')
ON CONFLICT DO NOTHING;