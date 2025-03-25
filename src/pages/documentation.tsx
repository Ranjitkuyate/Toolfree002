import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const Documentation = () => {
  return (
    <Layout>
      <div className="container">
        <SectionTitle 
          title="Documentation" 
          subtitle="Complete guide to the ToolsFree Online platform"
        />
        
        <AdBanner position="top" size="medium" />
        
        <DocContainer>
          <DocSection>
            <h2>Project Overview</h2>
            <p>
              ToolsFree Online is a comprehensive web platform offering 30+ free online tools for various purposes. 
              The platform is built with Next.js and React, optimized for speed and SEO, and includes monetization 
              through Propeller Ads. All tools are implemented using free resources and APIs, with no paid services required.
            </p>
            
            <h3>Key Features</h3>
            <FeatureList>
              <FeatureItem>
                <FeatureIcon className="fas fa-tools" />
                <FeatureContent>
                  <FeatureTitle>30+ Free Online Tools</FeatureTitle>
                  <FeatureDescription>
                    Comprehensive collection of tools organized by categories including text tools, image tools, 
                    video tools, audio tools, converters, calculators, and more.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-download" />
                <FeatureContent>
                  <FeatureTitle>All-in-One Downloader</FeatureTitle>
                  <FeatureDescription>
                    Download videos, images, and audio from multiple platforms including YouTube, Facebook, 
                    Instagram, Twitter, TikTok, Pinterest, and SoundCloud.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-video" />
                <FeatureContent>
                  <FeatureTitle>Advanced Video Editor</FeatureTitle>
                  <FeatureDescription>
                    Edit videos with features like trimming, watermark removal, text overlay, cropping, 
                    speed adjustment, and filters.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-robot" />
                <FeatureContent>
                  <FeatureTitle>AI Integration</FeatureTitle>
                  <FeatureDescription>
                    Connect to free AI APIs like Google Gemini to enhance tool functionality with 
                    text summarization, content generation, and smart suggestions.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-ad" />
                <FeatureContent>
                  <FeatureTitle>Monetization</FeatureTitle>
                  <FeatureDescription>
                    Integrated with Propeller Ads for revenue generation with configurable ad placements, 
                    density, and categories.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-tachometer-alt" />
                <FeatureContent>
                  <FeatureTitle>Speed & SEO Optimization</FeatureTitle>
                  <FeatureDescription>
                    Optimized for fast loading times and search engine visibility with features like 
                    lazy loading, image optimization, sitemap generation, and robots.txt configuration.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            </FeatureList>
          </DocSection>
          
          <DocSection>
            <h2>Technical Architecture</h2>
            <p>
              The platform is built with a modern tech stack focused on performance, scalability, and maintainability.
            </p>
            
            <h3>Technology Stack</h3>
            <TechStackGrid>
              <TechItem>
                <TechName>Next.js</TechName>
                <TechDescription>React framework for server-side rendering and static site generation</TechDescription>
              </TechItem>
              
              <TechItem>
                <TechName>React</TechName>
                <TechDescription>JavaScript library for building user interfaces</TechDescription>
              </TechItem>
              
              <TechItem>
                <TechName>TypeScript</TechName>
                <TechDescription>Typed superset of JavaScript for improved code quality</TechDescription>
              </TechItem>
              
              <TechItem>
                <TechName>Styled Components</TechName>
                <TechDescription>CSS-in-JS library for component-scoped styling</TechDescription>
              </TechItem>
              
              <TechItem>
                <TechName>Vercel</TechName>
                <TechDescription>Deployment platform optimized for Next.js applications</TechDescription>
              </TechItem>
              
              <TechItem>
                <TechName>Free APIs</TechName>
                <TechDescription>Various free APIs for tool functionality</TechDescription>
              </TechItem>
            </TechStackGrid>
            
            <h3>Project Structure</h3>
            <CodeBlock>
              <pre>
{`toolsfree-online/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ads/            # Ad-related components
│   │   ├── tools/          # Tool-specific components
│   │   ├── Layout.tsx      # Main layout component
│   │   ├── Header.tsx      # Header component
│   │   ├── Footer.tsx      # Footer component
│   │   ├── ToolCard.tsx    # Tool card component
│   │   └── ...
│   ├── pages/              # Next.js pages
│   │   ├── index.tsx       # Homepage
│   │   ├── tools/          # Tool pages
│   │   ├── about.tsx       # About page
│   │   ├── contact.tsx     # Contact page
│   │   └── ...
│   ├── styles/             # Global styles
│   ├── utils/              # Utility functions
│   └── api/                # API routes
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration`}
              </pre>
            </CodeBlock>
          </DocSection>
          
          <DocSection>
            <h2>Tool Implementation</h2>
            <p>
              The platform includes 30+ tools organized by categories. Each tool is implemented as a separate component 
              and page, with a consistent user interface and experience.
            </p>
            
            <h3>Tool Categories</h3>
            <CategoryList>
              <CategoryItem>
                <CategoryName>Text Tools</CategoryName>
                <ToolsList>
                  <ToolItem>Text to Speech</ToolItem>
                  <ToolItem>Speech to Text</ToolItem>
                  <ToolItem>Text Translator</ToolItem>
                  <ToolItem>Text Case Converter</ToolItem>
                  <ToolItem>Lorem Ipsum Generator</ToolItem>
                  <ToolItem>Word Counter</ToolItem>
                </ToolsList>
              </CategoryItem>
              
              <CategoryItem>
                <CategoryName>Image Tools</CategoryName>
                <ToolsList>
                  <ToolItem>Image Compressor</ToolItem>
                  <ToolItem>Image Resizer</ToolItem>
                  <ToolItem>Image Converter</ToolItem>
                  <ToolItem>Background Remover</ToolItem>
                  <ToolItem>Image Cropper</ToolItem>
                  <ToolItem>Image Filter</ToolItem>
                </ToolsList>
              </CategoryItem>
              
              <CategoryItem>
                <CategoryName>Video Tools</CategoryName>
                <ToolsList>
                  <ToolItem>Video Compressor</ToolItem>
                  <ToolItem>Video Converter</ToolItem>
                  <ToolItem>Video Trimmer</ToolItem>
                  <ToolItem>Video Editor</ToolItem>
                  <ToolItem>Watermark Remover</ToolItem>
                  <ToolItem>All-in-One Downloader</ToolItem>
                </ToolsList>
              </CategoryItem>
              
              <CategoryItem>
                <CategoryName>Audio Tools</CategoryName>
                <ToolsList>
                  <ToolItem>Audio Converter</ToolItem>
                  <ToolItem>Audio Trimmer</ToolItem>
                  <ToolItem>Audio Joiner</ToolItem>
                  <ToolItem>Voice Recorder</ToolItem>
                  <ToolItem>Audio Effects</ToolItem>
                </ToolsList>
              </CategoryItem>
              
              <CategoryItem>
                <CategoryName>Converters</CategoryName>
                <ToolsList>
                  <ToolItem>Unit Converter</ToolItem>
                  <ToolItem>Currency Converter</ToolItem>
                  <ToolItem>PDF to Word</ToolItem>
                  <ToolItem>Word to PDF</ToolItem>
                  <ToolItem>JSON to CSV</ToolItem>
                  <ToolItem>CSV to JSON</ToolItem>
                </ToolsList>
              </CategoryItem>
              
              <CategoryItem>
                <CategoryName>Calculators</CategoryName>
                <ToolsList>
                  <ToolItem>Scientific Calculator</ToolItem>
                  <ToolItem>BMI Calculator</ToolItem>
                  <ToolItem>Age Calculator</ToolItem>
                  <ToolItem>Percentage Calculator</ToolItem>
                  <ToolItem>Loan Calculator</ToolItem>
                </ToolsList>
              </CategoryItem>
            </CategoryList>
            
            <h3>New Tools Implementation</h3>
            <p>
              The platform includes two major new tools: All-in-One Downloader and Video Editor. These tools are 
              implemented with advanced features to provide a comprehensive solution for users.
            </p>
            
            <h4>All-in-One Downloader</h4>
            <p>
              The All-in-One Downloader supports multiple platforms including YouTube, Facebook, Instagram, Twitter, 
              TikTok, Pinterest, and SoundCloud. Users can paste a URL, select quality options, and download videos, 
              images, or audio from these platforms.
            </p>
            
            <h4>Video Editor</h4>
            <p>
              The Video Editor includes features like trimming, watermark removal, text overlay, cropping, speed 
              adjustment, and filters. Users can upload videos, edit them with these features, and download the 
              edited videos in various formats.
            </p>
          </DocSection>
          
          <DocSection>
            <h2>AI Integration</h2>
            <p>
              The platform integrates with free AI APIs like Google Gemini to enhance tool functionality. Users can 
              connect their own API keys to access AI-powered features.
            </p>
            
            <h3>AI Features</h3>
            <FeatureList>
              <FeatureItem>
                <FeatureIcon className="fas fa-file-alt" />
                <FeatureContent>
                  <FeatureTitle>Text Summarization</FeatureTitle>
                  <FeatureDescription>
                    Automatically generate concise summaries of long texts.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-language" />
                <FeatureContent>
                  <FeatureTitle>Content Generation</FeatureTitle>
                  <FeatureDescription>
                    Create high-quality content based on user inputs.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-cut" />
                <FeatureContent>
                  <FeatureTitle>Smart Watermark Removal</FeatureTitle>
                  <FeatureDescription>
                    AI-powered watermark detection and removal.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-image" />
                <FeatureContent>
                  <FeatureTitle>Background Removal</FeatureTitle>
                  <FeatureDescription>
                    Automatically remove backgrounds from images.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-search" />
                <FeatureContent>
                  <FeatureTitle>Smart Search</FeatureTitle>
                  <FeatureDescription>
                    Save user searches to create new tools dynamically.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-magic" />
                <FeatureContent>
                  <FeatureTitle>Smart Suggestions</FeatureTitle>
                  <FeatureDescription>
                    Get intelligent suggestions based on usage patterns.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
            </FeatureList>
          </DocSection>
          
          <DocSection>
            <h2>Monetization</h2>
            <p>
              The platform is integrated with Propeller Ads for revenue generation. The Ad Manager allows configuring 
              ad placements, density, and categories.
            </p>
            
            <h3>Ad Placements</h3>
            <ul>
              <li>Header Ads</li>
              <li>Footer Ads</li>
              <li>Sidebar Ads</li>
              <li>In-Content Ads</li>
              <li>Interstitial Ads</li>
            </ul>
            
            <h3>Ad Settings</h3>
            <p>
              The Ad Manager provides settings for ad density, refresh rate, ad block detection, and category filtering. 
              These settings help maximize revenue while maintaining a good user experience.
            </p>
          </DocSection>
          
          <DocSection>
            <h2>SEO Optimization</h2>
            <p>
              The platform is optimized for search engine visibility with comprehensive SEO features.
            </p>
            
            <h3>SEO Features</h3>
            <FeatureList>
              <FeatureItem>
                <FeatureIcon className="fas fa-tags" />
                <FeatureContent>
                  <FeatureTitle>Meta Tags</FeatureTitle>
                  <FeatureDescription>
                    Optimized meta titles, descriptions, and keywords for each page.
                  </FeatureDescription>
                </FeatureContent>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="fas fa-sitemap" />
                <FeatureContent>
                  <FeatureTitle>Sitema<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>