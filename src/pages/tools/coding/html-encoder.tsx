import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaCode, FaClipboard, FaSync } from 'react-icons/fa';

const HtmlEncoder: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState<boolean>(false);

  const handleEncode = () => {
    if (!inputText) {
      alert('Please enter text to encode');
      return;
    }
    
    // HTML encoding
    const encoded = inputText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
    setOutputText(encoded);
  };

  const handleDecode = () => {
    if (!inputText) {
      alert('Please enter text to decode');
      return;
    }
    
    // HTML decoding
    const decoded = inputText
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ');
    
    setOutputText(decoded);
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    setOutputText('');
  };

  const handleClearInput = () => {
    setInputText('');
    setOutputText('');
  };

  const handleSwapTexts = () => {
    if (outputText) {
      setInputText(outputText);
      setOutputText('');
    }
  };

  const copyToClipboard = () => {
    if (!outputText) return;
    
    navigator.clipboard.writeText(outputText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const loadSampleText = () => {
    if (mode === 'encode') {
      setInputText('<p>This is a <strong>sample</strong> HTML text with special characters like & and "quotes".</p>');
    } else {
      setInputText('&lt;p&gt;This is a &lt;strong&gt;sample&lt;/strong&gt; HTML text with special characters like &amp; and &quot;quotes&quot;.&lt;/p&gt;');
    }
    setOutputText('');
  };

  return (
    <Layout>
      <Head>
        <title>HTML Encoder/Decoder | ToolsFree Online</title>
        <meta name="description" content="Encode or decode HTML entities with our free online HTML encoder/decoder tool." />
        <meta name="keywords" content="HTML encoder, HTML decoder, HTML entities, encode HTML, decode HTML, HTML special characters" />
      </Head>

      <PageContainer>
        <PageTitle>HTML Encoder/Decoder</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <EncoderSection>
            <ModeSelector>
              <ModeButton 
                active={mode === 'encode'} 
                onClick={() => handleModeChange('encode')}
              >
                Encode HTML
              </ModeButton>
              <ModeButton 
                active={mode === 'decode'} 
                onClick={() => handleModeChange('decode')}
              >
                Decode HTML
              </ModeButton>
            </ModeSelector>
            
            <ToolActions>
              <ActionButton onClick={loadSampleText}>
                Load Sample Text
              </ActionButton>
              <ActionButton onClick={handleClearInput}>
                Clear
              </ActionButton>
            </ToolActions>
            
            <TextareaContainer>
              <label htmlFor="inputText">
                {mode === 'encode' ? 'Enter text to encode:' : 'Enter HTML entities to decode:'}
              </label>
              <StyledTextarea 
                id="inputText"
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)} 
                placeholder={mode === 'encode' 
                  ? 'Enter text with HTML tags or special characters...' 
                  : 'Enter HTML entities to decode...'}
                rows={8}
              />
            </TextareaContainer>
            
            <ButtonContainer>
              <PrimaryButton onClick={handleProcess}>
                <FaCode /> {mode === 'encode' ? 'Encode HTML' : 'Decode HTML'}
              </PrimaryButton>
            </ButtonContainer>
            
            {outputText && (
              <>
                <ResultContainer>
                  <ResultHeader>
                    <ResultTitle>
                      {mode === 'encode' ? 'Encoded HTML:' : 'Decoded HTML:'}
                    </ResultTitle>
                    <ResultActions>
                      <ActionButton onClick={handleSwapTexts}>
                        <FaSync /> Use as Input
                      </ActionButton>
                      <ActionButton onClick={copyToClipboard}>
                        <FaClipboard /> {copied ? 'Copied!' : 'Copy'}
                      </ActionButton>
                    </ResultActions>
                  </ResultHeader>
                  <ResultTextarea 
                    value={outputText} 
                    readOnly 
                    rows={8}
                  />
                </ResultContainer>
                
                {mode === 'decode' && (
                  <PreviewContainer>
                    <PreviewTitle>HTML Preview:</PreviewTitle>
                    <PreviewContent dangerouslySetInnerHTML={{ __html: outputText }} />
                  </PreviewContainer>
                )}
              </>
            )}
          </EncoderSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About HTML Encoding/Decoding</InfoTitle>
          <InfoText>
            <InfoParagraph>
              HTML encoding is the process of converting special characters into their corresponding HTML entities to ensure they display correctly on web pages. This is important for preventing issues with HTML parsing and for security reasons.
            </InfoParagraph>
            
            <InfoSubtitle>Common HTML Entities:</InfoSubtitle>
            <EntityTable>
              <thead>
                <tr>
                  <th>Character</th>
                  <th>Entity Name</th>
                  <th>Entity Number</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&lt;</td>
                  <td>&amp;lt;</td>
                  <td>&amp;#60;</td>
                  <td>Less than</td>
                </tr>
                <tr>
                  <td>&gt;</td>
                  <td>&amp;gt;</td>
                  <td>&amp;#62;</td>
                  <td>Greater than</td>
                </tr>
                <tr>
                  <td>&amp;</td>
                  <td>&amp;amp;</td>
                  <td>&amp;#38;</td>
                  <td>Ampersand</td>
                </tr>
                <tr>
                  <td>"</td>
                  <td>&amp;quot;</td>
                  <td>&amp;#34;</td>
                  <td>Double quote</td>
                </tr>
                <tr>
                  <td>'</td>
                  <td>&amp;#039;</td>
                  <td>&amp;#39;</td>
                  <td>Single quote</td>
                </tr>
                <tr>
                  <td>&#160;</td>
                  <td>&amp;nbsp;</td>
                  <td>&amp;#160;</td>
                  <td>Non-breaking space</td>
                </tr>
              </tbody>
            </EntityTable>
            
            <InfoSubtitle>When to Use HTML Encoding:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>User Input:</strong> Always encode user-generated content before displaying it on a webpage to prevent XSS attacks</InfoItem>
              <InfoItem><strong>HTML in Content:</strong> When you need to display HTML code as text rather than having it rendered</InfoItem>
              <InfoItem><strong>Special Characters:</strong> When you need to display characters that have special meaning in HTML</InfoItem>
              <InfoItem><strong>Data Integration:</strong> When integrating data from external sources into HTML documents</InfoItem>
            </InfoList>
            
            <InfoSubtitle>When to Use HTML Decoding:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Editing HTML:</strong> When you need to edit HTML that has been encoded</InfoItem>
              <InfoItem><strong>Data Processing:</strong> When processing data that contains HTML entities</InfoItem>
              <InfoItem><strong>Content Migration:</strong> When migrating content between different systems</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> This tool handles the most common HTML entities. For more comprehensive encoding/decoding, including Unicode characters, you may need specialized tools or libraries.
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

const EncoderSection = styled.div`
  padding: 2rem;
`;

interface ModeButtonProps {
  active: boolean;
}

const ModeSelector = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

const ModeButton = styled.button<ModeButtonProps>`
  flex: 1;
  padding: 0.75rem;
  background-color: ${props => props.active ? '#4a90e2' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.active ? '#3a80d2' : '#e5e5e5'};
  }
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
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #e5e5e5;
  }
`;

const TextareaContainer = styled.div`
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
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

const ResultContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ResultTitle = styled.div`
  font-weight: 500;
`;

const ResultActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ResultTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-family: monospace;
  background-color: #f9f9f9;
`;

const PreviewContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const PreviewTitle = styled.div`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const PreviewContent = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  min-height: 100px;
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

const EntityTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f5f5f5;
    font-weight: 500;
  }
  
  tr:hover {
    background-color: #f9f9f9;
  }
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

export default HtmlEncoder;
