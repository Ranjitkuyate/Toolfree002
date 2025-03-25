import React from 'react';
import styled from 'styled-components';
import { useAds } from '../components/ads/AdManager';
import AdBanner from '../components/ads/AdBanner';
import NativeAd from '../components/ads/NativeAd';
import SEO from '../components/SEO';

const SitemapPage = () => {
  const { adsEnabled, adPreferences } = useAds();

  return (
    <>
      <SEO 
        title="Sitemap | ToolsFree Online"
        description="Explore all the tools and resources available on ToolsFree Online. Our sitemap provides easy navigation to all our free online tools."
        keywords="sitemap, online tools, free tools, website navigation, tools directory"
        canonical="/sitemap"
      />
      
      <PageContainer>
        <PageHeader>
          <h1>Sitemap</h1>
          <p>Find all our tools and resources in one place</p>
        </PageHeader>
        
        {adsEnabled && adPreferences.showBannerAds && (
          <AdBanner zoneId="12345" type="leaderboard" />
        )}
        
        <SitemapContent>
          <SitemapSection>
            <SectionTitle>Main Pages</SectionTitle>
            <LinksList>
              <LinkItem>
                <LinkAnchor href="/">Home</LinkAnchor>
                <LinkDescription>Our main page with featured tools and latest updates</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/about">About Us</LinkAnchor>
                <LinkDescription>Learn about our mission and the team behind ToolsFree Online</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/contact">Contact</LinkAnchor>
                <LinkDescription>Get in touch with our support team</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/privacy-policy">Privacy Policy</LinkAnchor>
                <LinkDescription>Our commitment to protecting your privacy</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/terms-of-service">Terms of Service</LinkAnchor>
                <LinkDescription>Rules and guidelines for using our website</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          {adsEnabled && adPreferences.showNativeAds && (
            <NativeAd zoneId="67890" placement="in-article" />
          )}
          
          <SitemapSection>
            <SectionTitle>Text Tools</SectionTitle>
            <LinksList>
              <LinkItem>
                <LinkAnchor href="/tools/text/text-to-speech">Text to Speech</LinkAnchor>
                <LinkDescription>Convert written text to spoken words</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/text/word-counter">Word Counter</LinkAnchor>
                <LinkDescription>Count words, characters, and paragraphs in your text</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/text/text-case-converter">Text Case Converter</LinkAnchor>
                <LinkDescription>Convert text between uppercase, lowercase, and title case</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/text/lorem-ipsum-generator">Lorem Ipsum Generator</LinkAnchor>
                <LinkDescription>Generate placeholder text for design mockups</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/text/text-diff-checker">Text Diff Checker</LinkAnchor>
                <LinkDescription>Compare two texts and highlight the differences</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle>Image Tools</SectionTitle>
            <LinksList>
              <LinkItem>
                <LinkAnchor href="/tools/image/image-compressor">Image Compressor</LinkAnchor>
                <LinkDescription>Reduce image file size while maintaining quality</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/image/advanced-image-compressor">Advanced Image Compressor</LinkAnchor>
                <LinkDescription>Professional image compression with advanced options</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/image/image-converter">Image Converter</LinkAnchor>
                <LinkDescription>Convert images between different formats</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/image/image-resizer">Image Resizer</LinkAnchor>
                <LinkDescription>Resize images to specific dimensions</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/image/image-cropper">Image Cropper</LinkAnchor>
                <LinkDescription>Crop images to remove unwanted areas</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          {adsEnabled && adPreferences.showBannerAds && (
            <AdBanner zoneId="23456" type="rectangle" />
          )}
          
          <SitemapSection>
            <SectionTitle>Video Tools</SectionTitle>
            <LinksList>
              <LinkItem>
                <LinkAnchor href="/tools/video/all-in-one-downloader">All-in-One Downloader</LinkAnchor>
                <LinkDescription>Download videos from various platforms</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/video/video-editor">Video Editor</LinkAnchor>
                <LinkDescription>Basic video editing capabilities</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/video/enhanced-video-editor">Enhanced Video Editor</LinkAnchor>
                <LinkDescription>Advanced video editing with more features</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/video/video-compressor">Video Compressor</LinkAnchor>
                <LinkDescription>Reduce video file size while maintaining quality</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/video/video-converter">Video Converter</LinkAnchor>
                <LinkDescription>Convert videos between different formats</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          {adsEnabled && adPreferences.showNativeAds && (
            <NativeAd zoneId="78901" placement="in-feed" />
          )}
          
          <SitemapSection>
            <SectionTitle>Document Tools</SectionTitle>
            <LinksList>
              <LinkItem>
                <LinkAnchor href="/tools/document/pdf-compressor">PDF Compressor</LinkAnchor>
                <LinkDescription>Reduce PDF file size while maintaining quality</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/document/pdf-merger">PDF Merger</LinkAnchor>
                <LinkDescription>Combine multiple PDF files into one</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/document/pdf-splitter">PDF Splitter</LinkAnchor>
                <LinkDescription>Split PDF files into multiple documents</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/document/pdf-to-image">PDF to Image</LinkAnchor>
                <LinkDescription>Convert PDF pages to image files</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/document/image-to-pdf">Image to PDF</LinkAnchor>
                <LinkDescription>Convert images to PDF format</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle>New Tools</SectionTitle>
            <LinksList>
              <LinkItem>
                <LinkAnchor href="/tools/baby-name-generator">Baby Name Generator</LinkAnchor>
                <LinkDescription>Generate unique baby names by combining letters from parents' names</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/ai-tools">AI Tools</LinkAnchor>
                <LinkDescription>Access powerful AI capabilities powered by Google Gemini</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/password-generator">Password Generator</LinkAnchor>
                <LinkDescription>Create strong, secure passwords</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/qr-code-generator">QR Code Generator</LinkAnchor>
                <LinkDescription>Generate QR codes for websites, text, and more</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/tools/color-picker">Color Picker</LinkAnchor>
                <LinkDescription>Select and convert colors between different formats</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          {adsEnabled && adPreferences.showBannerAds && (
            <AdBanner zoneId="34567" type="rectangle" />
          )}
          
          <SitemapSection>
            <SectionTitle>Settings & Monetization</SectionTitle>
            <LinksList>
              <LinkItem>
                <LinkAnchor href="/ad-settings">Ad Settings</LinkAnchor>
                <LinkDescription>Customize your ad experience on our website</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/analytics-settings">Ad Analytics</LinkAnchor>
                <LinkDescription>Track your ad performance and revenue</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/monetization-optimization">Monetization Optimization</LinkAnchor>
                <LinkDescription>Strategies to maximize your website's revenue potential</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/performance-settings">Performance Settings</LinkAnchor>
                <LinkDescription>Optimize website performance for better user experience</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/robots-settings">Robots.txt Settings</LinkAnchor>
                <LinkDescription>Configure search engine crawling settings</LinkDescription>
              </LinkItem>
              <LinkItem>
                <LinkAnchor href="/sitemap-settings">Sitemap Settings</LinkAnchor>
                <LinkDescription>Configure XML sitemap for better SEO</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
        </SitemapContent>
        
        {adsEnabled && adPreferences.showBannerAds && (
          <AdBanner zoneId="45678" type="leaderboard" />
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

const SitemapContent = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const SitemapSection = styled.section`
  margin-bottom: 2.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LinkAnchor = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LinkDescription = styled.p`
  color: #666;
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
`;

export default SitemapPage;
