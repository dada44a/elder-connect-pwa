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

-- Enable Row Level Security
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guardian_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Event" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Medicine" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."Message" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for enrollments
CREATE POLICY "Users can view their own enrollments" ON public.enrollments
  FOR SELECT USING (user_id = auth.uid()::integer);

CREATE POLICY "Users can create their own enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (user_id = auth.uid()::integer);

CREATE POLICY "Users can update their own enrollments" ON public.enrollments
  FOR UPDATE USING (user_id = auth.uid()::integer);

-- RLS Policies for events (public read, authenticated users can enroll)
CREATE POLICY "Events are viewable by everyone" ON public."Event"
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create events" ON public."Event"
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for medicine (user-specific)
CREATE POLICY "Users can view their own medicine" ON public."Medicine"
  FOR SELECT USING (user_id = auth.uid()::integer);

CREATE POLICY "Users can manage their own medicine" ON public."Medicine"
  FOR ALL USING (user_id = auth.uid()::integer);

-- RLS Policies for guardian connections
CREATE POLICY "Users can view their guardian connections" ON public.guardian_connections
  FOR SELECT USING (senior_id = auth.uid()::integer OR guardian_id = auth.uid()::integer);

CREATE POLICY "Seniors can create guardian connections" ON public.guardian_connections
  FOR INSERT WITH CHECK (senior_id = auth.uid()::integer);

CREATE POLICY "Users can update their guardian connections" ON public.guardian_connections
  FOR UPDATE USING (senior_id = auth.uid()::integer OR guardian_id = auth.uid()::integer);

-- RLS Policies for messages
CREATE POLICY "Users can view their messages" ON public."Message"
  FOR SELECT USING (sender_id = auth.uid()::integer OR receiver_id = auth.uid()::integer);

CREATE POLICY "Users can send messages" ON public."Message"
  FOR INSERT WITH CHECK (sender_id = auth.uid()::integer);

-- RLS Policies for users (profiles viewable, own profile editable)
CREATE POLICY "Profiles are viewable by authenticated users" ON public."User"
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own profile" ON public."User"
  FOR UPDATE USING (id = auth.uid()::integer);

-- Insert some sample data
INSERT INTO public."Event" (title, description, date, time, location, category, participants, max_participants, distance) VALUES
('Morning Yoga', 'Start your day with gentle yoga exercises', '2025-01-15'::date, '07:00:00'::time, 'Community Park', 'Health & Wellness', 12, 20, '0.5 km'),
('Health Checkup', 'Comprehensive health screening for seniors', '2025-01-16'::date, '10:00:00'::time, 'Senior Center', 'Healthcare', 8, 15, '1.2 km'),
('Social Gathering', 'Connect with fellow community members', '2025-01-17'::date, '15:00:00'::time, 'Community Hall', 'Social', 25, 30, '0.8 km');

-- Insert sample user (you'll need to replace with actual auth user id when authentication is implemented)
INSERT INTO public."User" (name, email, password_hash, role) VALUES
('John Doe', 'john@example.com', 'dummy_hash', 'senior'),
('Jane Guardian', 'jane@example.com', 'dummy_hash', 'guardian');

-- Add some sample medicine data
INSERT INTO public."Medicine" (name, dosage, frequency, user_id, time_of_day, next_due) VALUES
('Vitamin D', '1000 IU', 'Daily', 1, '08:00', '2025-01-14 08:00:00'),
('Blood Pressure Medicine', '5mg', 'Twice Daily', 1, '08:00, 20:00', '2025-01-14 08:00:00'),
('Calcium', '500mg', 'Daily', 1, '10:00', '2025-01-14 10:00:00');