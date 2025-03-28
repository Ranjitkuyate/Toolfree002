import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaFont, FaCheck, FaSearch, FaExchangeAlt } from 'react-icons/fa';

const TextDiff: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>('');
  const [modifiedText, setModifiedText] = useState<string>('');
  const [diffResult, setDiffResult] = useState<JSX.Element | null>(null);
  const [diffMode, setDiffMode] = useState<string>('character');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(true);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false);

  const compareTexts = () => {
    if (!originalText || !modifiedText) {
      alert('Please enter both original and modified text');
      return;
    }
    
    let orig = originalText;
    let mod = modifiedText;
    
    // Apply case sensitivity option
    if (!caseSensitive) {
      orig = orig.toLowerCase();
      mod = mod.toLowerCase();
    }
    
    // Apply whitespace option
    if (ignoreWhitespace) {
      orig = orig.replace(/\s+/g, ' ').trim();
      mod = mod.replace(/\s+/g, ' ').trim();
    }
    
    if (diffMode === 'character') {
      // Character-by-character diff
      const result = characterDiff(originalText, modifiedText, !caseSensitive, ignoreWhitespace);
      setDiffResult(result);
    } else {
      // Word-by-word diff
      const result = wordDiff(originalText, modifiedText, !caseSensitive, ignoreWhitespace);
      setDiffResult(result);
    }
  };
  
  const characterDiff = (text1: string, text2: string, caseInsensitive: boolean, ignoreSpaces: boolean): JSX.Element => {
    let t1 = text1;
    let t2 = text2;
    
    if (caseInsensitive) {
      t1 = t1.toLowerCase();
      t2 = t2.toLowerCase();
    }
    
    if (ignoreSpaces) {
      t1 = t1.replace(/\s+/g, ' ').trim();
      t2 = t2.replace(/\s+/g, ' ').trim();
    }
    
    const result: JSX.Element[] = [];
    let i = 0, j = 0;
    
    while (i < text1.length || j < text2.length) {
      if (i < text1.length && j < text2.length) {
        const c1 = caseInsensitive ? text1[i].toLowerCase() : text1[i];
        const c2 = caseInsensitive ? text2[j].toLowerCase() : text2[j];
        
        if (c1 === c2 || (ignoreSpaces && c1.trim() === '' && c2.trim() === '')) {
          result.push(<span key={`same-${i}-${j}`}>{text1[i]}</span>);
          i++;
          j++;
        } else {
          // Find the next matching character
          let nextMatchI = i + 1;
          let nextMatchJ = j + 1;
          
          while (nextMatchI < text1.length && nextMatchJ < text2.length) {
            const nc1 = caseInsensitive ? text1[nextMatchI].toLowerCase() : text1[nextMatchI];
            const nc2 = caseInsensitive ? text2[nextMatchJ].toLowerCase() : text2[nextMatchJ];
            
            if (nc1 === nc2) break;
            
            nextMatchI++;
            nextMatchJ++;
          }
          
          // Decide whether to mark as deletion or addition
          if (nextMatchI - i <= nextMatchJ - j) {
            result.push(<DeletedText key={`del-${i}`}>{text1[i]}</DeletedText>);
            i++;
          } else {
            result.push(<AddedText key={`add-${j}`}>{text2[j]}</AddedText>);
            j++;
          }
        }
      } else if (i < text1.length) {
        // Remaining characters in text1 are deletions
        result.push(<DeletedText key={`del-${i}`}>{text1[i]}</DeletedText>);
        i++;
      } else {
        // Remaining characters in text2 are additions
        result.push(<AddedText key={`add-${j}`}>{text2[j]}</AddedText>);
        j++;
      }
    }
    
    return <>{result}</>;
  };
  
  const wordDiff = (text1: string, text2: string, caseInsensitive: boolean, ignoreSpaces: boolean): JSX.Element => {
    let t1 = text1;
    let t2 = text2;
    
    if (caseInsensitive) {
      t1 = t1.toLowerCase();
      t2 = t2.toLowerCase();
    }
    
    if (ignoreSpaces) {
      t1 = t1.replace(/\s+/g, ' ').trim();
      t2 = t2.replace(/\s+/g, ' ').trim();
    }
    
    const words1 = t1.split(/(\s+)/);
    const words2 = t2.split(/(\s+)/);
    
    const result: JSX.Element[] = [];
    let i = 0, j = 0;
    
    while (i < words1.length || j < words2.length) {
      if (i < words1.length && j < words2.length) {
        const w1 = caseInsensitive ? words1[i].toLowerCase() : words1[i];
        const w2 = caseInsensitive ? words2[j].toLowerCase() : words2[j];
        
        if (w1 === w2 || (ignoreSpaces && w1.trim() === '' && w2.trim() === '')) {
          const originalWord = text1.substring(
            words1.slice(0, i).join('').length,
            words1.slice(0, i).join('').length + words1[i].length
          );
          result.push(<span key={`same-${i}-${j}`}>{originalWord}</span>);
          i++;
          j++;
        } else {
          // Simple approach: mark different words
          const originalWord = text1.substring(
            words1.slice(0, i).join('').length,
            words1.slice(0, i).join('').length + words1[i].length
          );
          const modifiedWord = text2.substring(
            words2.slice(0, j).join('').length,
            words2.slice(0, j).join('').length + words2[j].length
          );
          
          result.push(<DeletedText key={`del-${i}`}>{originalWord}</DeletedText>);
          result.push(<AddedText key={`add-${j}`}>{modifiedWord}</AddedText>);
          i++;
          j++;
        }
      } else if (i < words1.length) {
        // Remaining words in text1 are deletions
        const originalWord = text1.substring(
          words1.slice(0, i).join('').length,
          words1.slice(0, i).join('').length + words1[i].length
        );
        result.push(<DeletedText key={`del-${i}`}>{originalWord}</DeletedText>);
        i++;
      } else {
        // Remaining words in text2 are additions
        const modifiedWord = text2.substring(
          words2.slice(0, j).join('').length,
          words2.slice(0, j).join('').length + words2[j].length
        );
        result.push(<AddedText key={`add-${j}`}>{modifiedWord}</AddedText>);
        j++;
      }
    }
    
    return <>{result}</>;
  };

  return (
    <Layout>
      <Head>
        <title>Text Diff Checker | ToolsFree Online</title>
        <meta name="description" content="Compare two texts and highlight the differences. Find changes between original and modified text." />
        <meta name="keywords" content="text diff, text comparison, diff checker, compare text, find differences" />
      </Head>

      <PageContainer>
        <PageTitle>Text Diff Checker</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <DiffSection>
            <TextInputsContainer>
              <InputGroup>
                <label>Original Text:</label>
                <textarea 
                  value={originalText} 
                  onChange={(e) => setOriginalText(e.target.value)} 
                  placeholder="Enter original text"
                  rows={8}
                />
              </InputGroup>
              
              <InputGroup>
                <label>Modified Text:</label>
                <textarea 
                  value={modifiedText} 
                  onChange={(e) => setModifiedText(e.target.value)} 
                  placeholder="Enter modified text"
                  rows={8}
                />
              </InputGroup>
            </TextInputsContainer>
            
            <OptionsContainer>
              <OptionGroup>
                <OptionLabel>Diff Mode:</OptionLabel>
                <OptionSelect 
                  value={diffMode} 
                  onChange={(e) => setDiffMode(e.target.value)}
                >
                  <option value="character">Character by Character</option>
                  <option value="word">Word by Word</option>
                </OptionSelect>
              </OptionGroup>
              
              <OptionCheckboxes>
                <OptionCheckbox>
                  <input 
                    type="checkbox" 
                    id="case-sensitive" 
                    checked={caseSensitive} 
                    onChange={() => setCaseSensitive(!caseSensitive)} 
                  />
                  <label htmlFor="case-sensitive">Case Sensitive</label>
                </OptionCheckbox>
                
                <OptionCheckbox>
                  <input 
                    type="checkbox" 
                    id="ignore-whitespace" 
                    checked={ignoreWhitespace} 
                    onChange={() => setIgnoreWhitespace(!ignoreWhitespace)} 
                  />
                  <label htmlFor="ignore-whitespace">Ignore Whitespace</label>
                </OptionCheckbox>
              </OptionCheckboxes>
            </OptionsContainer>
            
            <CompareButton onClick={compareTexts}>
              <FaExchangeAlt /> Compare Texts
            </CompareButton>
            
            {diffResult && (
              <ResultContainer>
                <ResultTitle>
                  <FaSearch /> Differences Found
                </ResultTitle>
                <DiffOutput>
                  {diffResult}
                </DiffOutput>
                <Legend>
                  <LegendItem>
                    <DeletedText>Red</DeletedText> = Deleted
                  </LegendItem>
                  <LegendItem>
                    <AddedText>Green</AddedText> = Added
                  </LegendItem>
                </Legend>
              </ResultContainer>
            )}
          </DiffSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>How to Use the Text Diff Checker</InfoTitle>
          <InfoText>
            This tool helps you compare two texts and identify the differences between them. It's useful for:
            <InfoList>
              <InfoItem>Comparing document versions</InfoItem>
              <InfoItem>Finding changes in code or text</InfoItem>
              <InfoItem>Reviewing edits in content</InfoItem>
              <InfoItem>Checking for plagiarism</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Options Explained:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Character by Character:</strong> Compares each character individually, showing precise differences</InfoItem>
              <InfoItem><strong>Word by Word:</strong> Compares whole words, better for content editing</InfoItem>
              <InfoItem><strong>Case Sensitive:</strong> When enabled, "Text" and "text" are considered different</InfoItem>
              <InfoItem><strong>Ignore Whitespace:</strong> When enabled, differences in spaces, tabs, and line breaks are ignored</InfoItem>
            </InfoList>
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

const DiffSection = styled.div`
  padding: 2rem;
`;

const TextInputsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
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

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const OptionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OptionLabel = styled.label`
  font-weight: 500;
`;

const OptionSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const OptionCheckboxes = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const OptionCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
`;

const CompareButton = styled.button`
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
  background-color: #f9f9f9;
  border-radius: 4px;
`;

const ResultTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const DiffOutput = styled.div`
  padding: 1rem;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
  margin-bottom: 1rem;
  max-height: 400px;
  overflow-y: auto;
`;

const DeletedText = styled.span`
  background-color: #ffebee;
  color: #c62828;
  text-decoration: line-through;
`;

const AddedText = styled.span`
  background-color: #e8f5e9;
  color: #2e7d32;
`;

const Legend = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
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
  margin: 1rem 0 0.5rem;
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

export default TextDiff;
