-- Create venues table
CREATE TABLE public.venues (
  venue_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);


-- Create members table
CREATE TABLE public.members (
  member_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Active', 'Inactive')),
  is_trial_user BOOLEAN NOT NULL DEFAULT false,
  converted_from_trial BOOLEAN NOT NULL DEFAULT false,
  join_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  booking_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  venue_id UUID NOT NULL REFERENCES public.venues(venue_id),
  member_id UUID NOT NULL REFERENCES public.members(member_id),
  sport_id TEXT NOT NULL,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  coupon_code TEXT,
  status TEXT NOT NULL CHECK (status IN ('Confirmed', 'Cancelled', 'Completed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE public.transactions (
  transaction_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.bookings(booking_id),
  type TEXT NOT NULL CHECK (type IN ('Booking', 'Coaching')),
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Success', 'Dispute', 'Refunded')),
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (public read for dashboard)
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create public read policies for dashboard
CREATE POLICY "Allow public read venues" ON public.venues FOR SELECT USING (true);
CREATE POLICY "Allow public read members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public read bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow public read transactions" ON public.transactions FOR SELECT USING (true);