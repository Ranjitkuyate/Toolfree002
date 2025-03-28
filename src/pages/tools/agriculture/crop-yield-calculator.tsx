import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaSeedling, FaCalculator } from 'react-icons/fa';

const CropYieldCalculator: React.FC = () => {
  const [cropType, setCropType] = useState<string>('corn');
  const [areaSize, setAreaSize] = useState<string>('');
  const [areaUnit, setAreaUnit] = useState<string>('hectare');
  const [seedRate, setSeedRate] = useState<string>('');
  const [expectedYield, setExpectedYield] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const cropTypes = [
    { id: 'corn', name: 'Corn', defaultYield: '9.5', unit: 'tons/hectare' },
    { id: 'wheat', name: 'Wheat', defaultYield: '3.5', unit: 'tons/hectare' },
    { id: 'rice', name: 'Rice', defaultYield: '4.6', unit: 'tons/hectare' },
    { id: 'soybeans', name: 'Soybeans', defaultYield: '3.2', unit: 'tons/hectare' },
    { id: 'potatoes', name: 'Potatoes', defaultYield: '20', unit: 'tons/hectare' },
    { id: 'cotton', name: 'Cotton', defaultYield: '0.8', unit: 'tons/hectare' },
    { id: 'sugarcane', name: 'Sugarcane', defaultYield: '70', unit: 'tons/hectare' },
  ];

  const handleCropTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCrop = e.target.value;
    setCropType(selectedCrop);
    
    // Set default expected yield based on crop type
    const crop = cropTypes.find(c => c.id === selectedCrop);
    if (crop) {
      setExpectedYield(crop.defaultYield);
    }
  };

  const calculateYield = () => {
    if (!areaSize || !seedRate || !expectedYield) {
      setResult('Please fill in all fields');
      return;
    }
    
    const area = parseFloat(areaSize);
    const rate = parseFloat(seedRate);
    const yield_ = parseFloat(expectedYield);
    
    if (isNaN(area) || isNaN(rate) || isNaN(yield_)) {
      setResult('Please enter valid numbers');
      return;
    }
    
    // Convert area to hectares if needed
    let areaInHectares = area;
    if (areaUnit === 'acre') {
      areaInHectares = area * 0.4047;
    } else if (areaUnit === 'sqm') {
      areaInHectares = area / 10000;
    }
    
    // Calculate total yield
    const totalYield = areaInHectares * yield_;
    
    // Calculate seed required
    const seedRequired = areaInHectares * rate;
    
    // Get crop info
    const crop = cropTypes.find(c => c.id === cropType);
    
    setResult(`
      Estimated Crop Yield: ${totalYield.toFixed(2)} tons
      
      Seed Required: ${seedRequired.toFixed(2)} kg
      
      Area in Hectares: ${areaInHectares.toFixed(2)} ha
      
      Yield Rate: ${yield_.toFixed(2)} tons/hectare
    `);
  };

  return (
    <Layout>
      <Head>
        <title>Crop Yield Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate crop yields and seed requirements for your farm. Plan your agricultural production." />
        <meta name="keywords" content="crop yield calculator, agriculture calculator, farm planning, seed calculator" />
      </Head>

      <PageContainer>
        <PageTitle>Crop Yield Calculator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CalculatorSection>
            <InputGroup>
              <label>Crop Type:</label>
              <select 
                value={cropType} 
                onChange={handleCropTypeChange}
              >
                {cropTypes.map(crop => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </InputGroup>
            
            <InputGroup>
              <label>Area Size:</label>
              <InputWithUnit>
                <input 
                  type="number" 
                  value={areaSize} 
                  onChange={(e) => setAreaSize(e.target.value)} 
                  placeholder="Enter area size"
                  min="0"
                />
                <select 
                  value={areaUnit} 
                  onChange={(e) => setAreaUnit(e.target.value)}
                >
                  <option value="hectare">Hectares</option>
                  <option value="acre">Acres</option>
                  <option value="sqm">Square Meters</option>
                </select>
              </InputWithUnit>
            </InputGroup>
            
            <InputGroup>
              <label>Seed Rate (kg/hectare):</label>
              <input 
                type="number" 
                value={seedRate} 
                onChange={(e) => setSeedRate(e.target.value)} 
                placeholder="Enter seed rate"
                min="0"
              />
            </InputGroup>
            
            <InputGroup>
              <label>Expected Yield (tons/hectare):</label>
              <input 
                type="number" 
                value={expectedYield} 
                onChange={(e) => setExpectedYield(e.target.value)} 
                placeholder="Enter expected yield"
                min="0"
                step="0.1"
              />
            </InputGroup>
            
            <CalculateButton onClick={calculateYield}>
              <FaCalculator /> Calculate Yield
            </CalculateButton>
            
            {result && (
              <ResultContainer>
                <ResultIcon><FaSeedling /></ResultIcon>
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
          <InfoTitle>About Crop Yield Calculation</InfoTitle>
          <InfoText>
            This calculator helps farmers and agricultural planners estimate crop yields and seed requirements based on area size, seed rate, and expected yield per hectare. The results can be used for:
            <InfoList>
              <InfoItem>Planning seasonal crop production</InfoItem>
              <InfoItem>Estimating seed purchases</InfoItem>
              <InfoItem>Forecasting harvest volumes</InfoItem>
              <InfoItem>Budgeting for agricultural operations</InfoItem>
            </InfoList>
            The default yield values provided are global averages and may vary based on local conditions, farming practices, seed varieties, and weather patterns.
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

const InputWithUnit = styled.div`
  display: flex;
  gap: 0.5rem;
  
  input {
    flex: 3;
  }
  
  select {
    flex: 1;
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
  color: #4caf50;
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

export default CropYieldCalculator;
