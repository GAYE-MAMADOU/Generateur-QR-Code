import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { VCardPlusData } from '@/types/qr';
import { toast } from 'sonner';

function generateSlug(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function useVCardPlus() {
  const [isLoading, setIsLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const createOrUpdateProfile = useCallback(async (data: VCardPlusData): Promise<string | null> => {
    if (!data.firstName || !data.lastName) {
      toast.error('Le prénom et le nom sont requis');
      return null;
    }

    setIsLoading(true);
    
    try {
      const slug = data.slug || generateSlug();
      
      const profileData = {
        slug,
        first_name: data.firstName,
        last_name: data.lastName,
        photo_url: data.photoUrl || null,
        job_title: data.jobTitle || null,
        company: data.company || null,
        bio: data.bio || null,
        email: data.email || null,
        phone: data.phone || null,
        website: data.website || null,
        address: data.address || null,
        instagram: data.instagram || null,
        facebook: data.facebook || null,
        linkedin: data.linkedin || null,
        twitter: data.twitter || null,
        youtube: data.youtube || null,
        tiktok: null,
        github: data.github || null,
        whatsapp: data.whatsapp || null,
        theme: data.theme,
        primary_color: data.primaryColor,
      };

      // Try to update existing or insert new
      if (data.slug) {
        const { error } = await supabase
          .from('vcard_plus_profiles')
          .update(profileData)
          .eq('slug', data.slug);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('vcard_plus_profiles')
          .insert(profileData);
        
        if (error) throw error;
      }

      const url = `${window.location.origin}/p/${slug}`;
      setProfileUrl(url);
      toast.success('Profil créé avec succès !');
      
      return slug;
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error('Erreur lors de la sauvegarde du profil');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    profileUrl,
    createOrUpdateProfile,
  };
}
