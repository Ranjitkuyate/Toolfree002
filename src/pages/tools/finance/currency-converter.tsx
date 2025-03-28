import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCalculator, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [result, setResult] = useState<number | null>(null);
  const [conversionRate, setConversionRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Sample exchange rates (in a real app, these would come from an API)
  const exchangeRates = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 151.12, CAD: 1.36, AUD: 1.52, INR: 83.45, CNY: 7.23 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 164.26, CAD: 1.48, AUD: 1.65, INR: 90.71, CNY: 7.86 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 191.29, CAD: 1.72, AUD: 1.92, INR: 105.63, CNY: 9.15 },
    JPY: { USD: 0.0066, EUR: 0.0061, GBP: 0.0052, CAD: 0.0090, AUD: 0.010, INR: 0.55, CNY: 0.048 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 111.12, AUD: 1.12, INR: 61.36, CNY: 5.32 },
    AUD: { USD: 0.66, EUR: 0.61, GBP: 0.52, JPY: 99.42, CAD: 0.89, INR: 54.90, CNY: 4.76 },
    INR: { USD: 0.012, EUR: 0.011, GBP: 0.0095, JPY: 1.81, CAD: 0.016, AUD: 0.018, CNY: 0.087 },
    CNY: { USD: 0.14, EUR: 0.13, GBP: 0.11, JPY: 20.90, CAD: 0.19, AUD: 0.21, INR: 11.54 }
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'EUR', name: 'Euro' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'JPY', name: 'Japanese Yen' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'AUD', name: 'Australian Dollar' },
    { code: 'INR', name: 'Indian Rupee' },
    { code: 'CNY', name: 'Chinese Yuan' }
  ];

  const convertCurrency = () => {
    if (!amount || isNaN(parseFloat(amount))) {
      alert('Please enter a valid amount');
      return;
    }
    
    const numericAmount = parseFloat(amount);
    
    if (fromCurrency === toCurrency) {
      setResult(numericAmount);
      setConversionRate(1);
    } else {
      const rate = exchangeRates[fromCurrency][toCurrency];
      const convertedAmount = numericAmount * rate;
      setResult(convertedAmount);
      setConversionRate(rate);
    }
    
    // Set last updated time
    const now = new Date();
    setLastUpdated(now.toLocaleString());
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setConversionRate(null);
  };

  const formatCurrency = (value: number, currencyCode: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <Layout>
      <Head>
        <title>Currency Converter | ToolsFree Online</title>
        <meta name="description" content="Convert between different currencies with our free online currency converter tool." />
        <meta name="keywords" content="currency converter, exchange rate, forex, money converter, currency calculator" />
      </Head>

      <PageContainer>
        <PageTitle>Currency Converter</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <ConverterSection>
            <InputGroup>
              <label>Amount:</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </InputGroup>
            
            <CurrencySelectors>
              <CurrencySelector>
                <label>From:</label>
                <select 
                  value={fromCurrency} 
                  onChange={(e) => setFromCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={`from-${currency.code}`} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </CurrencySelector>
              
              <SwapButton onClick={swapCurrencies}>
                ⇄
              </SwapButton>
              
              <CurrencySelector>
                <label>To:</label>
                <select 
                  value={toCurrency} 
                  onChange={(e) => setToCurrency(e.target.value)}
                >
                  {currencies.map(currency => (
                    <option key={`to-${currency.code}`} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </CurrencySelector>
            </CurrencySelectors>
            
            <ConvertButton onClick={convertCurrency}>
              <FaCalculator /> Convert
            </ConvertButton>
            
            {result !== null && (
              <ResultContainer>
                <ResultAmount>
                  {formatCurrency(parseFloat(amount), fromCurrency)} = {formatCurrency(result, toCurrency)}
                </ResultAmount>
                <ResultDetails>
                  <ConversionRate>
                    1 {fromCurrency} = {conversionRate?.toFixed(4)} {toCurrency}
                  </ConversionRate>
                  <LastUpdated>
                    Last updated: {lastUpdated}
                  </LastUpdated>
                </ResultDetails>
              </ResultContainer>
            )}
          </ConverterSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Currency Conversion</InfoTitle>
          <InfoText>
            Our currency converter tool allows you to quickly convert between major world currencies using up-to-date exchange rates. This tool is useful for:
            <InfoList>
              <InfoItem>Planning international travel expenses</InfoItem>
              <InfoItem>Calculating costs for international purchases</InfoItem>
              <InfoItem>Monitoring currency exchange rates for business</InfoItem>
              <InfoItem>Understanding the relative value of different currencies</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> The exchange rates used in this demo are approximations and may not reflect current market rates. In a production environment, this tool would connect to a real-time currency API for accurate, up-to-date exchange rates.
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

const ConverterSection = styled.div`
  padding: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
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

const CurrencySelectors = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const CurrencySelector = styled.div`
  flex: 1;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
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

const SwapButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s;
  align-self: center;
  margin-bottom: 0.5rem;
  
  &:hover {
    background-color: #e5e5e5;
  }
  
  @media (max-width: 768px) {
    align-self: flex-end;
    margin: -1rem 0 1rem 0;
  }
`;

const ConvertButton = styled.button`
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

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ResultAmount = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: #333;
`;

const ResultDetails = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ConversionRate = styled.div`
  color: #666;
`;

const LastUpdated = styled.div`
  color: #999;
  font-size: 0.9rem;
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

export default CurrencyConverter;
