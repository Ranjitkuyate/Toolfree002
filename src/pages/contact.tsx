import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const Contact = () => {
  return (
    <Layout>
      <div className="container">
        <SectionTitle 
          title="Contact Us" 
          subtitle="We'd love to hear from you! Get in touch with our team."
        />
        
        <AdBanner position="top" size="medium" />
        
        <ContactContainer>
          <ContactInfo>
            <h3>Get in Touch</h3>
            <p>
              Have questions, suggestions, or feedback? We're here to help! Fill out the form and we'll get back to you as soon as possible.
            </p>
            
            <ContactDetails>
              <ContactItem>
                <i className="fas fa-envelope"></i>
                <span>support@toolsfree.online</span>
              </ContactItem>
              <ContactItem>
                <i className="fas fa-phone"></i>
                <span>+1-800-TOOLS-FREE</span>
              </ContactItem>
              <ContactItem>
                <i className="fas fa-clock"></i>
                <span>Monday - Friday, 9:00 AM - 5:00 PM EST</span>
              </ContactItem>
            </ContactDetails>
            
            <SocialLinks>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </SocialLink>
              <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </SocialLink>
              <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm>
            <h3>Send Us a Message</h3>
            <form>
              <FormGroup>
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" placeholder="Enter your name" required />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Enter your email" required />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" placeholder="Enter subject" required />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows={6} placeholder="Enter your message" required></textarea>
              </FormGroup>
              
              <SubmitButton type="submit">Send Message</SubmitButton>
            </form>
          </ContactForm>
        </ContactContainer>
        
        <AdBanner position="bottom" size="medium" />
      </div>
    </Layout>
  );
};

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: var(--primary-color);
  color: white;
  padding: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
    opacity: 0.9;
  }
`;

const ContactDetails = styled.div`
  margin-bottom: 2rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  i {
    font-size: 1.2rem;
    margin-right: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: var(--transition);
  
  i {
    font-size: 1.2rem;
    color: white;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-3px);
  }
`;

const ContactForm = styled.div`
  padding: 2rem;
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
  
  textarea {
    resize: vertical;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
`;

export default Contact;
