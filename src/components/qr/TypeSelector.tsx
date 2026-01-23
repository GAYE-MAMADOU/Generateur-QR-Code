import { motion } from 'framer-motion';
import { 
  Link, 
  Type, 
  Mail, 
  Phone, 
  MessageSquare, 
  Wifi, 
  User, 
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  UserPlus
} from 'lucide-react';
import { QRType, typeLabels } from '@/types/qr';
import { cn } from '@/lib/utils';

interface TypeSelectorProps {
  selected: QRType;
  onSelect: (type: QRType) => void;
}

const typeIcons: Record<QRType, React.ElementType> = {
  url: Link,
  text: Type,
  email: Mail,
  phone: Phone,
  sms: MessageSquare,
  wifi: Wifi,
  vcard: User,
  'vcard-plus': UserPlus,
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  whatsapp: MessageCircle,
};

const typeCategories = [
  { title: 'Basique', types: ['url', 'text', 'email', 'phone', 'sms'] as QRType[] },
  { title: 'Avancé', types: ['wifi', 'vcard', 'vcard-plus'] as QRType[] },
  { title: 'Réseaux sociaux', types: ['instagram', 'facebook', 'linkedin', 'whatsapp'] as QRType[] },
];

export function TypeSelector({ selected, onSelect }: TypeSelectorProps) {
  return (
    <div className="space-y-6">
      {typeCategories.map((category) => (
        <div key={category.title}>
          <h4 className="text-sm font-medium text-muted-foreground mb-3">
            {category.title}
          </h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {category.types.map((type) => {
              const Icon = typeIcons[type];
              const isSelected = selected === type;
              
              return (
                <motion.button
                  key={type}
                  onClick={() => onSelect(type)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'type-button',
                    isSelected && 'active'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    isSelected 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-muted-foreground'
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={cn(
                    'text-xs font-medium transition-colors',
                    isSelected ? 'text-primary' : 'text-muted-foreground'
                  )}>
                    {typeLabels[type]}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
