import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  data: string;
  width?: number;
  logoUrl?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data, width = 256, logoUrl }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, data, {
        width: width,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
        errorCorrectionLevel: 'H', // High error correction for logo embedding
      }, (error) => {
        if (error) console.error(error);
        
        // Simulating Logo embedding (simplified for canvas)
        // In a real app, we'd drawImage over the center
      });
    }
  }, [data, width]);

  return (
    <div className="relative flex justify-center items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <canvas ref={canvasRef} />
      {/* Visual embellishment for Qiospay/Nobu branding */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {/* If we had a real logo image, we could overlay it here absolutely if the QR Error Correction supports it */}
      </div>
      <div className="absolute bottom-1 right-2 text-[10px] text-gray-400 font-mono">
        NOBU QRIS
      </div>
    </div>
  );
};
