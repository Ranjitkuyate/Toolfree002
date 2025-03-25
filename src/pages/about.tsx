import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const About = () => {
  return (
    <Layout>
      <div className="container">
        <SectionTitle 
          title="About ToolsFree.online" 
          subtitle="Your one-stop destination for free online tools"
        />
        
        <AdBanner position="top" size="medium" />
        
        <AboutContent>
          <AboutSection>
            <h3>Our Mission</h3>
            <p>
              At ToolsFree.online, our mission is to provide high-quality, free online tools that help users solve everyday problems and boost productivity. We believe that powerful tools should be accessible to everyone, regardless of technical expertise or budget constraints.
            </p>
          </AboutSection>
          
          <AboutSection>
            <h3>What We Offer</h3>
            <p>
              We offer over 30 free online tools across various categories, including text processing, file conversion, code utilities, productivity enhancers, calculators, design tools, downloaders, and editors. All our tools are designed to be user-friendly, fast, and effective.
            </p>
            <p>
              Our tools are regularly updated with new features and improvements based on user feedback and technological advancements. We're constantly adding new tools to our collection to meet the evolving needs of our users.
            </p>
          </AboutSection>
          
          <AboutSection>
            <h3>AI-Powered Features</h3>
            <p>
              Many of our tools leverage artificial intelligence to provide enhanced functionality. From text summarization to background removal in images, our AI-powered tools deliver professional-grade results without requiring any technical knowledge from users.
            </p>
          </AboutSection>
          
          <AboutSection>
            <h3>No Downloads Required</h3>
            <p>
              All our tools run directly in your web browser, eliminating the need to download and install software on your device. This means you can access our tools from any device with an internet connection, whether you're using a desktop computer, laptop, tablet, or smartphone.
            </p>
          </AboutSection>
          
          <AboutSection>
            <h3>Privacy and Security</h3>
            <p>
              We respect your privacy and take data security seriously. Most of our tools process your data directly in your browser, ensuring that your sensitive information never leaves your device. For tools that require server processing, we implement strict security measures and never store your data longer than necessary.
            </p>
          </AboutSection>
          
          <AboutSection>
            <h3>Our Team</h3>
            <p>
              ToolsFree.online is developed and maintained by a team of passionate developers, designers, and product specialists who are committed to creating useful, accessible tools for everyone. We combine technical expertise with user-centered design principles to deliver the best possible experience.
            </p>
          </AboutSection>
          
          <AboutSection>
            <h3>Feedback and Suggestions</h3>
            <p>
              We value your feedback and suggestions for improvement. If you have ideas for new tools or features, or if you encounter any issues while using our tools, please don't hesitate to contact us. Your input helps us make ToolsFree.online better for everyone.
            </p>
          </AboutSection>
        </AboutContent>
        
        <AdBanner position="bottom" size="medium" />
      </div>
    </Layout>
  );
};

const AboutContent = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const AboutSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 1rem;
    line-height: 1.6;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default About;
