import { QRStyleOptions, ModuleStyle, CornerStyle, ErrorCorrectionLevel } from '@/types/qr';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Palette, Square, Circle, RectangleHorizontal, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

interface StylePanelProps {
  style: QRStyleOptions;
  onChange: (style: Partial<QRStyleOptions>) => void;
}

const presetColors = [
  '#000000', '#1E3A5F', '#2563EB', '#059669', '#7C3AED', 
  '#DC2626', '#EA580C', '#CA8A04', '#EC4899', '#6366F1'
];

const bgPresetColors = [
  '#FFFFFF', '#F8FAFC', '#FEF3C7', '#DCFCE7', '#E0E7FF',
  '#FCE7F3', '#F0FDF4', '#FFF7ED', '#F5F3FF', '#FDF4FF'
];

const moduleStyles: { value: ModuleStyle; label: string; icon: React.ReactNode }[] = [
  { value: 'squares', label: 'Carré', icon: <Square className="w-4 h-4" /> },
  { value: 'rounded', label: 'Arrondi', icon: <RectangleHorizontal className="w-4 h-4" /> },
  { value: 'dots', label: 'Points', icon: <Circle className="w-4 h-4" /> },
];

const cornerStyles: { value: CornerStyle; label: string }[] = [
  { value: 'square', label: 'Carré' },
  { value: 'rounded', label: 'Arrondi' },
  { value: 'extra-rounded', label: 'Très arrondi' },
];

export function StylePanel({ style, onChange }: StylePanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(style.logoUrl || null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setLogoPreview(dataUrl);
        onChange({ logoUrl: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    onChange({ logoUrl: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div className="space-y-4">
        <h4 className="section-title">
          <Palette className="w-5 h-5 text-primary" />
          Couleurs
        </h4>
        
        <div className="space-y-3">
          <Label className="input-label">Couleur du QR Code</Label>
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {presetColors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn('color-swatch', style.foregroundColor === color && 'active')}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange({ foregroundColor: color })}
                />
              ))}
            </div>
            <Input
              type="color"
              value={style.foregroundColor}
              onChange={(e) => onChange({ foregroundColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label className="input-label">Couleur de fond</Label>
          <div className="flex items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {bgPresetColors.map((color) => (
                <motion.button
                  key={color}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn('color-swatch', style.backgroundColor === color && 'active')}
                  style={{ backgroundColor: color }}
                  onClick={() => onChange({ backgroundColor: color })}
                />
              ))}
            </div>
            <Input
              type="color"
              value={style.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-12 h-10 p-1 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Module Style */}
      <div className="space-y-4">
        <h4 className="section-title">
          <Square className="w-5 h-5 text-primary" />
          Style des modules
        </h4>
        
        <div className="grid grid-cols-3 gap-3">
          {moduleStyles.map((ms) => (
            <motion.button
              key={ms.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange({ moduleStyle: ms.value })}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                style.moduleStyle === ms.value 
                  ? 'border-primary bg-primary/10' 
                  : 'border-border hover:border-primary/30'
              )}
            >
              <span className={cn(
                'text-lg',
                style.moduleStyle === ms.value ? 'text-primary' : 'text-muted-foreground'
              )}>
                {ms.icon}
              </span>
              <span className="text-sm font-medium">{ms.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Corner Style */}
      <div className="space-y-3">
        <Label className="input-label">Style des coins</Label>
        <Select
          value={style.cornerStyle}
          onValueChange={(value: CornerStyle) => onChange({ cornerStyle: value })}
        >
          <SelectTrigger className="h-12">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {cornerStyles.map((cs) => (
              <SelectItem key={cs.value} value={cs.value}>{cs.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Logo Upload */}
      <div className="space-y-4">
        <h4 className="section-title">
          <Upload className="w-5 h-5 text-primary" />
          Logo central
        </h4>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
        
        {logoPreview ? (
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-border">
              <img 
                src={logoPreview} 
                alt="Logo preview" 
                className="w-full h-full object-cover"
              />
              <button
                onClick={removeLogo}
                className="absolute -top-1 -right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 space-y-2">
              <Label className="input-label">Taille du logo (%)</Label>
              <Slider
                value={[style.logoSize]}
                onValueChange={([value]) => onChange({ logoSize: value })}
                min={10}
                max={40}
                step={1}
                className="w-full"
              />
              <span className="text-sm text-muted-foreground">{style.logoSize}%</span>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full h-20 border-dashed border-2 hover:border-primary/50"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Cliquer pour ajouter un logo</span>
            </div>
          </Button>
        )}
      </div>

      {/* Advanced Options */}
      <div className="space-y-4">
        <div className="space-y-3">
          <Label className="input-label">Marge (modules)</Label>
          <Slider
            value={[style.margin]}
            onValueChange={([value]) => onChange({ margin: value })}
            min={0}
            max={10}
            step={1}
            className="w-full"
          />
          <span className="text-sm text-muted-foreground">{style.margin} modules</span>
        </div>

        <div className="space-y-3">
          <Label className="input-label">Correction d'erreur</Label>
          <Select
            value={style.errorCorrection}
            onValueChange={(value: ErrorCorrectionLevel) => onChange({ errorCorrection: value })}
          >
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Faible (7%)</SelectItem>
              <SelectItem value="M">Moyenne (15%)</SelectItem>
              <SelectItem value="Q">Quartile (25%)</SelectItem>
              <SelectItem value="H">Haute (30%)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Un niveau élevé permet au QR code de rester lisible même partiellement masqué.
          </p>
        </div>
      </div>
    </div>
  );
}
