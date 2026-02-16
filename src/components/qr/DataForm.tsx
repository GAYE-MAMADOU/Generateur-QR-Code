import { QRData, QRType, VCardPlusData, defaultVCardPlus } from '@/types/qr';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { VCardPlusForm } from './VCardPlusForm';

interface DataFormProps {
  data: QRData;
  onChange: (data: Partial<QRData>) => void;
  onVCardPlusChange?: (data: VCardPlusData) => void;
  vcardPlusData?: VCardPlusData;
  isVCardPlusLoading?: boolean;
}

export function DataForm({ data, onChange, onVCardPlusChange, vcardPlusData, isVCardPlusLoading }: DataFormProps) {
  const updateField = <K extends keyof QRData>(
    key: K,
    value: QRData[K]
  ) => {
    onChange({ [key]: value });
  };

  const handleVCardPlusChange = (vcardData: VCardPlusData) => {
    onVCardPlusChange?.(vcardData);
  };

  const renderForm = () => {
    switch (data.type) {
      case 'url':
        return (
          <div className="space-y-2">
            <Label className="input-label">Adresse URL</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              value={data.url || ''}
              onChange={(e) => updateField('url', e.target.value)}
              className="h-12"
            />
          </div>
        );

      case 'text':
        return (
          <div className="space-y-2">
            <Label className="input-label">Votre texte</Label>
            <Textarea
              placeholder="Entrez votre texte ici..."
              value={data.text || ''}
              onChange={(e) => updateField('text', e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>
        );

      case 'email':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="input-label">Adresse email</Label>
              <Input
                type="email"
                placeholder="contact@example.com"
                value={data.email?.address || ''}
                onChange={(e) => updateField('email', { ...data.email, address: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="input-label">Sujet (optionnel)</Label>
              <Input
                placeholder="Sujet de l'email"
                value={data.email?.subject || ''}
                onChange={(e) => updateField('email', { ...data.email, address: data.email?.address || '', subject: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="input-label">Message (optionnel)</Label>
              <Textarea
                placeholder="Contenu du message..."
                value={data.email?.body || ''}
                onChange={(e) => updateField('email', { ...data.email, address: data.email?.address || '', body: e.target.value })}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>
        );

      case 'phone':
        return (
          <div className="space-y-2">
            <Label className="input-label">Numéro de téléphone</Label>
            <Input
              type="tel"
              placeholder="+33 6 12 34 56 78"
              value={data.phone || ''}
              onChange={(e) => updateField('phone', e.target.value)}
              className="h-12"
            />
          </div>
        );

      case 'sms':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="input-label">Numéro de téléphone</Label>
              <Input
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={data.sms?.phone || ''}
                onChange={(e) => updateField('sms', { ...data.sms, phone: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="input-label">Message (optionnel)</Label>
              <Textarea
                placeholder="Votre message..."
                value={data.sms?.message || ''}
                onChange={(e) => updateField('sms', { ...data.sms, phone: data.sms?.phone || '', message: e.target.value })}
                className="min-h-[80px] resize-none"
              />
            </div>
          </div>
        );

      case 'wifi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="input-label">Nom du réseau (SSID)</Label>
              <Input
                placeholder="MonWifi"
                value={data.wifi?.ssid || ''}
                onChange={(e) => updateField('wifi', { 
                  ...data.wifi, 
                  ssid: e.target.value,
                  password: data.wifi?.password || '',
                  encryption: data.wifi?.encryption || 'WPA'
                })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="input-label">Mot de passe</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={data.wifi?.password || ''}
                onChange={(e) => updateField('wifi', { 
                  ...data.wifi, 
                  ssid: data.wifi?.ssid || '',
                  password: e.target.value,
                  encryption: data.wifi?.encryption || 'WPA'
                })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="input-label">Type de sécurité</Label>
              <Select
                value={data.wifi?.encryption || 'WPA'}
                onValueChange={(value: 'WPA' | 'WEP' | 'nopass') => updateField('wifi', { 
                  ...data.wifi, 
                  ssid: data.wifi?.ssid || '',
                  password: data.wifi?.password || '',
                  encryption: value
                })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA/WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">Aucun</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label className="input-label mb-0">Réseau masqué</Label>
              <Switch
                checked={data.wifi?.hidden || false}
                onCheckedChange={(checked) => updateField('wifi', { 
                  ...data.wifi, 
                  ssid: data.wifi?.ssid || '',
                  password: data.wifi?.password || '',
                  encryption: data.wifi?.encryption || 'WPA',
                  hidden: checked
                })}
              />
            </div>
          </div>
        );

      case 'vcard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="input-label">Prénom</Label>
                <Input
                  placeholder="Jean"
                  value={data.vcard?.firstName || ''}
                  onChange={(e) => updateField('vcard', { ...data.vcard, firstName: e.target.value, lastName: data.vcard?.lastName || '' })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="input-label">Nom</Label>
                <Input
                  placeholder="Dupont"
                  value={data.vcard?.lastName || ''}
                  onChange={(e) => updateField('vcard', { ...data.vcard, firstName: data.vcard?.firstName || '', lastName: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="input-label">Téléphone</Label>
              <Input
                type="tel"
                placeholder="+33 6 12 34 56 78"
                value={data.vcard?.phone || ''}
                onChange={(e) => updateField('vcard', { ...data.vcard, firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', phone: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label className="input-label">Email</Label>
              <Input
                type="email"
                placeholder="jean.dupont@example.com"
                value={data.vcard?.email || ''}
                onChange={(e) => updateField('vcard', { ...data.vcard, firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', email: e.target.value })}
                className="h-12"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="input-label">Entreprise</Label>
                <Input
                  placeholder="Société"
                  value={data.vcard?.company || ''}
                  onChange={(e) => updateField('vcard', { ...data.vcard, firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', company: e.target.value })}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="input-label">Titre</Label>
                <Input
                  placeholder="Directeur"
                  value={data.vcard?.title || ''}
                  onChange={(e) => updateField('vcard', { ...data.vcard, firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', title: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="input-label">Site web</Label>
              <Input
                type="url"
                placeholder="https://example.com"
                value={data.vcard?.website || ''}
                onChange={(e) => updateField('vcard', { ...data.vcard, firstName: data.vcard?.firstName || '', lastName: data.vcard?.lastName || '', website: e.target.value })}
                className="h-12"
              />
            </div>
          </div>
        );

      case 'instagram':
      case 'facebook':
      case 'linkedin':
        return (
          <div className="space-y-2">
            <Label className="input-label">
              Nom d'utilisateur {data.type === 'linkedin' ? 'LinkedIn' : data.type.charAt(0).toUpperCase() + data.type.slice(1)}
            </Label>
            <Input
              placeholder={data.type === 'linkedin' ? 'jean-dupont' : '@username'}
              value={data.social?.username || ''}
              onChange={(e) => updateField('social', { username: e.target.value })}
              className="h-12"
            />
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-2">
            <Label className="input-label">Numéro WhatsApp (avec indicatif)</Label>
            <Input
              type="tel"
              placeholder="+33612345678"
              value={data.social?.username || ''}
              onChange={(e) => updateField('social', { username: e.target.value })}
              className="h-12"
            />
          </div>
        );

      case 'vcard-plus':
        return (
          <VCardPlusForm
            data={vcardPlusData || defaultVCardPlus}
            onChange={handleVCardPlusChange}
            isLoading={isVCardPlusLoading}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.type}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {renderForm()}
      </motion.div>
    </AnimatePresence>
  );
}
