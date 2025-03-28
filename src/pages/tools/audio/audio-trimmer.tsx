import React, { useState, useRef } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaVolumeUp, FaPlay, FaPause, FaStop, FaSave, FaCut } from 'react-icons/fa';

const AudioTrimmer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isTrimming, setIsTrimming] = useState<boolean>(false);
  const [trimmedAudio, setTrimmedAudio] = useState<string | null>(null);
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
      setTrimmedAudio(null);
      setStartTime(0);
      
      // Reset audio player
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const audioDuration = audioRef.current.duration;
      setDuration(audioDuration);
      setEndTime(audioDuration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const trimAudio = () => {
    if (!selectedFile || !audioUrl) return;
    
    setIsTrimming(true);
    
    // In a real implementation, we would use a server-side API or Web Audio API
    // For this demo, we'll simulate trimming with a timeout
    setTimeout(() => {
      // Create a URL for the original file (in a real app, this would be the trimmed file)
      setTrimmedAudio(audioUrl);
      setIsTrimming(false);
    }, 2000);
  };

  const downloadTrimmedAudio = () => {
    if (!trimmedAudio || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = trimmedAudio;
    link.download = `trimmed-${audioName}.mp3`;
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
        <title>Audio Trimmer | ToolsFree Online</title>
        <meta name="description" content="Trim audio files online for free. Cut unwanted parts from your audio. No registration required." />
        <meta name="keywords" content="audio trimmer, trim audio, cut audio, audio cutter, mp3 trimmer" />
      </Head>

      <PageContainer>
        <PageTitle>Audio Trimmer</PageTitle>

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
                      onLoadedMetadata={handleLoadedMetadata}
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
                    <AudioWaveform>
                      <WaveformPlaceholder />
                    </AudioWaveform>
                  </AudioPlayerContainer>
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
                  onClick={trimAudio} 
                  disabled={isTrimming}
                >
                  {isTrimming ? 'Trimming...' : <><FaCut /> Trim Audio</>}
                </ActionButton>
              </SettingsContainer>
            )}
          </InputSection>
          
          {trimmedAudio && (
            <OutputSection>
              <OutputTitle>Trimmed Audio</OutputTitle>
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
              <AudioPreview controls src={trimmedAudio} />
              <DownloadButton onClick={downloadTrimmedAudio}>
                <FaSave /> Download Trimmed Audio
              </DownloadButton>
            </OutputSection>
          )}
        </ToolContainer>

        <DisclaimerText>
          Note: This is a demo version. In a real implementation, the trimming would be performed on a server or using the Web Audio API.
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
  margin-bottom: 1rem;
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

const AudioWaveform = styled.div`
  width: 100%;
  height: 80px;
  background-color: #f5f5f5;
  border-radius: 4px;
  overflow: hidden;
`;

const WaveformPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    90deg,
    rgba(74, 144, 226, 0.3) 25%,
    rgba(74, 144, 226, 0.6) 37%,
    rgba(74, 144, 226, 0.3) 63%
  );
  background-size: 400% 100%;
  animation: waveform-animation 1.5s ease infinite;
  
  @keyframes waveform-animation {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
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

export default AudioTrimmer;
