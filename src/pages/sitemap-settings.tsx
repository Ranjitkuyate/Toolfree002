import React from 'react';
import styled from 'styled-components';
import { useAds } from '../components/ads/AdManager';
import AdBanner from '../components/ads/AdBanner';
import NativeAd from '../components/ads/NativeAd';
import SEO from '../components/SEO';

const SitemapSettingsPage = () => {
  const { adsEnabled, adPreferences } = useAds();

  return (
    <>
      <SEO 
        title="XML Sitemap Settings | ToolsFree Online"
        description="Configure your XML sitemap to improve search engine indexing and boost your website's SEO performance for better monetization."
        keywords="XML sitemap, SEO, search engine optimization, website indexing, Google Search Console"
        canonical="/sitemap-settings"
      />
      
      <PageContainer>
        <PageHeader>
          <h1>XML Sitemap Settings</h1>
          <p>Improve search engine indexing for better SEO and monetization</p>
        </PageHeader>
        
        {adsEnabled && adPreferences.showBannerAds && (
          <AdBanner zoneId="12345" type="leaderboard" />
        )}
        
        <ContentContainer>
          <MainContent>
            <Section>
              <h2>What is an XML Sitemap?</h2>
              <p>
                An XML sitemap is a file that lists all the important pages on your website to ensure that search engines can find and crawl them. 
                It's like a roadmap that helps search engines understand the structure of your site and discover content they might otherwise miss.
              </p>
              
              {adsEnabled && adPreferences.showNativeAds && (
                <NativeAd zoneId="67890" placement="in-article" />
              )}
              
              <h3>Why XML Sitemaps Matter for Monetization</h3>
              <p>
                A well-configured XML sitemap can significantly impact your website's SEO performance, which directly affects your traffic and ad revenue. 
                By ensuring that search engines can discover and index all your monetized pages, you increase the chances of attracting more visitors 
                and generating more ad impressions.
              </p>
            </Section>
            
            <Section>
              <h2>Creating an Effective XML Sitemap</h2>
              <p>
                To create an XML sitemap that supports your monetization goals, follow these best practices:
              </p>
              
              <h3>1. Include All Important Pages</h3>
              <p>
                Make sure your sitemap includes all pages that contribute to your revenue:
              </p>
              <ul>
                <li>Tool pages with ad placements</li>
                <li>Content pages that attract organic traffic</li>
                <li>Landing pages for popular features</li>
                <li>Resource pages and guides</li>
              </ul>
              
              <CodeBlock>
                <pre>
                  {`<url>
  <loc>https://toolsfree.online/tools/baby-name-generator</loc>
  <lastmod>2025-03-24</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`}
                </pre>
              </CodeBlock>
              
              {adsEnabled && adPreferences.showBannerAds && (
                <AdBanner zoneId="23456" type="rectangle" />
              )}
              
              <h3>2. Set Appropriate Priority Levels</h3>
              <p>
                Assign priority values (0.0 to 1.0) to indicate the relative importance of each page:
              </p>
              <ul>
                <li><strong>1.0</strong>: Homepage</li>
                <li><strong>0.8-0.9</strong>: Main tool pages and high-revenue content</li>
                <li><strong>0.6-0.7</strong>: Secondary tools and content</li>
                <li><strong>0.4-0.5</strong>: Support pages (about, contact, etc.)</li>
                <li><strong>0.1-0.3</strong>: Less important pages</li>
              </ul>
              
              <p>
                Prioritize pages that generate the most revenue or have the highest potential for monetization.
              </p>
              
              <h3>3. Set Appropriate Change Frequencies</h3>
              <p>
                Indicate how often each page is updated to help search engines determine crawl frequency:
              </p>
              <ul>
                <li><strong>always</strong>: Pages that change with every access (rare)</li>
                <li><strong>hourly/daily</strong>: Frequently updated content</li>
                <li><strong>weekly</strong>: Regularly updated tools or features</li>
                <li><strong>monthly</strong>: Content that changes occasionally</li>
                <li><strong>yearly/never</strong>: Static content that rarely changes</li>
              </ul>
              
              {adsEnabled && adPreferences.showNativeAds && (
                <NativeAd zoneId="78901" placement="in-feed" />
              )}
              
              <h3>4. Include Last Modified Dates</h3>
              <p>
                Add the last modified date for each URL to help search engines understand when content was updated:
              </p>
              
              <CodeBlock>
                <pre>
                  {`<lastmod>2025-03-24</lastmod>`}
                </pre>
              </CodeBlock>
              
              <p>
                Keep these dates accurate and update them whenever you make significant changes to a page.
              </p>
            </Section>
            
            <Section>
              <h2>Sample XML Sitemap for Monetization</h2>
              <p>
                Here's a sample XML sitemap optimized for a tools website with monetization goals:
              </p>
              
              <CodeBlock>
                <pre>
                  {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>https://toolsfree.online/</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- High-Revenue Tool Pages -->
  <url>
    <loc>https://toolsfree.online/tools/baby-name-generator</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/tools/image/advanced-image-compressor</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/tools/video/enhanced-video-editor</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/ai-tools</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Monetization Pages -->
  <url>
    <loc>https://toolsfree.online/monetization-optimization</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/ad-settings</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/analytics-settings</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Secondary Tool Pages -->
  <url>
    <loc>https://toolsfree.online/tools/text/text-to-speech</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/tools/video/all-in-one-downloader</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- Support Pages -->
  <url>
    <loc>https://toolsfree.online/about</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/contact</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/privacy-policy</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
  <url>
    <loc>https://toolsfree.online/terms-of-service</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>`}
                </pre>
              </CodeBlock>
              
              <Note>
                <NoteIcon className="fas fa-info-circle" />
                <NoteText>
                  <strong>Important:</strong> Notice how we've prioritized high-revenue tool pages and monetization-related content 
                  with higher priority values. This helps search engines focus on crawling and indexing your most valuable pages first.
                </NoteText>
              </Note>
            </Section>
            
            <Section>
              <h2>Implementing Your XML Sitemap</h2>
              <p>
                To implement your XML sitemap:
              </p>
              <ol>
                <li>Create an XML file named "sitemap.xml" with the structure shown above</li>
                <li>Customize the URLs, last modified dates, change frequencies, and priorities for your specific pages</li>
                <li>Upload the file to the root directory of your website (e.g., https://toolsfree.online/sitemap.xml)</li>
                <li>Reference your sitemap in your robots.txt file (as shown in the Robots.txt Settings page)</li>
                <li>Submit your sitemap to Google Search Console and other search engine webmaster tools</li>
              </ol>
              
              <p>
                For a Next.js website deployed on Netlify (as we'll be setting up in the next steps), you should place your 
                sitemap.xml file in the public directory of your project. This ensures it will be available at the root of your 
                website after deployment.
              </p>
              
              {adsEnabled && adPreferences.showBannerAds && (
                <AdBanner zoneId="34567" type="rectangle" />
              )}
            </Section>
            
            <Section>
              <h2>Dynamic Sitemap Generation</h2>
              <p>
                For websites with many pages or frequently changing content, manually maintaining a sitemap can be challenging. 
                Consider implementing dynamic sitemap generation:
              </p>
              
              <h3>Next.js Dynamic Sitemap Example</h3>
              <p>
                Here's how to create a dynamic sitemap in Next.js:
              </p>
              
              <CodeBlock>
                <pre>
                  {`// pages/sitemap.xml.js
import { getAllToolPaths } from '../lib/tools';

const Sitemap = () => {
  // This component doesn't render anything
  return null;
};

export const getServerSideProps = async ({ res }) => {
  // Get all tool paths from your data source
  const tools = await getAllToolPaths();
  
  // Generate sitemap XML
  const sitemap = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://toolsfree.online/</loc>
    <lastmod>\${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  \${tools.map(tool => \`
  <url>
    <loc>https://toolsfree.online\${tool.path}</loc>
    <lastmod>\${tool.lastModified || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>\${tool.changeFreq || 'weekly'}</changefreq>
    <priority>\${tool.priority || '0.7'}</priority>
  </url>
  \`).join('')}
  <!-- Add other static pages here -->
</urlset>\`;

  // Set appropriate headers
  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');
  
  // Send the XML response
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;`}
                </pre>
              </CodeBlock>
              
              <p>
                This approach generates your sitemap dynamically based on your actual content, ensuring it's always up-to-date.
              </p>
            </Section>
            
            <Section>
              <h2>Monitoring Sitemap Performance</h2>
              <p>
                After implementing your sitemap, monitor its performance to ensure it's helping your SEO and monetization goals:
              </p>
              <ol>
                <li>Use Google Search Console to check for sitemap errors or warnings</li>
                <li>Monitor the indexing status of your important pages</li>
                <li>Track organic traffic to pages listed in your sitemap</li>
                <li>Analyze the correlation between page indexing and ad revenue</li>
                <li>Update your sitemap regularly based on performance data</li>
              </ol>
              
              <p>
                Remember that SEO improvements take time to show results. Be patient and continue optimizing your sitemap 
                based on performance data to maximize your website's monetization potential.
              </p>
            </Section>
          </MainContent>
          
          <Sidebar>
            <SidebarWidget>
              <h3>Quick Implementation</h3>
              <p>
                Copy this sitemap template and customize it for your website:
              </p>
              <CopyButton onClick={() => {
                navigator.clipboard.writeText(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-03-24</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add your pages here -->
</urlset>`);
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
                  <TipText>Update your sitemap whenever you add new content</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Prioritize pages with the highest monetization potential</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Keep lastmod dates accurate to encourage recrawling</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Submit your sitemap to all major search engines</TipText>
                </TipItem>
                <TipItem>
                  <TipIcon className="fas fa-check-circle" />
                  <TipText>Use dynamic generation for large or frequently changing sites</TipText>
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
                  <a href="/robots-settings">Robots.txt Settings</a>
                </ResourceItem>
                <ResourceItem>
                  <a href="/monetization-optimization">Monetization Optimization</a>
                </ResourceItem>
                <ResourceItem>
                  <a href="/analytics-settings">Ad Analytics Dashboard</a>
                </ResourceItem>
                <ResourceItem>
                  <a href="https://developers.google.com/search/docs/advanced/sitemaps/overview" target="_blank" rel="noopener noreferrer">
                    Google's Sitemap Documentation
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
          <h2>Ready to Boost Your SEO and Revenue?</h2>
          <p>
            Implement these sitemap strategies along with our other monetization techniques to maximize your website's visibility and revenue potential.
          </p>
          <CTAButtons>
            <CTAButton primary href="/monetization-optimization">View Monetization Guide</CTAButton>
            <CTAButton href="/robots-settings">Configure Robots.txt</CTAButton>
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

export default SitemapSettingsPage;
