import React, { useState } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Layout from '../../../components/layout/Layout';
import { FaSearch, FaLink, FaExternalLinkAlt } from 'react-icons/fa';

const MetaTagGenerator: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [ogTitle, setOgTitle] = useState<string>('');
  const [ogDescription, setOgDescription] = useState<string>('');
  const [ogImage, setOgImage] = useState<string>('');
  const [ogUrl, setOgUrl] = useState<string>('');
  const [twitterCard, setTwitterCard] = useState<string>('summary');
  const [twitterSite, setTwitterSite] = useState<string>('');
  const [twitterCreator, setTwitterCreator] = useState<string>('');
  const [robots, setRobots] = useState<string>('index, follow');
  const [canonical, setCanonical] = useState<string>('');
  const [viewport, setViewport] = useState<string>('width=device-width, initial-scale=1.0');
  const [charset, setCharset] = useState<string>('UTF-8');
  const [language, setLanguage] = useState<string>('en');
  
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generateMetaTags = () => {
    if (!title) {
      alert('Title is required');
      return;
    }
    
    let code = '';
    
    // Basic meta tags
    code += `<!-- Basic Meta Tags -->\n`;
    code += `<meta charset="${charset}">\n`;
    code += `<meta name="viewport" content="${viewport}">\n`;
    code += `<title>${title}</title>\n`;
    
    if (description) {
      code += `<meta name="description" content="${description}">\n`;
    }
    
    if (keywords) {
      code += `<meta name="keywords" content="${keywords}">\n`;
    }
    
    if (author) {
      code += `<meta name="author" content="${author}">\n`;
    }
    
    if (robots) {
      code += `<meta name="robots" content="${robots}">\n`;
    }
    
    if (language) {
      code += `<meta http-equiv="content-language" content="${language}">\n`;
    }
    
    if (canonical) {
      code += `<link rel="canonical" href="${canonical}">\n`;
    }
    
    // Open Graph meta tags
    if (ogTitle || ogDescription || ogImage || ogUrl) {
      code += `\n<!-- Open Graph Meta Tags -->\n`;
      
      if (ogTitle || title) {
        code += `<meta property="og:title" content="${ogTitle || title}">\n`;
      }
      
      if (ogDescription || description) {
        code += `<meta property="og:description" content="${ogDescription || description}">\n`;
      }
      
      if (ogUrl || canonical) {
        code += `<meta property="og:url" content="${ogUrl || canonical}">\n`;
      }
      
      if (ogImage) {
        code += `<meta property="og:image" content="${ogImage}">\n`;
      }
      
      code += `<meta property="og:type" content="website">\n`;
    }
    
    // Twitter Card meta tags
    if (twitterCard || twitterSite || twitterCreator) {
      code += `\n<!-- Twitter Card Meta Tags -->\n`;
      
      if (twitterCard) {
        code += `<meta name="twitter:card" content="${twitterCard}">\n`;
      }
      
      if (twitterSite) {
        code += `<meta name="twitter:site" content="${twitterSite}">\n`;
      }
      
      if (twitterCreator) {
        code += `<meta name="twitter:creator" content="${twitterCreator}">\n`;
      }
      
      if (ogTitle || title) {
        code += `<meta name="twitter:title" content="${ogTitle || title}">\n`;
      }
      
      if (ogDescription || description) {
        code += `<meta name="twitter:description" content="${ogDescription || description}">\n`;
      }
      
      if (ogImage) {
        code += `<meta name="twitter:image" content="${ogImage}">\n`;
      }
    }
    
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const fillWithSampleData = () => {
    setTitle('ToolsFree Online - Free Online Tools');
    setDescription('ToolsFree Online offers 50+ free online tools for everyday tasks. No downloads, no registration, just free tools that work.');
    setKeywords('online tools, free tools, web tools, utilities, converters, generators');
    setAuthor('ToolsFree Online');
    setOgTitle('ToolsFree Online - Free Web Tools');
    setOgDescription('Discover 50+ free online tools for everyday tasks. No downloads required.');
    setOgImage('https://toolfree002.vercel.app/images/og-image.jpg');
    setOgUrl('https://toolfree002.vercel.app/');
    setTwitterCard('summary_large_image');
    setTwitterSite('@toolsfree');
    setTwitterCreator('@toolsfree');
    setRobots('index, follow');
    setCanonical('https://toolfree002.vercel.app/');
    setViewport('width=device-width, initial-scale=1.0');
    setCharset('UTF-8');
    setLanguage('en');
  };

  return (
    <Layout>
      <Head>
        <title>Meta Tag Generator | ToolsFree Online</title>
        <meta name="description" content="Generate meta tags for your website to improve SEO and social media sharing." />
        <meta name="keywords" content="meta tag generator, SEO meta tags, Open Graph tags, Twitter Card tags, HTML meta tags" />
      </Head>

      <PageContainer>
        <PageTitle>Meta Tag Generator</PageTitle>

        <AdContainer>
          <AdText>Advertisement</AdText>
          <AdContent>Propeller Ads will appear here</AdContent>
        </AdContainer>

        <ToolContainer>
          <GeneratorSection>
            <ToolActions>
              <SampleButton onClick={fillWithSampleData}>
                Fill with Sample Data
              </SampleButton>
            </ToolActions>
            
            <FormContainer>
              <FormSection>
                <SectionTitle>Basic Meta Tags</SectionTitle>
                
                <InputGroup>
                  <label htmlFor="title">Title (required):</label>
                  <input 
                    id="title"
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Page Title"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="description">Description:</label>
                  <textarea 
                    id="description"
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Brief description of your page (150-160 characters recommended)"
                    rows={3}
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="keywords">Keywords:</label>
                  <input 
                    id="keywords"
                    type="text" 
                    value={keywords} 
                    onChange={(e) => setKeywords(e.target.value)} 
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="author">Author:</label>
                  <input 
                    id="author"
                    type="text" 
                    value={author} 
                    onChange={(e) => setAuthor(e.target.value)} 
                    placeholder="Author name"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="robots">Robots:</label>
                  <select 
                    id="robots"
                    value={robots} 
                    onChange={(e) => setRobots(e.target.value)}
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, follow">noindex, follow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                  </select>
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="canonical">Canonical URL:</label>
                  <input 
                    id="canonical"
                    type="text" 
                    value={canonical} 
                    onChange={(e) => setCanonical(e.target.value)} 
                    placeholder="https://example.com/page"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="viewport">Viewport:</label>
                  <input 
                    id="viewport"
                    type="text" 
                    value={viewport} 
                    onChange={(e) => setViewport(e.target.value)} 
                    placeholder="width=device-width, initial-scale=1.0"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="charset">Charset:</label>
                  <input 
                    id="charset"
                    type="text" 
                    value={charset} 
                    onChange={(e) => setCharset(e.target.value)} 
                    placeholder="UTF-8"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="language">Language:</label>
                  <input 
                    id="language"
                    type="text" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)} 
                    placeholder="en"
                  />
                </InputGroup>
              </FormSection>
              
              <FormSection>
                <SectionTitle>Open Graph Meta Tags</SectionTitle>
                
                <InputGroup>
                  <label htmlFor="ogTitle">OG Title:</label>
                  <input 
                    id="ogTitle"
                    type="text" 
                    value={ogTitle} 
                    onChange={(e) => setOgTitle(e.target.value)} 
                    placeholder="Open Graph Title (defaults to main title if empty)"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="ogDescription">OG Description:</label>
                  <textarea 
                    id="ogDescription"
                    value={ogDescription} 
                    onChange={(e) => setOgDescription(e.target.value)} 
                    placeholder="Open Graph Description (defaults to main description if empty)"
                    rows={3}
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="ogImage">OG Image URL:</label>
                  <input 
                    id="ogImage"
                    type="text" 
                    value={ogImage} 
                    onChange={(e) => setOgImage(e.target.value)} 
                    placeholder="https://example.com/image.jpg"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="ogUrl">OG URL:</label>
                  <input 
                    id="ogUrl"
                    type="text" 
                    value={ogUrl} 
                    onChange={(e) => setOgUrl(e.target.value)} 
                    placeholder="https://example.com/page (defaults to canonical URL if empty)"
                  />
                </InputGroup>
              </FormSection>
              
              <FormSection>
                <SectionTitle>Twitter Card Meta Tags</SectionTitle>
                
                <InputGroup>
                  <label htmlFor="twitterCard">Twitter Card Type:</label>
                  <select 
                    id="twitterCard"
                    value={twitterCard} 
                    onChange={(e) => setTwitterCard(e.target.value)}
                  >
                    <option value="summary">Summary</option>
                    <option value="summary_large_image">Summary with Large Image</option>
                    <option value="app">App</option>
                    <option value="player">Player</option>
                  </select>
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="twitterSite">Twitter Site (@username):</label>
                  <input 
                    id="twitterSite"
                    type="text" 
                    value={twitterSite} 
                    onChange={(e) => setTwitterSite(e.target.value)} 
                    placeholder="@username"
                  />
                </InputGroup>
                
                <InputGroup>
                  <label htmlFor="twitterCreator">Twitter Creator (@username):</label>
                  <input 
                    id="twitterCreator"
                    type="text" 
                    value={twitterCreator} 
                    onChange={(e) => setTwitterCreator(e.target.value)} 
                    placeholder="@username"
                  />
                </InputGroup>
              </FormSection>
            </FormContainer>
            
            <GenerateButton onClick={generateMetaTags}>
              <FaSearch /> Generate Meta Tags
            </GenerateButton>
            
            {generatedCode && (
              <ResultContainer>
                <ResultHeader>
                  <ResultTitle>Generated Meta Tags</ResultTitle>
                  <CopyButton onClick={copyToClipboard}>
                    {copied ? 'Copied!' : 'Copy to Clipboard'}
                  </CopyButton>
                </ResultHeader>
                <CodeBlock>
                  <pre>{generatedCode}</pre>
                </CodeBlock>
              </ResultContainer>
            )}
          </GeneratorSection>
        </ToolContainer>

        <InfoContainer>
          <InfoTitle>About Meta Tags</InfoTitle>
          <InfoText>
            <InfoParagraph>
              Meta tags are snippets of HTML code that provide metadata about a webpage. They don't appear on the page itself but are read by search engines and social media platforms to understand and display your content correctly.
            </InfoParagraph>
            
            <InfoSubtitle>Why Meta Tags Matter:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>SEO:</strong> Proper meta tags help search engines understand your content, potentially improving your search rankings</InfoItem>
              <InfoItem><strong>Social Sharing:</strong> Open Graph and Twitter Card tags control how your content appears when shared on social media</InfoItem>
              <InfoItem><strong>User Experience:</strong> Tags like viewport and language help browsers render your page correctly</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Key Meta Tag Types:</InfoSubtitle>
            <InfoList>
              <InfoItem><strong>Basic Meta Tags:</strong> Include title, description, keywords, and other fundamental information</InfoItem>
              <InfoItem><strong>Open Graph Tags:</strong> Control how your content appears when shared on Facebook, LinkedIn, and other platforms</InfoItem>
              <InfoItem><strong>Twitter Card Tags:</strong> Determine how your content appears when shared on Twitter</InfoItem>
            </InfoList>
            
            <InfoSubtitle>Best Practices:</InfoSubtitle>
            <InfoList>
              <InfoItem>Keep titles under 60 characters to avoid truncation in search results</InfoItem>
              <InfoItem>Write descriptions between 150-160 characters that accurately summarize your content</InfoItem>
              <InfoItem>Use high-quality images (at least 1200×630 pixels) for Open Graph and Twitter Card images</InfoItem>
              <InfoItem>Include a canonical URL to prevent duplicate content issues</InfoItem>
              <InfoItem>Set appropriate robots directives based on your content indexing preferences</InfoItem>
            </InfoList>
            
            <InfoNote>
              <strong>Note:</strong> While meta tags are important for SEO and social sharing, they are just one aspect of a comprehensive SEO strategy. Focus on creating high-quality, valuable content alongside optimizing your meta tags.
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

const GeneratorSection = styled.div`
  padding: 2rem;
`;

const ToolActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;

const SampleButton = styled.button`
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

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FormSection = styled.div``;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea, select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:focus {
      border-color: #4a90e2;
      outline: none;
    }
  }
  
  textarea {
    resize: vertical;
  }
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

const ResultContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.25rem;
  color: #333;
  margin: 0;
`;

const CopyButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #3a80d2;
  }
`;

const CodeBlock = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  
  pre {
    margin: 0;
    white-space: pre-wrap;
    font-family: monospace;
    color: #333;
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

export default MetaTagGenerator;
