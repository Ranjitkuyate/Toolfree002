import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaVideo, FaCut, FaTrash, FaDownload } from 'react-icons/fa';

const VideoEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [trimStart, setTrimStart] = useState<string>('0');
  const [trimEnd, setTrimEnd] = useState<string>('10');
  const [removeWatermark, setRemoveWatermark] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [editedVideo, setEditedVideo] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string>('');
  const [videoDuration, setVideoDuration] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setVideoName(file.name.split('.')[0]);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setEditedVideo(null);
    }
  };

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement;
    setVideoDuration(video.duration);
    setTrimEnd(video.duration.toFixed(1));
  };

  const processVideo = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    // In a real implementation, we would use a server-side API or Web Assembly
    // For this demo, we'll simulate processing with a timeout
    setTimeout(() => {
      // Create a URL for the original file (in a real app, this would be the processed file)
      const processedUrl = videoUrl;
      setEditedVideo(processedUrl);
      setIsProcessing(false);
    }, 3000);
  };

  const downloadEditedVideo = () => {
    if (!editedVideo || !selectedFile) return;
    
    const link = document.createElement('a');
    link.href = editedVideo;
    link.download = `${videoName}_edited.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <Head>
        <title>Video Editor | ToolsFree Online</title>
        <meta name="description" content="Edit videos online for free. Trim videos, remove watermarks, and more." />
        <meta name="keywords" content="video editor, trim video, remove watermark, online video editor, free video editor" />
      </Head>

      <PageContainer>
        <PageTitle>Video Editor</PageTitle>

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
                      onLoadedMetadata={handleVideoLoad}
                    />
                  </VideoPreviewContainer>
                )}
                
                <EditingOptions>
                  <OptionTitle>Editing Options</OptionTitle>
                  
                  <OptionGroup>
                    <OptionLabel>
                      <OptionIcon><FaCut /></OptionIcon>
                      Trim Video
                    </OptionLabel>
                    <TrimControls>
                      <TrimInput>
                        <label>Start (seconds):</label>
                        <input 
                          type="number" 
                          min="0" 
                          max={videoDuration} 
                          step="0.1" 
                          value={trimStart} 
                          onChange={(e) => setTrimStart(e.target.value)}
                        />
                      </TrimInput>
                      <TrimInput>
                        <label>End (seconds):</label>
                        <input 
                          type="number" 
                          min={parseFloat(trimStart) + 0.1} 
                          max={videoDuration} 
                          step="0.1" 
                          value={trimEnd} 
                          onChange={(e) => setTrimEnd(e.target.value)}
                        />
                      </TrimInput>
                    </TrimControls>
                  </OptionGroup>
                  
                  <OptionGroup>
                    <OptionCheckbox>
                      <input 
                        type="checkbox" 
                        checked={removeWatermark} 
                        onChange={() => setRemoveWatermark(!removeWatermark)} 
                        id="watermark"
                      />
                      <OptionLabel htmlFor="watermark">
                        <OptionIcon><FaTrash /></OptionIcon>
                        Remove Watermark
                      </OptionLabel>
                    </OptionCheckbox>
                    <WatermarkNote>
                      Note: Watermark removal works best with simple, static watermarks.
                    </WatermarkNote>
                  </OptionGroup>
                </EditingOptions>
                
                <ActionButton 
                  onClick={processVideo} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process Video'}
                </ActionButton>
              </SettingsContainer>
            )}
          </InputSection>
          
          {editedVideo && (
            <OutputSection>
              <OutputTitle>Edited Video</OutputTitle>
              <ProcessingSummary>
                <SummaryItem>
                  <SummaryLabel>Trim:</SummaryLabel>
                  <SummaryValue>From {trimStart}s to {trimEnd}s</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Watermark Removal:</SummaryLabel>
                  <SummaryValue>{removeWatermark ? 'Applied' : 'Not Applied'}</SummaryValue>
                </SummaryItem>
              </ProcessingSummary>
              <VideoPreviewContainer>
                <VideoPreview controls src={editedVideo} />
              </VideoPreviewContainer>
              <DownloadButton onClick={downloadEditedVideo}>
                <FaDownload /> Download Edited Video
              </DownloadButton>
            </OutputSection>
          )}
        </ToolContainer>

        <FeaturesContainer>
          <FeaturesTitle>Features</FeaturesTitle>
          <FeaturesList>
            <FeatureItem>
              <FeatureTitle>Trim Video</FeatureTitle>
              <FeatureDescription>
                Cut your video to the exact length you need by specifying start and end times.
              </FeatureDescription>
            </FeatureItem>
            <FeatureItem>
              <FeatureTitle>Remove Watermarks</FeatureTitle>
              <FeatureDescription>
                Remove unwanted watermarks from your videos with our advanced processing algorithm.
              </FeatureDescription>
            </FeatureItem>
            <FeatureItem>
              <FeatureTitle>Fast Processing</FeatureTitle>
              <FeatureDescription>
                Our optimized processing engine ensures quick editing without compromising quality.
              </FeatureDescription>
            </FeatureItem>
          </FeaturesList>
        </FeaturesContainer>

        <DisclaimerText>
          Note: This is a demo version. In a real implementation, the processing would be performed on a server.
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

const EditingOptions = styled.div`
  margin-bottom: 1.5rem;
`;

const OptionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const OptionGroup = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  cursor: pointer;
`;

const OptionIcon = styled.span`
  color: #4a90e2;
`;

const TrimControls = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const TrimInput = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
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

const OptionCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
`;

const WatermarkNote = styled.div`
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.5rem;
  margin-left: 1.5rem;
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

const ProcessingSummary = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const SummaryItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryLabel = styled.span`
  font-weight: 500;
  width: 150px;
`;

const SummaryValue = styled.span``;

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

const FeaturesContainer = styled.div`
  margin-bottom: 2rem;
`;

const FeaturesTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const FeatureItem = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.75rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.5;
`;

const DisclaimerText = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

export default VideoEditor;
