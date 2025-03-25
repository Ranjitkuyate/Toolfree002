import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import Compressor from 'compressorjs';

const ImageCompressor = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedFiles, setCompressedFiles] = useState<{original: File, compressed: Blob, url: string}[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [preserveMetadata, setPreserveMetadata] = useState(true);
  const [compressProgress, setCompressProgress] = useState(0);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).filter(file => 
        file.type.startsWith('image/')
      );
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  // Remove a selected file
  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Clear all selected files
  const clearSelectedFiles = () => {
    setSelectedFiles([]);
  };

  // Compress a single image
  const compressImage = (file: File): Promise<{original: File, compressed: Blob, url: string}> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: quality / 100,
        maxWidth,
        maxHeight,
        mimeType: 'auto',
        convertSize: 5000000, // Convert to JPEG if larger than 5MB
        checkOrientation: true,
        success(result) {
          const url = URL.createObjectURL(result);
          resolve({
            original: file,
            compressed: result,
            url
          });
        },
        error(err) {
          reject(err);
        }
      });
    });
  };

  // Compress all selected images
  const compressAllImages = async () => {
    if (selectedFiles.length === 0) {
      alert('Please select at least one image to compress');
      return;
    }

    setIsCompressing(true);
    setCompressProgress(0);
    setCompressedFiles([]);

    try {
      const results = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const result = await compressImage(selectedFiles[i]);
        results.push(result);
        setCompressProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
      }
      setCompressedFiles(results);
    } catch (error) {
      console.error('Error compressing images:', error);
      alert('An error occurred while compressing images');
    } finally {
      setIsCompressing(false);
      setCompressProgress(100);
    }
  };

  // Download a compressed image
  const downloadImage = (index: number) => {
    const file = compressedFiles[index];
    const link = document.createElement('a');
    link.href = file.url;
    link.download = `compressed_${file.original.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download all compressed images as a zip
  const downloadAllImages = () => {
    compressedFiles.forEach((file, index) => {
      downloadImage(index);
    });
  };

  // Calculate file size reduction
  const calculateReduction = (original: number, compressed: number) => {
    const reduction = ((original - compressed) / original) * 100;
    return reduction.toFixed(1);
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files) {
      const filesArray = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      );
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  }, []);

  return (
    <Container>
      <ToolHeader>
        <h1>Advanced Image Compressor</h1>
        <p>Compress your images while maintaining quality to reduce file size and improve website performance</p>
      </ToolHeader>
      
      <ToolSection>
        <DropZone 
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <DropZoneIcon className="fas fa-cloud-upload-alt" />
          <DropZoneText>
            <strong>Drag & drop images here</strong>
            <span>or click to browse files</span>
          </DropZoneText>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </DropZone>
        
        {selectedFiles.length > 0 && (
          <SelectedFilesContainer>
            <SelectedFilesHeader>
              <h3>Selected Images ({selectedFiles.length})</h3>
              <ClearButton onClick={clearSelectedFiles}>Clear All</ClearButton>
            </SelectedFilesHeader>
            
            <FileList>
              {selectedFiles.map((file, index) => (
                <FileItem key={index}>
                  <FilePreview>
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                  </FilePreview>
                  <FileInfo>
                    <FileName>{file.name}</FileName>
                    <FileSize>{formatFileSize(file.size)}</FileSize>
                  </FileInfo>
                  <RemoveButton onClick={() => removeSelectedFile(index)}>
                    <i className="fas fa-times"></i>
                  </RemoveButton>
                </FileItem>
              ))}
            </FileList>
          </SelectedFilesContainer>
        )}
        
        <CompressionOptions>
          <h3>Compression Options</h3>
          
          <OptionGroup>
            <label htmlFor="quality-slider">Quality: {quality}%</label>
            <RangeSlider
              id="quality-slider"
              type="range"
              min="1"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
            />
            <RangeLabels>
              <span>Lower Quality</span>
              <span>Higher Quality</span>
            </RangeLabels>
          </OptionGroup>
          
          <OptionsGrid>
            <OptionGroup>
              <label htmlFor="max-width">Max Width (px)</label>
              <input
                id="max-width"
                type="number"
                min="100"
                max="8000"
                value={maxWidth}
                onChange={(e) => setMaxWidth(parseInt(e.target.value))}
              />
            </OptionGroup>
            
            <OptionGroup>
              <label htmlFor="max-height">Max Height (px)</label>
              <input
                id="max-height"
                type="number"
                min="100"
                max="8000"
                value={maxHeight}
                onChange={(e) => setMaxHeight(parseInt(e.target.value))}
              />
            </OptionGroup>
          </OptionsGrid>
          
          <CheckboxOption>
            <input
              id="preserve-metadata"
              type="checkbox"
              checked={preserveMetadata}
              onChange={(e) => setPreserveMetadata(e.target.checked)}
            />
            <label htmlFor="preserve-metadata">Preserve metadata when possible (location, camera info)</label>
          </CheckboxOption>
        </CompressionOptions>
        
        <ButtonGroup>
          <PrimaryButton 
            onClick={compressAllImages} 
            disabled={selectedFiles.length === 0 || isCompressing}
          >
            {isCompressing ? 'Compressing...' : 'Compress Images'}
          </PrimaryButton>
        </ButtonGroup>
        
        {isCompressing && (
          <ProgressContainer>
            <ProgressBar progress={compressProgress} />
            <ProgressText>{compressProgress}% Complete</ProgressText>
          </ProgressContainer>
        )}
        
        {compressedFiles.length > 0 && (
          <ResultsContainer>
            <ResultsHeader>
              <h3>Compressed Images ({compressedFiles.length})</h3>
              <DownloadAllButton onClick={downloadAllImages}>
                <i className="fas fa-download"></i> Download All
              </DownloadAllButton>
            </ResultsHeader>
            
            <ResultsTable>
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>File Name</th>
                  <th>Original Size</th>
                  <th>Compressed Size</th>
                  <th>Reduction</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {compressedFiles.map((file, index) => (
                  <tr key={index}>
                    <td>
                      <ResultPreview>
                        <img src={file.url} alt={file.original.name} />
                      </ResultPreview>
                    </td>
                    <td>{file.original.name}</td>
                    <td>{formatFileSize(file.original.size)}</td>
                    <td>{formatFileSize(file.compressed.size)}</td>
                    <td>
                      <ReductionBadge reduction={parseFloat(calculateReduction(file.original.size, file.compressed.size))}>
                        {calculateReduction(file.original.size, file.compressed.size)}% smaller
                      </ReductionBadge>
                    </td>
                    <td>
                      <DownloadButton onClick={() => downloadImage(index)}>
                        <i className="fas fa-download"></i> Download
                      </DownloadButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ResultsTable>
          </ResultsContainer>
        )}
      </ToolSection>
      
      <ToolSection>
        <h2>How It Works</h2>
        <p>
          Our advanced image compressor uses intelligent algorithms to reduce the file size of your images while maintaining visual quality.
          This is achieved through a combination of techniques including:
        </p>
        
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon className="fas fa-compress-arrows-alt" />
            <FeatureTitle>Smart Compression</FeatureTitle>
            <FeatureDescription>
              Analyzes image content to apply optimal compression levels to different areas
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-crop-alt" />
            <FeatureTitle>Dimension Optimization</FeatureTitle>
            <FeatureDescription>
              Resizes images to specified dimensions while maintaining aspect ratio
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-file-image" />
            <FeatureTitle>Format Conversion</FeatureTitle>
            <FeatureDescription>
              Automatically converts large images to more efficient formats when beneficial
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-tachometer-alt" />
            <FeatureTitle>Performance Boost</FeatureTitle>
            <FeatureDescription>
              Smaller images load faster, improving website performance and user experience
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
        
        <h3>Benefits of Image Compression</h3>
        <BenefitsList>
          <li>Faster website loading times</li>
          <li>Reduced bandwidth usage</li>
          <li>Lower storage requirements</li>
          <li>Improved SEO rankings (Google favors faster websites)</li>
          <li>Better user experience, especially on mobile devices</li>
        </BenefitsList>
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

const DropZone = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 2rem;
  
  &:hover {
    border-color: var(--primary-color);
    background-color: rgba(74, 108, 247, 0.05);
  }
`;

const DropZoneIcon = styled.i`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const DropZoneText = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  span {
    color: #666;
  }
`;

const SelectedFilesContainer = styled.div`
  margin-bottom: 2rem;
`;

const SelectedFilesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
  }
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    color: var(--primary-color);
    text-decoration: underline;
  }
