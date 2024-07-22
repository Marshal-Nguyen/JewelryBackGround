import React, { useEffect, useRef, useCallback } from 'react';
import QrScanner from 'react-qr-scanner';

const ScannerComponent = ({ onQRScan, isScanning }) => {
  const scannerRef = useRef(null);

  const handleScan = useCallback((result) => {
    if (result) {
      console.log('Kết quả quét QR:', result);
      onQRScan(result.text || result.data);
    }
  }, [onQRScan]);

  const handleError = useCallback((error) => {
    console.error('Lỗi khi quét:', error);
  }, []);

  useEffect(() => {
    const startScanner = () => {
      if (scannerRef.current) {
        scannerRef.current.start();
      }
    };

    const stopScanner = () => {
      if (scannerRef.current) {
        scannerRef.current.stop();
      }
    };

    if (isScanning) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isScanning]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '360px', 
        height: '549px',
        zIndex: '1000',
        position:'relative',
        top:'486px',
        right:'-233px'

  
      }}
    >
      <QrScanner
        ref={scannerRef}
        delay={1000}
        onError={handleError}
        onScan={handleScan}
        style={{
          width: '100%', 
          height: '100%',
          objectFit: 'cover', 
          borderRadius: '10px',
          border: '2px solid #5b5353',
        }}
      />
    </div>
  );
};

export default ScannerComponent;
