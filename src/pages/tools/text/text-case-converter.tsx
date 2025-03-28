import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaFont, FaCheck } from 'react-icons/fa';

const TextCaseConverter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [conversionType, setConversionType] = useState<string>('uppercase');

  const convertText = () => {
    if (!inputText) return;
    
    let result = '';
    
    switch (conversionType) {
      case 'uppercase':
        result = inputText.toUpperCase();
        break;
      case 'lowercase':
        result = inputText.toLowerCase();
        break;
      case 'capitalize':
        result = inputText
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        break;
      case 'sentence':
        result = inputText
          .split('. ')
          .map(sentence => {
            if (!sentence) return '';
            return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
          })
          .join('. ');
        break;
      case 'alternating':
        result = inputText
          .split('')
          .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
          .join('');
        break;
      case 'inverse':
        result = inputText
          .split('')
          .map(char => {
            if (char === char.toUpperCase()) {
              return char.toLowerCase();
            } else {
              return char.toUpperCase();
            }
          })
          .join('');
        break;
      default:
        result = inputText;
    }
    
    setOutputText(result);
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Text Case Converter | ToolsFree Online</title>
        <meta name="description" content="Convert text case online for free. Change to uppercase, lowercase, title case, and more." />
        <meta name="keywords" content="text case converter, uppercase, lowercase, title case, sentence case, text formatter" />
      </Head>

      <PageContainer>
        <PageTitle>Text Case Converter</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <ConverterSection>
            <InputGroup>
              <label>Enter Text:</label>
              <textarea 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder="Type or paste your text here"
                rows={6}
              />
            </InputGroup>
            
            <ConversionOptions>
              <ConversionOption>
                <input 
                  type="radio" 
                  id="uppercase" 
                  name="conversionType" 
                  value="uppercase" 
                  checked={conversionType === 'uppercase'} 
                  onChange={() => setConversionType('uppercase')} 
                />
                <label htmlFor="uppercase">UPPERCASE</label>
              </ConversionOption>
              
              <ConversionOption>
                <input 
                  type="radio" 
                  id="lowercase" 
                  name="conversionType" 
                  value="lowercase" 
                  checked={conversionType === 'lowercase'} 
                  onChange={() => setConversionType('lowercase')} 
                />
                <label htmlFor="lowercase">lowercase</label>
              </ConversionOption>
              
              <ConversionOption>
                <input 
                  type="radio" 
                  id="capitalize" 
                  name="conversionType" 
                  value="capitalize" 
                  checked={conversionType === 'capitalize'} 
                  onChange={() => setConversionType('capitalize')} 
                />
                <label htmlFor="capitalize">Title Case</label>
              </ConversionOption>
              
              <ConversionOption>
                <input 
                  type="radio" 
                  id="sentence" 
                  name="conversionType" 
                  value="sentence" 
                  checked={conversionType === 'sentence'} 
                  onChange={() => setConversionType('sentence')} 
                />
                <label htmlFor="sentence">Sentence case</label>
              </ConversionOption>
              
              <ConversionOption>
                <input 
                  type="radio" 
                  id="alternating" 
                  name="conversionType" 
                  value="alternating" 
                  checked={conversionType === 'alternating'} 
                  onChange={() => setConversionType('alternating')} 
                />
                <label htmlFor="alternating">AlTeRnAtInG cAsE</label>
              </ConversionOption>
              
              <ConversionOption>
                <input 
                  type="radio" 
                  id="inverse" 
                  name="conversionType" 
                  value="inverse" 
                  checked={conversionType === 'inverse'} 
                  onChange={() => setConversionType('inverse')} 
                />
                <label htmlFor="inverse">iNVERSE cASE</label>
              </ConversionOption>
            </ConversionOptions>
            
            <ActionButtons>
              <ConvertButton onClick={convertText}>
                <FaFont /> Convert Text
              </ConvertButton>
              
              <ClearButton onClick={() => {
                setInputText('');
                setOutputText('');
              }}>
                Clear
              </ClearButton>
            </ActionButtons>
            
            {outputText && (
              <OutputGroup>
                <OutputHeader>
                  <OutputLabel>Result:</OutputLabel>
                  <CopyButton onClick={copyToClipboard}>
                    <FaCheck /> Copy
                  </CopyButton>
                </OutputHeader>
                <textarea 
                  value={outputText} 
                  readOnly 
                  rows={6}
                />
              </OutputGroup>
            )}
          </ConverterSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Text Case Conversion</InfoTitle>
          <InfoText>
            This tool allows you to quickly convert text between different case formats:
            <InfoList>
              <InfoItem><strong>UPPERCASE:</strong> Converts all characters to capital letters</InfoItem>
              <InfoItem><strong>lowercase:</strong> Converts all characters to small letters</InfoItem>
              <InfoItem><strong>Title Case:</strong> Capitalizes the first letter of each word</InfoItem>
              <InfoItem><strong>Sentence case:</strong> Capitalizes the first letter of each sentence</InfoItem>
              <InfoItem><strong>AlTeRnAtInG cAsE:</strong> Alternates between uppercase and lowercase letters</InfoItem>
              <InfoItem><strong>iNVERSE cASE:</strong> Inverts the case of each letter</InfoItem>
            </InfoList>
            Text case conversion is useful for formatting titles, headings, code, and other text content to match specific style requirements.
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
  
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const ConversionOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ConversionOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
  
  label {
    cursor: pointer;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

const ClearButton = styled.button`
  background-color: #f5f5f5;
  color: #666;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const OutputGroup = styled.div`
  margin-top: 2rem;
  
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    background-color: #f9f9f9;
    
    &:focus {
      outline: none;
    }
  }
`;

const OutputHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const OutputLabel = styled.div`
  font-weight: 500;
`;

const CopyButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #3d9140;
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

export default TextCaseConverter;
