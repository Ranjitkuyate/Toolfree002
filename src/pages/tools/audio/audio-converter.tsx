import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaVolumeUp } from 'react-icons/fa';

const AudioConverter: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>('mp3');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertedAudio, setConvertedAudio] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAudioName(file.name.split('.')[0]);
      setConvertedAudio(null);
    }
  };

  const convertAudio = () => {
    if (!selectedFile) return;
    
    setIsConverting(true);
    
    // In a real implementation, we would use a server-side API or Web Audio API
    // For this demo, we'll simulate conversion with a timeout
    setTimeout(() => {
      // Create a URL for the original file (in a real app, this would be the converted file)
      const audioUrl = URL.createObjectURL(selectedFile);
      setConvertedAudio(audioUrl);
      setIsConverting(false);
    }, 2000);
  };

  const downloadConvertedAudio = () => {
    if (!convertedAudio || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = convertedAudio;
    link.download = `${audioName}.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Audio Converter | ToolsFree Online</title>
        <meta name="description" content="Convert audio files between different formats online for free. No registration required." />
        <meta name="keywords" content="audio converter, convert audio, mp3 converter, wav converter, audio format converter" />
      </Head>

      <PageContainer>
        <PageTitle>Audio Converter</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <InputSection>
            <FileInputLabel>
              <FileInput 
                type="file" 
                accept="audio/*" 
                onChange={handleFileChange} 
              />
              Choose Audio File
            </FileInputLabel>
            
            {selectedFile && (
              <SettingsContainer>
                <FileInfo>
                  <FileIcon><FaVolumeUp /></FileIcon>
                  <FileDetails>
                    <FileName>{selectedFile.name}</FileName>
                    <FileSize>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</FileSize>
                  </FileDetails>
                </FileInfo>
                
                <FormatSelector>
                  <label>Output Format:</label>
                  <select 
                    value={outputFormat} 
                    onChange={(e) => setOutputFormat(e.target.value)}
                  >
                    <option value="mp3">MP3</option>
                    <option value="wav">WAV</option>
                    <option value="ogg">OGG</option>
                    <option value="aac">AAC</option>
                    <option value="flac">FLAC</option>
                  </select>
                </FormatSelector>
                
                <ActionButton 
                  onClick={convertAudio} 
                  disabled={isConverting}
                >
                  {isConverting ? 'Converting...' : 'Convert Audio'}
                </ActionButton>
              </SettingsContainer>
            )}
          </InputSection>
          
          {convertedAudio && (
            <OutputSection>
              <OutputTitle>Converted Audio</OutputTitle>
              <AudioPreview controls src={convertedAudio} />
              <DownloadButton onClick={downloadConvertedAudio}>
                Download Converted Audio
              </DownloadButton>
            </OutputSection>
          )}
        </ToolContainer>

        <DisclaimerText>
          Note: This is a demo version. In a real implementation, the conversion would be performed on a server or using the Web Audio API.
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

const SettingsContainer = styled.div`
  margin-top: 2rem;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const FileIcon = styled.div`
  font-size: 2rem;
  color: #4a90e2;
`;

const FileDetails = styled.div``;

const FileName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const FileSize = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

const FormatSelector = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
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

const AudioPreview = styled.audio`
  width: 100%;
  margin-bottom: 1.5rem;
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

export default AudioConverter;
