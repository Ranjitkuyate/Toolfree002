import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Compressor from 'compressorjs';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 20px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  margin-top: 20px;
  border-radius: var(--border-radius);
`;

const ImageCompressor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR
    setIsClient(true);

    if (!file) {
      if (compressedUrl) {
        URL.revokeObjectURL(compressedUrl);
        setCompressedUrl('');
      }
      return;
    }

    const compressImage = () => {
      new Compressor(file, {
        quality: 0.7,
        maxWidth: 800,
        maxHeight: 800,
        mimeType: 'image/jpeg',
        success(result: Blob) {
          const url = URL.createObjectURL(result);
          setCompressedUrl(url);
        },
        error(err) {
          console.error('Compression error:', err);
        },
      });
    };

    compressImage();

    return () => {
      if (compressedUrl) {
        URL.revokeObjectURL(compressedUrl);
      }
    };
  }, [file]);

  return (
    <Container>
      <h2>Image Compressor</h2>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
        disabled={!isClient}
      />
      {compressedUrl && <PreviewImage src={compressedUrl} alt="Compressed Image" />}
    </Container>
  );
};

export default ImageCompressor;
