import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Layout from '../components/layout/Layout';
import { FaTools, FaImage, FaVideo, FaVolumeUp, FaCalculator } from 'react-icons/fa';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>ToolsFree | Free Online Tools</title>
        <meta name="description" content="Free online tools to make your life easier. No registration required." />
        <meta name="keywords" content="free tools, online tools, web tools, image tools, audio tools, video tools" />
      </Head>

      <HeroSection>
        <HeroContent>
          <HeroTitle>Free Online Tools</HeroTitle>
          <HeroSubtitle>Make your life easier with our collection of free online tools</HeroSubtitle>
          <HeroButtons>
            <Link href="/tools" legacyBehavior>
              <PrimaryButton>Explore Tools</PrimaryButton>
            </Link>
            <Link href="/about" legacyBehavior>
              <SecondaryButton>Learn More</SecondaryButton>
            </Link>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <AdContainer>
        <AdText>Advertisement</AdText>
        <AdContent>Propeller Ads will appear here</AdContent>
      </AdContainer>

      <FeaturedSection>
        <SectionTitle>Featured Tools</SectionTitle>
        <ToolsGrid>
          <ToolCard>
            <Link href="/tools/image/image-compressor" legacyBehavior>
              <ToolCardContent>
                <ToolIcon>
                  <FaImage />
                </ToolIcon>
                <ToolName>Image Compressor</ToolName>
                <ToolDescription>Compress your images without losing quality</ToolDescription>
              </ToolCardContent>
            </Link>
          </ToolCard>
          <ToolCard>
            <Link href="/tools/video/video-editor" legacyBehavior>
              <ToolCardContent>
                <ToolIcon>
                  <FaVideo />
                </ToolIcon>
                <ToolName>Video Editor</ToolName>
                <ToolDescription>Edit your videos online for free</ToolDescription>
              </ToolCardContent>
            </Link>
          </ToolCard>
          <ToolCard>
            <Link href="/tools/audio/text-to-speech" legacyBehavior>
              <ToolCardContent>
                <ToolIcon>
                  <FaVolumeUp />
                </ToolIcon>
                <ToolName>Text to Speech</ToolName>
                <ToolDescription>Convert text to natural-sounding speech</ToolDescription>
              </ToolCardContent>
            </Link>
          </ToolCard>
          <ToolCard>
            <Link href="/tools/utility/baby-name-generator" legacyBehavior>
              <ToolCardContent>
                <ToolIcon>
                  <FaCalculator />
                </ToolIcon>
                <ToolName>Baby Name Generator</ToolName>
                <ToolDescription>Generate unique baby names</ToolDescription>
              </ToolCardContent>
            </Link>
          </ToolCard>
        </ToolsGrid>
        <ViewAllButton>
          <Link href="/tools" legacyBehavior>
            <a>View All Tools</a>
          </Link>
        </ViewAllButton>
      </FeaturedSection>

      <AdContainer>
        <AdText>Advertisement</AdText>
        <AdContent>Propeller Ads will appear here</AdContent>
      </AdContainer>

      <InfoSection>
        <SectionTitle>Why Choose ToolsFree?</SectionTitle>
        <InfoGrid>
          <InfoCard>
            <InfoTitle>100% Free</InfoTitle>
            <InfoDescription>All our tools are completely free to use. No hidden fees or subscriptions.</InfoDescription>
          </InfoCard>
          <InfoCard>
            <InfoTitle>No Registration</InfoTitle>
            <InfoDescription>No need to create an account or provide personal information.</InfoDescription>
          </InfoCard>
          <InfoCard>
            <InfoTitle>Easy to Use</InfoTitle>
            <InfoDescription>Simple and intuitive interface for all our tools.</InfoDescription>
          </InfoCard>
          <InfoCard>
            <InfoTitle>Privacy Focused</InfoTitle>
            <InfoDescription>We don't store your data or track your activity.</InfoDescription>
          </InfoCard>
        </InfoGrid>
      </InfoSection>
    </Layout>
  );
};

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4a90e2 0%, #8e44ad 100%);
  color: white;
  padding: 4rem 1rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled.a`
  background-color: white;
  color: #4a90e2;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.a`
  background-color: transparent;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  border: 2px solid white;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
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

const FeaturedSection = styled.section`
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  color: #333;
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
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

const ToolIcon = styled.div`
  font-size: 2.5rem;
  color: #4a90e2;
  margin-bottom: 1rem;
`;

const ToolName = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const ToolDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const ViewAllButton = styled.div`
  text-align: center;
  
  a {
    display: inline-block;
    background-color: #4a90e2;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #3a80d2;
      transform: translateY(-2px);
    }
  }
`;

const InfoSection = styled.section`
  padding: 3rem 1rem;
  background-color: #f5f7fa;
  max-width: 1200px;
  margin: 0 auto;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const InfoCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const InfoTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #4a90e2;
`;

const InfoDescription = styled.p`
  color: #666;
`;

export default HomePage;
