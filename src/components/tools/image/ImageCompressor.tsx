import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload, FaDownload, FaImage } from 'react-icons/fa';

const ImageCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setCompressedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    // Simulate compression process
    setTimeout(() => {
      setCompressedImage(preview);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <CompressorContainer>
      <UploadSection>
        <UploadLabel htmlFor="image-upload">
          <FaUpload />
          <span>Select Image</span>
        </UploadLabel>
        <UploadInput 
          id="image-upload" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
        
        {selectedFile && (
          <FileInfo>
            <FaImage />
            <FileName>{selectedFile.name}</FileName>
            <FileSize>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</FileSize>
          </FileInfo>
        )}
      </UploadSection>
      
      {preview && (
        <>
          <ControlsSection>
            <QualityControl>
              <QualityLabel>Compression Quality: {quality}%</QualityLabel>
              <QualitySlider 
                type="range" 
                min="1" 
                max="100" 
                value={quality} 
                onChange={(e) => setQuality(parseInt(e.target.value))} 
              />
            </QualityControl>
            
            <CompressButton 
              onClick={handleCompress} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Compressing...' : 'Compress Image'}
            </CompressButton>
          </ControlsSection>
          
          <PreviewSection>
            <PreviewColumn>
              <PreviewTitle>Original</PreviewTitle>
              <ImagePreview src={preview} alt="Original" />
            </PreviewColumn>
            
            {compressedImage && (
              <PreviewColumn>
                <PreviewTitle>Compressed</PreviewTitle>
                <ImagePreview src={compressedImage} alt="Compressed" />
                <DownloadButton>
                  <FaDownload />
                  <span>Download</span>
                </DownloadButton>
              </PreviewColumn>
            )}
          </PreviewSection>
        </>
      )}
    </CompressorContainer>
  );
};

const CompressorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  padding: 0.75rem;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
`;

const FileName = styled.span`
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ControlsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QualityControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const QualityLabel = styled.label`
  font-weight: 500;
`;

const QualitySlider = styled.input`
  width: 100%;
`;

const CompressButton = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #219653;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PreviewSection = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const PreviewColumn = styled.div`
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const PreviewTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 4px;
`;

const DownloadButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

export default ImageCompressor;
