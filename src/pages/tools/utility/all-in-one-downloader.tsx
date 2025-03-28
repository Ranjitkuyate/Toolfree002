import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaDownload, FaLink, FaYoutube, FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa';

const AllInOneDownloader: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [platform, setPlatform] = useState<string>('youtube');
  const [format, setFormat] = useState<string>('mp4');
  const [quality, setQuality] = useState<string>('high');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadResult, setDownloadResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const platforms = [
    { id: 'youtube', name: 'YouTube', icon: <FaYoutube />, formats: ['mp4', 'mp3', 'thumbnail'] },
    { id: 'instagram', name: 'Instagram', icon: <FaInstagram />, formats: ['mp4', 'jpg'] },
    { id: 'facebook', name: 'Facebook', icon: <FaFacebook />, formats: ['mp4', 'jpg'] },
    { id: 'pinterest', name: 'Pinterest', icon: <FaPinterest />, formats: ['jpg', 'mp4'] },
  ];

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlatform = e.target.value;
    setPlatform(selectedPlatform);
    
    // Set default format based on platform
    const platformData = platforms.find(p => p.id === selectedPlatform);
    if (platformData && platformData.formats.length > 0) {
      setFormat(platformData.formats[0]);
    }
  };

  const validateUrl = (url: string, platform: string): boolean => {
    if (!url) return false;
    
    const patterns: {[key: string]: RegExp} = {
      youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
      instagram: /^(https?:\/\/)?(www\.)?(instagram\.com)\/.+/,
      facebook: /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.com)\/.+/,
      pinterest: /^(https?:\/\/)?(www\.)?(pinterest\.com)\/.+/,
    };
    
    return patterns[platform] ? patterns[platform].test(url) : false;
  };

  const handleDownload = () => {
    // Reset previous results
    setError(null);
    setDownloadResult(null);
    
    // Validate URL
    if (!validateUrl(url, platform)) {
      setError(`Invalid ${platforms.find(p => p.id === platform)?.name} URL. Please enter a valid URL.`);
      return;
    }
    
    setIsDownloading(true);
    
    // In a real implementation, we would call a server-side API
    // For this demo, we'll simulate a download with a timeout
    setTimeout(() => {
      setIsDownloading(false);
      
      // Simulate successful download
      const platformName = platforms.find(p => p.id === platform)?.name;
      const fileName = `${platformName}_download_${Date.now()}.${format}`;
      
      setDownloadResult(fileName);
    }, 2000);
  };

  const handleDownloadClick = () => {
    // In a real implementation, this would trigger the actual file download
    // For this demo, we'll just show an alert
    alert(`In a real implementation, this would download the file: ${downloadResult}`);
  };

  return (
    <Layout>
      <Head>
        <title>All-in-One Downloader | ToolsFree Online</title>
        <meta name="description" content="Download videos, images, and more from YouTube, Instagram, Facebook, Pinterest, and other platforms." />
        <meta name="keywords" content="video downloader, YouTube downloader, Instagram downloader, Facebook downloader, Pinterest downloader" />
      </Head>

      <PageContainer>
        <PageTitle>All-in-One Downloader</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <DownloaderSection>
            <PlatformSelector>
              {platforms.map(p => (
                <PlatformOption 
                  key={p.id}
                  active={platform === p.id} 
                  onClick={() => {
                    setPlatform(p.id);
                    if (p.formats.length > 0) {
                      setFormat(p.formats[0]);
                    }
                  }}
                >
                  <PlatformIcon>{p.icon}</PlatformIcon>
                  <PlatformName>{p.name}</PlatformName>
                </PlatformOption>
              ))}
            </PlatformSelector>
            
            <InputGroup>
              <label>Enter URL:</label>
              <input 
                type="url" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)} 
                placeholder={`Enter ${platforms.find(p => p.id === platform)?.name} URL`}
              />
            </InputGroup>
            
            <OptionsContainer>
              <InputGroup>
                <label>Format:</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                >
                  {platforms.find(p => p.id === platform)?.formats.map(f => (
                    <option key={f} value={f}>{f.toUpperCase()}</option>
                  ))}
                </select>
              </InputGroup>
              
              {(platform === 'youtube' && format === 'mp4') && (
                <InputGroup>
                  <label>Quality:</label>
                  <select 
                    value={quality} 
                    onChange={(e) => setQuality(e.target.value)}
                  >
                    <option value="high">High (1080p)</option>
                    <option value="medium">Medium (720p)</option>
                    <option value="low">Low (480p)</option>
                  </select>
                </InputGroup>
              )}
            </OptionsContainer>
            
            <DownloadButton 
              onClick={handleDownload} 
              disabled={isDownloading}
            >
              {isDownloading ? 'Processing...' : 'Start Download'}
            </DownloadButton>
            
            {error && (
              <ErrorMessage>{error}</ErrorMessage>
            )}
            
            {downloadResult && (
              <ResultContainer>
                <ResultTitle>Download Ready!</ResultTitle>
                <ResultFileName>{downloadResult}</ResultFileName>
                <ResultDownloadButton onClick={handleDownloadClick}>
                  <FaDownload /> Download Now
                </ResultDownloadButton>
              </ResultContainer>
            )}
          </DownloaderSection>
        </ToolContainer>

        <InstructionsContainer>
          <InstructionsTitle>How to Use</InstructionsTitle>
          <InstructionsList>
            <InstructionItem>
              <InstructionNumber>1</InstructionNumber>
              <InstructionText>Select the platform (YouTube, Instagram, Facebook, or Pinterest)</InstructionText>
            </InstructionItem>
            <InstructionItem>
              <InstructionNumber>2</InstructionNumber>
              <InstructionText>Copy and paste the URL of the video, image, or content you want to download</InstructionText>
            </InstructionItem>
            <InstructionItem>
              <InstructionNumber>3</InstructionNumber>
              <InstructionText>Choose your preferred format and quality options</InstructionText>
            </InstructionItem>
            <InstructionItem>
              <InstructionNumber>4</InstructionNumber>
              <InstructionText>Click "Start Download" and wait for processing to complete</InstructionText>
            </InstructionItem>
            <InstructionItem>
              <InstructionNumber>5</InstructionNumber>
              <InstructionText>Click "Download Now" when your file is ready</InstructionText>
            </InstructionItem>
          </InstructionsList>
        </InstructionsContainer>

        <DisclaimerContainer>
          <DisclaimerTitle>Important Notice</DisclaimerTitle>
          <DisclaimerText>
            This tool is provided for personal use only. Please respect copyright laws and terms of service for each platform. 
            Do not download copyrighted content without permission. We are not responsible for how you use the downloaded content.
          </DisclaimerText>
        </DisclaimerContainer>

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

