import React, { useState } from 'react';
import styled from 'styled-components';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface AIIntegrationProps {
  // Props if needed
}

const AIIntegration: React.FC<AIIntegrationProps> = () => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [model, setModel] = useState('gemini-2.0-flash');

  // Handle API key configuration
  const handleConfigureAPI = () => {
    if (!apiKey.trim()) {
      setError('Please enter a valid API key');
      return;
    }

    // Test the API key with a simple request
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

  // Handle prompt submission
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
    } catch (err: any) {
      setIsLoading(false);
      setError(`Error generating content: ${err.message}`);
    }
  };

  return (
    <AIIntegrationContainer>
      <AIIntegrationHeader>
        <h2>Google Gemini AI Integration</h2>
        <p>Configure and use Google's Gemini AI model for advanced AI capabilities</p>
      </AIIntegrationHeader>

      <AISection>
        <h3>API Configuration</h3>
        <p>
          To use Google Gemini AI, you need to provide your API key. You can get a free API key from{' '}
          <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer">
            Google AI Studio
          </a>.
        </p>

        <FormGroup>
          <label htmlFor="api-key">Gemini API Key</label>
          <InputWithAction>
            <input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              disabled={isConfigured}
            />
            <ActionButton
              onClick={isConfigured ? () => setIsConfigured(false) : handleConfigureAPI}
              disabled={isLoading}
            >
              {isConfigured ? 'Change Key' : 'Configure'}
            </ActionButton>
          </InputWithAction>
        </FormGroup>

        <FormGroup>
          <label htmlFor="model-select">Model</label>
          <select
            id="model-select"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={isLoading || isConfigured}
          >
            <option value="gemini-2.0-flash">Gemini 2.0 Flash (Fast)</option>
            <option value="gemini-2.0-pro">Gemini 2.0 Pro (Powerful)</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash (Legacy)</option>
            <option value="gemini-1.5-pro">Gemini 1.5 Pro (Legacy)</option>
          </select>
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {isConfigured && <SuccessMessage>API key configured successfully!</SuccessMessage>}
      </AISection>

      <AISection>
        <h3>Test Gemini AI</h3>
        <p>
          Enter a prompt below to test the Gemini AI model. You can ask questions, request creative content,
          or explore other capabilities of the model.
        </p>

        <FormGroup>
          <label htmlFor="prompt">Prompt</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here..."
            rows={4}
            disabled={!isConfigured || isLoading}
          />
        </FormGroup>

        <ButtonGroup>
          <PrimaryButton
            onClick={handleSubmitPrompt}
            disabled={!isConfigured || isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Response'}
          </PrimaryButton>
          <SecondaryButton
            onClick={() => setPrompt('')}
            disabled={!prompt || isLoading}
          >
            Clear Prompt
          </SecondaryButton>
        </ButtonGroup>

        {response && (
          <ResponseContainer>
            <ResponseHeader>
              <h4>AI Response</h4>
              <CopyButton onClick={() => navigator.clipboard.writeText(response)}>
                <i className="fas fa-copy"></i> Copy
              </CopyButton>
            </ResponseHeader>
            <ResponseContent>{response}</ResponseContent>
          </ResponseContainer>
        )}
      </AISection>

      <AISection>
        <h3>Gemini AI Capabilities</h3>
        <CapabilitiesGrid>
          <CapabilityCard>
            <CapabilityIcon className="fas fa-comment-alt" />
            <CapabilityTitle>Text Generation</CapabilityTitle>
            <CapabilityDescription>
              Generate creative content, answer questions, and provide information on various topics
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon className="fas fa-code" />
            <CapabilityTitle>Code Generation</CapabilityTitle>
            <CapabilityDescription>
              Generate code snippets, debug existing code, and explain programming concepts
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon className="fas fa-brain" />
            <CapabilityTitle>Problem Solving</CapabilityTitle>
            <CapabilityDescription>
              Solve complex problems, analyze scenarios, and provide step-by-step solutions
            </CapabilityDescription>
          </CapabilityCard>

          <CapabilityCard>
            <CapabilityIcon className="fas fa-language" />
            <CapabilityTitle>Language Translation</CapabilityTitle>
            <CapabilityDescription>
              Translate text between different languages with high accuracy
            </CapabilityDescription>
          </CapabilityCard>
        </CapabilitiesGrid>
      </AISection>

      <AISection>
        <h3>Usage Guidelines</h3>
        <GuidelinesList>
          <GuidelineItem>
            <GuidelineIcon className="fas fa-key" />
            <GuidelineText>
              <strong>API Key Security</strong>
              <span>Keep your API key secure and never share it publicly</span>
            </GuidelineText>
          </GuidelineItem>

          <GuidelineItem>
            <GuidelineIcon className="fas fa-dollar-sign" />
            <GuidelineText>
              <strong>Usage Limits</strong>
              <span>Free tier has rate limits; monitor your usage to avoid unexpected charges</span>
            </GuidelineText>
          </GuidelineItem>

          <GuidelineItem>
            <GuidelineIcon className="fas fa-shield-alt" />
            <GuidelineText>
              <strong>Content Policy</strong>
              <span>Avoid generating harmful, illegal, or unethical content</span>
            </GuidelineText>
          </GuidelineItem>

          <GuidelineItem>
            <GuidelineIcon className="fas fa-check-circle" />
            <GuidelineText>
              <strong>Verification</strong>
              <span>Always verify AI-generated information for accuracy</span>
            </GuidelineText>
          </GuidelineItem>
        </GuidelinesList>
      </AISection>
    </AIIntegrationContainer>
  );
};

// Styled Components
const AIIntegrationContainer = styled.div`
  padding: 2rem;
`;

const AIIntegrationHeader = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  p {
    color: #666;
  }
`;

const AISection = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  p {
    margin-bottom: 1.5rem;
    line-height: 1.6;
    
    a {
      color: var(--primary-color);
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    
    &:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }
  }
  
  textarea {
    resize: vertical;
  }
  
  select {
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1em;
  }
`;

const InputWithAction = styled.div`
  display: flex;
  
  input {
    flex: 1;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const ActionButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 var(--border-radius) var(--border-radius) 0;
  padding: 0 1.5rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  background-color: #f0f0f0;
  color: var(--text-color);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &:disabled {
    background-color: #f5f5f5;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
`;

const SuccessMessage = styled.div`
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 0.75rem;
  border-radius: var(--border-radius);
  margin-bottom: 1.5rem;
`;

const ResponseContainer = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  margin-top: 1.5rem;
`;

const ResponseHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border-color);
  
  h4 {
    margin: 0;
    font-size: 1.1rem;
  }
`;

const CopyButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  cursor: pointer;
  font-size: 0.9rem;
  
  i {
    margin-right: 0.3rem;
  }
  
  &:hover {
    text-decoration: underline;
  }
`;

const ResponseContent = styled.div`
  padding: 1rem;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const CapabilityCard = styled.div`
  background-color: #f9f9f9;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CapabilityIcon = styled.i`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const CapabilityTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const CapabilityDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0;
`;

const GuidelinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const GuidelineItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const GuidelineIcon = styled.i`
  color: var(--primary-color);
  font-size: 1.2rem;
  margin-top: 0.2rem;
`;

const GuidelineText = styled.div`
  display: flex;
  flex-direction: column;
  
  strong {
    margin-bottom: 0.3rem;
  }
  
  span {
    color: #666;
    font-size: 0.9rem;
  }
`;

export default AIIntegration;
