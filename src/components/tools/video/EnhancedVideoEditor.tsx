import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const VideoEditor = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedVideoSrc, setProcessedVideoSrc] = useState<string>('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [watermarkText, setWatermarkText] = useState('');
  const [watermarkPosition, setWatermarkPosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('bottom-right');
  const [watermarkColor, setWatermarkColor] = useState('#ffffff');
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(100);
  const [currentTab, setCurrentTab] = useState<'trim' | 'watermark' | 'filters'>('trim');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const processedVideoRef = useRef<HTMLVideoElement>(null);
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file');
        return;
      }
      
      setSelectedFile(file);
      const videoUrl = URL.createObjectURL(file);
      setVideoSrc(videoUrl);
      setProcessedVideoSrc('');
    }
  };
  
  // Update video duration when video is loaded
  const handleVideoLoad = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      setVideoDuration(duration);
      setEndTime(duration);
    }
  };
  
  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Process video with selected options
  const processVideo = () => {
    if (!selectedFile || !videoRef.current) {
      alert('Please select a video file first');
      return;
    }
    
    setIsProcessing(true);
    
    // In a real implementation, this would use a video processing library
    // For this demo, we'll simulate processing with a timeout
    setTimeout(() => {
      // Create a canvas element to process the video
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        alert('Could not create canvas context');
        setIsProcessing(false);
        return;
      }
      
      // Set canvas dimensions to match video
      canvas.width = videoRef.current!.videoWidth;
      canvas.height = videoRef.current!.videoHeight;
      
      // Draw the current frame to the canvas
      ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
      
      // Apply filters
      if (brightness !== 100 || contrast !== 100 || saturation !== 100) {
        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
      }
      
      // Add watermark if specified
      if (watermarkText) {
        ctx.font = 'bold 24px Arial';
        ctx.fillStyle = watermarkColor;
        ctx.globalAlpha = 0.7;
        
        const textWidth = ctx.measureText(watermarkText).width;
        const padding = 20;
        
        let x = 0;
        let y = 0;
        
        switch (watermarkPosition) {
          case 'top-left':
            x = padding;
            y = padding + 24;
            break;
          case 'top-right':
            x = canvas.width - textWidth - padding;
            y = padding + 24;
            break;
          case 'bottom-left':
            x = padding;
            y = canvas.height - padding;
            break;
          case 'bottom-right':
            x = canvas.width - textWidth - padding;
            y = canvas.height - padding;
            break;
        }
        
        ctx.fillText(watermarkText, x, y);
        ctx.globalAlpha = 1.0;
      }
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/jpeg');
      
      // In a real implementation, we would process the entire video
      // For this demo, we'll just show a still frame with the applied effects
      setProcessedVideoSrc(dataUrl);
      setIsProcessing(false);
    }, 2000);
  };
  
  // Download processed video
  const downloadProcessedVideo = () => {
    if (!processedVideoSrc) {
      alert('Please process the video first');
      return;
    }
    
    // In a real implementation, this would download the actual processed video
    // For this demo, we'll just download the still frame
    const link = document.createElement('a');
    link.href = processedVideoSrc;
    link.download = `edited_${selectedFile?.name || 'video'}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Seek video to specific time
  const seekVideo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };
  
  return (
    <Container>
      <ToolHeader>
        <h1>Advanced Video Editor</h1>
        <p>Edit your videos with professional tools - trim, add watermarks, apply filters, and more</p>
      </ToolHeader>
      
      <ToolSection>
        <UploadContainer>
          <UploadLabel htmlFor="video-upload">
            <UploadIcon className="fas fa-cloud-upload-alt" />
            <UploadText>
              {selectedFile ? selectedFile.name : 'Select a video file to edit'}
            </UploadText>
            <UploadButton>Choose Video</UploadButton>
          </UploadLabel>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </UploadContainer>
        
        {videoSrc && (
          <VideoContainer>
            <VideoPreview>
              <video
                ref={videoRef}
                src={videoSrc}
                controls
                onLoadedMetadata={handleVideoLoad}
              />
            </VideoPreview>
            
            <EditorTabs>
              <TabButton 
                active={currentTab === 'trim'} 
                onClick={() => setCurrentTab('trim')}
              >
                <i className="fas fa-cut"></i> Trim
              </TabButton>
              <TabButton 
                active={currentTab === 'watermark'} 
                onClick={() => setCurrentTab('watermark')}
              >
                <i className="fas fa-copyright"></i> Watermark
              </TabButton>
              <TabButton 
                active={currentTab === 'filters'} 
                onClick={() => setCurrentTab('filters')}
              >
                <i className="fas fa-sliders-h"></i> Filters
              </TabButton>
            </EditorTabs>
            
            <EditorPanel>
              {currentTab === 'trim' && (
                <TrimPanel>
                  <h3>Trim Video</h3>
                  <p>Select the start and end points to trim your video</p>
                  
                  <TimelineContainer>
                    <Timeline>
                      <TimelineProgress style={{ width: `${(startTime / videoDuration) * 100}%` }} />
                      <TimelineProgress 
                        style={{ 
                          left: `${(startTime / videoDuration) * 100}%`,
                          width: `${((endTime - startTime) / videoDuration) * 100}%` 
                        }} 
                        selected 
                      />
                    </Timeline>
                    <TimeMarkers>
                      <TimeMarker>00:00</TimeMarker>
                      <TimeMarker>{formatTime(videoDuration / 2)}</TimeMarker>
                      <TimeMarker>{formatTime(videoDuration)}</TimeMarker>
                    </TimeMarkers>
                  </TimelineContainer>
                  
                  <TimeControls>
                    <TimeControl>
                      <label>Start Time:</label>
                      <TimeInput
                        type="range"
                        min="0"
                        max={videoDuration}
                        step="0.1"
                        value={startTime}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value < endTime) {
                            setStartTime(value);
                          }
                        }}
                      />
                      <TimeValue onClick={() => seekVideo(startTime)}>
                        {formatTime(startTime)}
                      </TimeValue>
                    </TimeControl>
                    
                    <TimeControl>
                      <label>End Time:</label>
                      <TimeInput
                        type="range"
                        min="0"
                        max={videoDuration}
                        step="0.1"
                        value={endTime}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value > startTime) {
                            setEndTime(value);
                          }
                        }}
                      />
                      <TimeValue onClick={() => seekVideo(endTime)}>
                        {formatTime(endTime)}
                      </TimeValue>
                    </TimeControl>
                  </TimeControls>
                </TrimPanel>
              )}
              
              {currentTab === 'watermark' && (
                <WatermarkPanel>
                  <h3>Add Watermark</h3>
                  <p>Add text watermark to protect your video</p>
                  
                  <FormGroup>
                    <label htmlFor="watermark-text">Watermark Text:</label>
                    <input
                      id="watermark-text"
                      type="text"
                      value={watermarkText}
                      onChange={(e) => setWatermarkText(e.target.value)}
                      placeholder="Enter watermark text"
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <label htmlFor="watermark-position">Position:</label>
                    <select
                      id="watermark-position"
                      value={watermarkPosition}
                      onChange={(e) => setWatermarkPosition(e.target.value as any)}
                    >
                      <option value="top-left">Top Left</option>
                      <option value="top-right">Top Right</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-right">Bottom Right</option>
                    </select>
                  </FormGroup>
                  
                  <FormGroup>
                    <label htmlFor="watermark-color">Color:</label>
                    <ColorPickerContainer>
                      <ColorPreview style={{ backgroundColor: watermarkColor }} />
                      <input
                        id="watermark-color"
                        type="color"
                        value={watermarkColor}
                        onChange={(e) => setWatermarkColor(e.target.value)}
                      />
                    </ColorPickerContainer>
                  </FormGroup>
                </WatermarkPanel>
              )}
              
              {currentTab === 'filters' && (
                <FiltersPanel>
                  <h3>Apply Filters</h3>
                  <p>Adjust video appearance with filters</p>
                  
                  <FilterControl>
                    <label htmlFor="brightness">Brightness: {brightness}%</label>
                    <FilterSlider
                      id="brightness"
                      type="range"
                      min="0"
                      max="200"
                      value={brightness}
                      onChange={(e) => setBrightness(parseInt(e.target.value))}
                    />
                  </FilterControl>
                  
                  <FilterControl>
                    <label htmlFor="contrast">Contrast: {contrast}%</label>
                    <FilterSlider
                      id="contrast"
                      type="range"
                      min="0"
                      max="200"
                      value={contrast}
                      onChange={(e) => setContrast(parseInt(e.target.value))}
                    />
                  </FilterControl>
                  
                  <FilterControl>
                    <label htmlFor="saturation">Saturation: {saturation}%</label>
                    <FilterSlider
                      id="saturation"
                      type="range"
                      min="0"
                      max="200"
                      value={saturation}
                      onChange={(e) => setSaturation(parseInt(e.target.value))}
                    />
                  </FilterControl>
                  
                  <FilterPresets>
                    <FilterPreset onClick={() => { setBrightness(100); setContrast(100); setSaturation(100); }}>
                      Normal
                    </FilterPreset>
                    <FilterPreset onClick={() => { setBrightness(120); setContrast(110); setSaturation(110); }}>
                      Vivid
                    </FilterPreset>
                    <FilterPreset onClick={() => { setBrightness(100); setContrast(120); setSaturation(0); }}>
                      B&W
                    </FilterPreset>
                    <FilterPreset onClick={() => { setBrightness(110); setContrast(90); setSaturation(130); }}>
                      Warm
                    </FilterPreset>
                    <FilterPreset onClick={() => { setBrightness(90); setContrast(110); setSaturation(80); }}>
                      Cool
                    </FilterPreset>
                  </FilterPresets>
                </FiltersPanel>
              )}
              
              <ButtonGroup>
                <PrimaryButton 
                  onClick={processVideo} 
                  disabled={!selectedFile || isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Process Video'}
                </PrimaryButton>
              </ButtonGroup>
            </EditorPanel>
          </VideoContainer>
        )}
        
        {processedVideoSrc && (
          <ResultContainer>
            <h3>Processed Result</h3>
            <ResultPreview>
              <img src={processedVideoSrc} alt="Processed video frame" />
            </ResultPreview>
            <DownloadButton onClick={downloadProcessedVideo}>
              <i className="fas fa-download"></i> Download Result
            </DownloadButton>
            <ResultNote>
              Note: This is a preview of the processed video. In a full implementation, the entire video would be processed.
            </ResultNote>
          </ResultContainer>
        )}
      </ToolSection>
      
      <ToolSection>
        <h2>Video Editing Features</h2>
        <p>
          Our advanced video editor provides professional editing capabilities right in your browser.
          No software installation required!
        </p>
        
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon className="fas fa-cut" />
            <FeatureTitle>Trim & Cut</FeatureTitle>
            <FeatureDescription>
              Remove unwanted sections from the beginning, middle, or end of your video
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-copyright" />
            <FeatureTitle>Watermarking</FeatureTitle>
            <FeatureDescription>
              Add text watermarks to protect your content and display your brand
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-sliders-h" />
            <FeatureTitle>Filters & Effects</FeatureTitle>
            <FeatureDescription>
              Enhance your videos with adjustable brightness, contrast, saturation, and preset filters
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-compress-arrows-alt" />
            <FeatureTitle>Compression</FeatureTitle>
            <FeatureDescription>
              Reduce file size while maintaining quality for easier sharing and uploading
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
        
        <h3>Tips for Better Videos</h3>
        <TipsList>
          <li>Keep your videos concise by trimming unnecessary footage</li>
          <li>Use subtle watermarks that don't distract from the content</li>
          <li>Apply filters sparingly to maintain a natural look</li>
          <li>Consider the platform where you'll share the video when choosing export settings</li>
          <li>Always preview your edits before finalizing</li>
        </TipsList>
      </ToolSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ToolHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
  }
`;

const ToolSection = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const UploadContainer = styled.div`
  margin-bottom: 2rem;
`;

const UploadLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-color);
    background-color: rgba(74, 108, 247, 0.05);
  }
