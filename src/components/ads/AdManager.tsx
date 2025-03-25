import React from 'react';
import styled from 'styled-components';

interface AdManagerProps {
  children?: React.ReactNode;
}

const AdManager: React.FC<AdManagerProps> = ({ children }) => {
  const [adsEnabled, setAdsEnabled] = React.useState(true);
  const [adPreferences, setAdPreferences] = React.useState({
    showBannerAds: true,
    showInterstitialAds: true,
    showPushNotifications: true,
    showNativeAds: true,
    adFrequency: 'medium', // 'low', 'medium', 'high'
  });

  // Load ad preferences from localStorage
  React.useEffect(() => {
    try {
      const savedPreferences = localStorage.getItem('adPreferences');
      if (savedPreferences) {
        setAdPreferences(JSON.parse(savedPreferences));
      }
      
      const adsEnabledSetting = localStorage.getItem('adsEnabled');
      if (adsEnabledSetting !== null) {
        setAdsEnabled(adsEnabledSetting === 'true');
      }
    } catch (error) {
      console.error('Error loading ad preferences:', error);
    }
  }, []);

  // Save ad preferences to localStorage
  const saveAdPreferences = (newPreferences) => {
    try {
      localStorage.setItem('adPreferences', JSON.stringify(newPreferences));
      setAdPreferences(newPreferences);
    } catch (error) {
      console.error('Error saving ad preferences:', error);
    }
  };

  // Toggle ads enabled/disabled
  const toggleAdsEnabled = () => {
    const newValue = !adsEnabled;
    try {
      localStorage.setItem('adsEnabled', newValue.toString());
      setAdsEnabled(newValue);
    } catch (error) {
      console.error('Error saving ads enabled setting:', error);
    }
  };

  // Get ad frequency settings based on preference
  const getAdFrequencySettings = () => {
    switch (adPreferences.adFrequency) {
      case 'low':
        return {
          interstitialDelay: 120, // seconds
          maxAdsPerPage: 2,
          maxAdsPerSession: 5,
        };
      case 'medium':
        return {
          interstitialDelay: 60, // seconds
          maxAdsPerPage: 3,
          maxAdsPerSession: 10,
        };
      case 'high':
        return {
          interstitialDelay: 30, // seconds
          maxAdsPerPage: 5,
          maxAdsPerSession: 15,
        };
      default:
        return {
          interstitialDelay: 60, // seconds
          maxAdsPerPage: 3,
          maxAdsPerSession: 10,
        };
    }
  };

  // Context value
  const adContextValue = {
    adsEnabled,
    toggleAdsEnabled,
    adPreferences,
    saveAdPreferences,
    frequencySettings: getAdFrequencySettings(),
  };

  return (
    <AdContext.Provider value={adContextValue}>
      {children}
    </AdContext.Provider>
  );
};

// Create context
export const AdContext = React.createContext({
  adsEnabled: true,
  toggleAdsEnabled: () => {},
  adPreferences: {
    showBannerAds: true,
    showInterstitialAds: true,
    showPushNotifications: true,
    showNativeAds: true,
    adFrequency: 'medium',
  },
  saveAdPreferences: (newPreferences) => {},
  frequencySettings: {
    interstitialDelay: 60,
    maxAdsPerPage: 3,
    maxAdsPerSession: 10,
  },
});

// Hook for using ad context
export const useAds = () => React.useContext(AdContext);

export default AdManager;
