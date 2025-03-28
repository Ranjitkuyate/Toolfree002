import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaVideo, FaDownload, FaLink, FaCut } from 'react-icons/fa';

const VideoTrimmer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isTrimming, setIsTrimming] = useState<boolean>(false);
  const [trimmedVideo, setTrimmedVideo] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVideoName(file.name.split('.')[0]);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setTrimmedVideo(null);
      setStartTime(0);
    }
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const videoDuration = e.currentTarget.duration;
    setDuration(videoDuration);
    setEndTime(videoDuration);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const trimVideo = () => {
    if (!selectedFile || !videoUrl) return;
    
    setIsTrimming(true);
    
    // In a real implementation, we would use a server-side API or Web Assembly
    // For this demo, we'll simulate trimming with a timeout
    setTimeout(() => {
      // Create a URL for the original file (in a real app, this would be the trimmed file)
      setTrimmedVideo(videoUrl);
      setIsTrimming(false);
    }, 3000);
  };

  const downloadTrimmedVideo = () => {
    if (!trimmedVideo || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = trimmedVideo;
    link.download = `trimmed-${videoName}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Video Trimmer | ToolsFree Online</title>
        <meta name="description" content="Trim videos online for free. Cut unwanted parts from your videos. No registration required." />
        <meta name="keywords" content="video trimmer, trim video, cut video, video cutter, mp4 trimmer" />
      </Head>

      <PageContainer>
        <PageTitle>Video Trimmer</PageTitle>

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
                    <VideoPreview 
                      controls 
                      src={videoUrl} 
                      onLoadedMetadata={handleLoadedMetadata}
                    />
                  </VideoPreviewContainer>
                )}
                
                <TrimSettings>
                  <TimeRangeContainer>
                    <TimeRangeLabel>Start Time: {formatTime(startTime)}</TimeRangeLabel>
                    <input 
                      type="range" 
                      min="0" 
                      max={duration} 
                      step="0.1"
                      value={startTime} 
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value < endTime) {
                          setStartTime(value);
                        }
                      }} 
                    />
                  </TimeRangeContainer>
                  
                  <TimeRangeContainer>
                    <TimeRangeLabel>End Time: {formatTime(endTime)}</TimeRangeLabel>
                    <input 
                      type="range" 
                      min="0" 
                      max={duration} 
                      step="0.1"
                      value={endTime} 
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        if (value > startTime) {
                          setEndTime(value);
                        }
                      }} 
                    />
                  </TimeRangeContainer>
                  
                  <SelectedRange>
                    Selected: {formatTime(startTime)} - {formatTime(endTime)} (Duration: {formatTime(endTime - startTime)})
                  </SelectedRange>
                </TrimSettings>
                
                <ActionButton 
                  onClick={trimVideo} 
                  disabled={isTrimming}
                >
                  {isTrimming ? 'Trimming...' : <><FaCut /> Trim Video</>}
                </ActionButton>
              </SettingsContainer>
            )}
          </InputSection>
          
          {trimmedVideo && (
            <OutputSection>
              <OutputTitle>Trimmed Video</OutputTitle>
              <TrimResult>
                <ResultItem>
                  <ResultLabel>Original Duration:</ResultLabel>
                  <ResultValue>{formatTime(duration)}</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>Trimmed Duration:</ResultLabel>
                  <ResultValue>{formatTime(endTime - startTime)}</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>Trimmed Range:</ResultLabel>
                  <ResultValue>{formatTime(startTime)} - {formatTime(endTime)}</ResultValue>
                </ResultItem>
              </TrimResult>
              <VideoPreviewContainer>
                <VideoPreview controls src={trimmedVideo} />
              </VideoPreviewContainer>
              <DownloadButton onClick={downloadTrimmedVideo}>
                <FaDownload /> Download Trimmed Video
              </DownloadButton>
            </OutputSection>
          )}
        </ToolContainer>

        <DisclaimerText>
          Note: This is a demo version. In a real implementation, the trimming would be performed on a server.
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

const TrimSettings = styled.div`
  margin-bottom: 1.5rem;
`;

const TimeRangeContainer = styled.div`
  margin-bottom: 1rem;
`;

const TimeRangeLabel = styled.div`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const SelectedRange = styled.div`
  font-weight: 500;
  color: #4a90e2;
  margin-top: 1rem;
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
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

const TrimResult = styled.div`
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

export default VideoTrimmer;
