import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCalculator, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('annually');
  const [additionalContribution, setAdditionalContribution] = useState<string>('');
  const [contributionFrequency, setContributionFrequency] = useState<string>('monthly');
  const [result, setResult] = useState<{
    futureValue: number;
    totalPrincipal: number;
    totalContributions: number;
    totalInterest: number;
    yearlyBreakdown: Array<{
      year: number;
      principal: number;
      contributions: number;
      interest: number;
      balance: number;
    }>;
  } | null>(null);

  const calculateCompoundInterest = () => {
    if (!principal || !interestRate || !time) {
      alert('Please fill in all required fields');
      return;
    }
    
    const initialPrincipal = parseFloat(principal);
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(time);
    const contribution = additionalContribution ? parseFloat(additionalContribution) : 0;
    
    if (isNaN(initialPrincipal) || isNaN(rate) || isNaN(years)) {
      alert('Please enter valid numbers');
      return;
    }
    
    // Determine number of compounds per year
    let compoundsPerYear: number;
    switch (compoundFrequency) {
      case 'daily':
        compoundsPerYear = 365;
        break;
      case 'weekly':
        compoundsPerYear = 52;
        break;
      case 'monthly':
        compoundsPerYear = 12;
        break;
      case 'quarterly':
        compoundsPerYear = 4;
        break;
      case 'semi-annually':
        compoundsPerYear = 2;
        break;
      case 'annually':
        compoundsPerYear = 1;
        break;
      default:
        compoundsPerYear = 1;
    }
    
    // Determine number of contributions per year
    let contributionsPerYear: number;
    switch (contributionFrequency) {
      case 'weekly':
        contributionsPerYear = 52;
        break;
      case 'monthly':
        contributionsPerYear = 12;
        break;
      case 'quarterly':
        contributionsPerYear = 4;
        break;
      case 'annually':
        contributionsPerYear = 1;
        break;
      default:
        contributionsPerYear = 12;
    }
    
    // Calculate future value with compound interest and regular contributions
    let balance = initialPrincipal;
    let totalContributions = 0;
    const yearlyBreakdown = [];
    
    for (let year = 1; year <= years; year++) {
      let yearlyContribution = 0;
      let yearStartBalance = balance;
      
      // Compound interest calculation for each period within the year
      for (let period = 1; period <= compoundsPerYear; period++) {
        // Add interest for this period
        const interestForPeriod = balance * (rate / compoundsPerYear);
        balance += interestForPeriod;
        
        // Add contributions for this period if applicable
        const contributionsPerPeriod = contributionsPerYear / compoundsPerYear;
        for (let c = 0; c < contributionsPerPeriod; c++) {
          balance += contribution;
          yearlyContribution += contribution;
          totalContributions += contribution;
        }
      }
      
      yearlyBreakdown.push({
        year,
        principal: initialPrincipal,
        contributions: totalContributions,
        interest: balance - initialPrincipal - totalContributions,
        balance
      });
    }
    
    const futureValue = balance;
    const totalInterest = futureValue - initialPrincipal - totalContributions;
    
    setResult({
      futureValue,
      totalPrincipal: initialPrincipal,
      totalContributions,
      totalInterest,
      yearlyBreakdown
    });
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Layout>
      <Head>
        <title>Compound Interest Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate compound interest with our free calculator. See how your investments grow over time." />
        <meta name="keywords" content="compound interest calculator, investment calculator, savings calculator, interest calculator" />
      </Head>

      <PageContainer>
        <PageTitle>Compound Interest Calculator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CalculatorSection>
            <InputsContainer>
              <InputGroup>
                <label>Initial Investment:</label>
                <input 
                  type="number" 
                  value={principal} 
                  onChange={(e) => setPrincipal(e.target.value)} 
                  placeholder="Enter initial amount"
                  min="0"
                  step="100"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Annual Interest Rate (%):</label>
                <input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(e.target.value)} 
                  placeholder="Enter interest rate"
                  min="0"
                  step="0.1"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Time Period (years):</label>
                <input 
                  type="number" 
                  value={time} 
                  onChange={(e) => setTime(e.target.value)} 
                  placeholder="Enter years"
                  min="1"
                  step="1"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Compound Frequency:</label>
                <select 
                  value={compoundFrequency} 
                  onChange={(e) => setCompoundFrequency(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annually">Semi-Annually</option>
                  <option value="annually">Annually</option>
                </select>
              </InputGroup>
              
              <InputGroup>
                <label>Additional Contribution (optional):</label>
                <input 
                  type="number" 
                  value={additionalContribution} 
                  onChange={(e) => setAdditionalContribution(e.target.value)} 
                  placeholder="Enter contribution amount"
                  min="0"
                  step="10"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Contribution Frequency:</label>
                <select 
                  value={contributionFrequency} 
                  onChange={(e) => setContributionFrequency(e.target.value)}
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </InputGroup>
            </InputsContainer>
            
            <CalculateButton onClick={calculateCompoundInterest}>
              <FaCalculator /> Calculate
            </CalculateButton>
            
            {result && (
              <ResultsContainer>
                <ResultSummary>
                  <SummaryItem>
                    <SummaryLabel>Future Value:</SummaryLabel>
                    <SummaryValue>{formatCurrency(result.futureValue)}</SummaryValue>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>Initial Investment:</SummaryLabel>
                    <SummaryValue>{formatCurrency(result.totalPrincipal)}</SummaryValue>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>Total Contributions:</SummaryLabel>
                    <SummaryValue>{formatCurrency(result.totalContributions)}</SummaryValue>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>Total Interest Earned:</SummaryLabel>
                    <SummaryValue>{formatCurrency(result.totalInterest)}</SummaryValue>
                  </SummaryItem>
                </ResultSummary>
                
                <BreakdownTitle>Yearly Breakdown</BreakdownTitle>
                <BreakdownTable>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Principal</th>
                      <th>Contributions</th>
                      <th>Interest</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.map((year) => (
                      <tr key={year.year}>
                        <td>{year.year}</td>
                        <td>{formatCurrency(year.principal)}</td>
                        <td>{formatCurrency(year.contributions)}</td>
                        <td>{formatCurrency(year.interest)}</td>
                        <td>{formatCurrency(year.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </BreakdownTable>
              </ResultsContainer>
            )}
          </CalculatorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Compound Interest</InfoTitle>
          <InfoText>
            Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is earned on the principal sum plus previously accumulated interest.
            
            <InfoSubtitle>The Power of Compound Interest:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Time:</strong> The longer your money compounds, the more dramatic the growth</InfoItem>
              <InfoItem><strong>Rate:</strong> Higher interest rates lead to faster growth</InfoItem>
              <InfoItem><strong>Frequency:</strong> More frequent compounding periods result in higher returns</InfoItem>
              <InfoItem><strong>Regular Contributions:</strong> Adding regular contributions significantly accelerates growth</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Common Applications:</InfoSubtitle>
            <InfoList>
              <InfoItem>Retirement planning</InfoItem>
              <InfoItem>Investment growth projections</InfoItem>
              <InfoItem>Savings goals calculation</InfoItem>
              <InfoItem>Education fund planning</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> This calculator provides estimates based on a fixed interest rate and does not account for taxes, inflation, or varying interest rates over time.
            </InfoNote>
          </InfoText>
        </InfoContainer>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>
      </PageContainer>
    </Layout>
  );
};

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AdContainer = styled.div`
  background-color: #f9f9f9;
  padding: 1rem;
  margin: 1.5rem 0;
  border-radius: 4px;
  text-align: center;
`;

const AdText = styled.p`
  text-transform: uppercase;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.5rem;
`;

const AdContent = styled.div`
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  border: 1px dashed #ddd;
`;

const ToolContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`;

const CalculatorSection = styled.div`
  padding: 2rem;
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const InputGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const CalculateButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const ResultsContainer = styled.div`
  margin-top: 2rem;
`;

const ResultSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const SummaryItem = styled.div`
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const SummaryLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #666;
`;

const SummaryValue = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a90e2;
`;

const BreakdownTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
`;

const BreakdownTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #ddd;
    
    &:first-child {
      text-align: left;
    }
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 500;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
`;

const InfoContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const InfoSubtitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 1.5rem 0 0.5rem;
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const InfoList = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
`;

const InfoNote = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 0 4px 4px 0;
`;

export default CompoundInterestCalculator;
