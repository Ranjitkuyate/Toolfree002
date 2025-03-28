import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCalculator, FaEquals } from 'react-icons/fa';

const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<string | null>(null);

  const calculateAge = () => {
    if (!birthDate) {
      setResult('Please enter a birth date');
      return;
    }
    
    const birth = new Date(birthDate);
    const target = targetDate ? new Date(targetDate) : new Date();
    
    if (birth > target) {
      setResult('Birth date cannot be in the future');
      return;
    }
    
    const yearDiff = target.getFullYear() - birth.getFullYear();
    const monthDiff = target.getMonth() - birth.getMonth();
    const dayDiff = target.getDate() - birth.getDate();
    
    let years = yearDiff;
    let months = monthDiff;
    let days = dayDiff;
    
    // Adjust for negative days
    if (dayDiff < 0) {
      months -= 1;
      // Get days in the previous month
      const prevMonth = new Date(target.getFullYear(), target.getMonth() - 1, 1);
      const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();
      days += daysInPrevMonth;
    }
    
    // Adjust for negative months
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    
    // Calculate total values
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor((target.getTime() - birth.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (24 * 60 * 60 * 1000));
    const totalHours = Math.floor((target.getTime() - birth.getTime()) / (60 * 60 * 1000));
    
    setResult(`
      Age: ${years} years, ${months} months, ${days} days
      
      Total: ${totalMonths} months
      Total: ${totalWeeks} weeks
      Total: ${totalDays} days
      Total: ${totalHours} hours
    `);
  };

  return (
    <Layout>
      <Head>
        <title>Age Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate age between two dates online for free. Find exact age in years, months, days, and more." />
        <meta name="keywords" content="age calculator, calculate age, date difference, birthday calculator" />
      </Head>

      <PageContainer>
        <PageTitle>Age Calculator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CalculatorSection>
            <InputGroup>
              <label>Birth Date:</label>
              <input 
                type="date" 
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)} 
                max={new Date().toISOString().split('T')[0]}
              />
            </InputGroup>
            
            <InputGroup>
              <label>Target Date (defaults to today):</label>
              <input 
                type="date" 
                value={targetDate} 
                onChange={(e) => setTargetDate(e.target.value)} 
              />
            </InputGroup>
            
            <CalculateButton onClick={calculateAge}>
              <FaCalculator /> Calculate Age
            </CalculateButton>
            
            {result && (
              <ResultContainer>
                <ResultIcon><FaEquals /></ResultIcon>
                <ResultText>
                  {result.split('\n').map((line, index) => (
                    <ResultLine key={index}>{line}</ResultLine>
                  ))}
                </ResultText>
              </ResultContainer>
            )}
          </CalculatorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>How It Works</InfoTitle>
          <InfoText>
            This age calculator determines the exact age between two dates. It calculates:
            <InfoList>
              <InfoItem>Years, months, and days between the dates</InfoItem>
              <InfoItem>Total months elapsed</InfoItem>
              <InfoItem>Total weeks elapsed</InfoItem>
              <InfoItem>Total days elapsed</InfoItem>
              <InfoItem>Total hours elapsed</InfoItem>
            </InfoList>
            Perfect for calculating exact age, time since an event, or time until a future date.
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

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ResultIcon = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-top: 0.25rem;
`;

const ResultText = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
`;

const ResultLine = styled.div`
  margin-bottom: 0.5rem;
  
  &:first-child {
    font-weight: 500;
    font-size: 1.25rem;
    color: #333;
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

export default AgeCalculator;
