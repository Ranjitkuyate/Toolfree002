import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import AIIntegration from '@/components/AIIntegration';

const AIToolsPage = () => {
  return (
    <Layout>
      <SEO 
        title="AI Tools - ToolsFree Online"
        description="Access powerful AI tools powered by Google Gemini. Generate text, solve problems, and get creative assistance with our free AI tools."
        keywords="AI tools, Google Gemini, artificial intelligence, text generation, AI assistant, free AI tools"
        canonical="/ai-tools"
      />
      <AIIntegration />
    </Layout>
  );
};

export default AIToolsPage;
