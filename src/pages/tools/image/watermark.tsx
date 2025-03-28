import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaImage } from 'react-icons/fa';

const ImageWatermark: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>('ToolsFree');
  const [watermarkColor, setWatermarkColor] = useState<string>('#ffffff');
  const [watermarkOpacity, setWatermarkOpacity] = useState<number>(50);
  const [watermarkSize, setWatermarkSize] = useState<number>(30);
  const [watermarkPosition, setWatermarkPosition] = useState<string>('center');
  const [watermarkedImage, setWatermarkedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setWatermarkedImage(null);
    }
  };

  const applyWatermark = () => {
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
        
        // Set watermark properties
        ctx.fillStyle = watermarkColor;
        ctx.globalAlpha = watermarkOpacity / 100;
        ctx.font = `${watermarkSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Calculate position
        let x = img.width / 2;
        let y = img.height / 2;
        
        switch (watermarkPosition) {
          case 'top-left':
            x = img.width * 0.1;
            y = img.height * 0.1;
            ctx.textAlign = 'left';
            break;
          case 'top-center':
            y = img.height * 0.1;
            break;
          case 'top-right':
            x = img.width * 0.9;
            y = img.height * 0.1;
            ctx.textAlign = 'right';
            break;
          case 'middle-left':
            x = img.width * 0.1;
            ctx.textAlign = 'left';
            break;
          case 'middle-right':
            x = img.width * 0.9;
            ctx.textAlign = 'right';
            break;
          case 'bottom-left':
            x = img.width * 0.1;
            y = img.height * 0.9;
            ctx.textAlign = 'left';
            break;
          case 'bottom-center':
            y = img.height * 0.9;
            break;
          case 'bottom-right':
            x = img.width * 0.9;
            y = img.height * 0.9;
            ctx.textAlign = 'right';
            break;
        }
        
        // Draw watermark
        ctx.fillText(watermarkText, x, y);
        
        const watermarkedDataUrl = canvas.toDataURL(selectedFile.type);
        setWatermarkedImage(watermarkedDataUrl);
      }
      
      setIsProcessing(false);
    };
    img.src = previewUrl;
  };

  const downloadWatermarkedImage = () => {
    if (!watermarkedImage || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = watermarkedImage;
    link.download = `watermarked-${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Image Watermark | ToolsFree Online</title>
        <meta name="description" content="Add watermarks to your images online for free. No registration required." />
        <meta name="keywords" content="image watermark, add watermark, watermark generator, free watermark tool" />
      </Head>

      <PageContainer>
        <PageTitle>Image Watermark</PageTitle>

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
                <WatermarkSettings>
                  <SettingGroup>
                    <label>Watermark Text:</label>
                    <input 
                      type="text" 
                      value={watermarkText} 
                      onChange={(e) => setWatermarkText(e.target.value)} 
                      placeholder="Enter watermark text"
                    />
                  </SettingGroup>
                  
                  <SettingGroup>
                    <label>Text Color:</label>
                    <ColorInput 
                      type="color" 
                      value={watermarkColor} 
                      onChange={(e) => setWatermarkColor(e.target.value)} 
                    />
                  </SettingGroup>
                  
                  <SettingGroup>
                    <label>Opacity: {watermarkOpacity}%</label>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={watermarkOpacity} 
                      onChange={(e) => setWatermarkOpacity(parseInt(e.target.value))} 
                    />
                  </SettingGroup>
                  
                  <SettingGroup>
                    <label>Text Size: {watermarkSize}px</label>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={watermarkSize} 
                      onChange={(e) => setWatermarkSize(parseInt(e.target.value))} 
                    />
                  </SettingGroup>
                  
                  <SettingGroup>
                    <label>Position:</label>
                    <select 
                      value={watermarkPosition} 
                      onChange={(e) => setWatermarkPosition(e.target.value)}
                    >
                      <option value="center">Center</option>
                      <option value="top-left">Top Left</option>
                      <option value="top-center">Top Center</option>
                      <option value="top-right">Top Right</option>
                      <option value="middle-left">Middle Left</option>
                      <option value="middle-right">Middle Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-center">Bottom Center</option>
                      <option value="bottom-right">Bottom Right</option>
                    </select>
                  </SettingGroup>
                </WatermarkSettings>
                
                <ActionButton 
                  onClick={applyWatermark} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Apply Watermark'}
                </ActionButton>
              </PreviewContainer>
            )}
          </InputSection>
          
          {watermarkedImage && (
            <OutputSection>
              <OutputTitle>Watermarked Image</OutputTitle>
              <WatermarkedImageContainer>
                <WatermarkedImagePreview src={watermarkedImage} alt="Watermarked" />
                <DownloadButton onClick={downloadWatermarkedImage}>
                  Download Watermarked Image
                </DownloadButton>
              </WatermarkedImageContainer>
            </OutputSection>
          )}
        </ToolContainer>

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

const WatermarkSettings = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SettingGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input[type="text"], select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
  
  input[type="range"] {
    width: 100%;
  }
`;

const ColorInput = styled.input`
  width: 50px;
  height: 30px;
  padding: 0;
  border: none;
  cursor: pointer;
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

const WatermarkedImageContainer = styled.div`
  text-align: center;
`;

const WatermarkedImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  display: block;
  margin: 0 auto 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

export default ImageWatermark;
