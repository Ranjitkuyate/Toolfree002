import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaImage } from 'react-icons/fa';

const ImageEffects: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedEffect, setSelectedEffect] = useState<string>('grayscale');
  const [effectIntensity, setEffectIntensity] = useState<number>(100);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const effects = [
    { id: 'grayscale', name: 'Grayscale', hasIntensity: true },
    { id: 'sepia', name: 'Sepia', hasIntensity: true },
    { id: 'invert', name: 'Invert', hasIntensity: true },
    { id: 'blur', name: 'Blur', hasIntensity: true },
    { id: 'brightness', name: 'Brightness', hasIntensity: true },
    { id: 'contrast', name: 'Contrast', hasIntensity: true },
    { id: 'saturate', name: 'Saturate', hasIntensity: true },
    { id: 'hue-rotate', name: 'Hue Rotate', hasIntensity: false },
  ];

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

  const applyEffect = () => {
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
        
        // Apply filter based on selected effect
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;
        
        const intensity = effectIntensity / 100;
        
        switch (selectedEffect) {
          case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
              const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
              data[i] = data[i] * (1 - intensity) + avg * intensity;
              data[i + 1] = data[i + 1] * (1 - intensity) + avg * intensity;
              data[i + 2] = data[i + 2] * (1 - intensity) + avg * intensity;
            }
            break;
            
          case 'sepia':
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              const newR = (0.393 * r + 0.769 * g + 0.189 * b);
              const newG = (0.349 * r + 0.686 * g + 0.168 * b);
              const newB = (0.272 * r + 0.534 * g + 0.131 * b);
              
              data[i] = data[i] * (1 - intensity) + newR * intensity;
              data[i + 1] = data[i + 1] * (1 - intensity) + newG * intensity;
              data[i + 2] = data[i + 2] * (1 - intensity) + newB * intensity;
            }
            break;
            
          case 'invert':
            for (let i = 0; i < data.length; i += 4) {
              data[i] = data[i] * (1 - intensity) + (255 - data[i]) * intensity;
              data[i + 1] = data[i + 1] * (1 - intensity) + (255 - data[i + 1]) * intensity;
              data[i + 2] = data[i + 2] * (1 - intensity) + (255 - data[i + 2]) * intensity;
            }
            break;
            
          // For other effects, we'll use CSS filters via canvas.style
          default:
            // Reset to original image
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
            
            // Apply CSS filter
            let filterValue = '';
            switch (selectedEffect) {
              case 'blur':
                filterValue = `blur(${intensity * 10}px)`;
                break;
              case 'brightness':
                filterValue = `brightness(${1 + intensity})`;
                break;
              case 'contrast':
                filterValue = `contrast(${1 + intensity * 2})`;
                break;
              case 'saturate':
                filterValue = `saturate(${1 + intensity * 2})`;
                break;
              case 'hue-rotate':
                filterValue = `hue-rotate(${intensity * 360}deg)`;
                break;
            }
            
            // Create a temporary canvas with the filter applied
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCanvas.style.filter = filterValue;
            
            const tempCtx = tempCanvas.getContext('2d');
            if (tempCtx) {
              tempCtx.drawImage(canvas, 0, 0);
              
              // We need to render this to a new canvas without the style
              setTimeout(() => {
                ctx.drawImage(tempCanvas, 0, 0);
                const processedDataUrl = canvas.toDataURL(selectedFile.type);
                setProcessedImage(processedDataUrl);
                setIsProcessing(false);
              }, 100);
              return;
            }
        }
        
        // Update canvas with modified pixel data
        ctx.putImageData(imageData, 0, 0);
        
        const processedDataUrl = canvas.toDataURL(selectedFile.type);
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
    link.download = `effect-${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Image Effects | ToolsFree Online</title>
        <meta name="description" content="Apply effects to your images online for free. No registration required." />
        <meta name="keywords" content="image effects, photo filters, image editor, free image effects" />
      </Head>

      <PageContainer>
        <PageTitle>Image Effects</PageTitle>

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
                <EffectSettings>
                  <EffectSelector>
                    <label>Select Effect:</label>
                    <select 
                      value={selectedEffect} 
                      onChange={(e) => setSelectedEffect(e.target.value)}
                    >
                      {effects.map(effect => (
                        <option key={effect.id} value={effect.id}>
                          {effect.name}
                        </option>
                      ))}
                    </select>
                  </EffectSelector>
                  
                  {effects.find(e => e.id === selectedEffect)?.hasIntensity && (
                    <IntensitySlider>
                      <label>Intensity: {effectIntensity}%</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={effectIntensity} 
                        onChange={(e) => setEffectIntensity(parseInt(e.target.value))} 
                      />
                    </IntensitySlider>
                  )}
                </EffectSettings>
                
                <ActionButton 
                  onClick={applyEffect} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Apply Effect'}
                </ActionButton>
              </PreviewContainer>
            )}
          </InputSection>
          
          {processedImage && (
            <OutputSection>
              <OutputTitle>Processed Image</OutputTitle>
              <ProcessedImageContainer>
                <ProcessedImagePreview src={processedImage} alt="Processed" />
                <DownloadButton onClick={downloadProcessedImage}>
                  Download Processed Image
                </DownloadButton>
              </ProcessedImageContainer>
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

const EffectSettings = styled.div`
  margin-bottom: 1.5rem;
`;

const EffectSelector = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const IntensitySlider = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
  }
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

const ProcessedImagePreview = styled.img`
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

export default ImageEffects;
