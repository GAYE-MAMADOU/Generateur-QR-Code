import { QRData, QRType } from '@/types/qr';

export function encodeQRData(data: QRData, vcardPlusUrl?: string): string {
  switch (data.type) {
    case 'url':
      return data.url || '';
    
    case 'text':
      return data.text || '';
    
    case 'email':
      if (!data.email?.address) return '';
      let emailStr = `mailto:${data.email.address}`;
      const params: string[] = [];
      if (data.email.subject) params.push(`subject=${encodeURIComponent(data.email.subject)}`);
      if (data.email.body) params.push(`body=${encodeURIComponent(data.email.body)}`);
      if (params.length) emailStr += `?${params.join('&')}`;
      return emailStr;
    
    case 'phone':
      return data.phone ? `tel:${data.phone}` : '';
    
    case 'sms':
      if (!data.sms?.phone) return '';
      let smsStr = `sms:${data.sms.phone}`;
      if (data.sms.message) smsStr += `?body=${encodeURIComponent(data.sms.message)}`;
      return smsStr;
    
    case 'wifi':
      if (!data.wifi?.ssid) return '';
      const { ssid, password, encryption, hidden } = data.wifi;
      return `WIFI:T:${encryption};S:${ssid};P:${password || ''};H:${hidden ? 'true' : 'false'};;`;
    
    case 'vcard':
      if (!data.vcard?.firstName && !data.vcard?.lastName) return '';
      const v = data.vcard;
      const vcardLines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName || ''};${v.firstName || ''};;;`,
        `FN:${[v.firstName, v.lastName].filter(Boolean).join(' ')}`,
      ];
      if (v.phone) vcardLines.push(`TEL:${v.phone}`);
      if (v.email) vcardLines.push(`EMAIL:${v.email}`);
      if (v.company) vcardLines.push(`ORG:${v.company}`);
      if (v.title) vcardLines.push(`TITLE:${v.title}`);
      if (v.website) vcardLines.push(`URL:${v.website}`);
      vcardLines.push('END:VCARD');
      return vcardLines.join('\n');
    
    case 'vcard-plus':
      // Return the profile URL if available, otherwise placeholder
      return vcardPlusUrl || '';
    
    case 'instagram':
      return data.social?.username ? `https://instagram.com/${data.social.username}` : '';
    
    case 'facebook':
      return data.social?.username ? `https://facebook.com/${data.social.username}` : '';
    
    case 'linkedin':
      return data.social?.username ? `https://linkedin.com/in/${data.social.username}` : '';
    
    case 'whatsapp':
      return data.social?.username ? `https://wa.me/${data.social.username.replace(/\D/g, '')}` : '';
    
    default:
      return '';
  }
}

export function isValidData(data: QRData, vcardPlusUrl?: string): boolean {
  if (data.type === 'vcard-plus') {
    return !!vcardPlusUrl || !!(data.vcardPlus?.firstName && data.vcardPlus?.lastName);
  }
  const encoded = encodeQRData(data);
  return encoded.length > 0;
}
