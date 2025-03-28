import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaExchangeAlt, FaGlobe, FaLanguage } from 'react-icons/fa';

const NumberBaseConverter: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromBase, setFromBase] = useState<string>('10');
  const [toBase, setToBase] = useState<string>('2');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const baseOptions = [
    { value: '2', label: 'Binary (Base 2)' },
    { value: '8', label: 'Octal (Base 8)' },
    { value: '10', label: 'Decimal (Base 10)' },
    { value: '16', label: 'Hexadecimal (Base 16)' },
    { value: '3', label: 'Base 3' },
    { value: '4', label: 'Base 4' },
    { value: '5', label: 'Base 5' },
    { value: '6', label: 'Base 6' },
    { value: '7', label: 'Base 7' },
    { value: '9', label: 'Base 9' },
    { value: '11', label: 'Base 11' },
    { value: '12', label: 'Base 12' },
    { value: '13', label: 'Base 13' },
    { value: '14', label: 'Base 14' },
    { value: '15', label: 'Base 15' },
    { value: '32', label: 'Base 32' },
    { value: '36', label: 'Base 36' }
  ];

  // Validate input based on the selected base
  const isValidInput = (value: string, base: number): boolean => {
    const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(0, base);
    const regex = new RegExp(`^[${validChars}]+$`, 'i');
    return regex.test(value);
  };

  // Convert number from one base to another
  const convertBase = () => {
    setError('');
    
    if (!inputValue) {
      setError('Please enter a value to convert');
      return;
    }
    
    const fromBaseNum = parseInt(fromBase);
    const toBaseNum = parseInt(toBase);
    
    // Validate input
    if (!isValidInput(inputValue.toUpperCase(), fromBaseNum)) {
      setError(`Invalid input for base ${fromBase}`);
      return;
    }
    
    try {
      // Convert from source base to decimal
      const decimalValue = parseInt(inputValue, fromBaseNum);
      
      // Convert from decimal to target base
      let convertedValue = decimalValue.toString(toBaseNum).toUpperCase();
      
      setResult(convertedValue);
    } catch (err) {
      setError('Conversion error. Please check your input.');
    }
  };

  // Swap bases
  const swapBases = () => {
    setFromBase(toBase);
    setToBase(fromBase);
    
    // If there's a result, recalculate
    if (result && !error) {
      setInputValue(result);
      setResult('');
    }
  };

  return (
    <Layout>
      <Head>
        <title>Number Base Converter | ToolsFree Online</title>
        <meta name="description" content="Convert numbers between different bases including binary, octal, decimal, and hexadecimal." />
        <meta name="keywords" content="number base converter, binary converter, decimal converter, hex converter, octal converter" />
      </Head>

      <PageContainer>
        <PageTitle>Number Base Converter</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <ConverterSection>
            <InputGroup>
              <label>Enter Value:</label>
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value.toUpperCase())} 
                placeholder="Enter a number to convert"
              />
            </InputGroup>
            
            <BaseSelectors>
              <BaseSelector>
                <label>From Base:</label>
                <select 
                  value={fromBase} 
                  onChange={(e) => setFromBase(e.target.value)}
                >
                  {baseOptions.map(option => (
                    <option key={`from-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </BaseSelector>
              
              <SwapButton onClick={swapBases}>
                ⇄
              </SwapButton>
              
              <BaseSelector>
                <label>To Base:</label>
                <select 
                  value={toBase} 
                  onChange={(e) => setToBase(e.target.value)}
                >
                  {baseOptions.map(option => (
                    <option key={`to-${option.value}`} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </BaseSelector>
            </BaseSelectors>
            
            <ConvertButton onClick={convertBase}>
              <FaExchangeAlt /> Convert
            </ConvertButton>
            
            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}
            
            {result && !error && (
              <ResultContainer>
                <ResultLabel>Result:</ResultLabel>
                <ResultValue>
                  {result}
                </ResultValue>
                <ResultDetails>
                  <BaseInfo>Base {toBase}</BaseInfo>
                </ResultDetails>
              </ResultContainer>
            )}
          </ConverterSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Number Base Conversion</InfoTitle>
          <InfoText>
            <InfoParagraph>
              Number base conversion is the process of converting a number from one number system to another. This tool supports conversion between various number bases, including:
            </InfoParagraph>
            
            <InfoSubtitle>Common Number Bases:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Binary (Base 2):</strong> Uses only 0 and 1. Used in computing and digital electronics.</InfoItem>
              <InfoItem><strong>Octal (Base 8):</strong> Uses digits 0-7. Historically used in computing.</InfoItem>
              <InfoItem><strong>Decimal (Base 10):</strong> Uses digits 0-9. Our standard number system.</InfoItem>
              <InfoItem><strong>Hexadecimal (Base 16):</strong> Uses digits 0-9 and letters A-F. Commonly used in computing for memory addresses and color codes.</InfoItem>
            </InfoList>
            
            <InfoSubtitle>How to Use:</InfoSubtitle>
            <InfoList>
              <InfoItem>Enter a number in the input field</InfoItem>
              <InfoItem>Select the base of your input number</InfoItem>
              <InfoItem>Select the base you want to convert to</InfoItem>
              <InfoItem>Click "Convert" to see the result</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Valid Input Characters:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Base 2 (Binary):</strong> 0, 1</InfoItem>
              <InfoItem><strong>Base 8 (Octal):</strong> 0-7</InfoItem>
              <InfoItem><strong>Base 10 (Decimal):</strong> 0-9</InfoItem>
              <InfoItem><strong>Base 16 (Hexadecimal):</strong> 0-9, A-F</InfoItem>
              <InfoItem>Higher bases use additional letters (G-Z) as needed</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> This converter handles integer values only. For very large numbers, precision may be limited by JavaScript's number handling capabilities.
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

const BaseSelectors = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const BaseSelector = styled.div`
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

const ErrorMessage = styled.div`
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fff3f3;
  border-left: 4px solid #e53935;
  color: #e53935;
  border-radius: 0 4px 4px 0;
`;

const ResultContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ResultLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #666;
`;

const ResultValue = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
  word-break: break-all;
`;

const ResultDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BaseInfo = styled.div`
  color: #666;
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

const InfoSubtitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 1.5rem 0 0.5rem;
  
  &:first-of-type {
    margin-top: 1rem;
  }
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const InfoParagraph = styled.p`
  margin-bottom: 1rem;
`;

const InfoList = styled.ul`
  margin: 0.5rem 0 1rem;
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

export default NumberBaseConverter;
