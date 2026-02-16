-- Create storage bucket for profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-photos', 'profile-photos', true);

-- Allow anyone to upload profile photos
CREATE POLICY "Anyone can upload profile photos"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'profile-photos');

-- Allow anyone to view profile photos
CREATE POLICY "Profile photos are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'profile-photos');

-- Allow anyone to update their uploaded photos
CREATE POLICY "Anyone can update profile photos"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'profile-photos');

-- Allow anyone to delete profile photos
CREATE POLICY "Anyone can delete profile photos"
ON storage.objects
FOR DELETE
USING (bucket_id = 'profile-photos');