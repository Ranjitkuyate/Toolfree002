import React from 'react';
import styled from 'styled-components';
import AdManager from '../components/ads/AdManager';
import PropellerAdsScript from '../components/ads/PropellerAdsScript';
import AdBanner from '../components/ads/AdBanner';
import NativeAd from '../components/ads/NativeAd';
import InterstitialAd from '../components/ads/InterstitialAd';
import AdAnalytics from '../components/ads/AdAnalytics';
import SEO from '../components/SEO';

const AnalyticsPage = () => {
  return (
    <AdManager>
      <SEO 
        title="Ad Analytics | ToolsFree Online"
        description="Track your ad performance and revenue with our comprehensive analytics dashboard. Monitor impressions, clicks, and earnings from Propeller Ads."
        keywords="ad analytics, ad revenue, propeller ads, monetization, earnings tracker"
        canonical="/analytics-settings"
      />
      
      <PropellerAdsScript />
      
      <PageContainer>
        <PageHeader>
          <h1>Ad Analytics Dashboard</h1>
          <p>Track your ad performance and revenue</p>
        </PageHeader>
        
        <AdAnalytics />
        
        <AdBanner zoneId="12345" type="leaderboard" />
      </PageContainer>
      
      {/* Interstitial ad that triggers when user leaves the page */}
      <InterstitialAd 
        zoneId="12345" 
        triggerOn="exitIntent" 
      />
    </AdManager>
  );
};

// Styled Components
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
    font-size: 1.2rem;
  }
`;

export default AnalyticsPage;
