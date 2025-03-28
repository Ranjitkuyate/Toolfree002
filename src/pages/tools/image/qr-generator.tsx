import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaQrcode } from 'react-icons/fa';

const QRGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [size, setSize] = useState<number>(200);
  const [foregroundColor, setForegroundColor] = useState<string>('#000000');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const generateQRCode = () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    
    // Create QR code URL using Google Charts API
    const encodedText = encodeURIComponent(text);
    const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodedText}&chs=${size}x${size}&chco=${foregroundColor.substring(1)}&chf=bg,s,${backgroundColor.substring(1)}`;
    
    setQrCode(qrCodeUrl);
    setIsGenerating(false);
  };

  const downloadQRCode = () => {
    if (!qrCode) return;
    
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>QR Code Generator | ToolsFree Online</title>
        <meta name="description" content="Generate QR codes online for free. No registration required." />
        <meta name="keywords" content="qr code generator, create qr code, free qr code, qr code maker" />
      </Head>

      <PageContainer>
        <PageTitle>QR Code Generator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <InputSection>
            <InputGroup>
              <label>Text or URL:</label>
              <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Enter text or URL to encode in QR code"
                rows={4}
              />
            </InputGroup>
            
            <SettingsGrid>
              <InputGroup>
                <label>Size (px):</label>
                <input 
                  type="number" 
                  value={size} 
                  onChange={(e) => setSize(parseInt(e.target.value))} 
                  min="100" 
                  max="500" 
                  step="10"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Foreground Color:</label>
                <ColorInputContainer>
                  <ColorInput 
                    type="color" 
                    value={foregroundColor} 
                    onChange={(e) => setForegroundColor(e.target.value)} 
                  />
                  <ColorValue>{foregroundColor}</ColorValue>
                </ColorInputContainer>
              </InputGroup>
              
              <InputGroup>
                <label>Background Color:</label>
                <ColorInputContainer>
                  <ColorInput 
                    type="color" 
                    value={backgroundColor} 
                    onChange={(e) => setBackgroundColor(e.target.value)} 
                  />
                  <ColorValue>{backgroundColor}</ColorValue>
                </ColorInputContainer>
              </InputGroup>
            </SettingsGrid>
            
            <ActionButton 
              onClick={generateQRCode} 
              disabled={!text.trim() || isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate QR Code'}
            </ActionButton>
          </InputSection>
          
          {qrCode && (
            <OutputSection>
              <OutputTitle>Your QR Code</OutputTitle>
              <QRCodeContainer>
                <QRCodeImage src={qrCode} alt="QR Code" />
                <DownloadButton onClick={downloadQRCode}>
                  Download QR Code
                </DownloadButton>
              </QRCodeContainer>
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

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  textarea, input[type="number"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ColorInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const ColorInput = styled.input`
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const ColorValue = styled.span`
  font-family: monospace;
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

const QRCodeContainer = styled.div`
  text-align: center;
`;

const QRCodeImage = styled.img`
  max-width: 100%;
  margin-bottom: 1.5rem;
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

export default QRGenerator;
