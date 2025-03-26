import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { FaTools, FaTwitter, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterLogo>
            <FaTools />
            <FooterLogoText>ToolsFree</FooterLogoText>
          </FooterLogo>
          <FooterDescription>
            Free online tools to make your life easier. No registration required.
          </FooterDescription>
          <SocialLinks>
            <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </SocialLink>
            <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </SocialLink>
            <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialLink>
            <SocialLink href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Quick Links</FooterSectionTitle>
          <FooterLinks>
            <FooterLink>
              <Link href="/">
                <FooterLinkText>Home</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/tools">
                <FooterLinkText>All Tools</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/about">
                <FooterLinkText>About Us</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/documentation">
                <FooterLinkText>Documentation</FooterLinkText>
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Popular Tools</FooterSectionTitle>
          <FooterLinks>
            <FooterLink>
              <Link href="/tools/image-compressor">
                <FooterLinkText>Image Compressor</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/tools/video-editor">
                <FooterLinkText>Video Editor</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/tools/text-to-speech">
                <FooterLinkText>Text to Speech</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/tools/all-in-one-downloader">
                <FooterLinkText>Video Downloader</FooterLinkText>
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterSectionTitle>Legal</FooterSectionTitle>
          <FooterLinks>
            <FooterLink>
              <Link href="/privacy">
                <FooterLinkText>Privacy Policy</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/terms">
                <FooterLinkText>Terms of Service</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/cookies">
                <FooterLinkText>Cookie Policy</FooterLinkText>
              </Link>
            </FooterLink>
            <FooterLink>
              <Link href="/contact">
                <FooterLinkText>Contact Us</FooterLinkText>
              </Link>
            </FooterLink>
          </FooterLinks>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <Copyright>
          © {new Date() .getFullYear()} ToolsFree. All rights reserved.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 3rem 0 1rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #4a90e2;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const FooterLogoText = styled.span`
  color: #333;
`;

const FooterDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  color: #4a90e2;
  font-size: 1.25rem;
  
  &:hover {
    color: #3a80d2;
  }
`;

const FooterSectionTitle = styled.h3`
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 0.75rem;
`;

const FooterLinkText = styled.a`
  color: #666;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: #4a90e2;
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem 0;
  border-top: 1px solid #ddd;
`;

const Copyright = styled.p`
  color: #666;
  text-align: center;
  font-size: 0.9rem;
`;

export default Footer;
