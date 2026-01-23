import { VCardPlusData, VCardPlusTheme } from '@/types/qr';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { 
  User, Mail, Phone, Globe, MapPin, Briefcase, Building2,
  Instagram, Facebook, Linkedin, Twitter, Youtube, Github, MessageCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PhotoUpload } from './PhotoUpload';

interface VCardPlusFormProps {
  data: VCardPlusData;
  onChange: (data: VCardPlusData) => void;
  isLoading?: boolean;
}

const themes: { value: VCardPlusTheme; label: string; preview: string }[] = [
  { value: 'modern', label: 'Moderne', preview: 'bg-gradient-to-br from-blue-500 to-purple-600' },
  { value: 'classic', label: 'Classique', preview: 'bg-slate-800' },
  { value: 'gradient', label: 'Dégradé', preview: 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500' },
  { value: 'dark', label: 'Sombre', preview: 'bg-zinc-900' },
  { value: 'minimal', label: 'Minimal', preview: 'bg-white border-2 border-gray-200' },
];

const colorPresets = [
  '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F97316', 
  '#EAB308', '#22C55E', '#14B8A6', '#06B6D4', '#6366F1'
];

export function VCardPlusForm({ data, onChange, isLoading }: VCardPlusFormProps) {
  const updateField = <K extends keyof VCardPlusData>(key: K, value: VCardPlusData[K]) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <User className="w-4 h-4" />
          Informations personnelles
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="input-label">Prénom *</Label>
            <Input
              placeholder="Jean"
              value={data.firstName}
              onChange={(e) => updateField('firstName', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label">Nom *</Label>
            <Input
              placeholder="Dupont"
              value={data.lastName}
              onChange={(e) => updateField('lastName', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
        </div>

        <PhotoUpload
          currentPhotoUrl={data.photoUrl}
          onPhotoChange={(url) => updateField('photoUrl', url)}
          disabled={isLoading}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              Poste
            </Label>
            <Input
              placeholder="Directeur Marketing"
              value={data.jobTitle || ''}
              onChange={(e) => updateField('jobTitle', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              Entreprise
            </Label>
            <Input
              placeholder="Mon Entreprise"
              value={data.company || ''}
              onChange={(e) => updateField('company', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="input-label">Bio / Description</Label>
          <Textarea
            placeholder="Une courte description de vous..."
            value={data.bio || ''}
            onChange={(e) => updateField('bio', e.target.value)}
            className="min-h-[80px] resize-none"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Contact
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Mail className="w-3 h-3" />
              Email
            </Label>
            <Input
              type="email"
              placeholder="jean@example.com"
              value={data.email || ''}
              onChange={(e) => updateField('email', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Phone className="w-3 h-3" />
              Téléphone
            </Label>
            <Input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={data.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Globe className="w-3 h-3" />
              Site web
            </Label>
            <Input
              type="url"
              placeholder="https://monsite.com"
              value={data.website || ''}
              onChange={(e) => updateField('website', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Adresse
            </Label>
            <Input
              placeholder="Paris, France"
              value={data.address || ''}
              onChange={(e) => updateField('address', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Social Networks */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Instagram className="w-4 h-4" />
          Réseaux sociaux
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Instagram className="w-3 h-3" />
              Instagram
            </Label>
            <Input
              placeholder="@username"
              value={data.instagram || ''}
              onChange={(e) => updateField('instagram', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Facebook className="w-3 h-3" />
              Facebook
            </Label>
            <Input
              placeholder="username"
              value={data.facebook || ''}
              onChange={(e) => updateField('facebook', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              LinkedIn
            </Label>
            <Input
              placeholder="jean-dupont"
              value={data.linkedin || ''}
              onChange={(e) => updateField('linkedin', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Twitter className="w-3 h-3" />
              Twitter / X
            </Label>
            <Input
              placeholder="@username"
              value={data.twitter || ''}
              onChange={(e) => updateField('twitter', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Youtube className="w-3 h-3" />
              YouTube
            </Label>
            <Input
              placeholder="@channel"
              value={data.youtube || ''}
              onChange={(e) => updateField('youtube', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <Github className="w-3 h-3" />
              GitHub
            </Label>
            <Input
              placeholder="username"
              value={data.github || ''}
              onChange={(e) => updateField('github', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label className="input-label flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              WhatsApp
            </Label>
            <Input
              type="tel"
              placeholder="+33612345678"
              value={data.whatsapp || ''}
              onChange={(e) => updateField('whatsapp', e.target.value)}
              className="h-12"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">Style de la page</h4>
        
        <div className="grid grid-cols-5 gap-2">
          {themes.map((theme) => (
            <motion.button
              key={theme.value}
              onClick={() => updateField('theme', theme.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className={cn(
                'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all',
                data.theme === theme.value
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent bg-secondary/50 hover:bg-secondary'
              )}
            >
              <div className={cn('w-8 h-8 rounded-lg', theme.preview)} />
              <span className="text-xs font-medium">{theme.label}</span>
            </motion.button>
          ))}
        </div>

        <div className="space-y-2">
          <Label className="input-label">Couleur principale</Label>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {colorPresets.map((color) => (
                <motion.button
                  key={color}
                  onClick={() => updateField('primaryColor', color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={isLoading}
                  className={cn(
                    'w-8 h-8 rounded-full border-2 transition-all',
                    data.primaryColor === color ? 'border-foreground scale-110' : 'border-transparent'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <Input
              type="color"
              value={data.primaryColor}
              onChange={(e) => updateField('primaryColor', e.target.value)}
              className="w-12 h-8 p-1 cursor-pointer"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
