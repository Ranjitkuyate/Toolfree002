import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload, FaDownload, FaVideo, FaCut, FaVolumeUp, FaImage, FaFilter } from 'react-icons/fa';

const VideoEditor: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('trim');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const videoUrl = URL.createObjectURL(file);
      setPreview(videoUrl);
    }
  };

  const handleExport = () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    
    // Simulate export process
    setTimeout(() => {
      setIsProcessing(false);
      alert('Video exported successfully! (This is a simulation)');
    }, 2000);
  };

  return (
    <EditorContainer>
      <UploadSection>
        <UploadLabel htmlFor="video-upload">
          <FaUpload />
          <span>Select Video</span>
        </UploadLabel>
        <UploadInput 
          id="video-upload" 
          type="file" 
          accept="video/*" 
          onChange={handleFileChange} 
        />
        
        {selectedFile && (
          <FileInfo>
            <FaVideo />
            <FileName>{selectedFile.name}</FileName>
            <FileSize>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</FileSize>
          </FileInfo>
        )}
      </UploadSection>
      
      {preview && (
        <>
          <PreviewSection>
            <VideoPreview controls src={preview} />
          </PreviewSection>
          
          <EditorTabs>
            <TabButton 
              active={activeTab === 'trim'} 
              onClick={() => setActiveTab('trim')}
            >
              <FaCut />
              <span>Trim</span>
            </TabButton>
            <TabButton 
              active={activeTab === 'audio'} 
              onClick={() => setActiveTab('audio')}
            >
              <FaVolumeUp />
              <span>Audio</span>
            </TabButton>
            <TabButton 
              active={activeTab === 'filters'} 
              onClick={() => setActiveTab('filters')}
            >
              <FaFilter />
              <span>Filters</span>
            </TabButton>
            <TabButton 
              active={activeTab === 'thumbnail'} 
              onClick={() => setActiveTab('thumbnail')}
            >
              <FaImage />
              <span>Thumbnail</span>
            </TabButton>
          </EditorTabs>
          
          <TabContent>
            {activeTab === 'trim' && (
              <TrimControls>
                <RangeLabel>Start Time: 00:00</RangeLabel>
                <RangeSlider type="range" min="0" max="100" />
                <RangeLabel>End Time: 01:30</RangeLabel>
                <RangeSlider type="range" min="0" max="100" />
              </TrimControls>
            )}
            
            {activeTab === 'audio' && (
              <AudioControls>
                <RangeLabel>Volume: 100%</RangeLabel>
                <RangeSlider type="range" min="0" max="100" defaultValue="100" />
                <CheckboxControl>
                  <input type="checkbox" id="mute" />
                  <label htmlFor="mute">Mute Audio</label>
                </CheckboxControl>
                <CheckboxControl>
                  <input type="checkbox" id="background-music" />
                  <label htmlFor="background-music">Add Background Music</label>
                </CheckboxControl>
              </AudioControls>
            )}
            
            {activeTab === 'filters' && (
              <FiltersControls>
                <FilterOption>
                  <input type="radio" name="filter" id="none" defaultChecked />
                  <label htmlFor="none">None</label>
                </FilterOption>
                <FilterOption>
                  <input type="radio" name="filter" id="grayscale" />
                  <label htmlFor="grayscale">Grayscale</label>
                </FilterOption>
                <FilterOption>
                  <input type="radio" name="filter" id="sepia" />
                  <label htmlFor="sepia">Sepia</label>
                </FilterOption>
                <FilterOption>
                  <input type="radio" name="filter" id="vintage" />
                  <label htmlFor="vintage">Vintage</label>
                </FilterOption>
              </FiltersControls>
            )}
            
            {activeTab === 'thumbnail' && (
              <ThumbnailControls>
                <ThumbnailPreview>
                  <img src="https://via.placeholder.com/320x180" alt="Thumbnail Preview" />
                </ThumbnailPreview>
                <ThumbnailActions>
                  <ActionButton>Capture Current Frame</ActionButton>
                  <ActionButton>Upload Custom Thumbnail</ActionButton>
                </ThumbnailActions>
              </ThumbnailControls>
            ) }
          </TabContent>
          
          <ExportSection>
            <ExportFormatSelect>
              <option value="mp4">MP4</option>
              <option value="webm">WebM</option>
              <option value="mov">MOV</option>
            </ExportFormatSelect>
            <ExportQualitySelect>
              <option value="high">High Quality (1080p)</option>
              <option value="medium">Medium Quality (720p)</option>
              <option value="low">Low Quality (480p)</option>
            </ExportQualitySelect>
            <ExportButton 
              onClick={handleExport} 
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : (
                <>
                  <FaDownload />
                  <span>Export Video</span>
                </>
              )}
            </ExportButton>
          </ExportSection>
        </>
      )}
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const UploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4a90e2;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const UploadInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f5f5f5;
  padding: 0.75rem;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
`;

const FileName = styled.span`
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FileSize = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const PreviewSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const VideoPreview = styled.video`
  max-width: 100%;
  max-height: 400px;
  border-radius: 4px;
`;

const EditorTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #eee;
`;

interface TabButtonProps {
  active: boolean;
}

const TabButton = styled.button<TabButtonProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: ${props => props.active ? '#f0f0f0' : 'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.active ? '#4a90e2' : 'transparent'};
  cursor: pointer;
  font-weight: ${props => props.active ? '500' : 'normal'};
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TabContent = styled.div`
  padding: 1.5rem 0;
`;

const TrimControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AudioControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FiltersControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ThumbnailControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ThumbnailPreview = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
  
  img {
    display: block;
    max-width: 100%;
  }
`;

const ThumbnailActions = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const RangeLabel = styled.label`
  font-weight: 500;
`;

const RangeSlider = styled.input`
  width: 100%;
`;

const CheckboxControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ExportSection = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ExportFormatSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ExportQualitySelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #27ae60;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-left: auto;
  
  &:hover {
    background-color: #219653;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default VideoEditor;
