import React, { useState, useRef } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaVolumeUp, FaPlay, FaPause, FaStop, FaSave } from 'react-icons/fa';

const AudioCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<number>(50);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressedAudio, setCompressedAudio] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string>('');
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAudioName(file.name.split('.')[0]);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setCompressedAudio(null);
    }
  };

  const compressAudio = () => {
    if (!selectedFile) return;
    
    setIsCompressing(true);
    
    // In a real implementation, we would use a server-side API or Web Audio API
    // For this demo, we'll simulate compression with a timeout
    setTimeout(() => {
      // Create a URL for the original file (in a real app, this would be the compressed file)
      const compressedUrl = audioUrl;
      setCompressedAudio(compressedUrl);
      setIsCompressing(false);
    }, 2000);
  };

  const downloadCompressedAudio = () => {
    if (!compressedAudio || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = compressedAudio;
    link.download = `compressed-${audioName}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  return (
    <Layout>
      <Head>
        <title>Audio Compressor | ToolsFree Online</title>
        <meta name="description" content="Compress audio files online for free. Reduce file size while maintaining quality. No registration required." />
        <meta name="keywords" content="audio compressor, compress audio, reduce audio size, audio compression tool" />
      </Head>

      <PageContainer>
        <PageTitle>Audio Compressor</PageTitle>

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
                
                {audioUrl && (
                  <AudioPlayerContainer>
                    <audio 
                      ref={audioRef}
                      src={audioUrl} 
                      onEnded={handleAudioEnded}
                      style={{ display: 'none' }}
                    />
                    <AudioControls>
                      <ControlButton onClick={togglePlayPause}>
                        {isPlaying ? <FaPause /> : <FaPlay />}
                      </ControlButton>
                      <ControlButton onClick={stopAudio}>
                        <FaStop />
                      </ControlButton>
                    </AudioControls>
                  </AudioPlayerContainer>
                )}
                
                <CompressionSettings>
                  <label>Compression Level: {compressionLevel}%</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="90" 
                    value={compressionLevel} 
                    onChange={(e) => setCompressionLevel(parseInt(e.target.value))} 
                  />
                  <CompressionHint>
                    Higher values = smaller file size, lower quality
                  </CompressionHint>
                </CompressionSettings>
                
                <ActionButton 
                  onClick={compressAudio} 
                  disabled={isCompressing}
                >
                  {isCompressing ? 'Compressing...' : 'Compress Audio'}
                </ActionButton>
              </SettingsContainer>
            )}
          </InputSection>
          
          {compressedAudio && (
            <OutputSection>
              <OutputTitle>Compressed Audio</OutputTitle>
              <CompressionResult>
                <ResultItem>
                  <ResultLabel>Original Size:</ResultLabel>
                  <ResultValue>{(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>Estimated Compressed Size:</ResultLabel>
                  <ResultValue>{((selectedFile?.size || 0) * (1 - compressionLevel / 100) / 1024 / 1024).toFixed(2)} MB</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>Compression Ratio:</ResultLabel>
                  <ResultValue>{compressionLevel}%</ResultValue>
                </ResultItem>
              </CompressionResult>
              <AudioPreview controls src={compressedAudio} />
              <DownloadButton onClick={downloadCompressedAudio}>
                <FaSave /> Download Compressed Audio
              </DownloadButton>
            </OutputSection>
          )}
        </ToolContainer>

        <DisclaimerText>
          Note: This is a demo version. In a real implementation, the compression would be performed on a server or using the Web Audio API.
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

const AudioPlayerContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const AudioControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const CompressionSettings = styled.div`
  margin-bottom: 1.5rem;
  
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

const CompressionHint = styled.p`
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

const CompressionResult = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultLabel = styled.span`
  font-weight: 500;
`;

const ResultValue = styled.span`
  font-family: monospace;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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

export default AudioCompressor;
