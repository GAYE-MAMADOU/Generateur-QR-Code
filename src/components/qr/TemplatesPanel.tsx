import { QRStyleOptions, defaultFrame } from '@/types/qr';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplatesPanelProps {
  onApply: (style: QRStyleOptions) => void;
  currentStyle: QRStyleOptions;
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: {
    fg: string;
    bg: string;
    frame?: string;
  };
  style: QRStyleOptions;
}

const templates: Template[] = [
  {
    id: 'classic',
    name: 'Classique',
    description: 'Noir et blanc traditionnel',
    preview: { fg: '#000000', bg: '#FFFFFF' },
    style: {
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      moduleStyle: 'squares',
      cornerStyle: 'square',
      logoSize: 20,
      margin: 4,
      errorCorrection: 'M',
      size: 256,
      frame: { ...defaultFrame },
    },
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Élégant avec cadre pro',
    preview: { fg: '#1E3A5F', bg: '#FFFFFF', frame: '#1E3A5F' },
    style: {
      foregroundColor: '#1E3A5F',
      backgroundColor: '#FFFFFF',
      moduleStyle: 'squares',
      cornerStyle: 'rounded',
      logoSize: 20,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: {
        style: 'rounded',
        color: '#1E3A5F',
        labelText: 'Scannez-moi',
        labelIcon: 'scan',
        labelPosition: 'bottom',
      },
    },
  },
  {
    id: 'modern-dots',
    name: 'Moderne',
    description: 'Points arrondis tendance',
    preview: { fg: '#2563EB', bg: '#FFFFFF' },
    style: {
      foregroundColor: '#2563EB',
      backgroundColor: '#FFFFFF',
      moduleStyle: 'dots',
      cornerStyle: 'extra-rounded',
      logoSize: 25,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: { ...defaultFrame },
    },
  },
  {
    id: 'colorful',
    name: 'Coloré',
    description: 'Violet vibrant avec cadre',
    preview: { fg: '#7C3AED', bg: '#FDF4FF', frame: '#7C3AED' },
    style: {
      foregroundColor: '#7C3AED',
      backgroundColor: '#FDF4FF',
      moduleStyle: 'rounded',
      cornerStyle: 'extra-rounded',
      logoSize: 20,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: {
        style: 'fancy',
        color: '#7C3AED',
        labelText: '',
        labelIcon: 'qr',
        labelPosition: 'bottom',
      },
    },
  },
  {
    id: 'minimalist',
    name: 'Minimaliste',
    description: 'Simple et épuré',
    preview: { fg: '#374151', bg: '#F9FAFB' },
    style: {
      foregroundColor: '#374151',
      backgroundColor: '#F9FAFB',
      moduleStyle: 'squares',
      cornerStyle: 'square',
      logoSize: 15,
      margin: 6,
      errorCorrection: 'M',
      size: 256,
      frame: { ...defaultFrame },
    },
  },
  {
    id: 'nature',
    name: 'Nature',
    description: 'Vert écologique',
    preview: { fg: '#059669', bg: '#ECFDF5', frame: '#059669' },
    style: {
      foregroundColor: '#059669',
      backgroundColor: '#ECFDF5',
      moduleStyle: 'rounded',
      cornerStyle: 'rounded',
      logoSize: 20,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: {
        style: 'rounded',
        color: '#059669',
        labelText: 'Eco',
        labelIcon: 'link',
        labelPosition: 'bottom',
      },
    },
  },
  {
    id: 'sunset',
    name: 'Coucher de soleil',
    description: 'Orange chaleureux',
    preview: { fg: '#EA580C', bg: '#FFF7ED', frame: '#EA580C' },
    style: {
      foregroundColor: '#EA580C',
      backgroundColor: '#FFF7ED',
      moduleStyle: 'dots',
      cornerStyle: 'extra-rounded',
      logoSize: 20,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: {
        style: 'fancy',
        color: '#EA580C',
        labelText: '',
        labelIcon: 'scan',
        labelPosition: 'bottom',
      },
    },
  },
  {
    id: 'dark-mode',
    name: 'Mode sombre',
    description: 'Élégance nocturne',
    preview: { fg: '#FFFFFF', bg: '#1F2937', frame: '#1F2937' },
    style: {
      foregroundColor: '#FFFFFF',
      backgroundColor: '#1F2937',
      moduleStyle: 'squares',
      cornerStyle: 'rounded',
      logoSize: 20,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: {
        style: 'rounded',
        color: '#111827',
        labelText: 'Scanner',
        labelIcon: 'scan',
        labelPosition: 'bottom',
      },
    },
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Idéal pour vCard',
    preview: { fg: '#000000', bg: '#FFFFFF', frame: '#000000' },
    style: {
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      moduleStyle: 'dots',
      cornerStyle: 'rounded',
      logoSize: 25,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: {
        style: 'fancy',
        color: '#000000',
        labelText: 'Contact',
        labelIcon: 'contact',
        labelPosition: 'bottom',
      },
    },
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    description: 'Parfait pour réseau',
    preview: { fg: '#2563EB', bg: '#EFF6FF', frame: '#2563EB' },
    style: {
      foregroundColor: '#2563EB',
      backgroundColor: '#EFF6FF',
      moduleStyle: 'rounded',
      cornerStyle: 'rounded',
      logoSize: 20,
      margin: 4,
      errorCorrection: 'H',
      size: 256,
      frame: {
        style: 'rounded',
        color: '#2563EB',
        labelText: 'Wi-Fi',
        labelIcon: 'wifi',
        labelPosition: 'bottom',
      },
    },
  },
];

