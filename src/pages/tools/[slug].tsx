import React from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import ToolContent from '@/components/tools/ToolContent';
import ImageCompressor from '@/components/tools/image/ImageCompressor';
import VideoEditor from '@/components/tools/video/VideoEditor';

const ToolPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const renderTool = () => {
    switch (slug) {
      case 'image-compressor':
        return (
          <ToolContent 
            title="Image Compressor" 
            description="Compress your images without losing quality"
          >
            <ImageCompressor />
          </ToolContent>
        );
      case 'video-editor':
        return (
          <ToolContent 
            title="Video Editor" 
            description="Edit your videos online with our easy-to-use editor"
          >
            <VideoEditor />
          </ToolContent>
        );
      // Add cases for other tools as needed
      default:
        return (
          <div>
            <h2>Tool not found</h2>
            <p>The requested tool does not exist or is currently unavailable.</p>
          </div>
        );
    }
  };
  
  return (
    <Layout title={`${slug ? slug.toString().split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Tool'} | ToolsFree Online`}>
      {renderTool()}
    </Layout>
  );
};

export default ToolPage;
