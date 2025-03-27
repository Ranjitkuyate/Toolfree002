import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout'; // Corrected path
import SectionTitle from '@/components/SectionTitle';
import AdBanner from '@/components/AdBanner';

const Contact = () => (
  <Layout>
    <div className="container">
      <SectionTitle 
        title="Contact Us" 
        subtitle="Get in touch with our support team"
      />
      <p>
        Have questions or need assistance? Reach out to us at support@toolsfree.online 
        or use the form below.
      </p>
      <AdBanner position="top" size="medium" />
      <AdBanner position="bottom" size="medium" />
    </div>
  </Layout>
);

export default Contact;
