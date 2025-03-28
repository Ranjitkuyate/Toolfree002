import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaEyeDropper } from 'react-icons/fa';

const ColorPicker: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        setImageLoaded(false);
        setPickedColor(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const canvas = document.createElement('canvas');
    const img = e.target as HTMLImageElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0);
      setCanvasRef(canvas);
      setImageLoaded(true);
    }
  };

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!canvasRef || !imageLoaded) return;
    
    const img = e.target as HTMLImageElement;
    const rect = img.getBoundingClientRect();
    
    // Calculate the position in the original image
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    
    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);
    
    // Get pixel color
    const ctx = canvasRef.getContext('2d');
    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const color = `#${pixel[0].toString(16).padStart(2, '0')}${pixel[1].toString(16).padStart(2, '0')}${pixel[2].toString(16).padStart(2, '0')}`;
      
      setPickedColor(color);
      
      // Add to history if not already present
      if (!colorHistory.includes(color)) {
        setColorHistory(prev => [color, ...prev].slice(0, 10));
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Copied ${text} to clipboard!`);
    });
  };

  return (
    <Layout>
      <Head>
        <title>Image Color Picker | ToolsFree Online</title>
        <meta name="description" content="Extract colors from images online for free. No registration required." />
        <meta name="keywords" content="color picker, image color picker, extract colors, color extraction" />
      </Head>

      <PageContainer>
        <PageTitle>Image Color Picker</PageTitle>

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
                <Instructions>
                  <FaEyeDropper /> Click anywhere on the image to pick a color
                </Instructions>
                <PreviewImage 
                  src={previewUrl} 
                  alt="Preview" 
                  onClick={handleImageClick}
                  onLoad={handleImageLoad}
                  style={{ cursor: 'crosshair' }}
                />
              </PreviewContainer>
            )}
          </InputSection>
          
          {pickedColor && (
            <OutputSection>
              <OutputTitle>Picked Color</OutputTitle>
              <ColorResult>
                <ColorSwatch style={{ backgroundColor: pickedColor }} />
                <ColorInfo>
                  <ColorValue>{pickedColor}</ColorValue>
                  <CopyButton onClick={() => copyToClipboard(pickedColor)}>
                    Copy HEX
                  </CopyButton>
                </ColorInfo>
              </ColorResult>
            </OutputSection>
          )}
          
          {colorHistory.length > 0 && (
            <HistorySection>
              <HistoryTitle>Color History</HistoryTitle>
              <ColorHistoryGrid>
                {colorHistory.map((color, index) => (
                  <HistoryItem key={index} onClick={() => copyToClipboard(color)}>
                    <HistorySwatch style={{ backgroundColor: color }} />
                    <HistoryValue>{color}</HistoryValue>
                  </HistoryItem>
                ))}
              </ColorHistoryGrid>
            </HistorySection>
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
  text-align: center;
`;

const Instructions = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #666;
  font-style: italic;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 400px;
  display: block;
  margin: 0 auto;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
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

const ColorResult = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ColorSwatch = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
`;

const ColorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const ColorValue = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  font-family: monospace;
`;

const CopyButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const HistorySection = styled.div`
  padding: 2rem;
  border-top: 1px solid #eee;
`;

const HistoryTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const ColorHistoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const HistoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 4px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const HistorySwatch = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
`;

const HistoryValue = styled.div`
  font-family: monospace;
  font-size: 0.9rem;
`;

export default ColorPicker;
