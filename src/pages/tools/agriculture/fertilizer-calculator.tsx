import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaSeedling, FaLeaf } from 'react-icons/fa';

const FertilizerCalculator: React.FC = () => {
  const [cropType, setCropType] = useState<string>('corn');
  const [areaSize, setAreaSize] = useState<string>('');
  const [areaUnit, setAreaUnit] = useState<string>('hectare');
  const [soilNutrients, setSoilNutrients] = useState<{n: string, p: string, k: string}>({
    n: '',
    p: '',
    k: ''
  });
  const [result, setResult] = useState<string | null>(null);

  const cropTypes = [
    { id: 'corn', name: 'Corn', nutrients: { n: 180, p: 80, k: 70 } },
    { id: 'wheat', name: 'Wheat', nutrients: { n: 120, p: 60, k: 40 } },
    { id: 'rice', name: 'Rice', nutrients: { n: 100, p: 50, k: 50 } },
    { id: 'soybeans', name: 'Soybeans', nutrients: { n: 0, p: 40, k: 60 } },
    { id: 'potatoes', name: 'Potatoes', nutrients: { n: 140, p: 100, k: 180 } },
    { id: 'cotton', name: 'Cotton', nutrients: { n: 110, p: 50, k: 80 } },
    { id: 'tomatoes', name: 'Tomatoes', nutrients: { n: 150, p: 70, k: 150 } },
  ];

  const handleSoilNutrientChange = (nutrient: 'n' | 'p' | 'k', value: string) => {
    setSoilNutrients({
      ...soilNutrients,
      [nutrient]: value
    });
  };

  const calculateFertilizer = () => {
    if (!areaSize || !soilNutrients.n || !soilNutrients.p || !soilNutrients.k) {
      setResult('Please fill in all fields');
      return;
    }
    
    const area = parseFloat(areaSize);
    const soilN = parseFloat(soilNutrients.n);
    const soilP = parseFloat(soilNutrients.p);
    const soilK = parseFloat(soilNutrients.k);
    
    if (isNaN(area) || isNaN(soilN) || isNaN(soilP) || isNaN(soilK)) {
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
    
    // Get crop nutrient requirements
    const crop = cropTypes.find(c => c.id === cropType);
    const cropN = crop ? crop.nutrients.n : 120;
    const cropP = crop ? crop.nutrients.p : 60;
    const cropK = crop ? crop.nutrients.k : 60;
    
    // Calculate nutrient deficits
    const nDeficit = Math.max(0, cropN - soilN);
    const pDeficit = Math.max(0, cropP - soilP);
    const kDeficit = Math.max(0, cropK - soilK);
    
    // Calculate fertilizer amounts (kg/ha)
    // Assuming standard fertilizers: Urea (46% N), DAP (18% N, 46% P), MOP (60% K)
    const ureaAmount = (nDeficit / 0.46);
    const dapAmount = (pDeficit / 0.46);
    const mopAmount = (kDeficit / 0.60);
    
    // Calculate total amounts needed for the field
    const totalUrea = ureaAmount * areaInHectares;
    const totalDAP = dapAmount * areaInHectares;
    const totalMOP = mopAmount * areaInHectares;
    
    setResult(`
      Fertilizer Requirements:
      
      Urea (46-0-0): ${totalUrea.toFixed(1)} kg (${(ureaAmount).toFixed(1)} kg/ha)
      
      DAP (18-46-0): ${totalDAP.toFixed(1)} kg (${(dapAmount).toFixed(1)} kg/ha)
      
      MOP (0-0-60): ${totalMOP.toFixed(1)} kg (${(mopAmount).toFixed(1)} kg/ha)
      
      Area: ${areaInHectares.toFixed(2)} hectares
    `);
  };

  return (
    <Layout>
      <Head>
        <title>Fertilizer Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate fertilizer requirements for crops based on soil nutrients and crop needs." />
        <meta name="keywords" content="fertilizer calculator, NPK calculator, agriculture, farming, crop nutrition" />
      </Head>

      <PageContainer>
        <PageTitle>Fertilizer Calculator</PageTitle>

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
            
            <NutrientInputsContainer>
              <NutrientTitle>Soil Nutrient Levels (kg/ha):</NutrientTitle>
              
              <NutrientInputs>
                <NutrientInput>
                  <label>Nitrogen (N):</label>
                  <input 
                    type="number" 
                    value={soilNutrients.n} 
                    onChange={(e) => handleSoilNutrientChange('n', e.target.value)} 
                    placeholder="N"
                    min="0"
                  />
                </NutrientInput>
                
                <NutrientInput>
                  <label>Phosphorus (P):</label>
                  <input 
                    type="number" 
                    value={soilNutrients.p} 
                    onChange={(e) => handleSoilNutrientChange('p', e.target.value)} 
                    placeholder="P"
                    min="0"
                  />
                </NutrientInput>
                
                <NutrientInput>
                  <label>Potassium (K):</label>
                  <input 
                    type="number" 
                    value={soilNutrients.k} 
                    onChange={(e) => handleSoilNutrientChange('k', e.target.value)} 
                    placeholder="K"
                    min="0"
                  />
                </NutrientInput>
              </NutrientInputs>
            </NutrientInputsContainer>
            
            <CalculateButton onClick={calculateFertilizer}>
              <FaLeaf /> Calculate Fertilizer
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
          <InfoTitle>About Fertilizer Calculation</InfoTitle>
          <InfoText>
            This calculator helps farmers determine fertilizer requirements based on:
            <InfoList>
              <InfoItem>Crop nutrient requirements (N-P-K)</InfoItem>
              <InfoItem>Existing soil nutrient levels</InfoItem>
              <InfoItem>Field area</InfoItem>
            </InfoList>
            The calculator provides recommendations for common fertilizers:
            <InfoList>
              <InfoItem>Urea (46-0-0): Primary source of Nitrogen</InfoItem>
              <InfoItem>DAP (18-46-0): Diammonium Phosphate, source of Phosphorus</InfoItem>
              <InfoItem>MOP (0-0-60): Muriate of Potash, source of Potassium</InfoItem>
            </InfoList>
            For best results, use soil test data to determine existing nutrient levels.
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

const NutrientInputsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const NutrientTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const NutrientInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const NutrientInput = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
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

export default FertilizerCalculator;
