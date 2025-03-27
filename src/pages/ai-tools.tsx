import React from 'react';
import styled from 'styled-components';
import AIIntegration from '@/components/AIIntegration';
import Layout from '@/components/layout/Layout'; // Corrected path
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const AITools = () => {
  return (
    <Layout>
      <div className="container">
        <SectionTitle 
          title="AI Tools" 
          subtitle="Access powerful AI capabilities powered by Google Gemini"
        />
        
        <AdBanner position="top" size="medium" />
        
        <AIIntegration />
        
        <AdBanner position="bottom" size="medium" />
      </div>
    </Layout>
  );
};

export default AITools;
