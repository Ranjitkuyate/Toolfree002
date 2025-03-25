import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Layout from '@/components/Layout';
import AdBanner from '@/components/AdBanner';
import { getToolBySlug } from '@/utils/tools';

const ToolPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  // Handle case when slug is not yet available
  if (!slug || typeof slug !== 'string') {
    return (
      <Layout>
        <div className="container">
          <LoadingContainer>
            <h2>Loading tool...</h2>
          </LoadingContainer>
        </div>
      </Layout>
    );
  }
  
  const tool = getToolBySlug(slug);
  
  // Handle case when tool is not found
  if (!tool) {
    return (
      <Layout>
        <div className="container">
          <ErrorContainer>
            <h2>Tool Not Found</h2>
            <p>Sorry, the requested tool could not be found.</p>
            <BackButton onClick={() => router.push('/')}>
              Back to Home
            </BackButton>
          </ErrorContainer>
        </div>
      </Layout>
    );
  }
  
  // Render the appropriate tool component based on the slug
  const renderToolComponent = () => {
    switch (slug) {
      case 'text-to-speech':
        return <TextToSpeechTool />;
      case 'word-counter':
        return <WordCounterTool />;
      case 'text-case-converter':
        return <TextCaseConverterTool />;
      case 'pdf-generator':
        return <PDFGeneratorTool />;
      case 'image-resizer':
        return <ImageResizerTool />;
      case 'qr-code-generator':
        return <QRCodeGeneratorTool />;
      case 'password-generator':
        return <PasswordGeneratorTool />;
      case 'unit-converter':
        return <UnitConverterTool />;
      case 'all-in-one-downloader':
        return <AllInOneDownloaderTool />;
      case 'video-editor':
        return <VideoEditorTool />;
      // Add cases for other tools
      default:
        return <ComingSoonTool toolName={tool.title} />;
    }
  };
  
  return (
    <Layout>
      <div className="container">
        <ToolHeader>
          <ToolTitle>
            <i className={tool.icon}></i> {tool.title}
          </ToolTitle>
          <ToolDescription>{tool.description}</ToolDescription>
          {tool.isAIPowered && <AIPoweredBadge>AI-Powered</AIPoweredBadge>}
        </ToolHeader>
        
        <AdBanner position="top" size="medium" />
        
        <ToolContainer>
          {renderToolComponent()}
        </ToolContainer>
        
        <AdBanner position="bottom" size="medium" />
      </div>
    </Layout>
  );
};

// Placeholder tool components
const TextToSpeechTool = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('en-US-Standard-A');
  
  return (
    <ToolContent>
      <h3>Convert Text to Speech</h3>
      <p>Enter your text below and convert it to natural-sounding speech.</p>
      
      <FormGroup>
        <label htmlFor="text-input">Text to Convert</label>
        <textarea
          id="text-input"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
        />
      </FormGroup>
      
      <FormGroup>
        <label htmlFor="voice-select">Select Voice</label>
        <select
          id="voice-select"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
        >
          <option value="en-US-Standard-A">English (US) - Female</option>
          <option value="en-US-Standard-B">English (US) - Male</option>
          <option value="en-GB-Standard-A">English (UK) - Female</option>
          <option value="en-GB-Standard-B">English (UK) - Male</option>
        </select>
      </FormGroup>
      
      <ButtonGroup>
        <Button disabled={!text}>Convert to Speech</Button>
        <Button variant="secondary" disabled={!text}>Download MP3</Button>
      </ButtonGroup>
      
      <ResultSection>
        <h4>Preview</h4>
        <p>Your audio will appear here after conversion.</p>
      </ResultSection>
    </ToolContent>
  );
};

