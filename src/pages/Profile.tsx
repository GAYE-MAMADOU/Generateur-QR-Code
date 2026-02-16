import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, Globe, MapPin, Briefcase, Building2, Download,
  Instagram, Facebook, Linkedin, Twitter, Youtube, Github, MessageCircle,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type VCardProfile = {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  photo_url: string | null;
  job_title: string | null;
  company: string | null;
  bio: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  twitter: string | null;
  youtube: string | null;
  tiktok: string | null;
  github: string | null;
  whatsapp: string | null;
  theme: string;
  primary_color: string;
};

const socialLinks = [
  { key: 'instagram', icon: Instagram, urlPrefix: 'https://instagram.com/', label: 'Instagram' },
  { key: 'facebook', icon: Facebook, urlPrefix: 'https://facebook.com/', label: 'Facebook' },
  { key: 'linkedin', icon: Linkedin, urlPrefix: 'https://linkedin.com/in/', label: 'LinkedIn' },
  { key: 'twitter', icon: Twitter, urlPrefix: 'https://x.com/', label: 'X (Twitter)' },
  { key: 'youtube', icon: Youtube, urlPrefix: 'https://youtube.com/@', label: 'YouTube' },
  { key: 'github', icon: Github, urlPrefix: 'https://github.com/', label: 'GitHub' },
  { key: 'whatsapp', icon: MessageCircle, urlPrefix: 'https://wa.me/', label: 'WhatsApp' },
] as const;

