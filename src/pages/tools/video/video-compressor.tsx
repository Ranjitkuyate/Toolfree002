import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaVideo, FaDownload, FaLink } from 'react-icons/fa';

const VideoCompressor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<number>(50);
  const [outputFormat, setOutputFormat] = useState<string>('mp4');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [compressedVideo, setCompressedVideo] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVideoName(file.name.split('.')[0]);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setCompressedVideo(null);
    }
  };

  const compressVideo = () => {
    if (!selectedFile) return;
    
    setIsCompressing(true);
    
    // In a real implementation, we would use a server-side API or Web Assembly
    // For this demo, we'll simulate compression with a timeout
    setTimeout(() => {
      // Create a URL for the original file (in a real app, this would be the compressed file)
      const compressedUrl = videoUrl;
      setCompressedVideo(compressedUrl);
      setIsCompressing(false);
    }, 3000);
  };

  const downloadCompressedVideo = () => {
    if (!compressedVideo || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = compressedVideo;
    link.download = `compressed-${videoName}.${outputFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Video Compressor | ToolsFree Online</title>
        <meta name="description" content="Compress videos online for free. Reduce file size while maintaining quality. No registration required." />
        <meta name="keywords" content="video compressor, compress video, reduce video size, video compression tool" />
      </Head>

      <PageContainer>
        <PageTitle>Video Compressor</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <InputSection>
            <FileInputLabel>
              <FileInput 
                type="file" 
                accept="video/*" 
                onChange={handleFileChange} 
              />
              Choose Video File
            </FileInputLabel>
            
            {selectedFile && (
              <SettingsContainer>
                <FileInfo>
                  <FileIcon><FaVideo /></FileIcon>
                  <FileDetails>
                    <FileName>{selectedFile.name}</FileName>
                    <FileSize>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</FileSize>
                  </FileDetails>
                </FileInfo>
                
                {videoUrl && (
                  <VideoPreviewContainer>
                    <VideoPreview controls src={videoUrl} />
                  </VideoPreviewContainer>
                )}
                
                <CompressionSettings>
                  <SettingGroup>
                    <label>Compression Level: {compressionLevel}%</label>
                    <input 
                      type="range" 
                      min="10" 
                      max="90" 
                      value={compressionLevel} 
                      onChange={(e) => setCompressionLevel(parseInt(e.target.value))} 
                    />
                    <SettingHint>
                      Higher values = smaller file size, lower quality
                    </SettingHint>
                  </SettingGroup>
                  
                  <SettingGroup>
                    <label>Output Format:</label>
                    <select 
                      value={outputFormat} 
                      onChange={(e) => setOutputFormat(e.target.value)}
                    >
                      <option value="mp4">MP4</option>
                      <option value="webm">WebM</option>
                      <option value="mov">MOV</option>
                    </select>
                  </SettingGroup>
                </CompressionSettings>
                
                <ActionButton 
                  onClick={compressVideo} 
                  disabled={isCompressing}
                >
                  {isCompressing ? 'Compressing...' : 'Compress Video'}
                </ActionButton>
              </SettingsContainer>
            )}
          </InputSection>
          
          {compressedVideo && (
            <OutputSection>
              <OutputTitle>Compressed Video</OutputTitle>
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
              <VideoPreviewContainer>
                <VideoPreview controls src={compressedVideo} />
              </VideoPreviewContainer>
              <DownloadButton onClick={downloadCompressedVideo}>
                <FaDownload /> Download Compressed Video
              </DownloadButton>
            </OutputSection>
          )}
        </ToolContainer>

        <DisclaimerText>
          Note: This is a demo version. In a real implementation, the compression would be performed on a server.
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

const VideoPreviewContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const VideoPreview = styled.video`
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const CompressionSettings = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SettingGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input[type="range"] {
    width: 100%;
    margin-bottom: 0.5rem;
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

const SettingHint = styled.p`
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

export default VideoCompressor;
