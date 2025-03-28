import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCalculator, FaEquals } from 'react-icons/fa';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [unit, setUnit] = useState<string>('metric');
  const [result, setResult] = useState<string | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string | null>(null);
  const [bmiValue, setBmiValue] = useState<number | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) {
      setResult('Please enter both height and weight');
      return;
    }
    
    const heightVal = parseFloat(height);
    const weightVal = parseFloat(weight);
    
    if (isNaN(heightVal) || isNaN(weightVal)) {
      setResult('Please enter valid numbers');
      return;
    }
    
    let bmi: number;
    
    if (unit === 'metric') {
      // Metric: weight (kg) / height^2 (m)
      const heightInMeters = heightVal / 100; // Convert cm to m
      bmi = weightVal / (heightInMeters * heightInMeters);
    } else {
      // Imperial: (weight (lbs) * 703) / height^2 (inches)
      bmi = (weightVal * 703) / (heightVal * heightVal);
    }
    
    setBmiValue(bmi);
    
    let category: string;
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi < 25) {
      category = 'Normal weight';
    } else if (bmi < 30) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }
    
    setBmiCategory(category);
    setResult(`Your BMI is ${bmi.toFixed(1)}`);
  };

  return (
    <Layout>
      <Head>
        <title>BMI Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate your Body Mass Index (BMI) online for free. Find out if you're at a healthy weight." />
        <meta name="keywords" content="BMI calculator, body mass index, calculate BMI, healthy weight calculator" />
      </Head>

      <PageContainer>
        <PageTitle>BMI Calculator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CalculatorSection>
            <UnitSelector>
              <UnitOption 
                active={unit === 'metric'} 
                onClick={() => setUnit('metric')}
              >
                Metric (cm, kg)
              </UnitOption>
              <UnitOption 
                active={unit === 'imperial'} 
                onClick={() => setUnit('imperial')}
              >
                Imperial (in, lbs)
              </UnitOption>
            </UnitSelector>
            
            <InputGroup>
              <label>Height {unit === 'metric' ? '(cm)' : '(inches)'}:</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
                placeholder={`Enter height in ${unit === 'metric' ? 'centimeters' : 'inches'}`}
                min="0"
              />
            </InputGroup>
            
            <InputGroup>
              <label>Weight {unit === 'metric' ? '(kg)' : '(lbs)'}:</label>
              <input 
                type="number" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)} 
                placeholder={`Enter weight in ${unit === 'metric' ? 'kilograms' : 'pounds'}`}
                min="0"
              />
            </InputGroup>
            
            <CalculateButton onClick={calculateBMI}>
              <FaCalculator /> Calculate BMI
            </CalculateButton>
            
            {result && (
              <ResultContainer>
                <ResultIcon><FaEquals /></ResultIcon>
                <ResultContent>
                  <ResultText>{result}</ResultText>
                  {bmiCategory && (
                    <CategoryText category={bmiCategory}>
                      Category: {bmiCategory}
                    </CategoryText>
                  )}
                  {bmiValue && (
                    <BMIChart>
                      <ChartBar>
                        <ChartSegment category="Underweight" active={bmiValue < 18.5}>
                          Underweight
                        </ChartSegment>
                        <ChartSegment category="Normal weight" active={bmiValue >= 18.5 && bmiValue < 25}>
                          Normal
                        </ChartSegment>
                        <ChartSegment category="Overweight" active={bmiValue >= 25 && bmiValue < 30}>
                          Overweight
                        </ChartSegment>
                        <ChartSegment category="Obesity" active={bmiValue >= 30}>
                          Obesity
                        </ChartSegment>
                      </ChartBar>
                      <ChartLabels>
                        <ChartLabel>18.5</ChartLabel>
                        <ChartLabel>25</ChartLabel>
                        <ChartLabel>30</ChartLabel>
                      </ChartLabels>
                    </BMIChart>
                  )}
                </ResultContent>
              </ResultContainer>
            )}
          </CalculatorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>BMI Categories</InfoTitle>
          <CategoryTable>
            <thead>
              <tr>
                <TableHeader>BMI Range</TableHeader>
                <TableHeader>Category</TableHeader>
              </tr>
            </thead>
            <tbody>
              <TableRow>
                <TableCell>Below 18.5</TableCell>
                <TableCell>
                  <CategoryBadge category="Underweight">Underweight</CategoryBadge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>18.5 - 24.9</TableCell>
                <TableCell>
                  <CategoryBadge category="Normal weight">Normal weight</CategoryBadge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>25.0 - 29.9</TableCell>
                <TableCell>
                  <CategoryBadge category="Overweight">Overweight</CategoryBadge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>30.0 and above</TableCell>
                <TableCell>
                  <CategoryBadge category="Obesity">Obesity</CategoryBadge>
                </TableCell>
              </TableRow>
            </tbody>
          </CategoryTable>
          
          <DisclaimerText>
            Note: BMI is a screening tool, not a diagnostic tool. Consult with a healthcare provider for a complete health assessment.
          </DisclaimerText>
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

