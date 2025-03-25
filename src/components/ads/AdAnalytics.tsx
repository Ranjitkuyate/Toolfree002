import React from 'react';
import styled from 'styled-components';
import { useAds } from './AdManager';

interface AdAnalyticsProps {
  className?: string;
}

const AdAnalytics: React.FC<AdAnalyticsProps> = ({ className }) => {
  const [analyticsData, setAnalyticsData] = React.useState({
    impressions: {
      banner: 0,
      interstitial: 0,
      native: 0,
      push: 0,
      total: 0
    },
    clicks: {
      banner: 0,
      interstitial: 0,
      native: 0,
      push: 0,
      total: 0
    },
    revenue: {
      banner: 0,
      interstitial: 0,
      native: 0,
      push: 0,
      total: 0
    },
    ctr: 0,
    rpm: 0,
    estimatedMonthlyRevenue: 0
  });
  
  const [dateRange, setDateRange] = React.useState('last7days');
  const { adsEnabled } = useAds();
  
  // Simulate fetching analytics data
  React.useEffect(() => {
    if (!adsEnabled) return;
    
    // In a real implementation, this would fetch data from Propeller Ads API
    // For demo purposes, we'll generate random data
    const generateRandomData = () => {
      const bannerImpressions = Math.floor(Math.random() * 5000) + 10000;
      const interstitialImpressions = Math.floor(Math.random() * 2000) + 3000;
      const nativeImpressions = Math.floor(Math.random() * 3000) + 5000;
      const pushImpressions = Math.floor(Math.random() * 1000) + 2000;
      const totalImpressions = bannerImpressions + interstitialImpressions + nativeImpressions + pushImpressions;
      
      const bannerClicks = Math.floor(bannerImpressions * (Math.random() * 0.02 + 0.01));
      const interstitialClicks = Math.floor(interstitialImpressions * (Math.random() * 0.05 + 0.02));
      const nativeClicks = Math.floor(nativeImpressions * (Math.random() * 0.03 + 0.015));
      const pushClicks = Math.floor(pushImpressions * (Math.random() * 0.08 + 0.04));
      const totalClicks = bannerClicks + interstitialClicks + nativeClicks + pushClicks;
      
      const bannerRevenue = bannerClicks * (Math.random() * 0.2 + 0.1);
      const interstitialRevenue = interstitialClicks * (Math.random() * 0.5 + 0.3);
      const nativeRevenue = nativeClicks * (Math.random() * 0.3 + 0.2);
      const pushRevenue = pushClicks * (Math.random() * 0.4 + 0.25);
      const totalRevenue = bannerRevenue + interstitialRevenue + nativeRevenue + pushRevenue;
      
      const ctr = (totalClicks / totalImpressions) * 100;
      const rpm = (totalRevenue / totalImpressions) * 1000;
      
      // Estimate monthly revenue based on current data
      let multiplier = 1;
      switch (dateRange) {
        case 'today':
          multiplier = 30;
          break;
        case 'yesterday':
          multiplier = 30;
          break;
        case 'last7days':
          multiplier = 4.3;
          break;
        case 'last30days':
          multiplier = 1;
          break;
        default:
          multiplier = 1;
      }
      
      const estimatedMonthlyRevenue = totalRevenue * multiplier;
      
      return {
        impressions: {
          banner: bannerImpressions,
          interstitial: interstitialImpressions,
          native: nativeImpressions,
          push: pushImpressions,
          total: totalImpressions
        },
        clicks: {
          banner: bannerClicks,
          interstitial: interstitialClicks,
          native: nativeClicks,
          push: pushClicks,
          total: totalClicks
        },
        revenue: {
          banner: parseFloat(bannerRevenue.toFixed(2)),
          interstitial: parseFloat(interstitialRevenue.toFixed(2)),
          native: parseFloat(nativeRevenue.toFixed(2)),
          push: parseFloat(pushRevenue.toFixed(2)),
          total: parseFloat(totalRevenue.toFixed(2))
        },
        ctr: parseFloat(ctr.toFixed(2)),
        rpm: parseFloat(rpm.toFixed(2)),
        estimatedMonthlyRevenue: parseFloat(estimatedMonthlyRevenue.toFixed(2))
      };
    };
    
    setAnalyticsData(generateRandomData());
  }, [dateRange, adsEnabled]);
  
  if (!adsEnabled) {
    return (
      <AnalyticsContainer className={className}>
        <AnalyticsHeader>
          <h2>Ad Analytics</h2>
          <p>Enable ads to view analytics data</p>
        </AnalyticsHeader>
      </AnalyticsContainer>
    );
  }
  
  return (
    <AnalyticsContainer className={className}>
      <AnalyticsHeader>
        <h2>Ad Analytics</h2>
        <p>Track your ad performance and revenue</p>
      </AnalyticsHeader>
      
      <ControlsRow>
        <DateRangeSelector
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="last7days">Last 7 Days</option>
          <option value="last30days">Last 30 Days</option>
        </DateRangeSelector>
      </ControlsRow>
      
      <OverviewCards>
        <OverviewCard>
          <CardTitle>Impressions</CardTitle>
          <CardValue>{analyticsData.impressions.total.toLocaleString()}</CardValue>
          <CardTrend positive>+12.5% vs previous period</CardTrend>
        </OverviewCard>
        
        <OverviewCard>
          <CardTitle>Clicks</CardTitle>
          <CardValue>{analyticsData.clicks.total.toLocaleString()}</CardValue>
          <CardTrend positive>+8.3% vs previous period</CardTrend>
        </OverviewCard>
        
        <OverviewCard>
          <CardTitle>CTR</CardTitle>
          <CardValue>{analyticsData.ctr}%</CardValue>
          <CardTrend negative>-1.2% vs previous period</CardTrend>
        </OverviewCard>
        
        <OverviewCard highlight>
          <CardTitle>Revenue</CardTitle>
          <CardValue>${analyticsData.revenue.total.toLocaleString()}</CardValue>
          <CardTrend positive>+15.7% vs previous period</CardTrend>
        </OverviewCard>
      </OverviewCards>
      
      <AnalyticsSection>
        <SectionTitle>Revenue by Ad Type</SectionTitle>
        <RevenueTable>
          <thead>
            <tr>
              <th>Ad Type</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>CTR</th>
              <th>Revenue</th>
              <th>RPM</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Banner Ads</td>
              <td>{analyticsData.impressions.banner.toLocaleString()}</td>
              <td>{analyticsData.clicks.banner.toLocaleString()}</td>
              <td>{((analyticsData.clicks.banner / analyticsData.impressions.banner) * 100).toFixed(2)}%</td>
              <td>${analyticsData.revenue.banner.toLocaleString()}</td>
              <td>${((analyticsData.revenue.banner / analyticsData.impressions.banner) * 1000).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Interstitial Ads</td>
              <td>{analyticsData.impressions.interstitial.toLocaleString()}</td>
              <td>{analyticsData.clicks.interstitial.toLocaleString()}</td>
              <td>{((analyticsData.clicks.interstitial / analyticsData.impressions.interstitial) * 100).toFixed(2)}%</td>
              <td>${analyticsData.revenue.interstitial.toLocaleString()}</td>
              <td>${((analyticsData.revenue.interstitial / analyticsData.impressions.interstitial) * 1000).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Native Ads</td>
              <td>{analyticsData.impressions.native.toLocaleString()}</td>
              <td>{analyticsData.clicks.native.toLocaleString()}</td>
              <td>{((analyticsData.clicks.native / analyticsData.impressions.native) * 100).toFixed(2)}%</td>
              <td>${analyticsData.revenue.native.toLocaleString()}</td>
              <td>${((analyticsData.revenue.native / analyticsData.impressions.native) * 1000).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Push Notifications</td>
              <td>{analyticsData.impressions.push.toLocaleString()}</td>
              <td>{analyticsData.clicks.push.toLocaleString()}</td>
              <td>{((analyticsData.clicks.push / analyticsData.impressions.push) * 100).toFixed(2)}%</td>
              <td>${analyticsData.revenue.push.toLocaleString()}</td>
              <td>${((analyticsData.revenue.push / analyticsData.impressions.push) * 1000).toFixed(2)}</td>
            </tr>
            <tr className="total-row">
              <td>Total</td>
              <td>{analyticsData.impressions.total.toLocaleString()}</td>
              <td>{analyticsData.clicks.total.toLocaleString()}</td>
              <td>{analyticsData.ctr}%</td>
              <td>${analyticsData.revenue.total.toLocaleString()}</td>
              <td>${analyticsData.rpm}</td>
            </tr>
          </tbody>
        </RevenueTable>
      </AnalyticsSection>
      
      <AnalyticsSection>
        <SectionTitle>Projected Revenue</SectionTitle>
        <ProjectedRevenueCard>
          <ProjectedTitle>Estimated Monthly Revenue</ProjectedTitle>
          <ProjectedValue>${analyticsData.estimatedMonthlyRevenue.toLocaleString()}</ProjectedValue>
          <ProjectedDescription>
            Based on your current performance, you're on track to earn approximately 
            ${analyticsData.estimatedMonthlyRevenue.toLocaleString()} this month.
          </ProjectedDescription>
          <ProgressContainer>
            <ProgressLabel>Progress toward $1,000 goal:</ProgressLabel>
            <ProgressBar>
              <ProgressFill width={Math.min(analyticsData.estimatedMonthlyRevenue / 10, 100)} />
            </ProgressBar>
            <ProgressText>
              {Math.min(Math.round(analyticsData.estimatedMonthlyRevenue / 10), 100)}% of $1,000 goal
            </ProgressText>
          </ProgressContainer>
        </ProjectedRevenueCard>
      </AnalyticsSection>
      
      <AnalyticsSection>
        <SectionTitle>Optimization Tips</SectionTitle>
        <TipsList>
          <TipItem>
            <TipIcon className="fas fa-chart-line" />
            <TipContent>
              <TipTitle>Increase Ad Placements</TipTitle>
              <TipDescription>
                Consider adding more ad units to high-traffic pages to increase impressions.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-mobile-alt" />
            <TipContent>
              <TipTitle>Optimize for Mobile</TipTitle>
              <TipDescription>
                Ensure your ads are properly displayed on mobile devices, as they account for over 60% of traffic.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-bell" />
            <TipContent>
              <TipTitle>Enable Push Notifications</TipTitle>
              <TipDescription>
                Push notifications have the highest CTR and can significantly increase your revenue.
              </TipDescription>
            </TipContent>
          </TipItem>
          
          <TipItem>
            <TipIcon className="fas fa-puzzle-piece" />
            <TipContent>
              <TipTitle>Test Native Ad Placements</TipTitle>
              <TipDescription>
                Native ads blend with your content and can provide better user experience and higher engagement.
              </TipDescription>
            </TipContent>
          </TipItem>
        </TipsList>
      </AnalyticsSection>
    </AnalyticsContainer>
  );
};

// Styled Components
const AnalyticsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const AnalyticsHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #666;
  }
`;

const ControlsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;

const DateRangeSelector = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 0.9rem;
`;

const OverviewCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const OverviewCard = styled.div<{ highlight?: boolean }>`
  background-color: ${props => props.highlight ? 'var(--primary-color)' : 'white'};
  color: ${props => props.highlight ? 'white' : 'inherit'};
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const CardTitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  opacity: 0.8;
`;

const CardValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const CardTrend = styled.div<{ positive?: boolean; negative?: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#28a745' : props.negative ? '#dc3545' : 'inherit'};
`;

const AnalyticsSection = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const RevenueTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  th {
    font-weight: 600;
    background-color: #f9f9f9;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  .total-row {
    font-weight: 600;
    background-color: #f5f5f5;
  }
  
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const ProjectedRevenueCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
`;

const ProjectedTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
`;

const ProjectedValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const ProjectedDescription = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;

const ProgressContainer = styled.div`
  margin-top: 1.5rem;
`;

const ProgressLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  text-align: left;
`;

const ProgressBar = styled.div`
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const ProgressFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
`;

const ProgressText = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-align: right;
`;

const TipsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TipItem = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
`;

const TipIcon = styled.i`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-right: 1rem;
  margin-top: 0.25rem;
`;

const TipContent = styled.div`
  flex: 1;
`;

const TipTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TipDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

export default AdAnalytics;
