import React from 'react';
import styled from 'styled-components';
import { useAds } from './AdManager';

interface NativeAdProps {
  zoneId: string;
  placement: 'in-article' | 'in-feed' | 'recommendation';
  className?: string;
}

const NativeAd: React.FC<NativeAdProps> = ({ zoneId, placement, className }) => {
  const adRef = React.useRef<HTMLDivElement>(null);
  const { adsEnabled, adPreferences } = useAds();
  
  React.useEffect(() => {
    if (!adsEnabled || !adPreferences.showNativeAds) return;
    
    // Create and inject Propeller Ads native ad script
    const script = document.createElement('script');
    script.src = 'https://iclickcdn.com/native.min.js';
    script.setAttribute('data-zone', zoneId);
    script.async = true;
    
    if (adRef.current) {
      adRef.current.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
      if (adRef.current && script.parentNode === adRef.current) {
        adRef.current.removeChild(script);
      }
    };
  }, [zoneId, adsEnabled, adPreferences.showNativeAds]);

  if (!adsEnabled || !adPreferences.showNativeAds) {
    return null;
  }

  return (
    <NativeAdContainer 
      ref={adRef}
      placement={placement}
      className={className}
    >
      <AdLabel>Sponsored Content</AdLabel>
    </NativeAdContainer>
  );
};

const NativeAdContainer = styled.div<{ placement: string }>`
  width: 100%;
  min-height: 250px;
  margin: ${props => props.placement === 'in-article' ? '20px 0' : '10px 0'};
  position: relative;
  background-color: ${props => props.placement === 'recommendation' ? '#f9f9f9' : 'transparent'};
  border-radius: 4px;
  padding: ${props => props.placement === 'recommendation' ? '15px' : '0'};
  border: ${props => props.placement === 'recommendation' ? '1px solid #e0e0e0' : 'none'};
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
  z-index: 1;
`;

export default NativeAd;
