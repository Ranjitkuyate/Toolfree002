import React from 'react';
import { tools, categories, getToolsByCategory, getNewTools, getPopularTools } from '@/utils/tools';
import Link from 'next/link';
import styled from 'styled-components';

const HomePage = () => {
  const newTools = getNewTools();
  const popularTools = getPopularTools();

  return (
    <Container>
      <Hero>
        <HeroContent>
          <HeroTitle>Free Online Tools for Everyone</HeroTitle>
          <HeroSubtitle>
            Access powerful tools for text, video, image, document processing and more - all for free, no sign-up required
          </HeroSubtitle>
          <SearchContainer>
            <SearchInput 
              type="text" 
              placeholder="Search for tools..." 
            />
            <SearchButton>
              <i className="fas fa-search"></i>
            </SearchButton>
          </SearchContainer>
        </HeroContent>
      </Hero>

      <Section>
        <SectionTitle>
          <i className="fas fa-star"></i> New Tools
        </SectionTitle>
        <ToolsGrid>
          {newTools.map((tool) => (
            <ToolCard key={tool.id} href={tool.url}>
              <ToolIcon>
                <i className={tool.icon}></i>
              </ToolIcon>
              <ToolInfo>
                <ToolName>{tool.name}</ToolName>
                <ToolDescription>{tool.description}</ToolDescription>
              </ToolInfo>
              <NewBadge>NEW</NewBadge>
            </ToolCard>
          ))}
        </ToolsGrid>
      </Section>

      <Section>
        <SectionTitle>
          <i className="fas fa-fire"></i> Popular Tools
        </SectionTitle>
        <ToolsGrid>
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} href={tool.url}>
              <ToolIcon>
                <i className={tool.icon}></i>
              </ToolIcon>
              <ToolInfo>
                <ToolName>{tool.name}</ToolName>
                <ToolDescription>{tool.description}</ToolDescription>
              </ToolInfo>
              {tool.isNew && <NewBadge>NEW</NewBadge>}
            </ToolCard>
          ))}
        </ToolsGrid>
      </Section>

      {categories.map((category) => (
        <Section key={category.id}>
          <SectionTitle>
            <i className={category.icon}></i> {category.name}
          </SectionTitle>
          <ToolsGrid>
            {getToolsByCategory(category.id).map((tool) => (
              <ToolCard key={tool.id} href={tool.url}>
                <ToolIcon>
                  <i className={tool.icon}></i>
                </ToolIcon>
                <ToolInfo>
                  <ToolName>{tool.name}</ToolName>
                  <ToolDescription>{tool.description}</ToolDescription>
                </ToolInfo>
                {tool.isNew && <NewBadge>NEW</NewBadge>}
              </ToolCard>
            ))}
          </ToolsGrid>
        </Section>
      ))}

      <FeaturesSection>
        <SectionTitle>Why Choose Our Tools?</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-bolt"></i>
            </FeatureIcon>
            <FeatureTitle>Fast & Efficient</FeatureTitle>
            <FeatureDescription>
              All tools are optimized for speed and performance, giving you quick results
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-lock"></i>
            </FeatureIcon>
            <FeatureTitle>Secure & Private</FeatureTitle>
            <FeatureDescription>
              Your files are processed in your browser and never uploaded to our servers
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-globe"></i>
            </FeatureIcon>
            <FeatureTitle>Always Accessible</FeatureTitle>
            <FeatureDescription>
              Use our tools anytime, anywhere, on any device with an internet connection
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <i className="fas fa-dollar-sign"></i>
            </FeatureIcon>
            <FeatureTitle>100% Free</FeatureTitle>
            <FeatureDescription>
              All tools are completely free to use with no hidden fees or subscriptions
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>

      <CTASection>
        <CTAContent>
          <CTATitle>Ready to boost your productivity?</CTATitle>
          <CTADescription>
            Explore our collection of free online tools and start creating, converting, and editing with ease.
          </CTADescription>
          <CTAButton href="#top">
            Get Started <i className="fas fa-arrow-right"></i>
          </CTAButton>
        </CTAContent>
      </CTASection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const Hero = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: var(--border-radius);
  margin: 2rem 0;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  background-color: white;
  color: var(--primary-color);
  border: none;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  padding: 0 1.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Section = styled.section`
  margin: 3rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  display: flex;
  align-items: center;
  
  i {
    margin-right: 0.5rem;
    color: var(--primary-color);
  }
`;

const ToolsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ToolCard = styled(Link)`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  text-decoration: none;
  color: var(--text-color);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ToolIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgba(74, 108, 247, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
  
  i {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
`;

const ToolInfo = styled.div`
  flex: 1;
`;

const ToolName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ToolDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const NewBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
`;

const FeaturesSection = styled.section`
  margin: 4rem 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--box-shadow);
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  background-color: rgba(74, 108, 247, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  i {
    font-size: 2rem;
    color: var(--primary-color);
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: var(--border-radius);
  margin: 4rem 0;
  padding: 4rem 2rem;
  text-align: center;
  color: white;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: white;
  color: var(--primary-color);
  border: none;
  border-radius: var(--border-radius);
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
  
  i {
    margin-left: 0.5rem;
  }
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px);
  }
`;

export default HomePage;
