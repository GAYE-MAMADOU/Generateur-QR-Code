-- Create vcard_plus_profiles table for storing enhanced business card profiles
CREATE TABLE public.vcard_plus_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  photo_url TEXT,
  job_title TEXT,
  company TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  address TEXT,
  instagram TEXT,
  facebook TEXT,
  linkedin TEXT,
  twitter TEXT,
  youtube TEXT,
  tiktok TEXT,
  github TEXT,
  whatsapp TEXT,
  theme TEXT NOT NULL DEFAULT 'modern',
  primary_color TEXT NOT NULL DEFAULT '#3B82F6',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.vcard_plus_profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view profiles via QR code)
CREATE POLICY "Profiles are publicly readable" 
ON public.vcard_plus_profiles 
FOR SELECT 
USING (true);

-- Create policy for public insert (allows creating profiles without auth for demo)
CREATE POLICY "Anyone can create profiles" 
ON public.vcard_plus_profiles 
FOR INSERT 
WITH CHECK (true);

-- Create policy for public update (for demo purposes - in production would require auth)
CREATE POLICY "Anyone can update profiles" 
ON public.vcard_plus_profiles 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_vcard_plus_profiles_updated_at
BEFORE UPDATE ON public.vcard_plus_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index on slug for fast lookups
CREATE INDEX idx_vcard_plus_profiles_slug ON public.vcard_plus_profiles(slug);