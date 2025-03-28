import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaSearch, FaKeyboard, FaChartLine } from 'react-icons/fa';

const KeywordDensityChecker: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [results, setResults] = useState<{
    totalWords: number;
    uniqueWords: number;
    keywords: Array<{
      word: string;
      count: number;
      density: number;
    }>;
  } | null>(null);
  const [minWordLength, setMinWordLength] = useState<number>(3);
  const [excludeCommonWords, setExcludeCommonWords] = useState<boolean>(true);
  const [keywordsToShow, setKeywordsToShow] = useState<number>(20);

  // List of common words to exclude
  const commonWords = [
    'the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but',
    'his', 'from', 'they', 'she', 'will', 'would', 'there', 'their', 'what',
    'about', 'which', 'when', 'make', 'can', 'like', 'time', 'just', 'him',
    'know', 'take', 'people', 'into', 'year', 'your', 'good', 'some', 'could',
    'them', 'see', 'other', 'than', 'then', 'now', 'look', 'only', 'come',
    'its', 'over', 'think', 'also', 'back', 'after', 'use', 'two', 'how',
    'our', 'work', 'first', 'well', 'way', 'even', 'new', 'want', 'because',
    'any', 'these', 'give', 'day', 'most', 'are', 'was', 'has', 'had', 'were',
    'been', 'being', 'who', 'get', 'got', 'very', 'much', 'more', 'such', 'those'
  ];

  const analyzeContent = () => {
    if (!content.trim()) {
      alert('Please enter some content to analyze');
      return;
    }

    // Normalize content: convert to lowercase and replace non-alphanumeric chars with spaces
    const normalizedContent = content.toLowerCase().replace(/[^a-z0-9]/g, ' ');
    
    // Split into words and filter out empty strings
    const allWords = normalizedContent.split(/\s+/).filter(word => word);
    
    // Count total words
    const totalWords = allWords.length;
    
    // Create word frequency map
    const wordFrequency: { [key: string]: number } = {};
    
    allWords.forEach(word => {
      // Skip words shorter than minimum length
      if (word.length < minWordLength) {
        return;
      }
      
      // Skip common words if option is enabled
      if (excludeCommonWords && commonWords.includes(word)) {
        return;
      }
      
      if (wordFrequency[word]) {
        wordFrequency[word]++;
      } else {
        wordFrequency[word] = 1;
      }
    });
    
    // Count unique words
    const uniqueWords = Object.keys(wordFrequency).length;
    
    // Convert to array and sort by frequency
    const keywords = Object.entries(wordFrequency)
      .map(([word, count]) => ({
        word,
        count,
        density: (count / totalWords) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, keywordsToShow);
    
    setResults({
      totalWords,
      uniqueWords,
      keywords
    });
  };

  const handleClearContent = () => {
    setContent('');
    setResults(null);
  };

  return (
    <Layout>
      <Head>
        <title>Keyword Density Checker | ToolsFree Online</title>
        <meta name="description" content="Analyze your content's keyword density to optimize for SEO and readability." />
        <meta name="keywords" content="keyword density checker, SEO tool, content analysis, keyword frequency, word counter" />
      </Head>

      <PageContainer>
        <PageTitle>Keyword Density Checker</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <AnalyzerSection>
            <TextareaContainer>
              <label htmlFor="content">Enter your content:</label>
              <StyledTextarea 
                id="content"
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Paste your article, blog post, or any text content here to analyze keyword density..."
                rows={10}
              />
              <TextareaActions>
                <WordCount>{content.trim() ? content.trim().split(/\s+/).length : 0} words</WordCount>
                <ClearButton onClick={handleClearContent}>Clear</ClearButton>
              </TextareaActions>
            </TextareaContainer>
            
            <OptionsContainer>
              <OptionGroup>
                <label htmlFor="minWordLength">Minimum word length:</label>
                <select 
                  id="minWordLength"
                  value={minWordLength} 
                  onChange={(e) => setMinWordLength(parseInt(e.target.value))}
                >
                  <option value={2}>2 characters</option>
                  <option value={3}>3 characters</option>
                  <option value={4}>4 characters</option>
                  <option value={5}>5 characters</option>
                </select>
              </OptionGroup>
              
              <OptionGroup>
                <label htmlFor="keywordsToShow">Keywords to show:</label>
                <select 
                  id="keywordsToShow"
                  value={keywordsToShow} 
                  onChange={(e) => setKeywordsToShow(parseInt(e.target.value))}
                >
                  <option value={10}>Top 10</option>
                  <option value={20}>Top 20</option>
                  <option value={30}>Top 30</option>
                  <option value={50}>Top 50</option>
                </select>
              </OptionGroup>
              
              <OptionGroup>
                <CheckboxContainer>
                  <input 
                    type="checkbox" 
                    id="excludeCommonWords" 
                    checked={excludeCommonWords} 
                    onChange={(e) => setExcludeCommonWords(e.target.checked)} 
                  />
                  <label htmlFor="excludeCommonWords">Exclude common words</label>
                </CheckboxContainer>
              </OptionGroup>
            </OptionsContainer>
            
            <AnalyzeButton onClick={analyzeContent}>
              <FaSearch /> Analyze Content
            </AnalyzeButton>
            
            {results && (
              <ResultsContainer>
                <ResultsSummary>
                  <SummaryItem>
                    <SummaryLabel>Total Words:</SummaryLabel>
                    <SummaryValue>{results.totalWords}</SummaryValue>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>Unique Words:</SummaryLabel>
                    <SummaryValue>{results.uniqueWords}</SummaryValue>
                  </SummaryItem>
                  
                  <SummaryItem>
                    <SummaryLabel>Lexical Density:</SummaryLabel>
                    <SummaryValue>
                      {results.totalWords > 0 
                        ? ((results.uniqueWords / results.totalWords) * 100).toFixed(2) + '%' 
                        : '0%'}
                    </SummaryValue>
                  </SummaryItem>
                </ResultsSummary>
                
                <KeywordsTitle>Top Keywords</KeywordsTitle>
                
                {results.keywords.length > 0 ? (
                  <KeywordsTable>
                    <thead>
                      <tr>
                        <th>Keyword</th>
                        <th>Count</th>
                        <th>Density</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.keywords.map((keyword, index) => (
                        <tr key={index}>
                          <td>{keyword.word}</td>
                          <td>{keyword.count}</td>
                          <td>{keyword.density.toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </KeywordsTable>
                ) : (
                  <NoKeywords>
                    No keywords found matching your criteria. Try adjusting the minimum word length or disabling the "exclude common words" option.
                  </NoKeywords>
                )}
              </ResultsContainer>
            )}
          </AnalyzerSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Keyword Density</InfoTitle>
          <InfoText>
            <InfoParagraph>
              Keyword density refers to the percentage of times a keyword or phrase appears on a webpage compared to the total number of words on the page. It's an important factor in search engine optimization (SEO) that helps search engines understand what your content is about.
            </InfoParagraph>
            
            <InfoSubtitle>Why Keyword Density Matters:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>SEO Optimization:</strong> Proper keyword usage helps search engines index your content correctly</InfoItem>
              <InfoItem><strong>Content Quality:</strong> Balanced keyword density creates more readable content</InfoItem>
              <InfoItem><strong>Avoiding Penalties:</strong> Excessive keyword usage (keyword stuffing) can lead to search engine penalties</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Recommended Keyword Density:</InfoSubtitle>
            <InfoParagraph>
              Most SEO experts recommend a keyword density of 1-2% for primary keywords. This means your target keyword should appear 1-2 times per 100 words. However, there's no perfect percentage, as natural writing and user experience should always be prioritized over strict keyword ratios.
            </InfoParagraph>
            
            <InfoSubtitle>How to Use This Tool:</InfoSubtitle>
            <InfoList>
              <InfoItem>Paste your content into the text area</InfoItem>
              <InfoItem>Adjust the options as needed (minimum word length, number of keywords to show, etc.)</InfoItem>
              <InfoItem>Click "Analyze Content" to see your keyword density results</InfoItem>
              <InfoItem>Review the results to identify overused or underused keywords</InfoItem>
              <InfoItem>Adjust your content as needed to achieve a natural keyword distribution</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> While keyword density is important for SEO, modern search engines use many other factors to rank content. Focus on creating high-quality, valuable content for your audience rather than optimizing solely for keyword density.
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

const AnalyzerSection = styled.div`
  padding: 2rem;
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
  min-height: 200px;
  
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const TextareaActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const WordCount = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: #4a90e2;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const OptionGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  select {
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

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  input {
    margin: 0;
  }
`;

const AnalyzeButton = styled.button`
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
  padding-top: 2rem;
  border-top: 1px solid #eee;
`;

const ResultsSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
  font-size: 1.5rem;
  font-weight: 500;
  color: #4a90e2;
`;

const KeywordsTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #333;
`;

const KeywordsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
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

const NoKeywords = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
  background-color: #f5f5f5;
  border-radius: 4px;
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

export default KeywordDensityChecker;
