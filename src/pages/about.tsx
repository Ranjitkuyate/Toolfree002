import React from 'react';
import Layout from '@/components/layout/Layout'; // Corrected path
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const About = () => (
  <Layout>
    <SectionTitle title="About Us" />
    <p>Learn more about ToolsFree.</p>
    <AdBanner />
  </Layout>
);

export default About;
