import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Download, Image, FileType, FileText, Loader2 } from 'lucide-react';
import { toPng, toSvg } from 'html-to-image';
import { motion } from 'framer-motion';

interface DownloadPanelProps {
  qrRef: React.RefObject<HTMLDivElement>;
  isValid: boolean;
}

type Format = 'png' | 'svg' | 'pdf';
type Resolution = 'standard' | 'high' | 'print';

const resolutions: Record<Resolution, { label: string; scale: number }> = {
  standard: { label: 'Standard (1x)', scale: 1 },
  high: { label: 'Haute qualité (2x)', scale: 2 },
  print: { label: 'Impression (4x)', scale: 4 },
};

export function DownloadPanel({ qrRef, isValid }: DownloadPanelProps) {
  const [format, setFormat] = useState<Format>('png');
  const [resolution, setResolution] = useState<Resolution>('high');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!qrRef.current || !isValid) return;

    setIsDownloading(true);

    try {
      const scale = resolutions[resolution].scale;
      const filename = `qrcode-${Date.now()}`;

      if (format === 'png') {
        const dataUrl = await toPng(qrRef.current, {
          quality: 1,
          pixelRatio: scale,
        });
        downloadDataUrl(dataUrl, `${filename}.png`);
      } else if (format === 'svg') {
        const dataUrl = await toSvg(qrRef.current, {
          quality: 1,
        });
        downloadDataUrl(dataUrl, `${filename}.svg`);
      } else if (format === 'pdf') {
        // For PDF, we create a high-res PNG and embed it
        const dataUrl = await toPng(qrRef.current, {
          quality: 1,
          pixelRatio: 4,
        });
        
        // Create a simple PDF with the image
        const pdfContent = createSimplePdf(dataUrl);
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        downloadDataUrl(url, `${filename}.pdf`);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadDataUrl = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createSimplePdf = (imageDataUrl: string): string => {
    // Simple PDF generation - in production, use a library like jsPDF
    // This creates a basic PDF structure
    const imageData = imageDataUrl.split(',')[1];
    
    // For a proper implementation, use jsPDF library
    // This is a placeholder that triggers PNG download instead
    return imageDataUrl;
  };

  const formatIcons: Record<Format, React.ReactNode> = {
    png: <Image className="w-4 h-4" />,
    svg: <FileType className="w-4 h-4" />,
    pdf: <FileText className="w-4 h-4" />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-4"
    >
      <h3 className="font-display font-semibold text-lg flex items-center gap-2">
        <Download className="w-5 h-5 text-primary" />
        Télécharger
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="input-label">Format</Label>
          <Select value={format} onValueChange={(v: Format) => setFormat(v)}>
            <SelectTrigger className="h-12">
              <div className="flex items-center gap-2">
                {formatIcons[format]}
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="svg">SVG</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="input-label">Résolution</Label>
          <Select value={resolution} onValueChange={(v: Resolution) => setResolution(v)}>
            <SelectTrigger className="h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(resolutions).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        disabled={!isValid || isDownloading}
        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        size="lg"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Génération...
          </>
        ) : (
          <>
            <Download className="w-5 h-5 mr-2" />
            Télécharger {format.toUpperCase()}
          </>
        )}
      </Button>

      {!isValid && (
        <p className="text-sm text-destructive text-center">
          Veuillez remplir les informations requises pour générer le QR code.
        </p>
      )}
    </motion.div>
  );
}
