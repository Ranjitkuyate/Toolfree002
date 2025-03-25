import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import AdBanner from '@/components/AdBanner';

const PerformanceSettings = () => {
  return (
    <Layout>
      <div className="container">
        <SectionTitle 
          title="Performance Settings" 
          subtitle="Optimize your website's speed and performance"
        />
        
        <AdBanner position="top" size="medium" />
        
        <PerformanceOptimizer />
        
        <AdBanner position="bottom" size="medium" />
      </div>
    </Layout>
  );
};

export default PerformanceSettings;
