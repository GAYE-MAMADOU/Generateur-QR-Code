import { QRCodeCanvas } from 'qrcode.react';
import { QRStyleOptions, LabelIcon, defaultFrame } from '@/types/qr';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { QrCode, Link, User, Wifi, Mail, Phone, ScanLine } from 'lucide-react';

interface QRPreviewProps {
  value: string;
  style: QRStyleOptions;
}

const getLabelIcon = (iconType: LabelIcon, color: string) => {
  const iconProps = { className: "w-6 h-6", style: { color } };
  switch (iconType) {
    case 'scan': return <ScanLine {...iconProps} />;
    case 'qr': return <QrCode {...iconProps} />;
    case 'link': return <Link {...iconProps} />;
    case 'contact': return <User {...iconProps} />;
    case 'wifi': return <Wifi {...iconProps} />;
    case 'email': return <Mail {...iconProps} />;
    case 'phone': return <Phone {...iconProps} />;
    default: return null;
  }
};

const getContrastColor = (hexColor: string): string => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

export const QRPreview = forwardRef<HTMLDivElement, QRPreviewProps>(
  ({ value, style }, ref) => {
    const displayValue = value || 'https://example.com';
    
    // Use default frame if not provided
    const frame = style.frame || defaultFrame;
    
    // Calculate logo size in pixels
    const logoSize = style.logoUrl 
      ? Math.floor((style.size * style.logoSize) / 100) 
      : 0;

    const hasFrame = frame.style !== 'none';
    const hasLabel = hasFrame && (frame.labelText || frame.labelIcon !== 'none');
    const frameColor = frame.color;
    const labelTextColor = getContrastColor(frameColor);

    const getFrameRadius = () => {
      switch (frame.style) {
        case 'simple': return '0px';
        case 'rounded': return '16px';
        case 'fancy': return '24px';
        default: return '0px';
      }
    };

    const getInnerRadius = () => {
      switch (frame.style) {
        case 'simple': return '0px';
        case 'rounded': return '8px';
        case 'fancy': return '12px';
        default: return '0px';
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="qr-preview-container flex flex-col items-center justify-center"
        style={{ 
          backgroundColor: hasFrame ? frameColor : style.backgroundColor,
          borderRadius: getFrameRadius(),
          padding: hasFrame ? '16px' : '0',
        }}
      >
        {/* Top Label */}
        {hasLabel && frame.labelPosition === 'top' && (
          <div 
            className="flex items-center gap-3 mb-3 px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: frameColor,
            }}
          >
            {frame.labelIcon !== 'none' && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: labelTextColor }}
              >
                {getLabelIcon(frame.labelIcon, frameColor)}
              </div>
            )}
            {frame.labelText && (
              <span 
                className="font-semibold text-lg"
                style={{ color: labelTextColor }}
              >
                {frame.labelText}
              </span>
            )}
          </div>
        )}

        {/* QR Code */}
        <div 
          className="relative animate-float"
          style={{ 
            backgroundColor: style.backgroundColor,
            borderRadius: getInnerRadius(),
            padding: hasFrame ? '8px' : '0',
          }}
        >
          <QRCodeCanvas
            value={displayValue}
            size={style.size}
            level={style.errorCorrection}
            marginSize={style.margin}
            bgColor={style.backgroundColor}
            fgColor={style.foregroundColor}
            imageSettings={style.logoUrl ? {
              src: style.logoUrl,
              height: logoSize,
              width: logoSize,
              excavate: true,
            } : undefined}
            style={{
              borderRadius: style.cornerStyle === 'square' 
                ? '0' 
                : style.cornerStyle === 'rounded' 
                  ? '12px' 
                  : '24px',
            }}
          />
        </div>

        {/* Bottom Label */}
        {hasLabel && frame.labelPosition === 'bottom' && (
          <div 
            className="flex items-center gap-3 mt-3 px-4 py-2 rounded-full"
            style={{ 
              backgroundColor: frameColor,
            }}
          >
            {frame.labelIcon !== 'none' && (
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: labelTextColor }}
              >
                {getLabelIcon(frame.labelIcon, frameColor)}
              </div>
            )}
            {frame.labelText && (
              <span 
                className="font-semibold text-lg"
                style={{ color: labelTextColor }}
              >
                {frame.labelText}
              </span>
            )}
          </div>
        )}
      </motion.div>
    );
  }
);

QRPreview.displayName = 'QRPreview';

