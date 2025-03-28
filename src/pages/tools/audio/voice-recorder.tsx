import React, { useState, useRef } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaVolumeUp, FaMicrophone, FaStop, FaSave } from 'react-icons/fa';

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingTime, setRecordingTime] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Error accessing microphone. Please make sure you have granted permission to use the microphone.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      // Stop all tracks on the stream
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const downloadRecording = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = `recording-${new Date().toISOString()}.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Voice Recorder | ToolsFree Online</title>
        <meta name="description" content="Record your voice online for free. No registration required." />
        <meta name="keywords" content="voice recorder, audio recorder, online recorder, free voice recorder" />
      </Head>

      <PageContainer>
        <PageTitle>Voice Recorder</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <RecorderSection>
            <RecorderVisual>
              {isRecording ? (
                <RecordingAnimation>
                  <RecordingWave />
                </RecordingAnimation>
              ) : (
                <RecordingPlaceholder>
                  <FaMicrophone />
                  <PlaceholderText>Click Record to start</PlaceholderText>
                </RecordingPlaceholder>
              )}
            </RecorderVisual>
            
            <RecordingTimer>
              {formatTime(recordingTime)}
            </RecordingTimer>
            
            <RecorderControls>
              {!isRecording ? (
                <RecordButton onClick={startRecording}>
                  <FaMicrophone /> Record
                </RecordButton>
              ) : (
                <StopButton onClick={stopRecording}>
                  <FaStop /> Stop
                </StopButton>
              )}
            </RecorderControls>
          </RecorderSection>
          
          {audioUrl && (
            <OutputSection>
              <OutputTitle>Recorded Audio</OutputTitle>
              <audio 
                ref={audioRef}
                src={audioUrl} 
                onEnded={handleAudioEnded}
                style={{ display: 'none' }}
              />
              <AudioPlayerContainer>
                <PlayButton onClick={handlePlayPause}>
                  {isPlaying ? <FaStop /> : <FaVolumeUp />}
                  {isPlaying ? 'Stop' : 'Play'}
                </PlayButton>
                <DownloadButton onClick={downloadRecording}>
                  <FaSave /> Download
                </DownloadButton>
              </AudioPlayerContainer>
            </OutputSection>
          )}
        </ToolContainer>

        <PermissionNote>
          Note: This tool requires microphone access. Please allow microphone permissions when prompted.
        </PermissionNote>

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

const RecorderSection = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecorderVisual = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

const RecordingAnimation = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const RecordingWave = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(74, 144, 226, 0.1) 0%,
    rgba(74, 144, 226, 0.3) 25%,
    rgba(74, 144, 226, 0.5) 50%,
    rgba(74, 144, 226, 0.3) 75%,
    rgba(74, 144, 226, 0.1) 100%
  );
  animation: wave 1.5s ease-in-out infinite;
  
  @keyframes wave {
    0% {
      transform: scaleY(0.5);
    }
    50% {
      transform: scaleY(1);
    }
    100% {
      transform: scaleY(0.5);
    }
  }
`;

const RecordingPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #999;
  font-size: 3rem;
`;

const PlaceholderText = styled.p`
  font-size: 1rem;
`;

const RecordingTimer = styled.div`
  font-size: 2rem;
  font-weight: 500;
  font-family: monospace;
  margin-bottom: 1.5rem;
`;

const RecorderControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const RecordButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const StopButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  
  &:hover {
    background-color: #2980b9;
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

const AudioPlayerContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const PlayButton = styled.button`
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

const PermissionNote = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

export default VoiceRecorder;