const WordCounterTool = () => {
  const [text, setText] = useState('');
  const wordCount = text ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = text.length;
  const charNoSpacesCount = text.replace(/\s+/g, '').length;
  const sentenceCount = text ? text.split(/[.!?]+/).filter(Boolean).length : 0;
  const paragraphCount = text ? text.split(/\n+/).filter(Boolean).length : 0;
  
  return (
    <ToolContent>
      <h3>Word Counter</h3>
      <p>Count words, characters, sentences, and paragraphs in your text.</p>
      
      <FormGroup>
        <label htmlFor="text-input">Enter Your Text</label>
        <textarea
          id="text-input"
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste your text here..."
        />
      </FormGroup>
      
      <ResultsGrid>
        <ResultCard>
          <ResultValue>{wordCount}</ResultValue>
          <ResultLabel>Words</ResultLabel>
        </ResultCard>
        <ResultCard>
          <ResultValue>{charCount}</ResultValue>
          <ResultLabel>Characters</ResultLabel>
        </ResultCard>
        <ResultCard>
          <ResultValue>{charNoSpacesCount}</ResultValue>
          <ResultLabel>Characters (no spaces)</ResultLabel>
        </ResultCard>
        <ResultCard>
          <ResultValue>{sentenceCount}</ResultValue>
          <ResultLabel>Sentences</ResultLabel>
        </ResultCard>
        <ResultCard>
          <ResultValue>{paragraphCount}</ResultValue>
          <ResultLabel>Paragraphs</ResultLabel>
        </ResultCard>
      </ResultsGrid>
    </ToolContent>
  );
};

const TextCaseConverterTool = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  
  const convertCase = (type: string) => {
    switch (type) {
      case 'upper':
        setResult(text.toUpperCase());
        break;
      case 'lower':
        setResult(text.toLowerCase());
        break;
      case 'title':
        setResult(
          text.replace(
            /\w\S*/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          )
        );
        break;
      case 'sentence':
        setResult(
          text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
        );
        break;
      case 'camel':
        setResult(
          text.toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        );
        break;
      case 'pascal':
        setResult(
          text.toLowerCase()
            .replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, __, c) => c.toUpperCase())
        );
        break;
      case 'snake':
        setResult(
          text.toLowerCase()
            .replace(/\s+/g, '_')
            .replace(/[^a-zA-Z0-9_]/g, '')
        );
        break;
      case 'kebab':
        setResult(
          text.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9-]/g, '')
        );
        break;
      default:
        setResult(text);
    }
  };
  
  return (
    <ToolContent>
      <h3>Text Case Converter</h3>
      <p>Convert your text between different cases.</p>
      
      <FormGroup>
        <label htmlFor="text-input">Enter Your Text</label>
        <textarea
          id="text-input"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter or paste your text here..."
        />
      </FormGroup>
      
      <ButtonGrid>
        <Button onClick={() => convertCase('upper')} disabled={!text}>UPPERCASE</Button>
        <Button onClick={() => convertCase('lower')} disabled={!text}>lowercase</Button>
        <Button onClick={() => convertCase('title')} disabled={!text}>Title Case</Button>
        <Button onClick={() => convertCase('sentence')} disabled={!text}>Sentence case</Button>
        <Button onClick={() => convertCase('camel')} disabled={!text}>camelCase</Button>
        <Button onClick={() => convertCase('pascal')} disabled={!text}>PascalCase</Button>
        <Button onClick={() => convertCase('snake')} disabled={!text}>snake_case</Button>
        <Button onClick={() => convertCase('kebab')} disabled={!text}>kebab-case</Button>
      </ButtonGrid>
      
      {result && (
        <ResultSection>
          <h4>Result</h4>
          <ResultTextarea readOnly value={result} rows={6} />
          <Button variant="secondary" onClick={() => navigator.clipboard.writeText(result)}>
            Copy to Clipboard
          </Button>
        </ResultSection>
      )}
    </ToolContent>
  );
};

const PDFGeneratorTool = () => {
  return (
    <ToolContent>
      <h3>PDF Generator</h3>
      <p>Convert text, HTML, or other documents to PDF format.</p>
      
      <FormGroup>
        <label>Select Source Type</label>
        <select>
          <option value="text">Plain Text</option>
          <option value="html">HTML</option>
          <option value="url">Web URL</option>
          <option value="file">Upload File</option>
        </select>
      </FormGroup>
      
      <FormGroup>
        <label>Enter Content</label>
        <textarea rows={8} placeholder="Enter your content here..." />
      </FormGroup>
      
      <Button>Generate PDF</Button>
      
      <ResultSection>
        <h4>Output</h4>
        <p>Your PDF will appear here after generation.</p>
      </ResultSection>
    </ToolContent>
  );
};

