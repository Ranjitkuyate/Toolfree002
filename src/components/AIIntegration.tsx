import React, { useState } from 'react';
import styled from 'styled-components';

interface AIIntegrationProps {
  className?: string;
}

const AIIntegration: React.FC<AIIntegrationProps> = ({ 
  className = '' 
}) => {
  const [query, setQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setResponse(`Here's some information about "${query}". This is a simulated response from Google Gemini AI integration. In the actual implementation, this would connect to the Gemini API and return real results based on the user's query.`);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <AIContainer className={className}>
      <AIHeader>
        <AITitle>AI Assistant</AITitle>
        <AISubtitle>Powered by Google Gemini</AISubtitle>
      </AIHeader>
      
      <QueryForm onSubmit={handleSubmit}>
        <QueryInput 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Ask anything..." 
          disabled={isProcessing}
        />
        <SubmitButton type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Ask AI'}
        </SubmitButton>
      </QueryForm>
      
      {response && (
        <ResponseContainer>
          <ResponseTitle>AI Response:</ResponseTitle>
          <ResponseText>{response}</ResponseText>
        </ResponseContainer>
      )}
    </AIContainer>
  );
};

const AIContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 2rem 0;
`;

const AIHeader = styled.div`
  margin-bottom: 1rem;
`;

const AITitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.25rem 0;
  color: #8e44ad;
`;

const AISubtitle = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin: 0;
`;

const QueryForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const QueryInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #8e44ad;
  }
  
  &:disabled {
    background-color: #f0f0f0;
  }
`;

const SubmitButton = styled.button`
  background-color: #8e44ad;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0 1rem;
  font-weight: 500;
  cursor: pointer;
  
  &:hover {
    background-color: #7d3c98;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ResponseContainer = styled.div`
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1rem;
`;

const ResponseTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const ResponseText = styled.p`
  margin: 0;
  line-height: 1.5;
  color: #444;
`;

export default AIIntegration;