const UnitSelector = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

interface UnitOptionProps {
  active: boolean;
}

const UnitOption = styled.div<UnitOptionProps>`
  flex: 1;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  background-color: ${props => props.active ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#3a80d2' : '#e5e5e5'};
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
  align-items: flex-start;
  gap: 1rem;
`;

const ResultIcon = styled.div`
  font-size: 1.5rem;
  color: #4a90e2;
  margin-top: 0.25rem;
`;

const ResultContent = styled.div`
  flex: 1;
`;

const ResultText = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

interface CategoryTextProps {
  category: string;
}

const CategoryText = styled.div<CategoryTextProps>`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: ${props => {
    switch (props.category) {
      case 'Underweight':
        return '#ff9800';
      case 'Normal weight':
        return '#4caf50';
      case 'Overweight':
        return '#ff5722';
      case 'Obesity':
        return '#f44336';
      default:
        return '#333';
    }
  }};
`;

const BMIChart = styled.div`
  margin-top: 1rem;
`;

const ChartBar = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  border-radius: 4px;
  overflow: hidden;
`;

interface ChartSegmentProps {
  category: string;
  active: boolean;
}

const ChartSegment = styled.div<ChartSegmentProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;
  background-color: ${props => {
    let baseColor;
    switch (props.category) {
      case 'Underweight':
        baseColor = '#ff9800';
        break;
      case 'Normal weight':
        baseColor = '#4caf50';
        break;
      case 'Overweight':
        baseColor = '#ff5722';
        break;
      case 'Obesity':
        baseColor = '#f44336';
        break;
      default:
        baseColor = '#ccc';
    }
    return props.active ? baseColor : `${baseColor}80`;
  }};
  box-shadow: ${props => props.active ? 'inset 0 0 0 3px white' : 'none'};
`;

const ChartLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 25%;
`;

const ChartLabel = styled.div`
  font-size: 0.8rem;
  color: #666;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 6px;
    background-color: #666;
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

const CategoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
`;

const TableHeader = styled.th`
  padding: 0.75rem;
  text-align: left;
  border-bottom: 2px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
`;

interface CategoryBadgeProps {
  category: string;
}

const CategoryBadge = styled.span<CategoryBadgeProps>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  background-color: ${props => {
    switch (props.category) {
      case 'Underweight':
        return '#ff9800';
      case 'Normal weight':
        return '#4caf50';
      case 'Overweight':
        return '#ff5722';
      case 'Obesity':
        return '#f44336';
      default:
        return '#ccc';
    }
  }};
`;

const DisclaimerText = styled.p`
  font-size: 0.9rem;
  color: #666;
  font-style: italic;
  margin-top: 1.5rem;
`;

export default BMICalculator;
