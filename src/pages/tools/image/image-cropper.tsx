import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';

const ImageCropper: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cropX, setCropX] = useState<number>(0);
  const [cropY, setCropY] = useState<number>(0);
  const [cropWidth, setCropWidth] = useState<number>(0);
  const [cropHeight, setCropHeight] = useState<number>(0);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
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
          setOriginalWidth(img.width);
          setOriginalHeight(img.height);
          
          // Set default crop to full image
          setCropX(0);
          setCropY(0);
          setCropWidth(img.width);
          setCropHeight(img.height);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
      setCroppedImage(null);
    }
  };

  const cropImage = () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(
          img, 
          cropX, cropY, cropWidth, cropHeight, 
          0, 0, cropWidth, cropHeight
        );
        
        const croppedDataUrl = canvas.toDataURL(selectedFile.type);
        setCroppedImage(croppedDataUrl);
      }
      
      setIsProcessing(false);
    };
    img.src = previewUrl;
  };

  const downloadCroppedImage = () => {
    if (!croppedImage || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = `cropped-${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Image Cropper | ToolsFree Online</title>
        <meta name="description" content="Crop your images to specific dimensions online for free. No registration required." />
        <meta name="keywords" content="image cropper, crop image, cut image, free image cropper" />
      </Head>

      <PageContainer>
        <PageTitle>Image Cropper</PageTitle>

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
                <CropSettingsContainer>
                  <CropInput>
                    <label>X Position:</label>
                    <input 
                      type="number" 
                      value={cropX} 
                      onChange={(e) => setCropX(parseInt(e.target.value))} 
                      min="0" 
                      max={originalWidth - cropWidth}
                    />
                  </CropInput>
                  
                  <CropInput>
                    <label>Y Position:</label>
                    <input 
                      type="number" 
                      value={cropY} 
                      onChange={(e) => setCropY(parseInt(e.target.value))} 
                      min="0" 
                      max={originalHeight - cropHeight}
                    />
                  </CropInput>
                  
                  <CropInput>
                    <label>Width:</label>
                    <input 
                      type="number" 
                      value={cropWidth} 
                      onChange={(e) => setCropWidth(parseInt(e.target.value))} 
                      min="1" 
                      max={originalWidth - cropX}
                    />
                  </CropInput>
                  
                  <CropInput>
                    <label>Height:</label>
                    <input 
                      type="number" 
                      value={cropHeight} 
                      onChange={(e) => setCropHeight(parseInt(e.target.value))} 
                      min="1" 
                      max={originalHeight - cropY}
                    />
                  </CropInput>
                </CropSettingsContainer>
                
                <ActionButton 
                  onClick={cropImage} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Crop Image'}
                </ActionButton>
              </PreviewContainer>
            )}
          </InputSection>
          
          {croppedImage && (
            <OutputSection>
              <OutputTitle>Cropped Image</OutputTitle>
              <CroppedImageContainer>
                <CroppedImagePreview src={croppedImage} alt="Cropped" />
                <DownloadButton onClick={downloadCroppedImage}>
                  Download Cropped Image
                </DownloadButton>
              </CroppedImageContainer>
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

const CropSettingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const CropInput = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
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

const CroppedImageContainer = styled.div`
  text-align: center;
`;

const CroppedImagePreview = styled.img`
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

export default ImageCropper;
