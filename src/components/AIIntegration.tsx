import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIIntegration = () => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [model, setModel] = useState('gemini-2.0-flash');

  const handleConfigureAPI = () => {
    if (!apiKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }

    setIsLoading(true);
    setError('');
    const genAI = new GoogleGenerativeAI(apiKey);
    const genModel = genAI.getGenerativeModel({ model });

    genModel.generateContent('Hello, world!')
      .then(() => {
        setIsConfigured(true);
        setIsLoading(false);
        setError('');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(`API key validation failed: ${err.message}`);
        setIsConfigured(false);
      });
  };

  const handleSubmitPrompt = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!isConfigured) {
      setError('Please configure your API key first');
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const genModel = genAI.getGenerativeModel({ model });

      const result = await genModel.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(`Error generating content: ${err.message}`);
    }
  };

  return (
    <Container>
      <Header>
        <h2>Google Gemini AI Integration</h2>
      </Header>

      <Section>
        <h3>API Configuration</h3>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your Gemini API key"
        />
        <button onClick={handleConfigureAPI} disabled={isLoading}>
          {isConfigured ? 'Configured' : 'Configure API'}
        </button>
      </Section>

      <Section>
        <h3>Test Gemini AI</h3>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          rows={4}
        />
        <button onClick={handleSubmitPrompt} disabled={!isConfigured || isLoading}>
          {isLoading ? 'Generating...' : 'Generate Response'}
        </button>
      </Section>

      {response && <Response>{response}</Response>}
      {error && <Error>{error}</Error>}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: auto;
`;
const Header = styled.div`
  text-align: center;
`;
const Section = styled.div`
  margin-bottom: 20px;
`;
const Response = styled.pre`
  background: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
`;
const Error = styled.div`
  color: red;
  font-weight: bold;
`;

export default AIIntegration;
