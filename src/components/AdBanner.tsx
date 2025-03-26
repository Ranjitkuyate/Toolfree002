import React from 'react';
import styled from 'styled-components';

interface AdBannerProps {
  position: 'top' | 'bottom' | 'sidebar';
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  position, 
  className = '' 
}) => {
  return (
    <BannerContainer className={`${position} ${className}`}>
      <AdPlaceholder>
        <AdText>Advertisement</AdText>
        <AdInfo>Propeller Ads will appear here</AdInfo>
      </AdPlaceholder>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  
  &.top, &.bottom {
    height: 90px;
  }
  
  &.sidebar {
    height: 250px;
  }
`;

const AdPlaceholder = styled.div`
  background-color: #f0f0f0;
  border: 1px dashed #ccc;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const AdText = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const AdInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
`;

export default AdBanner;
