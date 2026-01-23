export type QRType = 
  | 'url' 
  | 'text' 
  | 'email' 
  | 'phone' 
  | 'sms' 
  | 'wifi' 
  | 'vcard' 
  | 'vcard-plus'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'whatsapp';

export type VCardPlusTheme = 'modern' | 'classic' | 'gradient' | 'dark' | 'minimal';

export interface VCardPlusData {
  slug?: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  jobTitle?: string;
  company?: string;
  bio?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  github?: string;
  whatsapp?: string;
  theme: VCardPlusTheme;
  primaryColor: string;
}

export type ModuleStyle = 'squares' | 'dots' | 'rounded';

export type CornerStyle = 'square' | 'rounded' | 'extra-rounded';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export type FrameStyle = 'none' | 'simple' | 'rounded' | 'fancy';

export type LabelIcon = 'none' | 'qr' | 'link' | 'contact' | 'wifi' | 'email' | 'phone' | 'scan';

export interface FrameOptions {
  style: FrameStyle;
  color: string;
  labelText: string;
  labelIcon: LabelIcon;
  labelPosition: 'top' | 'bottom';
}

export interface QRData {
  type: QRType;
  url?: string;
  text?: string;
  email?: {
    address: string;
    subject?: string;
    body?: string;
  };
  phone?: string;
  sms?: {
    phone: string;
    message?: string;
  };
  wifi?: {
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
    hidden?: boolean;
  };
  vcard?: {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    company?: string;
    title?: string;
    website?: string;
  };
  vcardPlus?: VCardPlusData;
  social?: {
    username: string;
  };
}

export interface QRStyleOptions {
  foregroundColor: string;
  backgroundColor: string;
  moduleStyle: ModuleStyle;
  cornerStyle: CornerStyle;
  logoUrl?: string;
  logoSize: number;
  margin: number;
  errorCorrection: ErrorCorrectionLevel;
  size: number;
  frame: FrameOptions;
}

export interface QRConfig {
  data: QRData;
  style: QRStyleOptions;
}

export const defaultFrame: FrameOptions = {
  style: 'none',
  color: '#000000',
  labelText: '',
  labelIcon: 'none',
  labelPosition: 'bottom',
};

export const defaultStyle: QRStyleOptions = {
  foregroundColor: '#000000',
  backgroundColor: '#FFFFFF',
  moduleStyle: 'squares',
  cornerStyle: 'square',
  logoSize: 20,
  margin: 4,
  errorCorrection: 'M',
  size: 256,
  frame: defaultFrame,
};

export const typeLabels: Record<QRType, string> = {
  url: 'URL',
  text: 'Texte',
  email: 'Email',
  phone: 'Téléphone',
  sms: 'SMS',
  wifi: 'Wi-Fi',
  vcard: 'Contact',
  'vcard-plus': 'VCard Plus',
  instagram: 'Instagram',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  whatsapp: 'WhatsApp',
};

export const defaultVCardPlus: VCardPlusData = {
  firstName: '',
  lastName: '',
  theme: 'modern',
  primaryColor: '#3B82F6',
};