const DownloaderSection = styled.div`
  padding: 2rem;
`;

const PlatformSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

interface PlatformOptionProps {
  active: boolean;
}

const PlatformOption = styled.div<PlatformOptionProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.active ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.3s;
  min-width: 100px;
  
  &:hover {
    background-color: ${props => props.active ? '#3a80d2' : '#e5e5e5'};
  }
`;

const PlatformIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const PlatformName = styled.div`
  font-weight: 500;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, select {
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

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DownloadButton = styled.button`
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

const ErrorMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #ffebee;
  color: #c62828;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #e8f5e9;
  border-radius: 4px;
  text-align: center;
`;

const ResultTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #2e7d32;
  margin-bottom: 0.5rem;
`;

const ResultFileName = styled.div`
  font-family: monospace;
  padding: 0.5rem;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const ResultDownloadButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  
  &:hover {
    background-color: #3d9140;
  }
`;

const InstructionsContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InstructionsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const InstructionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InstructionItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const InstructionNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background-color: #4a90e2;
  color: white;
  border-radius: 50%;
  font-weight: 500;
  flex-shrink: 0;
`;

const InstructionText = styled.div`
  color: #666;
  line-height: 1.5;
  padding-top: 0.25rem;
`;

const DisclaimerContainer = styled.div`
  background-color: #fff8e1;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const DisclaimerTitle = styled.h3`
  font-size: 1.1rem;
  color: #f57c00;
  margin-bottom: 0.75rem;
`;

const DisclaimerText = styled.p`
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
`;

export default AllInOneDownloader;
