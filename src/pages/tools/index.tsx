import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../../components/layout/Layout';
import { 
  FaImage, FaVideo, FaVolumeUp, FaCalculator, FaFileAlt, FaFont, 
  FaQrcode, FaRandom, FaFileCode, FaFileWord, FaFilePdf, FaFileExcel,
  FaLock, FaHashtag, FaCalendarAlt, FaStopwatch, FaRuler, FaExchangeAlt,
  FaGlobe, FaDatabase, FaChartBar, FaMapMarkerAlt, FaRegCreditCard
} from 'react-icons/fa';

const ToolsPage: React.FC = () => {
  const toolCategories = [
    {
      name: 'Image Tools',
      icon: <FaImage />,
      tools: [
        { name: 'Image Compressor', path: '/tools/image/image-compressor', description: 'Compress images without losing quality' },
        { name: 'Advanced Image Compressor', path: '/tools/image/advanced-image-compressor', description: 'Advanced options for image compression' },
        { name: 'Image Resizer', path: '/tools/image/image-resizer', description: 'Resize images to specific dimensions' },
        { name: 'Image Converter', path: '/tools/image/image-converter', description: 'Convert images between formats' },
        { name: 'Image Cropper', path: '/tools/image/image-cropper', description: 'Crop images to specific dimensions' },
        { name: 'Image Color Picker', path: '/tools/image/color-picker', description: 'Extract colors from images' },
        { name: 'Image Watermark', path: '/tools/image/watermark', description: 'Add watermarks to images' },
        { name: 'Image Effects', path: '/tools/image/effects', description: 'Apply effects to images' },
        { name: 'Image Background Remover', path: '/tools/image/background-remover', description: 'Remove backgrounds from images' },
        { name: 'QR Code Generator', path: '/tools/image/qr-generator', description: 'Generate QR codes' },
      ]
    },
    {
      name: 'Video Tools',
      icon: <FaVideo />,
      tools: [
        { name: 'Video Editor', path: '/tools/video/video-editor', description: 'Edit videos online' },
        { name: 'Enhanced Video Editor', path: '/tools/video/enhanced-video-editor', description: 'Advanced video editing features' },
        { name: 'All-in-One Downloader', path: '/tools/video/all-in-one-downloader', description: 'Download videos from various platforms' },
        { name: 'Video Converter', path: '/tools/video/video-converter', description: 'Convert videos between formats' },
        { name: 'Video Compressor', path: '/tools/video/video-compressor', description: 'Compress videos without losing quality' },
        { name: 'Video Trimmer', path: '/tools/video/video-trimmer', description: 'Trim videos to specific length' },
        { name: 'Video Merger', path: '/tools/video/video-merger', description: 'Merge multiple videos into one' },
        { name: 'Video Watermark', path: '/tools/video/video-watermark', description: 'Add watermarks to videos' },
        { name: 'Video to GIF', path: '/tools/video/video-to-gif', description: 'Convert videos to GIF format' },
        { name: 'Screen Recorder', path: '/tools/video/screen-recorder', description: 'Record your screen' },
      ]
    },
    {
      name: 'Audio Tools',
      icon: <FaVolumeUp />,
      tools: [
        { name: 'Text to Speech', path: '/tools/audio/text-to-speech', description: 'Convert text to speech' },
        { name: 'Audio Converter', path: '/tools/audio/audio-converter', description: 'Convert audio between formats' },
        { name: 'Audio Compressor', path: '/tools/audio/audio-compressor', description: 'Compress audio files' },
        { name: 'Audio Trimmer', path: '/tools/audio/audio-trimmer', description: 'Trim audio files' },
        { name: 'Audio Merger', path: '/tools/audio/audio-merger', description: 'Merge multiple audio files' },
        { name: 'Voice Recorder', path: '/tools/audio/voice-recorder', description: 'Record voice using microphone' },
        { name: 'Audio Effects', path: '/tools/audio/audio-effects', description: 'Apply effects to audio files' },
        { name: 'Speech to Text', path: '/tools/audio/speech-to-text', description: 'Convert speech to text' },
        { name: 'Audio Extractor', path: '/tools/audio/audio-extractor', description: 'Extract audio from videos' },
        { name: 'Audio Visualizer', path: '/tools/audio/audio-visualizer', description: 'Create visualizations for audio' },
      ]
    },
    {
      name: 'Utility Tools',
      icon: <FaCalculator />,
      tools: [
        { name: 'Baby Name Generator', path: '/tools/utility/baby-name-generator', description: 'Generate unique baby names' },
        { name: 'Password Generator', path: '/tools/utility/password-generator', description: 'Generate secure passwords' },
        { name: 'Hash Generator', path: '/tools/utility/hash-generator', description: 'Generate hash values for text' },
        { name: 'Random Number Generator', path: '/tools/utility/random-number', description: 'Generate random numbers' },
        { name: 'UUID Generator', path: '/tools/utility/uuid-generator', description: 'Generate UUIDs' },
        { name: 'Lorem Ipsum Generator', path: '/tools/utility/lorem-ipsum', description: 'Generate placeholder text' },
        { name: 'URL Shortener', path: '/tools/utility/url-shortener', description: 'Shorten long URLs' },
        { name: 'Age Calculator', path: '/tools/utility/age-calculator', description: 'Calculate age from birthdate' },
        { name: 'Date Calculator', path: '/tools/utility/date-calculator', description: 'Calculate days between dates' },
        { name: 'Time Zone Converter', path: '/tools/utility/timezone-converter', description: 'Convert time between time zones' },
        { name: 'Unit Converter', path: '/tools/utility/unit-converter', description: 'Convert between different units' },
        { name: 'Currency Converter', path: '/tools/utility/currency-converter', description: 'Convert between currencies' },
        { name: 'Color Converter', path: '/tools/utility/color-converter', description: 'Convert between color formats' },
        { name: 'IP Lookup', path: '/tools/utility/ip-lookup', description: 'Look up IP address information' },
        { name: 'DNS Lookup', path: '/tools/utility/dns-lookup', description: 'Look up DNS records' },
        { name: 'WHOIS Lookup', path: '/tools/utility/whois-lookup', description: 'Look up domain registration info' },
        { name: 'Credit Card Validator', path: '/tools/utility/cc-validator', description: 'Validate credit card numbers' },
        { name: 'JSON Formatter', path: '/tools/utility/json-formatter', description: 'Format and validate JSON' },
        { name: 'XML Formatter', path: '/tools/utility/xml-formatter', description: 'Format and validate XML' },
        { name: 'CSV to JSON Converter', path: '/tools/utility/csv-to-json', description: 'Convert CSV to JSON format' },
      ]
    },
  ];

  return (
    <Layout>
      <Head>
        <title>All Tools | ToolsFree Online</title>
        <meta name="description" content="Explore our collection of free online tools to make your life easier. No registration required." />
        <meta name="keywords" content="free tools, online tools, web tools, image tools, audio tools, video tools" />
      </Head>

      <PageHeader>
        <PageTitle>All Tools</PageTitle>
        <PageDescription>Explore our collection of free online tools</PageDescription>
      </PageHeader>

      <AdContainer>
        <AdText>Advertisement</AdText>
        <AdContent>Propeller Ads will appear here</AdContent>
      </AdContainer>

      <ToolsContainer>
        {toolCategories.map((category, index) => (
          <CategorySection key={index}>
            <CategoryHeader>
              <CategoryIcon>{category.icon}</CategoryIcon>
              <CategoryTitle>{category.name}</CategoryTitle>
            </CategoryHeader>
            <ToolsGrid>
              {category.tools.map((tool, toolIndex) => (
                <ToolCard key={toolIndex}>
                  <Link href={tool.path} legacyBehavior>
                    <ToolCardContent>
                      <ToolName>{tool.name}</ToolName>
                      <ToolDescription>{tool.description}</ToolDescription>
                    </ToolCardContent>
                  </Link>
                </ToolCard>
              ))}
            </ToolsGrid>
          </CategorySection>
        ))}
      </ToolsContainer>

      <AdContainer>
        <AdText>Advertisement</AdText>
        <AdContent>Propeller Ads will appear here</AdContent>
      </AdContainer>
    </Layout>
  );
};

const PageHeader = styled.div`
  background: linear-gradient(135deg, #4a90e2 0%, #8e44ad 100%);
  color: white;
  padding: 3rem 1rem;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const AdContainer = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin: 2rem 0;
  border-radius: 4px;
  text-align: center;
`;

const AdText = styled.p`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const AdContent = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border: 1px dashed #ddd;
`;

const ToolsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
`;

const CategorySection = styled.section`
  margin-bottom: 3rem;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const CategoryIcon = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-right: 0.75rem;
`;

const CategoryTitle = styled.h2`
  font-size: 1.75rem;
  color: #333;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ToolCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ToolCardContent = styled.a`
  display: block;
  padding: 1.5rem;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const ToolName = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
`;

const ToolDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

export default ToolsPage;
