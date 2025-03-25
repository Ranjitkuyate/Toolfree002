import React from 'react';
import styled from 'styled-components';
import AIIntegration from '@/components/AIIntegration';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const AISettings = () => {
  return (
    <Layout>
      <div className="container">
        <SectionTitle 
          title="AI Settings" 
          subtitle="Connect to free AI APIs to enhance your tools with artificial intelligence"
        />
        
        <AdBanner position="top" size="medium" />
        
        <AIIntegration />
        
        <AdBanner position="bottom" size="medium" />
      </div>
    </Layout>
  );
};

export default AISettings;
