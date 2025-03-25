import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import ImageCompressor from '@/components/tools/image/ImageCompressor';
import AdBanner from '@/components/AdBanner';

const ImageCompressorPage = () => {
  return (
    <Layout>
      <SEO 
        title="Image Compressor | ToolsFree Online"
        description="Compress your images to reduce file size while maintaining quality with our free online Image Compressor tool."
        keywords="image compressor, compress image, reduce image size, image optimization, compress jpg, compress png"
        canonical="/tools/image/image-compressor"
      />
      
      <AdBanner position="top" size="large" />
      
      <ImageCompressor />
      
      <AdBanner position="bottom" size="large" />
    </Layout>
  );
};

export default ImageCompressorPage;
