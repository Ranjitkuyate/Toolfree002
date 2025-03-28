import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaSeedling, FaCloudRain } from 'react-icons/fa';

const IrrigationCalculator: React.FC = () => {
  const [cropType, setCropType] = useState<string>('corn');
  const [areaSize, setAreaSize] = useState<string>('');
  const [areaUnit, setAreaUnit] = useState<string>('hectare');
  const [soilType, setSoilType] = useState<string>('loam');
  const [rainfall, setRainfall] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);

  const cropTypes = [
    { id: 'corn', name: 'Corn', waterRequirement: 500 },
    { id: 'wheat', name: 'Wheat', waterRequirement: 450 },
    { id: 'rice', name: 'Rice', waterRequirement: 900 },
    { id: 'soybeans', name: 'Soybeans', waterRequirement: 450 },
    { id: 'potatoes', name: 'Potatoes', waterRequirement: 500 },
    { id: 'cotton', name: 'Cotton', waterRequirement: 700 },
    { id: 'sugarcane', name: 'Sugarcane', waterRequirement: 1500 },
  ];

  const soilTypes = [
    { id: 'sand', name: 'Sandy', waterHoldingCapacity: 0.7 },
    { id: 'loam', name: 'Loamy', waterHoldingCapacity: 1.0 },
    { id: 'clay', name: 'Clay', waterHoldingCapacity: 1.3 },
    { id: 'silt', name: 'Silty', waterHoldingCapacity: 1.1 },
  ];

  const calculateIrrigation = () => {
    if (!areaSize || !rainfall) {
      setResult('Please fill in all fields');
      return;
    }
    
    const area = parseFloat(areaSize);
    const rain = parseFloat(rainfall);
    
    if (isNaN(area) || isNaN(rain)) {
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
    
    // Get crop water requirement
    const crop = cropTypes.find(c => c.id === cropType);
    const waterRequirement = crop ? crop.waterRequirement : 500; // mm per season
    
    // Get soil water holding capacity factor
    const soil = soilTypes.find(s => s.id === soilType);
    const soilFactor = soil ? soil.waterHoldingCapacity : 1.0;
    
    // Calculate irrigation requirement
    const irrigationNeeded = Math.max(0, (waterRequirement * soilFactor) - rain);
    
    // Calculate total water volume
    const waterVolume = (irrigationNeeded * areaInHectares * 10); // cubic meters (1mm over 1ha = 10 cubic meters)
    
    setResult(`
      Irrigation Requirement: ${irrigationNeeded.toFixed(1)} mm
      
      Total Water Volume Needed: ${waterVolume.toFixed(1)} cubic meters
      
      Area: ${areaInHectares.toFixed(2)} hectares
      
      Crop Water Requirement: ${waterRequirement} mm/season
      
      Effective Rainfall: ${rain} mm
    `);
  };

  return (
    <Layout>
      <Head>
        <title>Irrigation Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate irrigation requirements for crops based on rainfall, soil type, and crop water needs." />
        <meta name="keywords" content="irrigation calculator, water requirement, agriculture, farming, crop irrigation" />
      </Head>

      <PageContainer>
        <PageTitle>Irrigation Calculator</PageTitle>

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
                onChange={(e) => setCropType(e.target.value)}
              >
                {cropTypes.map(crop => (
                  <option key={crop.id} value={crop.id}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </InputGroup>
            
            <InputGroup>
              <label>Soil Type:</label>
              <select 
                value={soilType} 
                onChange={(e) => setSoilType(e.target.value)}
              >
                {soilTypes.map(soil => (
                  <option key={soil.id} value={soil.id}>
                    {soil.name}
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
              <label>Seasonal Rainfall (mm):</label>
              <input 
                type="number" 
                value={rainfall} 
                onChange={(e) => setRainfall(e.target.value)} 
                placeholder="Enter rainfall amount"
                min="0"
              />
            </InputGroup>
            
            <CalculateButton onClick={calculateIrrigation}>
              <FaCloudRain /> Calculate Irrigation
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
          <InfoTitle>About Irrigation Calculation</InfoTitle>
          <InfoText>
            This calculator helps farmers determine irrigation requirements based on:
            <InfoList>
              <InfoItem>Crop water requirements (varies by crop type)</InfoItem>
              <InfoItem>Soil water holding capacity (varies by soil type)</InfoItem>
              <InfoItem>Seasonal rainfall</InfoItem>
              <InfoItem>Field area</InfoItem>
            </InfoList>
            The results provide an estimate of the irrigation water needed throughout the growing season. Actual requirements may vary based on local conditions, growth stage, and weather patterns.
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

export default IrrigationCalculator;
