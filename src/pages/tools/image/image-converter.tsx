import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';

const ImageConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('jpeg');
  const [quality, setQuality] = useState<number>(90);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
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
      setConvertedImage(null);
    }
  };

  const convertImage = () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        let mimeType = 'image/jpeg';
        if (outputFormat === 'png') mimeType = 'image/png';
        if (outputFormat === 'webp') mimeType = 'image/webp';
        
        const convertedDataUrl = canvas.toDataURL(mimeType, quality / 100);
        setConvertedImage(convertedDataUrl);
      }
      
      setIsProcessing(false);
    };
    img.src = previewUrl;
  };

  const downloadConvertedImage = () => {
    if (!convertedImage || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = convertedImage;
    
    // Get original filename without extension
    const originalName = selectedFile.name.split('.').slice(0, -1).join('.');
    link.download = `${originalName}.${outputFormat}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Image Converter | ToolsFree Online</title>
        <meta name="description" content="Convert images between different formats online for free. No registration required." />
        <meta name="keywords" content="image converter, convert image format, jpg to png, png to jpg, webp converter" />
      </Head>

      <PageContainer>
        <PageTitle>Image Converter</PageTitle>

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
                <SettingsContainer>
                  <FormatSelector>
                    <label>Output Format:</label>
                    <select 
                      value={outputFormat} 
                      onChange={(e) => setOutputFormat(e.target.value)}
                    >
                      <option value="jpeg">JPEG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </FormatSelector>
                  
                  {outputFormat === 'jpeg' && (
                    <QualitySelector>
                      <label>Quality: {quality}%</label>
                      <input 
                        type="range" 
                        min="10" 
                        max="100" 
                        value={quality} 
                        onChange={(e) => setQuality(parseInt(e.target.value))} 
                      />
                    </QualitySelector>
                  )}
                </SettingsContainer>
                
                <ActionButton 
                  onClick={convertImage} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Convert Image'}
                </ActionButton>
              </PreviewContainer>
            )}
          </InputSection>
          
          {convertedImage && (
            <OutputSection>
              <OutputTitle>Converted Image</OutputTitle>
              <ConvertedImageContainer>
                <ConvertedImagePreview src={convertedImage} alt="Converted" />
                <DownloadButton onClick={downloadConvertedImage}>
                  Download Converted Image
                </DownloadButton>
              </ConvertedImageContainer>
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

const SettingsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const FormatSelector = styled.div`
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

const QualitySelector = styled.div`
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

const ConvertedImageContainer = styled.div`
  text-align: center;
`;

const ConvertedImagePreview = styled.img`
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

export default ImageConverter;
