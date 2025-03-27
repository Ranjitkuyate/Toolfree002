import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const About = () => (
  <Layout>
    <div className="container">
      <SectionTitle 
        title="About Us" 
        subtitle="Learn more about ToolsFree Online and our mission"
      />
      <p>
        ToolsFree Online is dedicated to providing free, high-quality tools for everyone. 
        Our platform offers a wide range of utilities to enhance your productivity.
      </p>
      <AdBanner position="top" size="medium" />
      <AdBanner position="bottom" size="medium" />
    </div>
  </Layout>
);

export default About;
