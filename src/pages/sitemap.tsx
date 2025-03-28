import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
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
                <Link href="/" legacyBehavior>
                  <LinkAnchor>Home</LinkAnchor>
                </Link>
                <LinkDescription>Our main page with featured tools and latest updates</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/about" legacyBehavior>
                  <LinkAnchor>About Us</LinkAnchor>
                </Link>
                <LinkDescription>Learn about our mission and the team behind ToolsFree Online</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/contact" legacyBehavior>
                  <LinkAnchor>Contact</LinkAnchor>
                </Link>
                <LinkDescription>Get in touch with our support team</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/privacy-policy" legacyBehavior>
                  <LinkAnchor>Privacy Policy</LinkAnchor>
                </Link>
                <LinkDescription>Our commitment to protecting your privacy</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/terms-of-service" legacyBehavior>
                  <LinkAnchor>Terms of Service</LinkAnchor>
                </Link>
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
                <Link href="/tools/text/text-to-speech" legacyBehavior>
                  <LinkAnchor>Text to Speech</LinkAnchor>
                </Link>
                <LinkDescription>Convert written text to spoken words</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/text/word-counter" legacyBehavior>
                  <LinkAnchor>Word Counter</LinkAnchor>
                </Link>
                <LinkDescription>Count words, characters, and paragraphs in your text</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/text/text-case-converter" legacyBehavior>
                  <LinkAnchor>Text Case Converter</LinkAnchor>
                </Link>
                <LinkDescription>Convert text between uppercase, lowercase, and title case</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/text/lorem-ipsum-generator" legacyBehavior>
                  <LinkAnchor>Lorem Ipsum Generator</LinkAnchor>
                </Link>
                <LinkDescription>Generate placeholder text for design mockups</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/text/text-diff-checker" legacyBehavior>
                  <LinkAnchor>Text Diff Checker</LinkAnchor>
                </Link>
                <LinkDescription>Compare two texts and highlight the differences</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle>Image Tools</SectionTitle>
            <LinksList>
              <LinkItem>
                <Link href="/tools/image/image-compressor" legacyBehavior>
                  <LinkAnchor>Image Compressor</LinkAnchor>
                </Link>
                <LinkDescription>Reduce image file size while maintaining quality</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/image/advanced-image-compressor" legacyBehavior>
                  <LinkAnchor>Advanced Image Compressor</LinkAnchor>
                </Link>
                <LinkDescription>Professional image compression with advanced options</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/image/image-converter" legacyBehavior>
                  <LinkAnchor>Image Converter</LinkAnchor>
                </Link>
                <LinkDescription>Convert images between different formats</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/image/image-resizer" legacyBehavior>
                  <LinkAnchor>Image Resizer</LinkAnchor>
                </Link>
                <LinkDescription>Resize images to specific dimensions</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/image/image-cropper" legacyBehavior>
                  <LinkAnchor>Image Cropper</LinkAnchor>
                </Link>
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
                <Link href="/tools/video/all-in-one-downloader" legacyBehavior>
                  <LinkAnchor>All-in-One Downloader</LinkAnchor>
                </Link>
                <LinkDescription>Download videos from various platforms</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/video/video-editor" legacyBehavior>
                  <LinkAnchor>Video Editor</LinkAnchor>
                </Link>
                <LinkDescription>Basic video editing capabilities</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/video/enhanced-video-editor" legacyBehavior>
                  <LinkAnchor>Enhanced Video Editor</LinkAnchor>
                </Link>
                <LinkDescription>Advanced video editing with more features</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/video/video-compressor" legacyBehavior>
                  <LinkAnchor>Video Compressor</LinkAnchor>
                </Link>
                <LinkDescription>Reduce video file size while maintaining quality</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/video/video-converter" legacyBehavior>
                  <LinkAnchor>Video Converter</LinkAnchor>
                </Link>
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
                <Link href="/tools/document/pdf-compressor" legacyBehavior>
                  <LinkAnchor>PDF Compressor</LinkAnchor>
                </Link>
                <LinkDescription>Reduce PDF file size while maintaining quality</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/document/pdf-merger" legacyBehavior>
                  <LinkAnchor>PDF Merger</LinkAnchor>
                </Link>
                <LinkDescription>Combine multiple PDF files into one</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/document/pdf-splitter" legacyBehavior>
                  <LinkAnchor>PDF Splitter</LinkAnchor>
                </Link>
                <LinkDescription>Split PDF files into multiple documents</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/document/pdf-to-image" legacyBehavior>
                  <LinkAnchor>PDF to Image</LinkAnchor>
                </Link>
                <LinkDescription>Convert PDF pages to image files</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/document/image-to-pdf" legacyBehavior>
                  <LinkAnchor>Image to PDF</LinkAnchor>
                </Link>
                <LinkDescription>Convert images to PDF format</LinkDescription>
              </LinkItem>
            </LinksList>
          </SitemapSection>
          
          <SitemapSection>
            <SectionTitle>New Tools</SectionTitle>
            <LinksList>
              <LinkItem>
                <Link href="/tools/baby-name-generator" legacyBehavior>
                  <LinkAnchor>Baby Name Generator</LinkAnchor>
                </Link>
                <LinkDescription>Generate unique baby names by combining letters from parents' names</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/ai-tools" legacyBehavior>
                  <LinkAnchor>AI Tools</LinkAnchor>
                </Link>
                <LinkDescription>Access powerful AI capabilities powered by Google Gemini</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/password-generator" legacyBehavior>
                  <LinkAnchor>Password Generator</LinkAnchor>
                </Link>
                <LinkDescription>Create strong, secure passwords</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/qr-code-generator" legacyBehavior>
                  <LinkAnchor>QR Code Generator</LinkAnchor>
                </Link>
                <LinkDescription>Generate QR codes for websites, text, and more</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/tools/color-picker" legacyBehavior>
                  <LinkAnchor>Color Picker</LinkAnchor>
                </Link>
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
                <Link href="/ad-settings" legacyBehavior>
                  <LinkAnchor>Ad Settings</LinkAnchor>
                </Link>
                <LinkDescription>Customize your ad experience on our website</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/analytics-settings" legacyBehavior>
                  <LinkAnchor>Ad Analytics</LinkAnchor>
                </Link>
                <LinkDescription>Track your ad performance and revenue</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/monetization-optimization" legacyBehavior>
                  <LinkAnchor>Monetization Optimization</LinkAnchor>
                </Link>
                <LinkDescription>Strategies to maximize your website's revenue potential</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/performance-settings" legacyBehavior>
                  <LinkAnchor>Performance Settings</LinkAnchor>
                </Link>
                <LinkDescription>Optimize website performance for better user experience</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/robots-settings" legacyBehavior>
                  <LinkAnchor>Robots.txt Settings</LinkAnchor>
                </Link>
                <LinkDescription>Configure search engine crawling settings</LinkDescription>
              </LinkItem>
              <LinkItem>
                <Link href="/sitemap-settings" legacyBehavior>
                  <LinkAnchor>Sitemap Settings</LinkAnchor>
                </Link>
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
