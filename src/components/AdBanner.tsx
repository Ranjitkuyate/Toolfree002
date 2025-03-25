import React from 'react';
import styled from 'styled-components';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar' | 'in-content';
  size: 'small' | 'medium' | 'large';
}

const AdBanner: React.FC<AdBannerProps> = ({ position, size }) => {
  // In a real implementation, this would integrate with Propeller Ads
  // For this demo, we'll just show a placeholder
  
  const getAdSize = () => {
    switch (size) {
      case 'small':
        return { width: '300px', height: '100px' };
      case 'medium':
        return { width: '728px', height: '90px' };
      case 'large':
        return { width: '100%', height: '120px' };
      default:
        return { width: '300px', height: '250px' };
    }
  };
  
  const { width, height } = getAdSize();
  
  return (
    <AdContainer position={position} width={width} height={height}>
      <AdContent>
        <AdIcon className="fas fa-ad" />
        <AdText>Advertisement</AdText>
        <AdDescription>This is a placeholder for Propeller Ads</AdDescription>
      </AdContent>
    </AdContainer>
  );
};

const AdContainer = styled.div<{ position: string; width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: #f0f0f0;
  border-radius: var(--border-radius);
  margin: ${props => 
    props.position === 'top' ? '0 0 2rem 0' : 
    props.position === 'bottom' ? '2rem 0 0 0' : 
    props.position === 'sidebar' ? '0 0 1rem 0' : 
    '1rem 0'};
  overflow: hidden;
`;

const AdContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1rem;
  text-align: center;
`;

const AdIcon = styled.i`
  font-size: 1.5rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const AdText = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: #999;
  margin-bottom: 0.5rem;
`;

const AdDescription = styled.div`
  font-size: 0.8rem;
  color: #aaa;
`;

export default AdBanner;