`;

const FileList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const FileItem = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 0.5rem;
  position: relative;
`;

const FilePreview = styled.div`
  width: 100%;
  height: 150px;
  border-radius: var(--border-radius);
  overflow: hidden;
  margin-bottom: 0.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FileInfo = styled.div`
  padding: 0 0.5rem;
`;

const FileName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.3rem;
`;

const FileSize = styled.div`
  font-size: 0.8rem;
  color: #666;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(220, 53, 69, 0.8);
  }
`;

const CompressionOptions = styled.div`
  margin-bottom: 2rem;
`;

const OptionGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input[type="number"] {
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

const RangeSlider = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`;

const RangeLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #666;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const CheckboxOption = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  input[type="checkbox"] {
    margin-right: 0.5rem;
  }
  
  label {
    cursor: pointer;
  }
`;

const ButtonGroup = styled.div`
  margin-bottom: 2rem;
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

const ProgressContainer = styled.div`
  margin-bottom: 2rem;
`;

const ProgressBar = styled.div<{ progress: number }>`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
`;

const ProgressText = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #666;
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  h3 {
    margin: 0;
  }
`;

const DownloadAllButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  
  i {
    margin-right: 0.5rem;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const ResultsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  th {
    font-weight: 600;
    background-color: #f9f9f9;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const ResultPreview = styled.div`
  width: 60px;
  height: 60px;
  border-radius: var(--border-radius);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ReductionBadge = styled.span<{ reduction: number }>`
  background-color: ${props => 
    props.reduction > 50 ? '#28a745' : 
    props.reduction > 25 ? '#17a2b8' : 
    props.reduction > 0 ? '#ffc107' : 
    '#dc3545'};
  color: ${props => props.reduction > 25 ? 'white' : '#212529'};
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const DownloadButton = styled.button`
  background-color: #f0f0f0;
  color: var(--text-color);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  
  i {
    margin-right: 0.3rem;
  }
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const FeatureGrid = styled.div`
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

const BenefitsList = styled.ul`
  padding-left: 1.5rem;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

export default ImageCompressor;
