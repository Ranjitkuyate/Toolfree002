import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';

const ImageResizer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true);
  const [resizedImage, setResizedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        
        // Get original dimensions
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      setResizedImage(null);
    }
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWidth = parseInt(e.target.value);
    setWidth(newWidth);
    
    if (maintainAspectRatio && selectedFile && previewUrl) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setHeight(Math.round(newWidth / aspectRatio));
      };
      img.src = previewUrl;
    }
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHeight = parseInt(e.target.value);
    setHeight(newHeight);
    
    if (maintainAspectRatio && selectedFile && previewUrl) {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        setWidth(Math.round(newHeight * aspectRatio));
      };
      img.src = previewUrl;
    }
  };

  const resizeImage = () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL(selectedFile.type);
        setResizedImage(resizedDataUrl);
      }
      
      setIsProcessing(false);
    };
    img.src = previewUrl;
  };

  const downloadResizedImage = () => {
    if (!resizedImage || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = resizedImage;
    link.download = `resized-${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Image Resizer | ToolsFree Online</title>
        <meta name="description" content="Resize your images to specific dimensions online for free. No registration required." />
        <meta name="keywords" content="image resizer, resize image, change image size, free image resizer" />
      </Head>

      <PageContainer>
        <PageTitle>Image Resizer</PageTitle>

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
              Choose File
            </FileInputLabel>
            
            {previewUrl && (
              <PreviewContainer>
                <PreviewImage src={previewUrl} alt="Preview" />
                <DimensionsContainer>
                  <DimensionInput>
                    <label>Width (px):</label>
                    <input 
                      type="number" 
                      value={width} 
                      onChange={handleWidthChange} 
                      min="1" 
                    />
                  </DimensionInput>
                  
                  <DimensionInput>
                    <label>Height (px):</label>
                    <input 
                      type="number" 
                      value={height} 
                      onChange={handleHeightChange} 
                      min="1" 
                    />
                  </DimensionInput>
                  
                  <AspectRatioToggle>
                    <input 
                      type="checkbox" 
                      checked={maintainAspectRatio} 
                      onChange={() => setMaintainAspectRatio(!maintainAspectRatio)} 
                      id="aspect-ratio" 
                    />
                    <label htmlFor="aspect-ratio">Maintain aspect ratio</label>
                  </AspectRatioToggle>
                </DimensionsContainer>
                
                <ActionButton 
                  onClick={resizeImage} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Resize Image'}
                </ActionButton>
              </PreviewContainer>
            )}
          </InputSection>
          
          {resizedImage && (
            <OutputSection>
              <OutputTitle>Resized Image</OutputTitle>
              <ResizedImageContainer>
                <ResizedImagePreview src={resizedImage} alt="Resized" />
                <DownloadButton onClick={downloadResizedImage}>
                  Download Resized Image
                </DownloadButton>
              </ResizedImageContainer>
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

const DimensionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const DimensionInput = styled.div`
  display: flex;
  align-items: center;
  
  label {
    margin-right: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100px;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const AspectRatioToggle = styled.div`
  display: flex;
  align-items: center;
  
  input {
    margin-right: 0.5rem;
  }
  
  label {
    font-weight: 500;
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

const ResizedImageContainer = styled.div`
  text-align: center;
`;

const ResizedImagePreview = styled.img`
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

export default ImageResizer;
