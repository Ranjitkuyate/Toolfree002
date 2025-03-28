import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaFont, FaCheck, FaFileAlt } from 'react-icons/fa';

const WordCounter: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [stats, setStats] = useState<{
    characters: number;
    charactersNoSpaces: number;
    words: number;
    sentences: number;
    paragraphs: number;
    readingTime: string;
  } | null>(null);

  const analyzeText = () => {
    if (!inputText.trim()) {
      setStats(null);
      return;
    }
    
    // Count characters
    const characters = inputText.length;
    
    // Count characters without spaces
    const charactersNoSpaces = inputText.replace(/\s/g, '').length;
    
    // Count words
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Count sentences (simple approximation)
    const sentences = inputText.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    // Count paragraphs
    const paragraphs = inputText.split(/\n+/).filter(para => para.trim().length > 0).length;
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const readingTimeMinutes = words / 200;
    let readingTime = '';
    
    if (readingTimeMinutes < 1) {
      readingTime = `${Math.ceil(readingTimeMinutes * 60)} seconds`;
    } else {
      const minutes = Math.floor(readingTimeMinutes);
      const seconds = Math.ceil((readingTimeMinutes - minutes) * 60);
      readingTime = `${minutes} minute${minutes !== 1 ? 's' : ''}${seconds > 0 ? ` ${seconds} seconds` : ''}`;
    }
    
    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });
  };

  return (
    <Layout>
      <Head>
        <title>Word Counter | ToolsFree Online</title>
        <meta name="description" content="Count words, characters, sentences, and paragraphs in your text. Calculate reading time." />
        <meta name="keywords" content="word counter, character counter, text statistics, reading time calculator" />
      </Head>

      <PageContainer>
        <PageTitle>Word Counter</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <CounterSection>
            <InputGroup>
              <label>Enter Text:</label>
              <textarea 
                value={inputText} 
                onChange={(e) => {
                  setInputText(e.target.value);
                  analyzeText();
                }} 
                placeholder="Type or paste your text here"
                rows={10}
              />
            </InputGroup>
            
            {stats && (
              <StatsContainer>
                <StatsTitle>
                  <FaFileAlt /> Text Statistics
                </StatsTitle>
                <StatsGrid>
                  <StatItem>
                    <StatLabel>Words</StatLabel>
                    <StatValue>{stats.words.toLocaleString()}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Characters</StatLabel>
                    <StatValue>{stats.characters.toLocaleString()}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Characters (no spaces)</StatLabel>
                    <StatValue>{stats.charactersNoSpaces.toLocaleString()}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Sentences</StatLabel>
                    <StatValue>{stats.sentences.toLocaleString()}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Paragraphs</StatLabel>
                    <StatValue>{stats.paragraphs.toLocaleString()}</StatValue>
                  </StatItem>
                  <StatItem>
                    <StatLabel>Reading Time</StatLabel>
                    <StatValue>{stats.readingTime}</StatValue>
                  </StatItem>
                </StatsGrid>
              </StatsContainer>
            )}
            
            <ActionButtons>
              <ClearButton onClick={() => {
                setInputText('');
                setStats(null);
              }}>
                Clear Text
              </ClearButton>
            </ActionButtons>
          </CounterSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Word Counter</InfoTitle>
          <InfoText>
            This tool provides detailed statistics about your text, including:
            <InfoList>
              <InfoItem><strong>Word Count:</strong> Total number of words in your text</InfoItem>
              <InfoItem><strong>Character Count:</strong> Total number of characters, including spaces</InfoItem>
              <InfoItem><strong>Character Count (no spaces):</strong> Total number of characters, excluding spaces</InfoItem>
              <InfoItem><strong>Sentence Count:</strong> Approximate number of sentences (based on punctuation)</InfoItem>
              <InfoItem><strong>Paragraph Count:</strong> Number of paragraphs (based on line breaks)</InfoItem>
              <InfoItem><strong>Reading Time:</strong> Estimated time to read the text (based on average reading speed of 200 words per minute)</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Common Uses:</InfoSubtitle>
            <InfoList>
              <InfoItem>Checking essay or article length for academic or publishing requirements</InfoItem>
              <InfoItem>Estimating reading time for blog posts or presentations</InfoItem>
              <InfoItem>Analyzing text complexity for content optimization</InfoItem>
              <InfoItem>Tracking writing progress for authors</InfoItem>
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

const CounterSection = styled.div`
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

const StatsContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const StatsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a90e2;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
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

export default WordCounter;