export function TemplatesPanel({ onApply, currentStyle }: TemplatesPanelProps) {
  const isTemplateActive = (template: Template) => {
    return (
      template.style.foregroundColor === currentStyle.foregroundColor &&
      template.style.backgroundColor === currentStyle.backgroundColor &&
      template.style.moduleStyle === currentStyle.moduleStyle
    );
  };

  return (
    <div className="space-y-4">
      <h4 className="section-title">
        <Sparkles className="w-5 h-5 text-primary" />
        Templates prédéfinis
      </h4>
      
      <p className="text-sm text-muted-foreground">
        Cliquez sur un template pour l'appliquer instantanément
      </p>

      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <motion.button
            key={template.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onApply(template.style)}
            className={cn(
              'relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-left',
              isTemplateActive(template)
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/30'
            )}
          >
            {/* Template Preview */}
            <div 
              className="w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden"
              style={{ 
                backgroundColor: template.preview.frame || template.preview.bg,
                padding: template.preview.frame ? '8px' : '0',
              }}
            >
              <div
                className="w-full h-full rounded flex items-center justify-center"
                style={{ backgroundColor: template.preview.bg }}
              >
                {/* Mini QR preview */}
                <div className="grid grid-cols-5 gap-0.5 p-2">
                  {[...Array(25)].map((_, i) => {
                    const isCorner = (i < 3 && (i % 5 < 3)) || 
                                    (i < 15 && i >= 10 && (i % 5 < 3)) ||
                                    (i % 5 >= 3 && i < 3);
                    const isCenter = i === 12;
                    const show = Math.random() > 0.3 || isCorner;
                    
                    return (
                      <div
                        key={i}
                        className={cn(
                          'w-2 h-2',
                          template.style.moduleStyle === 'dots' ? 'rounded-full' : 
                          template.style.moduleStyle === 'rounded' ? 'rounded-sm' : ''
                        )}
                        style={{ 
                          backgroundColor: (show && !isCenter) ? template.preview.fg : 'transparent' 
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Template Info */}
            <div className="w-full">
              <span className="font-medium text-sm block">{template.name}</span>
              <span className="text-xs text-muted-foreground">{template.description}</span>
            </div>

            {/* Active indicator */}
            {isTemplateActive(template) && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-primary rounded-full" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
