import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaHeartbeat, FaWeight, FaRuler, FaCalculator } from 'react-icons/fa';

const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('maintain');
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
    goalCalories: number;
    protein: number;
    carbs: number;
    fat: number;
  } | null>(null);

  const calculateCalories = () => {
    if (!age || !weight || !height) {
      alert('Please fill in all required fields');
      return;
    }
    
    const ageValue = parseFloat(age);
    const weightValue = parseFloat(weight); // in kg
    const heightValue = parseFloat(height); // in cm
    
    if (isNaN(ageValue) || isNaN(weightValue) || isNaN(heightValue)) {
      alert('Please enter valid numbers');
      return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
    } else {
      bmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }
    
    // Apply activity multiplier to get TDEE
    let activityMultiplier: number;
    switch (activityLevel) {
      case 'sedentary':
        activityMultiplier = 1.2;
        break;
      case 'light':
        activityMultiplier = 1.375;
        break;
      case 'moderate':
        activityMultiplier = 1.55;
        break;
      case 'active':
        activityMultiplier = 1.725;
        break;
      case 'very-active':
        activityMultiplier = 1.9;
        break;
      default:
        activityMultiplier = 1.55;
    }
    
    const tdee = bmr * activityMultiplier;
    
    // Adjust calories based on goal
    let goalCalories: number;
    switch (goal) {
      case 'lose':
        goalCalories = tdee - 500; // 500 calorie deficit for weight loss
        break;
      case 'gain':
        goalCalories = tdee + 500; // 500 calorie surplus for weight gain
        break;
      default:
        goalCalories = tdee; // maintain weight
    }
    
    // Calculate macronutrients (protein, carbs, fat)
    // Protein: 30% of calories, Carbs: 40% of calories, Fat: 30% of calories
    const protein = (goalCalories * 0.3) / 4; // 4 calories per gram of protein
    const carbs = (goalCalories * 0.4) / 4; // 4 calories per gram of carbs
    const fat = (goalCalories * 0.3) / 9; // 9 calories per gram of fat
    
    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat)
    });
  };

  return (
    <Layout>
      <Head>
        <title>Calorie Calculator | ToolsFree Online</title>
        <meta name="description" content="Calculate your daily calorie needs based on your age, weight, height, and activity level." />
        <meta name="keywords" content="calorie calculator, TDEE calculator, BMR calculator, macro calculator, nutrition calculator" />
      </Head>

      <PageContainer>
        <PageTitle>Calorie Calculator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CalculatorSection>
            <InputsContainer>
              <GenderSelector>
                <GenderOption 
                  active={gender === 'male'} 
                  onClick={() => setGender('male')}
                >
                  <GenderIcon>♂</GenderIcon>
                  <GenderLabel>Male</GenderLabel>
                </GenderOption>
                <GenderOption 
                  active={gender === 'female'} 
                  onClick={() => setGender('female')}
                >
                  <GenderIcon>♀</GenderIcon>
                  <GenderLabel>Female</GenderLabel>
                </GenderOption>
              </GenderSelector>
              
              <InputGroup>
                <label>Age:</label>
                <input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  placeholder="Enter age"
                  min="15"
                  max="100"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Weight (kg):</label>
                <input 
                  type="number" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  placeholder="Enter weight in kg"
                  min="30"
                  max="300"
                  step="0.1"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Height (cm):</label>
                <input 
                  type="number" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  placeholder="Enter height in cm"
                  min="100"
                  max="250"
                  step="0.1"
                />
              </InputGroup>
              
              <InputGroup>
                <label>Activity Level:</label>
                <select 
                  value={activityLevel} 
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="light">Light (exercise 1-3 days/week)</option>
                  <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                  <option value="active">Active (exercise 6-7 days/week)</option>
                  <option value="very-active">Very Active (hard exercise daily)</option>
                </select>
              </InputGroup>
              
              <InputGroup>
                <label>Goal:</label>
                <select 
                  value={goal} 
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain Weight</option>
                  <option value="gain">Gain Weight</option>
                </select>
              </InputGroup>
            </InputsContainer>
            
            <CalculateButton onClick={calculateCalories}>
              <FaCalculator /> Calculate Calories
            </CalculateButton>
            
            {result && (
              <ResultsContainer>
                <ResultSummary>
                  <SummaryItem>
                    <SummaryLabel>Daily Calories:</SummaryLabel>
                    <SummaryValue>{result.goalCalories}</SummaryValue>
                    <SummaryUnit>calories</SummaryUnit>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>BMR:</SummaryLabel>
                    <SummaryValue>{result.bmr}</SummaryValue>
                    <SummaryUnit>calories</SummaryUnit>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>TDEE:</SummaryLabel>
                    <SummaryValue>{result.tdee}</SummaryValue>
                    <SummaryUnit>calories</SummaryUnit>
                  </SummaryItem>
                </ResultSummary>
                
                <MacroTitle>Recommended Macronutrients</MacroTitle>
                <MacroContainer>
                  <MacroItem>
                    <MacroLabel>Protein</MacroLabel>
                    <MacroValue>{result.protein}g</MacroValue>
                    <MacroCalories>{result.protein * 4} calories</MacroCalories>
                  </MacroItem>
                  
                  <MacroItem>
                    <MacroLabel>Carbs</MacroLabel>
                    <MacroValue>{result.carbs}g</MacroValue>
                    <MacroCalories>{result.carbs * 4} calories</MacroCalories>
                  </MacroItem>
                  
                  <MacroItem>
                    <MacroLabel>Fat</MacroLabel>
                    <MacroValue>{result.fat}g</MacroValue>
                    <MacroCalories>{result.fat * 9} calories</MacroCalories>
                  </MacroItem>
                </MacroContainer>
              </ResultsContainer>
            )}
          </CalculatorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>Understanding Your Results</InfoTitle>
          <InfoText>
            <InfoSubtitle>BMR (Basal Metabolic Rate):</InfoSubtitle>
            <InfoParagraph>
              BMR is the number of calories your body needs to maintain basic physiological functions while at rest. This includes breathing, circulation, cell production, and more.
            </InfoParagraph>
            
            <InfoSubtitle>TDEE (Total Daily Energy Expenditure):</InfoSubtitle>
            <InfoParagraph>
              TDEE is the total number of calories you burn in a day, including your BMR and additional calories burned through physical activity and digestion.
            </InfoParagraph>
            
            <InfoSubtitle>Daily Calories:</InfoSubtitle>
            <InfoParagraph>
              This is your recommended daily calorie intake based on your goal (lose, maintain, or gain weight). For weight loss, we subtract 500 calories from your TDEE, and for weight gain, we add 500 calories.
            </InfoParagraph>
            
            <InfoSubtitle>Macronutrients:</InfoSubtitle>
            <InfoParagraph>
              The calculator provides a balanced macronutrient distribution of 30% protein, 40% carbohydrates, and 30% fat. This is a general recommendation and can be adjusted based on individual preferences and specific dietary needs.
            </InfoParagraph>
            
            <InfoNote>
              <strong>Note:</strong> This calculator provides estimates based on formulas and general recommendations. Individual needs may vary. Consult with a healthcare professional or registered dietitian for personalized advice.
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

const GenderSelector = styled.div`
  display: flex;
  gap: 1rem;
  grid-column: 1 / -1;
`;

interface GenderOptionProps {
  active: boolean;
}

const GenderOption = styled.div<GenderOptionProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${props => props.active ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.active ? '#3a80d2' : '#e5e5e5'};
  }
`;

const GenderIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const GenderLabel = styled.div`
  font-weight: 500;
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
  text-align: center;
`;

const SummaryLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #666;
`;

const SummaryValue = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: #4a90e2;
`;

const SummaryUnit = styled.div`
  font-size: 0.9rem;
  color: #999;
`;

const MacroTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
`;

const MacroContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MacroItem = styled.div`
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  text-align: center;
`;

const MacroLabel = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #666;
`;

const MacroValue = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a90e2;
`;

const MacroCalories = styled.div`
  font-size: 0.9rem;
  color: #999;
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
    margin-top: 0;
  }
`;

const InfoText = styled.div`
  color: #666;
  line-height: 1.6;
`;

const InfoParagraph = styled.p`
  margin-bottom: 1rem;
`;

const InfoNote = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  border-radius: 0 4px 4px 0;
`;

export default CalorieCalculator;
