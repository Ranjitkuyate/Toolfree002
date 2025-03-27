import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout'; // Corrected path
import SEO from '@/components/SEO';
import AllInOneDownloader from '@/components/tools/video/AllInOneDownloader';
import AdBanner from '@/components/AdBanner';

const AllInOneDownloaderPage = () => {
  return (
    <Layout>
      <SEO 
        title="All-in-One Downloader | ToolsFree Online"
        description="Download videos, images, and audio from YouTube, Facebook, Instagram, Twitter, TikTok, Pinterest, and SoundCloud with our free All-in-One Downloader."
        keywords="video downloader, youtube downloader, facebook downloader, instagram downloader, twitter downloader, tiktok downloader, pinterest downloader, soundcloud downloader"
        canonical="/tools/video/all-in-one-downloader"
      />
      
      <AdBanner position="top" size="large" />
      
      <AllInOneDownloader />
      
      <AdBanner position="bottom" size="large" />
    </Layout>
  );
};

export default AllInOneDownloaderPage;
