import React from 'react';
import styled from 'styled-components';
import { useAds } from './AdManager';

interface InterstitialAdProps {
  zoneId: string;
  triggerOn?: 'pageLoad' | 'scrollDelay' | 'exitIntent' | 'manual';
  delay?: number; // in seconds
  frequency?: number; // how many times per session
  className?: string;
}

const InterstitialAd: React.FC<InterstitialAdProps> = ({ 
  zoneId, 
  triggerOn = 'pageLoad', 
  delay = 5,
  frequency = 3,
  className 
}) => {
  const { adsEnabled, adPreferences, frequencySettings } = useAds();
  const [adTriggered, setAdTriggered] = React.useState(false);
  
  React.useEffect(() => {
    if (!adsEnabled || !adPreferences.showInterstitialAds) return;
    
    // Don't show interstitial if already triggered in this component instance
    if (adTriggered) return;
    
    // Check if we've shown too many ads this session
    const sessionAdCount = parseInt(sessionStorage.getItem('interstitialAdCount') || '0');
    if (sessionAdCount >= frequencySettings.maxAdsPerSession) return;
    
    // Set up trigger based on specified option
    let timeoutId: NodeJS.Timeout | null = null;
    
    const triggerAd = () => {
      // Create and inject Propeller Ads interstitial script
      const script = document.createElement('script');
      script.src = 'https://iclickcdn.com/int.min.js';
      script.setAttribute('data-zone', zoneId);
      script.async = true;
      document.body.appendChild(script);
      
      // Update session ad count
      sessionStorage.setItem('interstitialAdCount', (sessionAdCount + 1).toString());
      setAdTriggered(true);
    };
    
    switch (triggerOn) {
      case 'pageLoad':
        timeoutId = setTimeout(triggerAd, delay * 1000);
        break;
        
      case 'scrollDelay':
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const pageHeight = document.body.scrollHeight;
          const viewportHeight = window.innerHeight;
          
          // Trigger when scrolled 50% down the page
          if (scrollPosition > (pageHeight - viewportHeight) * 0.5) {
            window.removeEventListener('scroll', handleScroll);
            timeoutId = setTimeout(triggerAd, delay * 1000);
          }
        };
        
        window.addEventListener('scroll', handleScroll);
        break;
        
      case 'exitIntent':
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            document.removeEventListener('mouseleave', handleMouseLeave);
            triggerAd();
          }
        };
        
        document.addEventListener('mouseleave', handleMouseLeave);
        break;
        
      case 'manual':
        // Do nothing, will be triggered externally
        break;
    }
    
    return () => {
      // Cleanup
      if (timeoutId) clearTimeout(timeoutId);
      if (triggerOn === 'scrollDelay') {
        window.removeEventListener('scroll', handleScroll);
      }
      if (triggerOn === 'exitIntent') {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [zoneId, triggerOn, delay, frequency, adsEnabled, adPreferences.showInterstitialAds, adTriggered, frequencySettings.maxAdsPerSession]);
  
  // Method to manually trigger the ad
  const triggerAdManually = () => {
    if (!adsEnabled || !adPreferences.showInterstitialAds || adTriggered) return;
    
    const sessionAdCount = parseInt(sessionStorage.getItem('interstitialAdCount') || '0');
    if (sessionAdCount >= frequencySettings.maxAdsPerSession) return;
    
    const script = document.createElement('script');
    script.src = 'https://iclickcdn.com/int.min.js';
    script.setAttribute('data-zone', zoneId);
    script.async = true;
    document.body.appendChild(script);
    
    sessionStorage.setItem('interstitialAdCount', (sessionAdCount + 1).toString());
    setAdTriggered(true);
  };
  
  // This component doesn't render anything visible
  return null;
};

export default InterstitialAd;
