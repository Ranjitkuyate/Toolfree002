import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import EnhancedVideoEditor from '@/components/tools/video/EnhancedVideoEditor';

const EnhancedVideoEditorPage = () => {
  return (
    <Layout>
      <SEO 
        title="Enhanced Video Editor - ToolsFree Online"
        description="Edit your videos with professional tools - trim, add watermarks, apply filters, and more. Free online video editor with no software installation required."
        keywords="video editor, online video editor, trim video, add watermark, video filters, free video editing tool"
        canonical="/tools/video/enhanced-video-editor"
      />
      <EnhancedVideoEditor />
    </Layout>
  );
};

export default EnhancedVideoEditorPage;
