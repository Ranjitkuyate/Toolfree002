import React from 'react';
import styled from 'styled-components';

const AllInOneDownloader = () => {
  const [url, setUrl] = React.useState('');
  const [platform, setPlatform] = React.useState('');
  const [quality, setQuality] = React.useState('high');
  const [format, setFormat] = React.useState('mp4');
  const [isLoading, setIsLoading] = React.useState(false);
  const [downloadLink, setDownloadLink] = React.useState('');
  const [error, setError] = React.useState('');
  
  // Detect platform from URL
  React.useEffect(() => {
    if (!url) {
      setPlatform('');
      return;
    }
    
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;
      
      if (hostname.includes('youtube') || hostname.includes('youtu.be')) {
        setPlatform('youtube');
      } else if (hostname.includes('facebook') || hostname.includes('fb.com')) {
        setPlatform('facebook');
      } else if (hostname.includes('instagram')) {
        setPlatform('instagram');
      } else if (hostname.includes('twitter') || hostname.includes('x.com')) {
        setPlatform('twitter');
      } else if (hostname.includes('tiktok')) {
        setPlatform('tiktok');
      } else if (hostname.includes('pinterest')) {
        setPlatform('pinterest');
      } else if (hostname.includes('soundcloud')) {
        setPlatform('soundcloud');
      } else {
        setPlatform('other');
      }
    } catch (err) {
      setPlatform('');
    }
  }, [url]);
  
  // Handle download
  const handleDownload = () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }
    
    if (!platform || platform === 'other') {
      setError('Unsupported platform. Please enter a URL from YouTube, Facebook, Instagram, Twitter, TikTok, Pinterest, or SoundCloud.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call to download service
    setTimeout(() => {
      setIsLoading(false);
      
      // In a real implementation, this would call an actual download API
      // For this demo, we'll simulate a successful download
      setDownloadLink(`#demo-download-${platform}-${quality}-${format}`);
    }, 2000);
  };
  
  // Handle demo download (for demonstration purposes)
  const handleDemoDownload = () => {
    alert('In a real implementation, this would download the actual file. This is a demo version.');
  };
  
  // Get platform icon
  const getPlatformIcon = () => {
    switch (platform) {
      case 'youtube':
        return 'fab fa-youtube';
      case 'facebook':
        return 'fab fa-facebook';
      case 'instagram':
        return 'fab fa-instagram';
      case 'twitter':
        return 'fab fa-twitter';
      case 'tiktok':
        return 'fab fa-tiktok';
      case 'pinterest':
        return 'fab fa-pinterest';
      case 'soundcloud':
        return 'fab fa-soundcloud';
      default:
        return 'fas fa-link';
    }
  };
  
  // Get platform name
  const getPlatformName = () => {
    switch (platform) {
      case 'youtube':
        return 'YouTube';
      case 'facebook':
        return 'Facebook';
      case 'instagram':
        return 'Instagram';
      case 'twitter':
        return 'Twitter';
      case 'tiktok':
        return 'TikTok';
      case 'pinterest':
        return 'Pinterest';
      case 'soundcloud':
        return 'SoundCloud';
      case 'other':
        return 'Unsupported Platform';
      default:
        return '';
    }
  };
  
  // Get available formats based on platform
  const getAvailableFormats = () => {
    switch (platform) {
      case 'youtube':
      case 'facebook':
      case 'instagram':
      case 'twitter':
      case 'tiktok':
        return ['mp4', 'webm', 'mp3', 'aac'];
      case 'pinterest':
        return ['jpg', 'png', 'mp4'];
      case 'soundcloud':
        return ['mp3', 'aac'];
      default:
        return ['mp4'];
    }
  };
  
  return (
    <Container>
      <ToolHeader>
        <h1>All-in-One Downloader</h1>
        <p>Download videos, images, and audio from multiple platforms</p>
      </ToolHeader>
      
      <ToolSection>
        <InputGroup>
          <InputWithIcon>
            <i className="fas fa-link"></i>
            <input
              type="text"
              placeholder="Paste URL from YouTube, Facebook, Instagram, Twitter, TikTok, Pinterest, or SoundCloud"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </InputWithIcon>
          <DownloadButton onClick={handleDownload} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Download'}
          </DownloadButton>
        </InputGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {platform && platform !== 'other' && (
          <OptionsContainer>
            <PlatformInfo>
              <PlatformIcon className={getPlatformIcon()} />
              <PlatformName>{getPlatformName()}</PlatformName>
            </PlatformInfo>
            
            <OptionsGrid>
              <OptionGroup>
                <label htmlFor="quality-select">Quality:</label>
                <select
                  id="quality-select"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </OptionGroup>
              
              <OptionGroup>
                <label htmlFor="format-select">Format:</label>
                <select
                  id="format-select"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                >
                  {getAvailableFormats().map((fmt) => (
                    <option key={fmt} value={fmt}>{fmt.toUpperCase()}</option>
                  ))}
                </select>
              </OptionGroup>
            </OptionsGrid>
          </OptionsContainer>
        )}
        
        {downloadLink && (
          <DownloadResult>
            <SuccessIcon className="fas fa-check-circle" />
            <DownloadMessage>
              Your download is ready!
            </DownloadMessage>
            <DownloadLink href={downloadLink} onClick={handleDemoDownload}>
              <i className="fas fa-download"></i> Download {platform === 'soundcloud' ? 'Audio' : platform === 'pinterest' ? (format === 'jpg' || format === 'png' ? 'Image' : 'Video') : 'Video'}
            </DownloadLink>
          </DownloadResult>
        )}
      </ToolSection>
      
      <ToolSection>
        <h2>Supported Platforms</h2>
        <PlatformsGrid>
          <PlatformCard>
            <PlatformLogo className="fab fa-youtube" youtube />
            <PlatformCardTitle>YouTube</PlatformCardTitle>
            <PlatformCardDescription>
              Download videos in MP4, WebM formats or extract audio in MP3, AAC formats
            </PlatformCardDescription>
          </PlatformCard>
          
          <PlatformCard>
            <PlatformLogo className="fab fa-facebook" facebook />
            <PlatformCardTitle>Facebook</PlatformCardTitle>
            <PlatformCardDescription>
              Download videos, reels, and stories in multiple formats and qualities
            </PlatformCardDescription>
          </PlatformCard>
          
          <PlatformCard>
            <PlatformLogo className="fab fa-instagram" instagram />
            <PlatformCardTitle>Instagram</PlatformCardTitle>
            <PlatformCardDescription>
              Download posts, reels, stories, and IGTV videos in high quality
            </PlatformCardDescription>
          </PlatformCard>
          
          <PlatformCard>
            <PlatformLogo className="fab fa-twitter" twitter />
            <PlatformCardTitle>Twitter</PlatformCardTitle>
            <PlatformCardDescription>
              Download videos and GIFs from tweets in multiple formats
            </PlatformCardDescription>
          </PlatformCard>
          
          <PlatformCard>
            <PlatformLogo className="fab fa-tiktok" tiktok />
            <PlatformCardTitle>TikTok</PlatformCardTitle>
            <PlatformCardDescription>
              Download TikTok videos without watermark in high quality
            </PlatformCardDescription>
          </PlatformCard>
          
          <PlatformCard>
            <PlatformLogo className="fab fa-pinterest" pinterest />
            <PlatformCardTitle>Pinterest</PlatformCardTitle>
            <PlatformCardDescription>
              Download pins, images, and videos in original quality
            </PlatformCardDescription>
          </PlatformCard>
          
          <PlatformCard>
            <PlatformLogo className="fab fa-soundcloud" soundcloud />
            <PlatformCardTitle>SoundCloud</PlatformCardTitle>
            <PlatformCardDescription>
              Download tracks and playlists in MP3 and AAC formats
            </PlatformCardDescription>
          </PlatformCard>
        </PlatformsGrid>
      </ToolSection>
      
      <ToolSection>
        <h2>How to Use</h2>
        <InstructionsGrid>
          <InstructionCard>
            <InstructionIcon className="fas fa-paste" />
            <InstructionStep>Step 1</InstructionStep>
            <InstructionTitle>Paste URL</InstructionTitle>
            <InstructionDescription>
              Copy the URL from the platform and paste it in the input field above
            </InstructionDescription>
          </InstructionCard>
          
          <InstructionCard>
            <InstructionIcon className="fas fa-sliders-h" />
            <InstructionStep>Step 2</InstructionStep>
            <InstructionTitle>Select Options</InstructionTitle>
            <InstructionDescription>
              Choose your preferred quality and format for the download
            </InstructionDescription>
          </InstructionCard>
          
          <InstructionCard>
            <InstructionIcon className="fas fa-download" />
            <InstructionStep>Step 3</InstructionStep>
            <InstructionTitle>Download</InstructionTitle>
            <InstructionDescription>
              Click the download button and save the file to your device
            </InstructionDescription>
          </InstructionCard>
        </InstructionsGrid>
      </ToolSection>
      
      <ToolSection>
        <h2>Features</h2>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon className="fas fa-bolt" />
            <FeatureTitle>Fast Downloads</FeatureTitle>
            <FeatureDescription>
              Download videos and audio quickly with our optimized servers
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-check-circle" />
            <FeatureTitle>High Quality</FeatureTitle>
            <FeatureDescription>
              Download in the highest available quality from each platform
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-globe" />
            <FeatureTitle>Multiple Platforms</FeatureTitle>
            <FeatureDescription>
              Support for all major social media and content platforms
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-file-video" />
            <FeatureTitle>Multiple Formats</FeatureTitle>
            <FeatureDescription>
              Download in various formats including MP4, WebM, MP3, and more
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-ban" />
            <FeatureTitle>No Watermarks</FeatureTitle>
            <FeatureDescription>
              Download videos without platform watermarks (where possible)
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-shield-alt" />
            <FeatureTitle>Safe & Secure</FeatureTitle>
            <FeatureDescription>
              No registration required, and we don't store your downloads
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
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
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
`;

const InputGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const InputWithIcon = styled.div`
  position: relative;
  flex: 1;
  margin-right: 1rem;
  
  i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const DownloadButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0 2rem;
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
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 1rem;
`;

const OptionsContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const PlatformInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const PlatformIcon = styled.i`
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: var(--primary-color);
`;

const PlatformName = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const OptionGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
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

const DownloadResult = styled.div`
  background-color: #e6f7e9;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SuccessIcon = styled.i`
  font-size: 3rem;
  color: #28a745;
  margin-bottom: 1rem;
`;

const DownloadMessage = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const DownloadLink = styled.a`
  display: inline-block;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  
  i {
    margin-right: 0.5rem;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const PlatformsGrid = styled.div`
<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>