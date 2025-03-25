import React from 'react';
import styled from 'styled-components';
import { useAds } from './AdManager';

interface AdSettingsProps {
  onSave?: () => void;
}

const AdSettings: React.FC<AdSettingsProps> = ({ onSave }) => {
  const { adsEnabled, toggleAdsEnabled, adPreferences, saveAdPreferences } = useAds();
  const [localPreferences, setLocalPreferences] = React.useState(adPreferences);

  // Handle preference changes
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setLocalPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  // Save preferences
  const handleSave = () => {
    saveAdPreferences(localPreferences);
    if (onSave) onSave();
  };

  return (
    <SettingsContainer>
      <SettingsHeader>
        <h2>Ad Preferences</h2>
        <p>Customize your ad experience on our website</p>
      </SettingsHeader>

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

// Styled Components
const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const SettingsHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
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

export default AdSettings;
