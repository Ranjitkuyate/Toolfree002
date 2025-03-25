import React from 'react';
import styled from 'styled-components';
import { useAds } from '../components/ads/AdManager';
import AdBanner from '../components/ads/AdBanner';
import NativeAd from '../components/ads/NativeAd';
import SEO from '../components/SEO';

const RobotsSettingsPage = () => {
  const { adsEnabled, adPreferences } = useAds();

  return (
    <>
      <SEO 
        title="Robots.txt Settings | ToolsFree Online"
        description="Configure your robots.txt file to optimize search engine crawling and indexing for better SEO performance."
        keywords="robots.txt, search engine optimization, SEO, web crawlers, search engine indexing"
        canonical="/robots-settings"
      />
      
      <PageContainer>
        <PageHeader>
          <h1>Robots.txt Settings</h1>
          <p>Optimize search engine crawling for better SEO</p>
        </PageHeader>
        
        {adsEnabled && adPreferences.showBannerAds && (
          <AdBanner zoneId="12345" type="leaderboard" />
        )}
        
        <ContentContainer>
          <MainContent>
            <Section>
              <h2>What is robots.txt?</h2>
              <p>
                A robots.txt file tells search engine crawlers which pages or files the crawler can or can't request from your site. 
                This is used mainly to avoid overloading your site with requests; it is not a mechanism for keeping a web page out 
                of Google. To keep a web page out of Google, you should use noindex directives or password-protect your page.
              </p>
              
              {adsEnabled && adPreferences.showNativeAds && (
                <NativeAd zoneId="67890" placement="in-article" />
              )}
              
              <h3>How robots.txt Works</h3>
              <p>
                When a search engine crawler visits a site, it first checks for the existence of a robots.txt file at the root of the website. 
                For example, if the website is example.com, the crawler will look for example.com/robots.txt. The robots.txt file contains 
                instructions that tell the crawler which parts of the site it should and shouldn't crawl.
              </p>
            </Section>
            
            <Section>
              <h2>Optimizing Your robots.txt for Monetization</h2>
              <p>
                A properly configured robots.txt file can help improve your website's SEO, which in turn can increase traffic and ad revenue. 
                Here are some strategies for optimizing your robots.txt file to support your monetization goals:
              </p>
              
              <h3>1. Allow Crawling of Important Content</h3>
              <p>
                Make sure search engines can crawl and index your most valuable content. This includes:
              </p>
              <ul>
                <li>Tool pages that generate the most user engagement</li>
                <li>High-quality content that attracts organic traffic</li>
                <li>Pages with strategic ad placements</li>
              </ul>
              
              <CodeBlock>
                <pre>
                  {`User-agent: *
Allow: /tools/
Allow: /blog/
Allow: /guides/`}
                </pre>
              </CodeBlock>
              
              {adsEnabled && adPreferences.showBannerAds && (
                <AdBanner zoneId="23456" type="rectangle" />
              )}
              
              <h3>2. Block Low-Value Pages</h3>
              <p>
                Prevent search engines from crawling pages that don't contribute to your SEO or monetization goals:
              </p>
              <ul>
                <li>Admin pages and dashboards</li>
                <li>Duplicate content or printer-friendly versions</li>
                <li>Thank you pages and confirmation screens</li>
                <li>Pages with minimal content or utility</li>
              </ul>
              
              <CodeBlock>
                <pre>
                  {`User-agent: *
Disallow: /admin/
Disallow: /thank-you/
Disallow: /print/
Disallow: /temp/`}
                </pre>
              </CodeBlock>
              
              <h3>3. Optimize Crawl Budget</h3>
              <p>
                Search engines allocate a certain amount of resources (crawl budget) to crawling your site. 
                Optimize this budget by directing crawlers to your most important pages:
              </p>
              
              <CodeBlock>
                <pre>
                  {`User-agent: *
# Important monetized pages - high priority
Allow: /tools/baby-name-generator
Allow: /tools/image/advanced-image-compressor
Allow: /tools/video/enhanced-video-editor
Allow: /ai-tools

# Less important pages - lower priority
Disallow: /old-tools/
Disallow: /beta/`}
                </pre>
              </CodeBlock>
              
              {adsEnabled && adPreferences.showNativeAds && (
                <NativeAd zoneId="78901" placement="in-feed" />
              )}
              
              <h3>4. Specify Your Sitemap</h3>
              <p>
                Include a reference to your XML sitemap in your robots.txt file to help search engines discover all your important pages:
              </p>
              
              <CodeBlock>
                <pre>
                  {`Sitemap: https://toolsfree.online/sitemap.xml`}
                </pre>
              </CodeBlock>
            </Section>
            
            <Section>
              <h2>Sample robots.txt for Monetization</h2>
              <p>
                Here's a sample robots.txt file optimized for a tools website with monetization goals:
              </p>
              
              <CodeBlock>
                <pre>
                  {`# robots.txt for ToolsFree Online
# https://toolsfree.online

User-agent: *
# Allow crawling of all tool pages
Allow: /tools/

# Allow crawling of monetization-related pages
Allow: /monetization-optimization
Allow: /ad-settings
Allow: /analytics-settings

# Block admin and utility pages
Disallow: /admin/
Disallow: /api/
Disallow: /includes/
Disallow: /temp/
Disallow: /test/

# Block duplicate content
Disallow: /*?*
Disallow: /*&*
Disallow: /print/

# Block ad-related scripts and resources to avoid crawling
Disallow: /sw.js
Disallow: /ads.txt

# Specify sitemap location
Sitemap: https://toolsfree.online/sitemap.xml`}
                </pre>
              </CodeBlock>
              
              <Note>
                <NoteIcon className="fas fa-info-circle" />
                <NoteText>
                  <strong>Important:</strong> Notice that we're blocking the Propeller Ads service worker (sw.js) from being crawled. 
                  This is important because search engines don't need to crawl ad-related files, and it helps preserve your crawl budget 
                  for more important content.
                </NoteText>
              </Note>
            </Section>
            
            <Section>
              <h2>Implementing Your robots.txt File</h2>
              <p>
                To implement your robots.txt file:
              </p>
              <ol>
                <li>Create a text file named "robots.txt"</li>
                <li>Add your directives following the format shown above</li>
                <li>Upload the file to the root directory of your website (e.g., https://toolsfree.online/robots.txt)</li>
                <li>Verify the file is accessible by visiting the URL directly in your browser</li>
              </ol>
              
              <p>
                For a Next.js website deployed on Netlify (as we'll be setting up in the next steps), you should place your 
                robots.txt file in the public directory of your project. This ensures it will be available at the root of your 
                website after deployment.
              </p>
              
              {adsEnabled && adPreferences.showBannerAds && (
                <AdBanner zoneId="34567" type="rectangle" />
              )}
            </Section>
            
            <Section>
              <h2>Testing Your robots.txt</h2>
              <p>
                After implementing your robots.txt file, it's important to test it to ensure it's working as expected:
              </p>
              <ol>
                <li>Use Google Search Console's robots.txt Tester to validate your file</li>
                <li>Check if important pages are allowed and low-value pages are blocked</li>
                <li>Monitor your crawl stats in Google Search Console to see if crawl efficiency improves</li>
              </ol>
              
              <p>
                Remember that changes to your robots.txt file may take some time to affect how search engines crawl your site. 
                Be patient and monitor your analytics to see the impact on your traffic and ad revenue.
              </p>
            </Section>
          </MainContent>
          
          <Sidebar>
            <SidebarWidget>
              <h3>Quick Implementation</h3>
              <p>
                Copy this robots.txt template and customize it for your website:
              </p>
              <CopyButton onClick={() => {
                navigator.clipboard.writeText(`# robots.txt for Your Website
# https://yourdomain.com

User-agent: *
Allow: /tools/
Disallow: /admin/
Disallow: /api/
Disallow: /temp/
Disallow: /*?*
Disallow: /sw.js

Sitemap: https://yourdomain.com/sitemap.xml`);
                alert('Template copied to clipboard!');
              }}>
                Copy Template
              </CopyButton>
            </SidebarWidget>
            
            {adsEnabled && adPreferences.showBannerAds && (
              <SidebarWidget>
                <AdBanner zoneId="45678" type="skyscraper" />
              </SidebarWidget>
            )}
            
            <SidebarWidget>
              <h3>SEO Tips</h3>
              <TipsList>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Update your robots.txt when adding new important content</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Block parameter-based URLs to avoid duplicate content issues</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Use Google Search Console to monitor crawl errors</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Keep your sitemap updated and referenced in robots.txt</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Block ad-related files to preserve crawl budget</TipText>
                </TipItem>
              </TipsList>
            </SidebarWidget>
            
            {adsEnabled && adPreferences.showNativeAds && (
              <SidebarWidget>
                <NativeAd zoneId="56789" placement="recommendation" />
              </SidebarWidget>
            )}
            
            <SidebarWidget>
              <h3>Related Resources</h3>
              <ResourcesList>
                <ResourceItem>
                  <a href="/sitemap-settings">XML Sitemap Settings</a>
                </ResourceItem>
                <ResourceItem>
                  <a href="/monetization-optimization">Monetization Optimization</a>
                </ResourceItem>
                <ResourceItem>
                  <a href="/analytics-settings">Ad Analytics Dashboard</a>
                </ResourceItem>
                <ResourceItem>
                  <a href="https://developers.google.com/search/docs/advanced/robots/intro" target="_blank" rel="noopener noreferrer">
                    Google's Robots.txt Documentation
                  </a>
                </ResourceItem>
                <ResourceItem>
                  <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                    Google Search Console
                  </a>
                </ResourceItem>
              </ResourcesList>
            </SidebarWidget>
          </Sidebar>
        </ContentContainer>
        
        <CallToAction>
          <h2>Ready to Optimize Your Website?</h2>
          <p>
            Implement these robots.txt strategies along with our other monetization techniques to maximize your website's revenue potential.
          </p>
          <CTAButtons>
            <CTAButton primary href="/monetization-optimization">View Monetization Guide</CTAButton>
            <CTAButton href="/sitemap-settings">Configure Sitemap</CTAButton>
          </CTAButtons>
        </CallToAction>
        
        {adsEnabled && adPreferences.showBannerAds && (
          <AdBanner zoneId="67890" type="leaderboard" />
        )}
      </PageContainer>
    </>
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

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h2 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.3rem;
    margin: 1.5rem 0 0.75rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
      line-height: 1.5;
    }
  }
`;

const CodeBlock = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  
  pre {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const Note = styled.div`
  background-color: #f8f9fa;
  border-left: 4px solid var(--primary-color);
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: flex-start;
`;

const NoteIcon = styled.i`
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-right: 0.75rem;
  margin-top: 0.25rem;
`;

const NoteText = styled.div`
  flex: 1;
  
  strong {
    font-weight: 600;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SidebarWidget = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  
  h3 {
    font-size: 1.2rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
`;

const CopyButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 100%;
  
  &:hover {
    background-color: var(--primary-color-dark);
  }
`;

const TipsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TipItem = styled.li`
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const TipIcon = styled.i`
  font-size: 1rem;
  color: var(--primary-color);
  margin-right: 0.75rem;
  margin-top: 0.25rem;
`;

const TipText = styled.span`
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ResourcesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ResourceItem = styled.li`
  margin-bottom: 0.75rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 0.9rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CallToAction = styled.div`
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAButton = styled.a<{ primary?: boolean }>`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  
  background-color: ${props => props.primary ? 'white' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.primary ? 'var(--primary-color)' : 'white'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export default RobotsSettingsPage;
