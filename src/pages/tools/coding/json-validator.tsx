import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCode, FaCheck, FaTimes } from 'react-icons/fa';

const JsonValidator: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    error?: string;
    formattedJson?: string;
  } | null>(null);
  const [autoFormat, setAutoFormat] = useState<boolean>(true);
  const [indentSize, setIndentSize] = useState<number>(2);

  const validateJson = () => {
    if (!jsonInput.trim()) {
      alert('Please enter JSON to validate');
      return;
    }

    try {
      // Parse the JSON to validate it
      const parsedJson = JSON.parse(jsonInput);
      
      // Format the JSON if auto-format is enabled
      let formattedJson = jsonInput;
      if (autoFormat) {
        formattedJson = JSON.stringify(parsedJson, null, indentSize);
      }
      
      setValidationResult({
        isValid: true,
        formattedJson
      });
    } catch (error) {
      setValidationResult({
        isValid: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const handleClearInput = () => {
    setJsonInput('');
    setValidationResult(null);
  };

  const handleFormatJson = () => {
    if (!jsonInput.trim()) {
      alert('Please enter JSON to format');
      return;
    }

    try {
      const parsedJson = JSON.parse(jsonInput);
      const formattedJson = JSON.stringify(parsedJson, null, indentSize);
      setJsonInput(formattedJson);
    } catch (error) {
      alert('Invalid JSON. Please fix errors before formatting.');
    }
  };

  const loadSampleJson = () => {
    const sampleJson = `{
  "name": "John Doe",
  "age": 30,
  "isEmployed": true,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zipCode": "12345"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "555-1234"
    },
    {
      "type": "work",
      "number": "555-5678"
    }
  ],
  "skills": ["JavaScript", "HTML", "CSS"]
}`;
    setJsonInput(sampleJson);
    setValidationResult(null);
  };

  return (
    <Layout>
      <Head>
        <title>JSON Validator | ToolsFree Online</title>
        <meta name="description" content="Validate and format your JSON data with our free online JSON validator tool." />
        <meta name="keywords" content="JSON validator, JSON formatter, JSON checker, validate JSON, format JSON" />
      </Head>

      <PageContainer>
        <PageTitle>JSON Validator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <ValidatorSection>
            <ToolActions>
              <ActionButton onClick={loadSampleJson}>
                Load Sample JSON
              </ActionButton>
              <ActionButton onClick={handleClearInput}>
                Clear
              </ActionButton>
            </ToolActions>
            
            <EditorContainer>
              <label htmlFor="jsonInput">Enter JSON:</label>
              <StyledTextarea 
                id="jsonInput"
                value={jsonInput} 
                onChange={(e) => setJsonInput(e.target.value)} 
                placeholder="Paste your JSON here..."
                rows={15}
              />
            </EditorContainer>
            
            <OptionsContainer>
              <OptionGroup>
                <CheckboxContainer>
                  <input 
                    type="checkbox" 
                    id="autoFormat" 
                    checked={autoFormat} 
                    onChange={(e) => setAutoFormat(e.target.checked)} 
                  />
                  <label htmlFor="autoFormat">Auto-format on validation</label>
                </CheckboxContainer>
              </OptionGroup>
              
              <OptionGroup>
                <label htmlFor="indentSize">Indent Size:</label>
                <select 
                  id="indentSize"
                  value={indentSize} 
                  onChange={(e) => setIndentSize(parseInt(e.target.value))}
                >
                  <option value={2}>2 spaces</option>
                  <option value={4}>4 spaces</option>
                  <option value={8}>8 spaces</option>
                </select>
              </OptionGroup>
              
              <ActionButtonsContainer>
                <PrimaryButton onClick={validateJson}>
                  <FaCode /> Validate JSON
                </PrimaryButton>
                <SecondaryButton onClick={handleFormatJson}>
                  Format JSON
                </SecondaryButton>
              </ActionButtonsContainer>
            </OptionsContainer>
            
            {validationResult && (
              <ResultContainer>
                <ResultHeader isValid={validationResult.isValid}>
                  {validationResult.isValid ? (
                    <>
                      <FaCheck /> Valid JSON
                    </>
                  ) : (
                    <>
                      <FaTimes /> Invalid JSON
                    </>
                  )}
                </ResultHeader>
                
                {validationResult.isValid ? (
                  <FormattedJson>
                    <pre>{validationResult.formattedJson}</pre>
                  </FormattedJson>
                ) : (
                  <ErrorMessage>
                    {validationResult.error}
                  </ErrorMessage>
                )}
              </ResultContainer>
            )}
          </ValidatorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About JSON Validation</InfoTitle>
          <InfoText>
            <InfoParagraph>
              JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write and easy for machines to parse and generate. This tool helps you validate and format your JSON data.
            </InfoParagraph>
            
            <InfoSubtitle>Common JSON Syntax Rules:</InfoSubtitle>
            <InfoList>
              <InfoItem>Data is in name/value pairs</InfoItem>
              <InfoItem>Data is separated by commas</InfoItem>
              <InfoItem>Curly braces hold objects</InfoItem>
              <InfoItem>Square brackets hold arrays</InfoItem>
              <InfoItem>Strings must be in double quotes</InfoItem>
              <InfoItem>Numbers can be integers or floating point</InfoItem>
              <InfoItem>Boolean values can be true or false</InfoItem>
              <InfoItem>null is a valid value</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Common JSON Errors:</InfoSubtitle>
            <InfoList>
              <InfoItem>Missing or extra commas</InfoItem>
              <InfoItem>Missing closing brackets or braces</InfoItem>
              <InfoItem>Using single quotes instead of double quotes for strings</InfoItem>
              <InfoItem>Including trailing commas</InfoItem>
              <InfoItem>Using JavaScript comments (// or /* */)</InfoItem>
              <InfoItem>Using undefined as a value</InfoItem>
            </InfoList>
            
            <InfoSubtitle>How to Use This Tool:</InfoSubtitle>
            <InfoList>
              <InfoItem>Paste your JSON into the text area</InfoItem>
              <InfoItem>Click "Validate JSON" to check if it's valid</InfoItem>
              <InfoItem>If auto-format is enabled, your JSON will be formatted with the specified indent size</InfoItem>
              <InfoItem>You can also click "Format JSON" to format without validation</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> This validator uses JavaScript's built-in JSON.parse() method for validation, which strictly follows the JSON specification. Some JSON-like formats (such as those allowing comments or trailing commas) will be marked as invalid.
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

const ValidatorSection = styled.div`
  padding: 2rem;
`;

const ToolActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ActionButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const EditorContainer = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: monospace;
  
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const OptionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
  }
  
  select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

const PrimaryButton = styled.button`
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

const SecondaryButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
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

interface ResultHeaderProps {
  isValid: boolean;
}

const ResultContainer = styled.div`
  margin-top: 2rem;
`;

const ResultHeader = styled.div<ResultHeaderProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: ${props => props.isValid ? '#e6f7e6' : '#ffebee'};
  color: ${props => props.isValid ? '#2e7d32' : '#c62828'};
  border-radius: 4px 4px 0 0;
  font-weight: 500;
`;

const FormattedJson = styled.div`
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 0 0 4px 4px;
  overflow-x: auto;
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
  }
`;

const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: #ffebee;
  border-radius: 0 0 4px 4px;
  color: #c62828;
  font-family: monospace;
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

export default JsonValidator;
