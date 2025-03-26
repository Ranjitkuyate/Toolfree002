import React from 'react';
import styled from 'styled-components';
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';
import AIIntegration from '@/components/AIIntegration';

interface ToolContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const ToolContent: React.FC<ToolContentProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <ToolContainer>
      <SectionTitle title={title} subtitle={description} />
      
      <AdBanner position="top" />
      
      <ToolWrapper>
        {children}
      </ToolWrapper>
      
      <AIIntegration />
      
      <AdBanner position="bottom" />
    </ToolContainer>
  );
};

const ToolContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const ToolWrapper = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin: 2rem 0;
`;

export default ToolContent;
