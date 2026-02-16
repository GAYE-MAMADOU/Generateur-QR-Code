import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRData, QRStyleOptions, QRType, defaultStyle, FrameOptions, VCardPlusData, defaultVCardPlus } from '@/types/qr';
import { encodeQRData, isValidData } from '@/utils/qr-encoder';
import { useVCardPlus } from '@/hooks/useVCardPlus';
import { TypeSelector } from './TypeSelector';
import { DataForm } from './DataForm';
import { StylePanel } from './StylePanel';
import { FramePanel } from './FramePanel';
import { TemplatesPanel } from './TemplatesPanel';
import { QRPreview } from './QRPreview';
import { DownloadPanel } from './DownloadPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Settings, Palette, QrCode, Frame, Sparkles, Save, ExternalLink } from 'lucide-react';

export function QRGenerator() {
  const qrRef = useRef<HTMLDivElement>(null);
  
  const [data, setData] = useState<QRData>({ type: 'url', url: '' });
  const [style, setStyle] = useState<QRStyleOptions>(defaultStyle);
  const [vcardPlusData, setVcardPlusData] = useState<VCardPlusData>(defaultVCardPlus);
  
  const { isLoading: isVCardPlusLoading, profileUrl, createOrUpdateProfile } = useVCardPlus();
  
  const handleTypeChange = useCallback((type: QRType) => {
    setData({ type });
  }, []);

  const handleDataChange = useCallback((changes: Partial<QRData>) => {
    setData((prev) => ({ ...prev, ...changes }));
  }, []);

  const handleStyleChange = useCallback((changes: Partial<QRStyleOptions>) => {
    setStyle((prev) => ({ ...prev, ...changes }));
  }, []);

  const handleFrameChange = useCallback((changes: Partial<FrameOptions>) => {
    setStyle((prev) => ({ 
      ...prev, 
      frame: { ...prev.frame, ...changes } 
    }));
  }, []);

  const handleTemplateApply = useCallback((templateStyle: QRStyleOptions) => {
    setStyle(templateStyle);
  }, []);

  const handleVCardPlusChange = useCallback((newData: VCardPlusData) => {
    setVcardPlusData(newData);
  }, []);

  const handleSaveVCardPlus = async () => {
    const slug = await createOrUpdateProfile(vcardPlusData);
    if (slug) {
      setVcardPlusData(prev => ({ ...prev, slug }));
    }
  };

  const encodedValue = data.type === 'vcard-plus' 
    ? encodeQRData(data, profileUrl || undefined)
    : encodeQRData(data);
  const isValid = data.type === 'vcard-plus'
    ? isValidData(data, profileUrl || undefined)
    : isValidData(data);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <QrCode className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl gradient-text">QR Code Studio</h1>
                <p className="text-xs text-muted-foreground">Générateur de QR codes personnalisables</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Configuration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Type Selection */}
            <div className="glass-card p-6">
              <h2 className="section-title">
                <QrCode className="w-5 h-5 text-primary" />
                Type de QR Code
              </h2>
              <TypeSelector selected={data.type} onSelect={handleTypeChange} />
            </div>

            {/* Tabs for Data & Style */}
            <div className="glass-card p-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="content" className="flex items-center gap-1 text-xs sm:text-sm sm:gap-2">
                    <Settings className="w-4 h-4" />
                    <span className="hidden sm:inline">Contenu</span>
                  </TabsTrigger>
                  <TabsTrigger value="templates" className="flex items-center gap-1 text-xs sm:text-sm sm:gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">Templates</span>
                  </TabsTrigger>
                  <TabsTrigger value="style" className="flex items-center gap-1 text-xs sm:text-sm sm:gap-2">
                    <Palette className="w-4 h-4" />
                    <span className="hidden sm:inline">Style</span>
                  </TabsTrigger>
                  <TabsTrigger value="frame" className="flex items-center gap-1 text-xs sm:text-sm sm:gap-2">
                    <Frame className="w-4 h-4" />
                    <span className="hidden sm:inline">Cadre</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-0">
                  <DataForm 
                    data={data} 
                    onChange={handleDataChange}
                    onVCardPlusChange={handleVCardPlusChange}
                    vcardPlusData={vcardPlusData}
                    isVCardPlusLoading={isVCardPlusLoading}
                  />
                  
                  {/* VCard Plus Save Button */}
                  {data.type === 'vcard-plus' && vcardPlusData.firstName && vcardPlusData.lastName && (
                    <div className="mt-6 space-y-3">
                      <Button
                        onClick={handleSaveVCardPlus}
                        disabled={isVCardPlusLoading}
                        className="w-full"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {isVCardPlusLoading ? 'Création...' : profileUrl ? 'Mettre à jour le profil' : 'Créer le profil'}
                      </Button>
                      
                      {profileUrl && (
                        <a
                          href={profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Voir la page de profil
                        </a>
                      )}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="templates" className="mt-0">
                  <TemplatesPanel onApply={handleTemplateApply} currentStyle={style} />
                </TabsContent>
                
                <TabsContent value="style" className="mt-0">
                  <StylePanel style={style} onChange={handleStyleChange} />
                </TabsContent>

                <TabsContent value="frame" className="mt-0">
                  <FramePanel frame={style.frame} onChange={handleFrameChange} />
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>

          {/* Right Panel - Preview & Download */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6 lg:sticky lg:top-24 lg:self-start"
          >
            {/* QR Preview */}
            <div className="glass-card p-6">
              <h2 className="section-title mb-6">
                <QrCode className="w-5 h-5 text-primary" />
                Aperçu
              </h2>
              <div className="flex justify-center">
                <QRPreview
                  ref={qrRef}
                  value={encodedValue}
                  style={style}
                />
              </div>
              {!isValid && (
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Remplissez les informations pour voir votre QR code
                </p>
              )}
            </div>

            {/* Download Panel */}
            <DownloadPanel qrRef={qrRef} isValid={isValid} />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>Créez vos QR codes gratuitement, sans inscription.</p>
            <p className="mt-1">Toutes les données restent sur votre appareil.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