const ImageResizerTool = () => {
  return (
    <ToolContent>
      <h3>Image Resizer</h3>
      <p>Resize, crop, and optimize your images with ease.</p>
      
      <UploadSection>
        <p>Drag and drop an image here, or click to select</p>
        <Button>Select Image</Button>
      </UploadSection>
      
      <FormGroup>
        <label>Resize Options</label>
        <OptionsGrid>
          <div>
            <label>Width (px)</label>
            <input type="number" placeholder="Width" />
          </div>
          <div>
            <label>Height (px)</label>
            <input type="number" placeholder="Height" />
          </div>
          <div>
            <label>Maintain aspect ratio</label>
            <input type="checkbox" checked />
          </div>
        </OptionsGrid>
      </FormGroup>
      
      <Button>Resize Image</Button>
      
      <ResultSection>
        <h4>Preview</h4>
        <p>Your resized image will appear here.</p>
      </ResultSection>
    </ToolContent>
  );
};

const QRCodeGeneratorTool = () => {
  return (
    <ToolContent>
      <h3>QR Code Generator</h3>
      <p>Generate QR codes for URLs, text, contact info, and more.</p>
      
      <FormGroup>
        <label>QR Code Type</label>
        <select>
          <option value="url">URL</option>
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="sms">SMS</option>
          <option value="wifi">Wi-Fi</option>
          <option value="vcard">vCard</option>
        </select>
      </FormGroup>
      
      <FormGroup>
        <label>Content</label>
        <input type="text" placeholder="Enter URL or text..." />
      </FormGroup>
      
      <FormGroup>
        <label>Customization</label>
        <OptionsGrid>
          <div>
            <label>Foreground Color</label>
            <input type="color" value="#000000" />
          </div>
          <div>
            <label>Background Color</label>
            <input type="color" value="#FFFFFF" />
          </div>
          <div>
            <label>Size</label>
            <select>
              <option value="128">Small (128x128)</option>
              <option value="256" selected>Medium (256x256)</option>
              <option value="512">Large (512x512)</option>
            </select>
          </div>
        </OptionsGrid>
      </FormGroup>
      
      <Button>Generate QR Code</Button>
      
      <ResultSection>
        <h4>Your QR Code</h4>
        <p>QR code will appear here after generation.</p>
        <ButtonGroup>
          <Button variant="secondary">Download PNG</Button>
          <Button variant="secondary">Download SVG</Button>
        </ButtonGroup>
      </ResultSection>
    </ToolContent>
  );
};

const PasswordGeneratorTool = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  
  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (!charset) {
      setPassword('Please select at least one character type');
      return;
    }
    
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    
    setPassword(generatedPassword);
  };
  
  return (
    <ToolContent>
      <h3>Password Generator</h3>
      <p>Generate strong, secure passwords with customizable options.</p>
      
      <FormGroup>
        <label>Password Length: {length}</label>
        <input
          type="range"
          min="4"
          max="64"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </FormGroup>
      
      <OptionsGrid>
        <CheckboxOption>
          <input
            type="checkbox"
            id="uppercase"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <label htmlFor="uppercase">Include Uppercase (A-Z)</label>
        </CheckboxOption>
        <CheckboxOption>
          <input
            type="checkbox"
            id="lowercase"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <label htmlFor="lowercase">Include Lowercase (a-z)</label>
        </CheckboxOption>
        <CheckboxOption>
          <input
            type="checkbox"
            id="numbers"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <label htmlFor="numbers">Include Numbers (0-9)</label>
        </CheckboxOption>
        <CheckboxOption>
          <input
            type="checkbox"
            id="symbols"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <label htmlFor="symbols">Include Symbols (!@#$%^&*)</label>
        </CheckboxOption>
      </OptionsGrid>
      
      <Button onClick={generatePassword}>Generate Password</Button>
      
      {password && (
        <ResultSection>
          <h4>Your Password</h4>
          <PasswordDisplay>{password}</PasswordDisplay>
          <Button variant="secondary" onClick={() => navigator.clipboard.writeText(password)}>
            Copy to Clipboard
          </Button>
        </ResultSection>
      )}
    </ToolContent>
  );
};

const UnitConverterTool = () => {
  const [category, setCategory] = useState('length');
  
  return (
    <ToolContent>
      <h3>Unit Converter</h3>
      <p>Convert between different units of measurement.</p>
      
      <FormGroup>
        <label>Conversion Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="length">Length</option>
          <option value<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>