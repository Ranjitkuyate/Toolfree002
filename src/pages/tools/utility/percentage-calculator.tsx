import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCalculator, FaEquals } from 'react-icons/fa';

const PercentageCalculator: React.FC = () => {
  const [calculationType, setCalculationType] = useState<string>('percentage');
  const [value1, setValue1] = useState<string>('');
  const [value2, setValue2] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const num1 = parseFloat(value1);
    const num2 = parseFloat(value2);
    
    if (isNaN(num1) || isNaN(num2)) {
      setResult('Please enter valid numbers');
      return;
    }
    
    let calculatedResult: number;
    let formattedResult: string;
    
    switch (calculationType) {
      case 'percentage':
        // What is X% of Y?
        calculatedResult = (num1 / 100) * num2;
        formattedResult = `${num1}% of ${num2} is ${calculatedResult.toFixed(2)}`;
        break;
        
      case 'percentageOf':
        // X is what percentage of Y?
        calculatedResult = (num1 / num2) * 100;
        formattedResult = `${num1} is ${calculatedResult.toFixed(2)}% of ${num2}`;
        break;
        
      case 'percentageChange':
        // Percentage change from X to Y
        calculatedResult = ((num2 - num1) / num1) * 100;
        formattedResult = `The percentage change from ${num1} to ${num2} is ${calculatedResult.toFixed(2)}%`;
        break;
        
      default:
        formattedResult = 'Invalid calculation type';
    }
    
    setResult(formattedResult);
  };

  const getInputLabels = () => {
    switch (calculationType) {
      case 'percentage':
        return { label1: 'Percentage (%)', label2: 'Value' };
      case 'percentageOf':
        return { label1: 'Value', label2: 'Total Value' };
      case 'percentageChange':
        return { label1: 'Original Value', label2: 'New Value' };
      default:
        return { label1: 'Value 1', label2: 'Value 2' };
    }
  };

  const { label1, label2 } = getInputLabels();

  return (
    <Layout>
      <Head>
        <title>Percentage Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate percentages online for free. Find percentage of a number, percentage change, and more." />
        <meta name="keywords" content="percentage calculator, calculate percentage, percentage change, percentage of number" />
      </Head>

      <PageContainer>
        <PageTitle>Percentage Calculator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CalculatorSection>
            <CalculationTypeSelector>
              <label>Calculation Type:</label>
              <select 
                value={calculationType} 
                onChange={(e) => {
                  setCalculationType(e.target.value);
                  setResult(null);
                }}
              >
                <option value="percentage">What is X% of Y?</option>
                <option value="percentageOf">X is what percentage of Y?</option>
                <option value="percentageChange">Percentage change from X to Y</option>
              </select>
            </CalculationTypeSelector>
            
            <InputGroup>
              <label>{label1}:</label>
              <input 
                type="number" 
                value={value1} 
                onChange={(e) => setValue1(e.target.value)} 
                placeholder="Enter value"
              />
            </InputGroup>
            
            <InputGroup>
              <label>{label2}:</label>
              <input 
                type="number" 
                value={value2} 
                onChange={(e) => setValue2(e.target.value)} 
                placeholder="Enter value"
              />
            </InputGroup>
            
            <CalculateButton onClick={calculate}>
              <FaCalculator /> Calculate
            </CalculateButton>
            
            {result && (
              <ResultContainer>
                <ResultIcon><FaEquals /></ResultIcon>
                <ResultText>{result}</ResultText>
              </ResultContainer>
            )}
          </CalculatorSection>
        </ToolContainer>

        <ExamplesContainer>
          <ExamplesTitle>Examples:</ExamplesTitle>
          <ExamplesList>
            <ExampleItem>
              <ExampleTitle>What is 20% of 80?</ExampleTitle>
              <ExampleDescription>
                To calculate this, multiply 80 by 20%, which is 80 × (20/100) = 16.
              </ExampleDescription>
            </ExampleItem>
            <ExampleItem>
              <ExampleTitle>15 is what percentage of 60?</ExampleTitle>
              <ExampleDescription>
                To calculate this, divide 15 by 60 and multiply by 100: (15/60) × 100 = 25%.
              </ExampleDescription>
            </ExampleItem>
            <ExampleItem>
              <ExampleTitle>Percentage change from 50 to 65</ExampleTitle>
              <ExampleDescription>
                To calculate this, find the difference (65 - 50 = 15), divide by the original value (15/50 = 0.3), and multiply by 100: 0.3 × 100 = 30%.
              </ExampleDescription>
            </ExampleItem>
          </ExamplesList>
        </ExamplesContainer>

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

const CalculationTypeSelector = styled.div`
  margin-bottom: 1.5rem;
  
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
  align-items: center;
  gap: 1rem;
`;

const ResultIcon = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
`;

const ResultText = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;

const ExamplesContainer = styled.div`
  margin-bottom: 2rem;
`;

const ExamplesTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
`;

const ExamplesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ExampleItem = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const ExampleTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.75rem;
`;

const ExampleDescription = styled.p`
  color: #666;
  line-height: 1.5;
`;

export default PercentageCalculator;
