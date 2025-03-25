import React from 'react';
import styled from 'styled-components';
import AdManager, { useAds } from '../components/ads/AdManager';
import PropellerAdsScript from '../components/ads/PropellerAdsScript';
import AdBanner from '../components/ads/AdBanner';
import NativeAd from '../components/ads/NativeAd';
import InterstitialAd from '../components/ads/InterstitialAd';
import SEO from '../components/SEO';

const AdSettingsPage = () => {
  return (
    <AdManager>
      <SEO 
        title="Ad Settings | ToolsFree Online"
        description="Customize your ad experience on ToolsFree Online. Control ad types, frequency, and preferences to optimize your browsing experience."
        keywords="ad settings, ad preferences, customize ads, ad frequency, ad management"
        canonical="/ad-settings"
      />
      
      <PropellerAdsScript />
      
      <PageContainer>
        <PageHeader>
          <h1>Ad Settings</h1>
          <p>Customize your ad experience on our website</p>
        </PageHeader>
        
        <AdSettingsContent />
        
        <AdPlacementDemo />
      </PageContainer>
      
      {/* Interstitial ad that triggers when user leaves the page */}
      <InterstitialAd 
        zoneId="12345" 
        triggerOn="exitIntent" 
      />
    </AdManager>
  );
};

const AdSettingsContent = () => {
  const { adsEnabled, toggleAdsEnabled, adPreferences, saveAdPreferences } = useAds();
  const [localPreferences, setLocalPreferences] = React.useState(adPreferences);

  // Handle preference changes
  const handlePreferenceChange = (e) => {
    const { name, value, type } = e.target;
    
    setLocalPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  // Save preferences
  const handleSave = () => {
    saveAdPreferences(localPreferences);
    alert('Your ad preferences have been saved!');
  };

  return (
    <SettingsContainer>
      <SettingsSection>
        <ToggleContainer>
          <ToggleLabel>
            <span>Enable Ads</span>
            <ToggleSwitch>
              <input
                type="checkbox"
                checked={adsEnabled}
                onChange={toggleAdsEnabled}
              />
              <ToggleSlider />
            </ToggleSwitch>
          </ToggleLabel>
          <ToggleDescription>
            Ads help us keep our tools free. By enabling ads, you support our website.
          </ToggleDescription>
        </ToggleContainer>
      </SettingsSection>

      {adsEnabled && (
        <>
          <SettingsSection>
            <SectionTitle>Ad Types</SectionTitle>
            <CheckboxOption>
              <input
                type="checkbox"
                name="showBannerAds"
                checked={localPreferences.showBannerAds}
                onChange={handlePreferenceChange}
                id="showBannerAds"
              />
              <label htmlFor="showBannerAds">Banner Ads</label>
              <OptionDescription>Standard banner advertisements</OptionDescription>
            </CheckboxOption>

            <CheckboxOption>
              <input
                type="checkbox"
                name="showInterstitialAds"
                checked={localPreferences.showInterstitialAds}
                onChange={handlePreferenceChange}
                id="showInterstitialAds"
              />
              <label htmlFor="showInterstitialAds">Interstitial Ads</label>
              <OptionDescription>Full-screen ads that appear between page transitions</OptionDescription>
            </CheckboxOption>

            <CheckboxOption>
              <input
                type="checkbox"
                name="showPushNotifications"
                checked={localPreferences.showPushNotifications}
                onChange={handlePreferenceChange}
                id="showPushNotifications"
              />
              <label htmlFor="showPushNotifications">Push Notifications</label>
              <OptionDescription>Notifications about new tools and features</OptionDescription>
            </CheckboxOption>

            <CheckboxOption>
              <input
                type="checkbox"
                name="showNativeAds"
                checked={localPreferences.showNativeAds}
                onChange={handlePreferenceChange}
                id="showNativeAds"
              />
              <label htmlFor="showNativeAds">Native Ads</label>
              <OptionDescription>Ads that match the look and feel of our website</OptionDescription>
            </CheckboxOption>
          </SettingsSection>

          <SettingsSection>
            <SectionTitle>Ad Frequency</SectionTitle>
            <SelectOption>
              <label htmlFor="adFrequency">How often would you like to see ads?</label>
              <select
                name="adFrequency"
                value={localPreferences.adFrequency}
                onChange={handlePreferenceChange}
                id="adFrequency"
              >
                <option value="low">Low - Fewer ads</option>
                <option value="medium">Medium - Balanced experience</option>
                <option value="high">High - Support us with more ads</option>
              </select>
            </SelectOption>
          </SettingsSection>
        </>
      )}

      <ButtonContainer>
        <SaveButton onClick={handleSave}>Save Preferences</SaveButton>
      </ButtonContainer>

      <PrivacyNote>
        <p>
          Your ad preferences are stored locally on your device and are not shared with third parties.
          By using our website, you agree to our <a href="/privacy-policy">Privacy Policy</a> and 
          <a href="/terms-of-service">Terms of Service</a>.
        </p>
      </PrivacyNote>
    </SettingsContainer>
  );
};

const AdPlacementDemo = () => {
  const { adsEnabled, adPreferences } = useAds();
  
  if (!adsEnabled) return null;
  
  return (
    <DemoContainer>
      <SectionTitle>Ad Placement Examples</SectionTitle>
      <p>Here are examples of how different ad types will appear on our website:</p>
      
      {adPreferences.showBannerAds && (
        <DemoSection>
          <DemoTitle>Banner Ad</DemoTitle>
          <AdBanner zoneId="12345" type="banner" />
        </DemoSection>
      )}
      
      {adPreferences.showNativeAds && (
        <DemoSection>
          <DemoTitle>Native Ad</DemoTitle>
          <NativeAd zoneId="67890" placement="in-article" />
        </DemoSection>
      )}
      
      {adPreferences.showInterstitialAds && (
        <DemoSection>
          <DemoTitle>Interstitial Ad</DemoTitle>
          <p>Interstitial ads appear between page transitions. You can test one by clicking the button below:</p>
          <TestButton onClick={() => {
            const script = document.createElement('script');
            script.src = 'https://iclickcdn.com/int.min.js';
            script.setAttribute('data-zone', '54321');
            script.async = true;
            document.body.appendChild(script);
          }}>
            Test Interstitial Ad
          </TestButton>
        </DemoSection>
      )}
      
      {adPreferences.showPushNotifications && (
        <DemoSection>
          <DemoTitle>Push Notifications</DemoTitle>
          <p>Push notifications will appear as browser notifications. You can enable them by clicking the button below:</p>
          <TestButton onClick={() => {
            if ('Notification' in window) {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  new Notification('ToolsFree Online', {
                    body: 'Thank you for enabling push notifications!',
                    icon: '/images/notification-icon.png'
                  });
                }
              });
            }
          }}>
            Enable Push Notifications
          </TestButton>
        </DemoSection>
      )}
    </DemoContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.2rem;
  }
`;

const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 3rem;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SettingsSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ToggleContainer = styled.div`
  margin-bottom: 1rem;
`;

const ToggleLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.5rem;
  
  span {
    font-weight: 500;
  }
`;

const ToggleSwitch = styled.div`
  position: relative;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + & {
    background-color: var(--primary-color);
  }
  
  input:checked + &:before {
    transform: translateX(26px);
  }
`;

const ToggleDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
`;

const CheckboxOption = styled.div`
  margin-bottom: 1rem;
  
  input {
    margin-right: 0.5rem;
  }
  
  label {
    font-weight: 500;
    cursor: pointer;
  }
`;

const OptionDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
  margin-left: 1.5rem;
`;

const SelectOption = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const SaveButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--primary-color-dark);
  }
`;

const PrivacyNote = styled.div`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    margin: 0 0.25rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DemoContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const DemoSection = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;

const DemoTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #333;
`;

const TestButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--primary-color-dark);
  }
`;

export default AdSettingsPage;