export default function Profile() {
  const { slug } = useParams<{ slug: string }>();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vcard_plus_profiles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      return data as VCardProfile | null;
    },
    enabled: !!slug,
  });

  const downloadVCard = () => {
    if (!profile) return;
    
    const vcardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${profile.last_name};${profile.first_name};;;`,
      `FN:${profile.first_name} ${profile.last_name}`,
    ];
    
    if (profile.phone) vcardLines.push(`TEL:${profile.phone}`);
    if (profile.email) vcardLines.push(`EMAIL:${profile.email}`);
    if (profile.company) vcardLines.push(`ORG:${profile.company}`);
    if (profile.job_title) vcardLines.push(`TITLE:${profile.job_title}`);
    if (profile.website) vcardLines.push(`URL:${profile.website}`);
    if (profile.address) vcardLines.push(`ADR:;;${profile.address};;;;`);
    if (profile.photo_url) vcardLines.push(`PHOTO;TYPE=URI:${profile.photo_url}`);
    
    vcardLines.push('END:VCARD');
    
    const blob = new Blob([vcardLines.join('\n')], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.first_name}_${profile.last_name}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <User className="w-16 h-16 mx-auto text-muted-foreground" />
          <h1 className="text-2xl font-bold">Profil introuvable</h1>
          <p className="text-muted-foreground">Ce profil n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    );
  }

  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'classic':
        return 'bg-slate-800 text-white';
      case 'gradient':
        return 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white';
      case 'dark':
        return 'bg-zinc-900 text-white';
      case 'minimal':
        return 'bg-white text-gray-900';
      case 'modern':
      default:
        return 'bg-gradient-to-br from-blue-500 to-purple-600 text-white';
    }
  };

  const getCardStyles = () => {
    switch (profile.theme) {
      case 'minimal':
        return 'bg-gray-50 border border-gray-200';
      case 'dark':
        return 'bg-zinc-800/80 backdrop-blur-sm';
      default:
        return 'bg-white/10 backdrop-blur-sm';
    }
  };

  const getTextColor = () => {
    return profile.theme === 'minimal' ? 'text-gray-900' : 'text-white';
  };

  const getMutedTextColor = () => {
    return profile.theme === 'minimal' ? 'text-gray-600' : 'text-white/80';
  };

  return (
    <div className={cn('min-h-screen', getThemeStyles())}>
      <div className="max-w-md mx-auto px-4 py-8 space-y-6">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          {profile.photo_url ? (
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={profile.photo_url}
              alt={`${profile.first_name} ${profile.last_name}`}
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 shadow-xl"
              style={{ borderColor: profile.primary_color }}
            />
          ) : (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-32 h-32 rounded-full mx-auto flex items-center justify-center border-4 shadow-xl"
              style={{ backgroundColor: profile.primary_color, borderColor: profile.primary_color }}
            >
              <span className="text-4xl font-bold text-white">
                {profile.first_name[0]}{profile.last_name[0]}
              </span>
            </motion.div>
          )}

          <div>
            <h1 className={cn('text-3xl font-bold', getTextColor())}>
              {profile.first_name} {profile.last_name}
            </h1>
            {(profile.job_title || profile.company) && (
              <p className={cn('text-lg mt-1', getMutedTextColor())}>
                {profile.job_title}
                {profile.job_title && profile.company && ' • '}
                {profile.company}
              </p>
            )}
          </div>

          {profile.bio && (
            <p className={cn('text-sm max-w-xs mx-auto', getMutedTextColor())}>
              {profile.bio}
            </p>
          )}
        </motion.div>

        {/* Contact Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 justify-center"
        >
          <Button
            onClick={downloadVCard}
            className="rounded-full px-6"
            style={{ backgroundColor: profile.primary_color }}
          >
            <Download className="w-4 h-4 mr-2" />
            Enregistrer le contact
          </Button>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={cn('rounded-2xl p-4 space-y-3', getCardStyles())}
        >
          {profile.email && (
            <a 
              href={`mailto:${profile.email}`}
              className={cn('flex items-center gap-3 p-3 rounded-xl transition-colors', 
                profile.theme === 'minimal' ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              )}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: profile.primary_color }}
              >
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className={cn('text-sm', getMutedTextColor())}>Email</p>
                <p className={cn('font-medium', getTextColor())}>{profile.email}</p>
              </div>
            </a>
          )}

          {profile.phone && (
            <a 
              href={`tel:${profile.phone}`}
              className={cn('flex items-center gap-3 p-3 rounded-xl transition-colors', 
                profile.theme === 'minimal' ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              )}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: profile.primary_color }}
              >
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className={cn('text-sm', getMutedTextColor())}>Téléphone</p>
                <p className={cn('font-medium', getTextColor())}>{profile.phone}</p>
              </div>
            </a>
          )}

          {profile.website && (
            <a 
              href={profile.website}
              target="_blank"
              rel="noopener noreferrer"
              className={cn('flex items-center gap-3 p-3 rounded-xl transition-colors', 
                profile.theme === 'minimal' ? 'hover:bg-gray-100' : 'hover:bg-white/10'
              )}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: profile.primary_color }}
              >
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className={cn('text-sm', getMutedTextColor())}>Site web</p>
                <p className={cn('font-medium truncate', getTextColor())}>{profile.website}</p>
              </div>
            </a>
          )}

          {profile.address && (
            <div className={cn('flex items-center gap-3 p-3 rounded-xl')}>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: profile.primary_color }}
              >
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className={cn('text-sm', getMutedTextColor())}>Adresse</p>
                <p className={cn('font-medium', getTextColor())}>{profile.address}</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Social Links */}
        {socialLinks.some(s => profile[s.key as keyof VCardProfile]) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn('rounded-2xl p-4', getCardStyles())}
          >
            <h3 className={cn('text-sm font-medium mb-4', getMutedTextColor())}>
              Réseaux sociaux
            </h3>
            <div className="grid grid-cols-4 gap-3">
              {socialLinks.map((social) => {
                const value = profile[social.key as keyof VCardProfile];
                if (!value) return null;
                
                const Icon = social.icon;
                const url = social.key === 'whatsapp' 
                  ? `${social.urlPrefix}${String(value).replace(/\D/g, '')}`
                  : `${social.urlPrefix}${String(value).replace('@', '')}`;
                
                return (
                  <motion.a
                    key={social.key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl transition-colors"
                    style={{ backgroundColor: `${profile.primary_color}20` }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: profile.primary_color }}
                    />
                    <span className={cn('text-xs', getMutedTextColor())}>
                      {social.label}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={cn('text-center text-xs', getMutedTextColor())}
        >
          Créé avec QR Code Studio
        </motion.p>
      </div>
    </div>
  );
}
