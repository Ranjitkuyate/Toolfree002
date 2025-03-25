import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import AdvancedImageCompressor from '@/components/tools/image/AdvancedImageCompressor';

const AdvancedImageCompressorPage = () => {
  return (
    <Layout>
      <SEO 
        title="Advanced Image Compressor - ToolsFree Online"
        description="Compress your images while maintaining quality to reduce file size and improve website performance. Free online image compression tool."
        keywords="image compressor, image compression, reduce image size, optimize images, website performance, free image tool"
        canonical="/tools/image/advanced-image-compressor"
      />
      <AdvancedImageCompressor />
    </Layout>
  );
};

export default AdvancedImageCompressorPage;
