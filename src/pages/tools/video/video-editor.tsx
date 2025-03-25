import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import VideoEditor from '@/components/tools/video/VideoEditor';
import AdBanner from '@/components/AdBanner';

const VideoEditorPage = () => {
  return (
    <Layout>
      <SEO 
        title="Video Editor | ToolsFree Online"
        description="Edit your videos with advanced features like trimming, watermark removal, text overlay, cropping, speed adjustment, and filters with our free online Video Editor."
        keywords="video editor, online video editor, trim video, remove watermark, add text to video, crop video, video speed, video filters"
        canonical="/tools/video/video-editor"
      />
      
      <AdBanner position="top" size="large" />
      
      <VideoEditor />
      
      <AdBanner position="bottom" size="large" />
    </Layout>
  );
};

export default VideoEditorPage;
