import React from 'react';
import styled from 'styled-components';

interface RobotsTxtGeneratorProps {
  // Props if needed
}

const RobotsTxtGenerator: React.FC<RobotsTxtGeneratorProps> = () => {
  const [allowAll, setAllowAll] = React.useState(true);
  const [disallowedPaths, setDisallowedPaths] = React.useState('/admin\n/private\n/temp');
  const [crawlDelay, setCrawlDelay] = React.useState('10');
  const [sitemapUrl, setSitemapUrl] = React.useState('https://toolsfree.online/sitemap.xml');
  
  const generateRobotsTxt = () => {
    let robotsTxt = '';
    
    robotsTxt += 'User-agent: *\n';
    
    if (allowAll) {
      robotsTxt += 'Allow: /\n';
    }
    
    if (disallowedPaths.trim()) {
      const paths = disallowedPaths.split('\n').filter(path => path.trim());
      paths.forEach(path => {
        robotsTxt += `Disallow: ${path.trim()}\n`;
      });
    }
    
    if (crawlDelay) {
      robotsTxt += `Crawl-delay: ${crawlDelay}\n`;
    }
    
    if (sitemapUrl) {
      robotsTxt += `\nSitemap: ${sitemapUrl}\n`;
    }
    
    return robotsTxt;
  };
  
  return (
    <GeneratorContainer>
      <GeneratorHeader>
        <h2>Robots.txt Generator</h2>
        <p>Configure your robots.txt file to control search engine crawling</p>
      </GeneratorHeader>
      
      <GeneratorSection>
        <h3>Basic Settings</h3>
        <p>
          Configure how search engines should crawl your website.
        </p>
        
        <SettingItem>
          <SettingInfo>
            <SettingTitle>Allow All Crawling</SettingTitle>
            <SettingDescription>
              Allow search engines to crawl all pages by default
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <input
              type="checkbox"
              checked={allowAll}
              onChange={() => setAllowAll(!allowAll)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
        
        <FormGroup>
          <label htmlFor="disallowed-paths">Disallowed Paths (one per line)</label>
          <textarea
            id="disallowed-paths"
            rows={5}
            value={disallowedPaths}
            onChange={(e) => setDisallowedPaths(e.target.value)}
            placeholder="/admin
/private
/temp"
          ></textarea>
          <HelpText>
            Enter paths that should not be crawled by search engines.
          </HelpText>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="crawl-delay">Crawl Delay (seconds)</label>
          <input
            id="crawl-delay"
            type="number"
            min="0"
            value={crawlDelay}
            onChange={(e) => setCrawlDelay(e.target.value)}
          />
          <HelpText>
            Time in seconds between consecutive crawls. Leave empty for no delay.
          </HelpText>
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="sitemap-url">Sitemap URL</label>
          <input
            id="sitemap-url"
            type="text"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder="https://toolsfree.online/sitemap.xml"
          />
          <HelpText>
            URL to your XML sitemap. Leave empty to exclude sitemap reference.
          </HelpText>
        </FormGroup>
      </GeneratorSection>
      
      <GeneratorSection>
        <h3>Preview</h3>
        <p>
          Preview of your robots.txt file:
        </p>
        
        <PreviewBox>
          <pre>{generateRobotsTxt()}</pre>
        </PreviewBox>
        
        <ButtonGroup>
          <Button primary>Generate robots.txt</Button>
          <Button>Download robots.txt</Button>
        </ButtonGroup>
      </GeneratorSection>
      
      <GeneratorSection>
        <h3>SEO Tips</h3>
        <TipsList>
          <TipItem>
            <TipIcon className="fas fa-robot" />
            <TipContent>
              <TipTitle>Be Selective with Disallow</TipTitle>
              <TipDescription>
                Only disallow pages that shouldn't be indexed. Blocking too much content can hurt your SEO.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-sitemap" />
            <TipContent>
              <TipTitle>Include Sitemap Reference</TipTitle>
              <TipDescription>
                Always include a reference to your XML sitemap in robots.txt for better crawling.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-tachometer-alt" />
            <TipContent>
              <TipTitle>Use Crawl Delay Wisely</TipTitle>
              <TipDescription>
                Set a reasonable crawl delay to prevent server overload, but don't make it too high.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-check-circle" />
            <TipContent>
              <TipTitle>Test Your Robots.txt</TipTitle>
              <TipDescription>
                Use Google Search Console's robots.txt tester to verify your file works as expected.
              </TipDescription>
            </TipContent>
          </TipItem>
        </TipsList>
      </GeneratorSection>
      
      <SaveButton>Save Settings</SaveButton>
    </GeneratorContainer>
  );
};

// Styled Components
const GeneratorContainer = styled.div`
  padding: 2rem;
`;

const GeneratorHeader = styled.div`
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

const GeneratorSection = styled.div`
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
  
  input, textarea {
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

const HelpText = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
`;

const PreviewBox = styled.div`
  background-color: #f5f5f5;
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  
  pre {
    font-family: monospace;
    font-size: 0.9rem;
    white-space: pre-wrap;
  }
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

export default RobotsTxtGenerator;
