import React from 'react';
import styled from 'styled-components';

interface SitemapGeneratorProps {
  // Props if needed
}

const SitemapGenerator: React.FC<SitemapGeneratorProps> = () => {
  const [isAutoGenerate, setIsAutoGenerate] = React.useState(true);
  const [includeImages, setIncludeImages] = React.useState(true);
  const [changeFrequency, setChangeFrequency] = React.useState('weekly');
  const [priority, setPriority] = React.useState('0.8');
  
  return (
    <SitemapContainer>
      <SitemapHeader>
        <h2>Sitemap Generator</h2>
        <p>Configure and generate XML sitemaps for better search engine indexing</p>
      </SitemapHeader>
      
      <SitemapSection>
        <h3>Sitemap Settings</h3>
        <p>
          Configure how your sitemap is generated and what it includes.
        </p>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Auto-Generate Sitemap</SettingTitle>
            <SettingDescription>
              Automatically generate and update sitemap when content changes
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={isAutoGenerate}
              onChange={() => setIsAutoGenerate(!isAutoGenerate)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Include Images</SettingTitle>
            <SettingDescription>
              Add image information to sitemap for better image SEO
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={includeImages}
              onChange={() => setIncludeImages(!includeImages)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <FormGroup>
          <label htmlFor="change-frequency">Change Frequency</label>
          <select
            id="change-frequency"
            value={changeFrequency}
            onChange={(e) => setChangeFrequency(e.target.value)}
          >
            <option value="always">Always</option>
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="never">Never</option>
          </select>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="1.0">1.0 (Highest)</option>
            <option value="0.9">0.9</option>
            <option value="0.8">0.8</option>
            <option value="0.7">0.7</option>
            <option value="0.6">0.6</option>
            <option value="0.5">0.5 (Medium)</option>
            <option value="0.4">0.4</option>
            <option value="0.3">0.3</option>
            <option value="0.2">0.2</option>
            <option value="0.1">0.1 (Lowest)</option>
          </select>
        </FormGroup>
      </SitemapSection>
      
      <SitemapSection>
        <h3>URL Exclusions</h3>
        <p>
          Specify URLs that should be excluded from the sitemap.
        </p>
        
        <FormGroup>
          <label htmlFor="exclusions">URLs to Exclude (one per line)</label>
          <textarea
            id="exclusions"
            rows={5}
            placeholder="/admin-page
/private-content
/temporary-page"
          ></textarea>
        </FormGroup>
      </SitemapSection>
      
      <SitemapSection>
        <h3>Sitemap Status</h3>
        <StatusGrid>
          <StatusItem>
            <StatusLabel>Last Generated</StatusLabel>
            <StatusValue>March 23, 2025</StatusValue>
          </StatusItem>
          <StatusItem>
            <StatusLabel>Total URLs</StatusLabel>
            <StatusValue>42</StatusValue>
          </StatusItem>
          <StatusItem>
            <StatusLabel>Sitemap Size</StatusLabel>
            <StatusValue>12.4 KB</StatusValue>
          </StatusItem>
          <StatusItem>
            <StatusLabel>Submitted to Google</StatusLabel>
            <StatusValue>Yes</StatusValue>
          </StatusItem>
          <StatusItem>
            <StatusLabel>Submitted to Bing</StatusLabel>
            <StatusValue>Yes</StatusValue>
          </StatusItem>
        </StatusGrid>
        
        <ButtonGroup>
          <Button primary>Generate Sitemap Now</Button>
          <Button>View Sitemap</Button>
          <Button>Submit to Search Engines</Button>
        </ButtonGroup>
      </SitemapSection>
      
      <SitemapSection>
        <h3>SEO Tips</h3>
        <TipsList>
          <TipItem>
            <TipIcon className="fas fa-sitemap" />
            <TipContent>
              <TipTitle>Keep Your Sitemap Updated</TipTitle>
              <TipDescription>
                Regularly update your sitemap to ensure search engines have the latest information about your website.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-robot" />
            <TipContent>
              <TipTitle>Submit to Search Engines</TipTitle>
              <TipDescription>
                Submit your sitemap to Google Search Console and Bing Webmaster Tools for faster indexing.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-image" />
            <TipContent>
              <TipTitle>Include Image Information</TipTitle>
              <TipDescription>
                Adding image data to your sitemap helps search engines discover and index your images.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-file-code" />
            <TipContent>
              <TipTitle>Add Sitemap to robots.txt</TipTitle>
              <TipDescription>
                Include a reference to your sitemap in your robots.txt file for better discovery.
              </TipDescription>
            </TipContent>
          </TipItem>
        </TipsList>
      </SitemapSection>
      
      <SaveButton>Save Settings</SaveButton>
    </SitemapContainer>
  );
};

// Styled Components
const SitemapContainer = styled.div`
  padding: 2rem;
`;

const SitemapHeader = styled.div`
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

const SitemapSection = styled.div`
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
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
  
  textarea {
    resize: vertical;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatusItem = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 1rem;
`;

const StatusLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const StatusValue = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-color);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : 'var(--text-color)'};
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

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TipItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
`;

const TipIcon = styled.i`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-top: 0.25rem;
`;

const TipContent = styled.div`
  flex: 1;
`;

const TipTitle = styled.h4`
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
`;

const TipDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0 !important;
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

export default SitemapGenerator;
