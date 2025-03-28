import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaRandom } from 'react-icons/fa';

const PasswordGenerator: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [passwordStrength, setPasswordStrength] = useState<string>('');

  const generatePassword = () => {
    // Check if at least one character type is selected
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
      alert('Please select at least one character type');
      return;
    }

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const similarChars = 'iIlL1oO0';

    let availableChars = '';
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeLowercase) availableChars += lowercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    // Remove similar characters if option is selected
    if (excludeSimilar) {
      for (let i = 0; i < similarChars.length; i++) {
        availableChars = availableChars.replace(similarChars[i], '');
      }
    }

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
    }

    setGeneratedPassword(password);
    calculatePasswordStrength(password);
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    if (password.length >= 16) strength += 1;
    
    // Character variety check
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    // Determine strength category
    let strengthText = '';
    if (strength < 3) {
      strengthText = 'Weak';
    } else if (strength < 5) {
      strengthText = 'Medium';
    } else if (strength < 7) {
      strengthText = 'Strong';
    } else {
      strengthText = 'Very Strong';
    }
    
    setPasswordStrength(strengthText);
  };

  const copyToClipboard = () => {
    if (!generatedPassword) return;
    
    navigator.clipboard.writeText(generatedPassword)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Password Generator | ToolsFree Online</title>
        <meta name="description" content="Generate secure random passwords online for free. Customize length and character types." />
        <meta name="keywords" content="password generator, random password, secure password, strong password generator" />
      </Head>

      <PageContainer>
        <PageTitle>Password Generator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <GeneratorSection>
            <OptionsContainer>
              <LengthOption>
                <label>Password Length: {passwordLength}</label>
                <input 
                  type="range" 
                  min="4" 
                  max="32" 
                  value={passwordLength} 
                  onChange={(e) => setPasswordLength(parseInt(e.target.value))} 
                />
              </LengthOption>
              
              <CharacterOptions>
                <OptionCheckbox>
                  <input 
                    type="checkbox" 
                    checked={includeUppercase} 
                    onChange={() => setIncludeUppercase(!includeUppercase)} 
                    id="uppercase"
                  />
                  <label htmlFor="uppercase">Include Uppercase (A-Z)</label>
                </OptionCheckbox>
                
                <OptionCheckbox>
                  <input 
                    type="checkbox" 
                    checked={includeLowercase} 
                    onChange={() => setIncludeLowercase(!includeLowercase)} 
                    id="lowercase"
                  />
                  <label htmlFor="lowercase">Include Lowercase (a-z)</label>
                </OptionCheckbox>
                
                <OptionCheckbox>
                  <input 
                    type="checkbox" 
                    checked={includeNumbers} 
                    onChange={() => setIncludeNumbers(!includeNumbers)} 
                    id="numbers"
                  />
                  <label htmlFor="numbers">Include Numbers (0-9)</label>
                </OptionCheckbox>
                
                <OptionCheckbox>
                  <input 
                    type="checkbox" 
                    checked={includeSymbols} 
                    onChange={() => setIncludeSymbols(!includeSymbols)} 
                    id="symbols"
                  />
                  <label htmlFor="symbols">Include Symbols (!@#$%^&*)</label>
                </OptionCheckbox>
                
                <OptionCheckbox>
                  <input 
                    type="checkbox" 
                    checked={excludeSimilar} 
                    onChange={() => setExcludeSimilar(!excludeSimilar)} 
                    id="similar"
                  />
                  <label htmlFor="similar">Exclude Similar Characters (i, l, 1, L, o, 0, O)</label>
                </OptionCheckbox>
              </CharacterOptions>
            </OptionsContainer>
            
            <GenerateButton onClick={generatePassword}>
              <FaRandom /> Generate Password
            </GenerateButton>
            
            {generatedPassword && (
              <ResultContainer>
                <PasswordDisplay>
                  <PasswordText>{generatedPassword}</PasswordText>
                  <CopyButton onClick={copyToClipboard}>Copy</CopyButton>
                </PasswordDisplay>
                
                <StrengthIndicator strength={passwordStrength}>
                  <StrengthLabel>Strength:</StrengthLabel>
                  <StrengthValue>{passwordStrength}</StrengthValue>
                </StrengthIndicator>
              </ResultContainer>
            )}
          </GeneratorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>Password Security Tips</InfoTitle>
          <InfoList>
            <InfoItem>Use a different password for each account</InfoItem>
            <InfoItem>Make passwords at least 12 characters long</InfoItem>
            <InfoItem>Include a mix of uppercase, lowercase, numbers, and symbols</InfoItem>
            <InfoItem>Avoid using personal information in your passwords</InfoItem>
            <InfoItem>Consider using a password manager to store your passwords securely</InfoItem>
            <InfoItem>Change important passwords regularly</InfoItem>
          </InfoList>
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

const GeneratorSection = styled.div`
  padding: 2rem;
`;

const OptionsContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const LengthOption = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
  }
`;

const CharacterOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;

const OptionCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
`;

const GenerateButton = styled.button`
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
`;

const PasswordDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const PasswordText = styled.div`
  flex: 1;
  font-family: monospace;
  font-size: 1.2rem;
  word-break: break-all;
`;

const CopyButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3d9140;
  }
`;

interface StrengthIndicatorProps {
  strength: string;
}

const StrengthIndicator = styled.div<StrengthIndicatorProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StrengthLabel = styled.span`
  font-weight: 500;
`;

const StrengthValue = styled.span<StrengthIndicatorProps>`
  font-weight: 500;
  color: ${props => {
    switch (props.strength) {
      case 'Weak':
        return '#f44336';
      case 'Medium':
        return '#ff9800';
      case 'Strong':
        return '#4caf50';
      case 'Very Strong':
        return '#2e7d32';
      default:
        return '#333';
    }
  }};
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

const InfoList = styled.ul`
  padding-left: 1.5rem;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
  color: #666;
  line-height: 1.5;
`;

export default PasswordGenerator;
