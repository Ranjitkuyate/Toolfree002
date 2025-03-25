import React from 'react';
import styled from 'styled-components';

interface AdBannerProps {
  zoneId: string;
  type: 'banner' | 'rectangle' | 'leaderboard' | 'skyscraper';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ zoneId, type, className }) => {
  // Get dimensions based on ad type
  const getDimensions = () => {
    switch (type) {
      case 'banner':
        return { width: '468px', height: '60px' };
      case 'rectangle':
        return { width: '300px', height: '250px' };
      case 'leaderboard':
        return { width: '728px', height: '90px' };
      case 'skyscraper':
        return { width: '160px', height: '600px' };
      default:
        return { width: '300px', height: '250px' };
    }
  };

  const { width, height } = getDimensions();

  React.useEffect(() => {
    // Create and inject Propeller Ads banner script
    const script = document.createElement('script');
    script.src = 'https://iclickcdn.com/tag.min.js';
    script.setAttribute('data-zone', zoneId);
    script.async = true;
    
    // Find the ad container and append the script
    const adContainer = document.getElementById(`ad-container-${zoneId}`);
    if (adContainer) {
      adContainer.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (adContainer && adContainer.contains(script)) {
        adContainer.removeChild(script);
      }
    };
  }, [zoneId]);

  return (
    <AdContainer 
      id={`ad-container-${zoneId}`} 
      width={width} 
      height={height}
      className={className}
    >
      <AdLabel>Advertisement</AdLabel>
    </AdContainer>
  );
};

const AdContainer = styled.div<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin: 20px auto;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 250px;
  }
`;

const AdLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.05);
  color: #999;
  font-size: 10px;
  padding: 2px 5px;
  border-bottom-right-radius: 4px;
`;

export default AdBanner;
