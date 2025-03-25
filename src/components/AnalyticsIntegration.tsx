import React from 'react';
import styled from 'styled-components';

interface AnalyticsIntegrationProps {
  // Props if needed
}

const AnalyticsIntegration: React.FC<AnalyticsIntegrationProps> = () => {
  const [isGoogleAnalytics, setIsGoogleAnalytics] = React.useState(true);
  const [googleAnalyticsId, setGoogleAnalyticsId] = React.useState('');
  const [isHeatmap, setIsHeatmap] = React.useState(false);
  const [isUserFlow, setIsUserFlow] = React.useState(false);
  
  return (
    <AnalyticsContainer>
      <AnalyticsHeader>
        <h2>Analytics Integration</h2>
        <p>Track user behavior and website performance with analytics tools</p>
      </AnalyticsHeader>
      
      <AnalyticsSection>
        <h3>Google Analytics</h3>
        <p>
          Track website traffic, user behavior, and conversion metrics with Google Analytics.
        </p>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Enable Google Analytics</SettingTitle>
            <SettingDescription>
              Track website traffic and user behavior
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={isGoogleAnalytics}
              onChange={() => setIsGoogleAnalytics(!isGoogleAnalytics)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <FormGroup>
          <label htmlFor="ga-id">Google Analytics Measurement ID</label>
          <input
            id="ga-id"
            type="text"
            value={googleAnalyticsId}
            onChange={(e) => setGoogleAnalyticsId(e.target.value)}
            placeholder="G-XXXXXXXXXX"
            disabled={!isGoogleAnalytics}
          />
          <HelpText>
            <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
              Get a free Google Analytics ID
            </a>
          </HelpText>
        </FormGroup>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Enhanced Measurement</SettingTitle>
            <SettingDescription>
              Automatically track page views, scrolls, outbound clicks, site search, and more
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={true}
              disabled={!isGoogleAnalytics}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
      </AnalyticsSection>
      
      <AnalyticsSection>
        <h3>Advanced Analytics</h3>
        <p>
          Enable additional analytics features for deeper insights.
        </p>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Heatmap Tracking</SettingTitle>
            <SettingDescription>
              Visualize where users click, move, and scroll on your website
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={isHeatmap}
              onChange={() => setIsHeatmap(!isHeatmap)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>User Flow Analysis</SettingTitle>
            <SettingDescription>
              Track how users navigate through your website
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={isUserFlow}
              onChange={() => setIsUserFlow(!isUserFlow)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Tool Usage Tracking</SettingTitle>
            <SettingDescription>
              Track which tools are most popular and how they're being used
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={true}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
      </AnalyticsSection>
      
      <AnalyticsSection>
        <h3>Privacy Settings</h3>
        <p>
          Configure privacy-related settings for analytics tracking.
        </p>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Cookie Consent Banner</SettingTitle>
            <SettingDescription>
              Display a cookie consent banner to comply with privacy regulations
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={true}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Anonymize IP Addresses</SettingTitle>
            <SettingDescription>
              Remove the last octet of users' IP addresses for privacy
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={true}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Respect Do Not Track</SettingTitle>
            <SettingDescription>
              Honor users' Do Not Track browser settings
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={true}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
      </AnalyticsSection>
      
      <SaveButton>Save Settings</SaveButton>
    </AnalyticsContainer>
  );
};

// Styled Components
const AnalyticsContainer = styled.div`
  padding: 2rem;
`;

const AnalyticsHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  p {
    color: #666;
  }
`;

const AnalyticsSection = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
  }
`;

const SettingInfo = styled.div`
  flex: 1;
`;

const SettingTitle = styled.h4`
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
`;

const SettingDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0 !important;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
    
    &:checked + span {
      background-color: var(--primary-color);
    }
    
    &:checked + span:before {
      transform: translateX(26px);
    }
    
    &:disabled + span {
      opacity: 0.5;
      cursor: not-allowed;
    }
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
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const FormGroup = styled.div`
  margin: 1.5rem 0;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    
    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
`;

const HelpText = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SaveButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
`;

export default AnalyticsIntegration;
