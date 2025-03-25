import React from 'react';
import styled from 'styled-components';

interface PropellerAdsProps {
  position: 'header' | 'footer' | 'sidebar' | 'content';
  size?: 'small' | 'medium' | 'large';
}

const PropellerAds: React.FC<PropellerAdsProps> = ({ position, size = 'medium' }) => {
  // This is a placeholder for the actual Propeller Ads integration
  // In a real implementation, this would include the actual ad code from Propeller Ads
  
  React.useEffect(() => {
    // In a real implementation, this would initialize the Propeller Ads script
    // Example (not actual code):
    // if (window.propellerads) {
    //   window.propellerads.init({ zone: 123456 });
    // }
    
    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []);
  
  return (
    <AdContainer position={position} size={size}>
      <AdContent>
        <p>Advertisement</p>
        <small>(Propeller Ads will load here)</small>
      </AdContent>
    </AdContainer>
  );
};

// Styled Components
const AdContainer = styled.div<{ position: string; size: string }>`
  background-color: #f5f5f5;
  border: 1px dashed #ccc;
  border-radius: 4px;
  margin: ${props => 
    props.position === 'header' ? '0 0 1.5rem 0' : 
    props.position === 'footer' ? '1.5rem 0 0 0' : 
    props.position === 'sidebar' ? '0 0 1.5rem 0' : '1.5rem 0'};
  width: 100%;
  height: ${props => 
    props.size === 'small' ? '100px' : 
    props.size === 'medium' ? '250px' : '300px'};
  overflow: hidden;
`;

const AdContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #777;
  text-align: center;
  
  p {
    margin: 0;
    font-size: 1.2rem;
  }
  
  small {
    margin-top: 0.5rem;
  }
`;

export default PropellerAds;
