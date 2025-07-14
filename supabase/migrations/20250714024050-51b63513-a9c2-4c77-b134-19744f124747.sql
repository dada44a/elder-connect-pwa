-- First, let's update the User table to use UUID as primary key to match Supabase auth
ALTER TABLE public."User" DROP CONSTRAINT IF EXISTS "User_pkey";
ALTER TABLE public."User" ADD COLUMN uuid_id UUID;
UPDATE public."User" SET uuid_id = gen_random_uuid();
ALTER TABLE public."User" ALTER COLUMN uuid_id SET NOT NULL;
ALTER TABLE public."User" ADD PRIMARY KEY (uuid_id);

-- Create enrollment table to track user event enrollments
CREATE TABLE public.enrollments (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public."User"(uuid_id) ON DELETE CASCADE,
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

-- Update Medicine table to use UUID foreign key
ALTER TABLE public."Medicine" ADD COLUMN user_uuid UUID;
UPDATE public."Medicine" SET user_uuid = (SELECT uuid_id FROM public."User" WHERE id = "Medicine".user_id);
ALTER TABLE public."Medicine" ALTER COLUMN user_uuid SET NOT NULL;
ALTER TABLE public."Medicine" ADD CONSTRAINT medicine_user_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public."User"(uuid_id) ON DELETE CASCADE;

-- Add missing columns to Medicine table  
ALTER TABLE public."Medicine" ADD COLUMN IF NOT EXISTS time_of_day TEXT;
ALTER TABLE public."Medicine" ADD COLUMN IF NOT EXISTS next_due TIMESTAMP WITH TIME ZONE;
ALTER TABLE public."Medicine" ADD COLUMN IF NOT EXISTS taken BOOLEAN DEFAULT FALSE;

-- Create guardian connections table
CREATE TABLE public.guardian_connections (
  id SERIAL PRIMARY KEY,
  senior_id UUID NOT NULL REFERENCES public."User"(uuid_id) ON DELETE CASCADE,
  guardian_id UUID NOT NULL REFERENCES public."User"(uuid_id) ON DELETE CASCADE,
  relation TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  connected_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(senior_id, guardian_id)
);

-- Update Message table to use UUID foreign keys
ALTER TABLE public."Message" ADD COLUMN sender_uuid UUID;
ALTER TABLE public."Message" ADD COLUMN receiver_uuid UUID;
UPDATE public."Message" SET sender_uuid = (SELECT uuid_id FROM public."User" WHERE id = "Message".sender_id);
UPDATE public."Message" SET receiver_uuid = (SELECT uuid_id FROM public."User" WHERE id = "Message".receiver_id);

-- Add user role column
ALTER TABLE public."User" ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'senior' CHECK (role IN ('senior', 'guardian', 'admin'));