import { FrameOptions, FrameStyle, LabelIcon } from '@/types/qr';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';
import { Frame, Square, RectangleHorizontal, Type, QrCode, Link, User, Wifi, Mail, Phone, ScanLine } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FramePanelProps {
  frame: FrameOptions;
  onChange: (frame: Partial<FrameOptions>) => void;
}

const frameStyles: { value: FrameStyle; label: string; description: string }[] = [
  { value: 'none', label: 'Aucun', description: 'Sans cadre' },
  { value: 'simple', label: 'Simple', description: 'Bordure carrée' },
  { value: 'rounded', label: 'Arrondi', description: 'Coins arrondis' },
  { value: 'fancy', label: 'Élégant', description: 'Style premium' },
];

const labelIcons: { value: LabelIcon; label: string; icon: React.ReactNode }[] = [
  { value: 'none', label: 'Aucune', icon: null },
  { value: 'scan', label: 'Scanner', icon: <ScanLine className="w-4 h-4" /> },
  { value: 'qr', label: 'QR Code', icon: <QrCode className="w-4 h-4" /> },
  { value: 'link', label: 'Lien', icon: <Link className="w-4 h-4" /> },
  { value: 'contact', label: 'Contact', icon: <User className="w-4 h-4" /> },
  { value: 'wifi', label: 'Wi-Fi', icon: <Wifi className="w-4 h-4" /> },
  { value: 'email', label: 'Email', icon: <Mail className="w-4 h-4" /> },
  { value: 'phone', label: 'Téléphone', icon: <Phone className="w-4 h-4" /> },
];

const presetFrameColors = [
  '#000000', '#1E3A5F', '#2563EB', '#059669', '#7C3AED', 
  '#DC2626', '#EA580C', '#CA8A04', '#EC4899', '#FFFFFF'
];

export function FramePanel({ frame, onChange }: FramePanelProps) {
  return (
    <div className="space-y-6">
      {/* Frame Style */}
      <div className="space-y-4">
        <h4 className="section-title">
          <Frame className="w-5 h-5 text-primary" />
          Style du cadre
        </h4>
        
        <div className="grid grid-cols-2 gap-3">
          {frameStyles.map((fs) => (
            <motion.button
              key={fs.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ style: fs.value })}
              className={cn(
                'flex flex-col items-start gap-1 p-4 rounded-xl border-2 transition-all text-left',
                frame.style === fs.value 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/30'
              )}
            >
              <span className={cn(
                'font-medium text-sm',
                frame.style === fs.value ? 'text-primary' : 'text-foreground'
              )}>
                {fs.label}
              </span>
              <span className="text-xs text-muted-foreground">{fs.description}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {frame.style !== 'none' && (
        <>
          {/* Frame Color */}
          <div className="space-y-3">
            <Label className="input-label">Couleur du cadre</Label>
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {presetFrameColors.map((color) => (
                  <motion.button
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'color-swatch',
                      frame.color === color && 'active',
                      color === '#FFFFFF' && 'border border-border'
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => onChange({ color })}
                  />
                ))}
              </div>
              <Input
                type="color"
                value={frame.color}
                onChange={(e) => onChange({ color: e.target.value })}
                className="w-12 h-10 p-1 cursor-pointer"
              />
            </div>
          </div>

          {/* Label Text */}
          <div className="space-y-4">
            <h4 className="section-title">
              <Type className="w-5 h-5 text-primary" />
              Étiquette
            </h4>
            
            <div className="space-y-3">
              <Label className="input-label">Texte de l'étiquette</Label>
              <Input
                value={frame.labelText}
                onChange={(e) => onChange({ labelText: e.target.value })}
                placeholder="Ex: Scannez-moi, Mon site, Contact..."
                className="h-12"
              />
            </div>

            {/* Label Icon */}
            <div className="space-y-3">
              <Label className="input-label">Icône de l'étiquette</Label>
              <Select
                value={frame.labelIcon}
                onValueChange={(value: LabelIcon) => onChange({ labelIcon: value })}
              >
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {labelIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      <div className="flex items-center gap-2">
                        {icon.icon}
                        <span>{icon.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Label Position */}
            <div className="space-y-3">
              <Label className="input-label">Position de l'étiquette</Label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onChange({ labelPosition: 'top' })}
                  className={cn(
                    'flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all',
                    frame.labelPosition === 'top' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/30'
                  )}
                >
                  <Square className="w-4 h-4" />
                  <span className="text-sm font-medium">En haut</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onChange({ labelPosition: 'bottom' })}
                  className={cn(
                    'flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all',
                    frame.labelPosition === 'bottom' 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border hover:border-primary/30'
                  )}
                >
                  <RectangleHorizontal className="w-4 h-4" />
                  <span className="text-sm font-medium">En bas</span>
                </motion.button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
