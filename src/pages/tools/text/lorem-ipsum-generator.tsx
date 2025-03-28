import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaFont, FaCheck, FaExchangeAlt } from 'react-icons/fa';

const LoremIpsumGenerator: React.FC = () => {
  const [paragraphCount, setParagraphCount] = useState<number>(3);
  const [paragraphLength, setParagraphLength] = useState<string>('medium');
  const [includeHtml, setIncludeHtml] = useState<boolean>(false);
  const [startWithLoremIpsum, setStartWithLoremIpsum] = useState<boolean>(true);
  const [generatedText, setGeneratedText] = useState<string>('');

  // Lorem ipsum text fragments
  const loremIpsumFragments = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
    "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates.",
    "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.",
    "Et harum quidem rerum facilis est et expedita distinctio.",
  ];

  const generateLoremIpsum = () => {
    let result = '';
    
    // Determine sentences per paragraph based on length
    let sentencesPerParagraph: number;
    switch (paragraphLength) {
      case 'short':
        sentencesPerParagraph = 3;
        break;
      case 'medium':
        sentencesPerParagraph = 5;
        break;
      case 'long':
        sentencesPerParagraph = 8;
        break;
      default:
        sentencesPerParagraph = 5;
    }
    
    // Generate paragraphs
    for (let i = 0; i < paragraphCount; i++) {
      let paragraph = '';
      
      // Start with "Lorem ipsum" for the first paragraph if selected
      if (i === 0 && startWithLoremIpsum) {
        paragraph += loremIpsumFragments[0] + ' ';
        
        // Add remaining sentences
        for (let j = 1; j < sentencesPerParagraph; j++) {
          const randomIndex = Math.floor(Math.random() * loremIpsumFragments.length);
          paragraph += loremIpsumFragments[randomIndex] + ' ';
        }
      } else {
        // Generate random sentences
        for (let j = 0; j < sentencesPerParagraph; j++) {
          const randomIndex = Math.floor(Math.random() * loremIpsumFragments.length);
          paragraph += loremIpsumFragments[randomIndex] + ' ';
        }
      }
      
      // Add HTML tags if selected
      if (includeHtml) {
        result += `<p>${paragraph.trim()}</p>\n\n`;
      } else {
        result += paragraph.trim() + '\n\n';
      }
    }
    
    setGeneratedText(result.trim());
  };

  const copyToClipboard = () => {
    if (!generatedText) return;
    
    navigator.clipboard.writeText(generatedText)
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
        <title>Lorem Ipsum Generator | ToolsFree Online</title>
        <meta name="description" content="Generate Lorem Ipsum placeholder text for your designs, layouts, and mockups." />
        <meta name="keywords" content="lorem ipsum, placeholder text, dummy text, text generator" />
      </Head>

      <PageContainer>
        <PageTitle>Lorem Ipsum Generator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <GeneratorSection>
            <OptionsContainer>
              <OptionGroup>
                <OptionLabel>Number of Paragraphs:</OptionLabel>
                <input 
                  type="number" 
                  min="1" 
                  max="50" 
                  value={paragraphCount} 
                  onChange={(e) => setParagraphCount(parseInt(e.target.value))} 
                />
              </OptionGroup>
              
              <OptionGroup>
                <OptionLabel>Paragraph Length:</OptionLabel>
                <select 
                  value={paragraphLength} 
                  onChange={(e) => setParagraphLength(e.target.value)}
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </OptionGroup>
              
              <OptionCheckbox>
                <input 
                  type="checkbox" 
                  id="html-tags" 
                  checked={includeHtml} 
                  onChange={() => setIncludeHtml(!includeHtml)} 
                />
                <label htmlFor="html-tags">Include HTML Tags</label>
              </OptionCheckbox>
              
              <OptionCheckbox>
                <input 
                  type="checkbox" 
                  id="start-lorem" 
                  checked={startWithLoremIpsum} 
                  onChange={() => setStartWithLoremIpsum(!startWithLoremIpsum)} 
                />
                <label htmlFor="start-lorem">Start with "Lorem ipsum"</label>
              </OptionCheckbox>
            </OptionsContainer>
            
            <ActionButtons>
              <GenerateButton onClick={generateLoremIpsum}>
                <FaExchangeAlt /> Generate Lorem Ipsum
              </GenerateButton>
            </ActionButtons>
            
            {generatedText && (
              <OutputGroup>
                <OutputHeader>
                  <OutputLabel>Generated Text:</OutputLabel>
                  <CopyButton onClick={copyToClipboard}>
                    <FaCheck /> Copy
                  </CopyButton>
                </OutputHeader>
                <textarea 
                  value={generatedText} 
                  readOnly 
                  rows={10}
                />
              </OutputGroup>
            )}
          </GeneratorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Lorem Ipsum</InfoTitle>
          <InfoText>
            Lorem Ipsum is dummy text used in the design, printing, and typesetting industry. It has been the industry's standard dummy text since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            
            <InfoSubtitle>Common Uses:</InfoSubtitle>
            <InfoList>
              <InfoItem>Web design mockups and prototypes</InfoItem>
              <InfoItem>Graphic design layouts</InfoItem>
              <InfoItem>Typography specimens</InfoItem>
              <InfoItem>Content placeholders in development</InfoItem>
              <InfoItem>Desktop publishing templates</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Why Use Lorem Ipsum?</InfoSubtitle>
            <InfoParagraph>
              Lorem Ipsum is used because it has a relatively normal distribution of letters, making it look like readable English without distracting the viewer with actual content. This allows designers to focus on visual elements rather than being distracted by readable content.
            </InfoParagraph>
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

const GeneratorSection = styled.div`
  padding: 2rem;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const OptionGroup = styled.div`
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

const OptionLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const OptionCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  margin-bottom: 1.5rem;
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

const OutputGroup = styled.div`
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 1rem;
    
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

const InfoSubtitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 1.5rem 0 0.5rem;
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

const InfoParagraph = styled.p`
  margin: 1rem 0;
`;

export default LoremIpsumGenerator;
