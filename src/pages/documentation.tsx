import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const Documentation: React.FC = () => {
  return (
    <Layout title="Documentation | ToolsFree Online">
      <DocumentationContainer>
        <SectionTitle 
          title="Documentation" 
          subtitle="Learn how to use our tools effectively" 
          centered
        />
        
        <AdBanner position="top" />
        
        <ContentSection>
          <h3>Getting Started</h3>
          <p>
            Welcome to ToolsFree Online! This documentation will help you understand how to use our various tools effectively. Each tool is designed to be intuitive and easy to use, but this guide will provide additional details and tips.
          </p>
          
          <h3>Image Compressor</h3>
          <p>
            Our Image Compressor tool allows you to reduce the file size of your images without significantly affecting quality. This is useful for optimizing images for web use, email attachments, or saving storage space.
          </p>
          <ol>
            <li>Click "Select Image" to upload the image you want to compress</li>
            <li>Use the quality slider to adjust the compression level (lower quality = smaller file size)</li>
            <li>Click "Compress Image" to process your image</li>
            <li>Once compression is complete, click "Download" to save the compressed image</li>
          </ol>
          
          <h3>Video Editor</h3>
          <p>
            The Video Editor tool provides basic video editing capabilities directly in your browser. You can trim videos, adjust audio, apply filters, and create custom thumbnails.
          </p>
          <ol>
            <li>Click "Select Video" to upload the video you want to edit</li>
            <li>Use the tabs to access different editing features:
              <ul>
                <li><strong>Trim:</strong> Set start and end points to cut your video</li>
                <li><strong>Audio:</strong> Adjust volume or mute the audio</li>
                <li><strong>Filters:</strong> Apply visual effects to your video</li>
                <li><strong>Thumbnail:</strong> Create a custom thumbnail for your video</li>
              </ul>
            </li>
            <li>Select your desired export format and quality</li>
            <li>Click "Export Video" to process your edited video</li>
            <li>Once processing is complete, download your edited video</li>
          </ol>
          
          <h3>AI Integration</h3>
          <p>
            Our AI Assistant, powered by Google Gemini, can help answer questions, provide suggestions, and assist with using our tools more effectively.
          </p>
          <ol>
            <li>Type your question or request in the AI Assistant input field</li>
            <li>Click "Ask AI" to submit your query</li>
            <li>The AI will process your request and provide a response</li>
          </ol>
          
          <h3>Troubleshooting</h3>
          <p>
            If you encounter any issues while using our tools, try the following:
          </p>
          <ul>
            <li>Refresh the page and try again</li>
            <li>Make sure your files meet the size and format requirements</li>
            <li>Check your internet connection</li>
            <li>Try using a different browser</li>
            <li>Contact our support team if the issue persists</li>
          </ul>
        </ContentSection>
        
        <AdBanner position="bottom" />
      </DocumentationContainer>
    </Layout>
  );
};

const DocumentationContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ContentSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin: 2rem 0;
  
  h3 {
    color: #333;
    margin-top: 2rem;
    margin-bottom: 1rem;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
  
  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  ul ul, ol ul, ul ol, ol ol {
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
`;

export default Documentation;
