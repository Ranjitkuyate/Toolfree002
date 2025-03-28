import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaImage } from 'react-icons/fa';

const BackgroundRemover: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [tolerance, setTolerance] = useState<number>(30);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProcessedImage(null);
    }
  };

  const removeBackground = () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw original image
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Simple background removal algorithm (chroma key)
        // This is a simplified version - a real tool would use more sophisticated algorithms
        
        // Detect background color from corners (assuming corners are background)
        const topLeft = [data[0], data[1], data[2], data[3]];
        const topRight = [data[(canvas.width - 1) * 4], data[(canvas.width - 1) * 4 + 1], data[(canvas.width - 1) * 4 + 2], data[(canvas.width - 1) * 4 + 3]];
        const bottomLeft = [data[(canvas.height - 1) * canvas.width * 4], data[(canvas.height - 1) * canvas.width * 4 + 1], data[(canvas.height - 1) * canvas.width * 4 + 2], data[(canvas.height - 1) * canvas.width * 4 + 3]];
        const bottomRight = [data[(canvas.height - 1) * canvas.width * 4 + (canvas.width - 1) * 4], data[(canvas.height - 1) * canvas.width * 4 + (canvas.width - 1) * 4 + 1], data[(canvas.height - 1) * canvas.width * 4 + (canvas.width - 1) * 4 + 2], data[(canvas.height - 1) * canvas.width * 4 + (canvas.width - 1) * 4 + 3]];
        
        // Use the most common color as background
        const bgColor = [
          Math.round((topLeft[0] + topRight[0] + bottomLeft[0] + bottomRight[0]) / 4),
          Math.round((topLeft[1] + topRight[1] + bottomLeft[1] + bottomRight[1]) / 4),
          Math.round((topLeft[2] + topRight[2] + bottomLeft[2] + bottomRight[2]) / 4)
        ];
        
        // Remove background
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Calculate color distance
          const distance = Math.sqrt(
            Math.pow(r - bgColor[0], 2) +
            Math.pow(g - bgColor[1], 2) +
            Math.pow(b - bgColor[2], 2)
          );
          
          // If color is close to background color, make it transparent
          if (distance < tolerance) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
        
        // Update canvas with modified pixel data
        ctx.putImageData(imageData, 0, 0);
        
        const processedDataUrl = canvas.toDataURL('image/png');
        setProcessedImage(processedDataUrl);
      }
      
      setIsProcessing(false);
    };
    img.src = previewUrl;
  };

  const downloadProcessedImage = () => {
    if (!processedImage || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = `nobg-${selectedFile.name.split('.')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Image Background Remover | ToolsFree Online</title>
        <meta name="description" content="Remove backgrounds from your images online for free. No registration required." />
        <meta name="keywords" content="background remover, remove background, transparent background, free background remover" />
      </Head>

      <PageContainer>
        <PageTitle>Image Background Remover</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <InputSection>
            <FileInputLabel>
              <FileInput 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
              />
              Choose Image
            </FileInputLabel>
            
            {previewUrl && (
              <PreviewContainer>
                <PreviewImage src={previewUrl} alt="Preview" />
                <SettingsContainer>
                  <ToleranceSlider>
                    <label>Color Tolerance: {tolerance}</label>
                    <input 
                      type="range" 
                      min="5" 
                      max="100" 
                      value={tolerance} 
                      onChange={(e) => setTolerance(parseInt(e.target.value))} 
                    />
                    <ToleranceHint>Higher values remove more colors, lower values are more precise</ToleranceHint>
                  </ToleranceSlider>
                </SettingsContainer>
                
                <ActionButton 
                  onClick={removeBackground} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Remove Background'}
                </ActionButton>
              </PreviewContainer>
            )}
          </InputSection>
          
          {processedImage && (
            <OutputSection>
              <OutputTitle>Image with Removed Background</OutputTitle>
              <ProcessedImageContainer>
                <CheckerboardBackground>
                  <ProcessedImagePreview src={processedImage} alt="Processed" />
                </CheckerboardBackground>
                <DownloadButton onClick={downloadProcessedImage}>
                  Download Transparent Image
                </DownloadButton>
              </ProcessedImageContainer>
            </OutputSection>
          )}
        </ToolContainer>

        <DisclaimerText>
          Note: This is a simplified background removal tool. For professional results, consider using specialized software.
        </DisclaimerText>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>
      </PageContainer>
    </Layout>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AdContainer = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 4px;
  text-align: center;
`;

const AdText = styled.p`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const AdContent = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border: 1px dashed #ddd;
`;

const ToolContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const InputSection = styled.div`
  padding: 2rem;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const PreviewContainer = styled.div`
  margin-top: 2rem;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  display: block;
  margin: 0 auto 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SettingsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ToleranceSlider = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    margin-bottom: 0.5rem;
  }
`;

const ToleranceHint = styled.p`
  font-size: 0.8rem;
  color: #666;
  font-style: italic;
`;

const ActionButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3a80d2;
  }
  
  &:disabled {
    background-color: #a0c3e8;
    cursor: not-allowed;
  }
`;

const OutputSection = styled.div`
  padding: 2rem;
  border-top: 1px solid #eee;
`;

const OutputTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ProcessedImageContainer = styled.div`
  text-align: center;
`;

const CheckerboardBackground = styled.div`
  background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                    linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                    linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  display: inline-block;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProcessedImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  display: block;
`;

const DownloadButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3d9140;
  }
`;

const DisclaimerText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

export default BackgroundRemover;
