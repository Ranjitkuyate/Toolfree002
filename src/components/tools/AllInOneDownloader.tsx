import React, { useState } from 'react';
import styled from 'styled-components';

interface AllInOneDownloaderProps {
  // Props if needed
}

const AllInOneDownloader: React.FC<AllInOneDownloaderProps> = () => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [downloadOptions, setDownloadOptions] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleAnalyzeUrl = () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setError('');
    setIsAnalyzing(true);
    setDownloadOptions([]);

    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Mock download options based on platform
      if (platform === 'youtube') {
        setDownloadOptions([
          { id: 1, quality: '1080p', format: 'mp4', size: '24.5 MB', type: 'video' },
          { id: 2, quality: '720p', format: 'mp4', size: '18.2 MB', type: 'video' },
          { id: 3, quality: '480p', format: 'mp4', size: '12.8 MB', type: 'video' },
          { id: 4, quality: '360p', format: 'mp4', size: '8.5 MB', type: 'video' },
          { id: 5, quality: 'High', format: 'mp3', size: '4.2 MB', type: 'audio' },
          { id: 6, quality: 'Medium', format: 'mp3', size: '3.1 MB', type: 'audio' },
        ]);
      } else if (platform === 'instagram') {
        setDownloadOptions([
          { id: 1, quality: 'Original', format: 'mp4', size: '15.7 MB', type: 'video' },
          { id: 2, quality: 'High', format: 'jpg', size: '2.3 MB', type: 'image' },
        ]);
      } else if (platform === 'facebook') {
        setDownloadOptions([
          { id: 1, quality: 'HD', format: 'mp4', size: '28.9 MB', type: 'video' },
          { id: 2, quality: 'SD', format: 'mp4', size: '14.5 MB', type: 'video' },
        ]);
      } else if (platform === 'pinterest') {
        setDownloadOptions([
          { id: 1, quality: 'Original', format: 'jpg', size: '3.8 MB', type: 'image' },
        ]);
      } else if (platform === 'twitter') {
        setDownloadOptions([
          { id: 1, quality: 'High', format: 'mp4', size: '12.3 MB', type: 'video' },
          { id: 2, quality: 'Original', format: 'jpg', size: '1.5 MB', type: 'image' },
        ]);
      } else if (platform === 'tiktok') {
        setDownloadOptions([
          { id: 1, quality: 'HD', format: 'mp4', size: '8.7 MB', type: 'video' },
          { id: 2, quality: 'No Watermark', format: 'mp4', size: '8.7 MB', type: 'video' },
        ]);
      } else {
        setDownloadOptions([
          { id: 1, quality: 'Original', format: 'mp3', size: '5.4 MB', type: 'audio' },
        ]);
      }
    }, 2000);
  };

  return (
    <DownloaderContainer>
      <DownloaderHeader>
        <h2>All-in-One Downloader</h2>
        <p>Download videos, images, and content from various platforms with just a few clicks.</p>
      </DownloaderHeader>

      <DownloaderForm>
        <FormGroup>
          <label htmlFor="platform-select">Select Platform</label>
          <select 
            id="platform-select"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          >
            <option value="youtube">YouTube</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="pinterest">Pinterest</option>
            <option value="twitter">Twitter</option>
            <option value="tiktok">TikTok</option>
            <option value="soundcloud">SoundCloud</option>
          </select>
        </FormGroup>

        <FormGroup>
          <label htmlFor="url-input">Enter URL</label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={`Paste ${platform} URL here...`}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FormGroup>

        <AnalyzeButton 
          onClick={handleAnalyzeUrl}
          disabled={isAnalyzing || !url}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze URL'}
        </AnalyzeButton>
      </DownloaderForm>

      {isAnalyzing && (
        <LoadingContainer>
          <LoadingSpinner />
          <p>Analyzing URL, please wait...</p>
        </LoadingContainer>
      )}

      {downloadOptions.length > 0 && (
        <ResultsContainer>
          <h3>Available Downloads</h3>
          <DownloadOptionsTable>
            <thead>
              <tr>
                <th>Type</th>
                <th>Quality</th>
                <th>Format</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {downloadOptions.map((option) => (
                <tr key={option.id}>
                  <td>{option.type.charAt(0).toUpperCase() + option.type.slice(1)}</td>
                  <td>{option.quality}</td>
                  <td>{option.format.toUpperCase()}</td>
                  <td>{option.size}</td>
                  <td>
                    <DownloadButton>
                      Download
                    </DownloadButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </DownloadOptionsTable>
        </ResultsContainer>
      )}

      <FeaturesList>
        <h3>Features</h3>
        <ul>
          <li>Download videos from YouTube in multiple formats and qualities</li>
          <li>Save Instagram photos and videos at original quality</li>
          <li>Download Facebook videos and stories</li>
          <li>Save Pinterest images in high resolution</li>
          <li>Download Twitter videos and images</li>
          <li>Save TikTok videos without watermark</li>
          <li>Download audio from SoundCloud and other platforms</li>
          <li>Batch download multiple files at once</li>
          <li>No registration or software installation required</li>
        </ul>
      </FeaturesList>

      <PlatformInstructions>
        <h3>How to Use</h3>
        <ol>
          <li>Select the platform from the dropdown menu</li>
          <li>Copy and paste the URL of the content you want to download</li>
          <li>Click "Analyze URL" to fetch available download options</li>
          <li>Choose your preferred quality and format</li>
          <li>Click "Download" to save the file to your device</li>
        </ol>
      </PlatformInstructions>
    </DownloaderContainer>
  );
};

// Styled Components
const DownloaderContainer = styled.div`
  padding: 2rem;
`;

const DownloaderHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  p {
    color: #666;
  }
`;

const DownloaderForm = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

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

const ErrorMessage = styled.div`
  color: var(--error-color);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const AnalyzeButton = styled.button`
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  margin-bottom: 2rem;
  
  p {
    margin-top: 1rem;
    color: #666;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid var(--primary-color);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResultsContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
`;

const DownloadOptionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  th {
    background-color: #f0f0f0;
    font-weight: 600;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const DownloadButton = styled.button`
  background-color: var(--success-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
`;

const FeaturesList = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  ul {
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const PlatformInstructions = styled.div`
  h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  ol {
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export default AllInOneDownloader;