`;

const UploadIcon = styled.i`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const UploadText = styled.div`
  margin-bottom: 1rem;
  text-align: center;
  word-break: break-word;
`;

const UploadButton = styled.div`
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
`;

const VideoContainer = styled.div`
  margin-bottom: 2rem;
`;

const VideoPreview = styled.div`
  margin-bottom: 1.5rem;
  
  video {
    width: 100%;
    border-radius: var(--border-radius);
    background-color: #000;
  }
`;

const EditorTabs = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
`;

const TabButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  color: ${props => props.active ? 'var(--primary-color)' : 'var(--text-color)'};
  border-bottom: 2px solid ${props => props.active ? 'var(--primary-color)' : 'transparent'};
  
  i {
    margin-right: 0.5rem;
  }
  
  &:hover {
    color: var(--primary-color);
  }
`;

const EditorPanel = styled.div`
  margin-bottom: 1.5rem;
`;

const TrimPanel = styled.div``;

const TimelineContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Timeline = styled.div`
  height: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  position: relative;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const TimelineProgress = styled.div<{ selected?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: ${props => props.selected ? 'var(--primary-color)' : '#ccc'};
`;

const TimeMarkers = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimeMarker = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const TimeControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TimeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  label {
    flex: 0 0 100px;
    font-weight: 500;
  }
`;

const TimeInput = styled.input`
  flex: 1;
`;

const TimeValue = styled.div`
  flex: 0 0 80px;
  text-align: center;
  background-color: #f0f0f0;
  padding: 0.3rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const WatermarkPanel = styled.div``;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ColorPreview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
`;

const FiltersPanel = styled.div``;

const FilterControl = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const FilterSlider = styled.input`
  width: 100%;
`;

const FilterPresets = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const FilterPreset = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
`;

const PrimaryButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
`;

const ResultPreview = styled.div`
  margin-bottom: 1.5rem;
  
  img {
    max-width: 100%;
    border-radius: var(--border-radius);
  }
`;

const DownloadButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  i {
    margin-right: 0.5rem;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const ResultNote = styled.div`
  font-style: italic;
  color: #666;
  font-size: 0.9rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FeatureCard = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.i`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0;
`;

const TipsList = styled.ul`
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

export default VideoEditor;
