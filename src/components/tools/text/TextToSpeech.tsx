import React from 'react';
import styled from 'styled-components';

const TextToSpeech = () => {
  const [text, setText] = React.useState('');
  const [voice, setVoice] = React.useState('en-US-Standard-A');
  const [rate, setRate] = React.useState(1);
  const [pitch, setPitch] = React.useState(1);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [audioUrl, setAudioUrl] = React.useState('');
  
  // Available voices
  const voices = [
    { id: 'en-US-Standard-A', name: 'English (US) - Female' },
    { id: 'en-US-Standard-B', name: 'English (US) - Male' },
    { id: 'en-GB-Standard-A', name: 'English (UK) - Female' },
    { id: 'en-GB-Standard-B', name: 'English (UK) - Male' },
    { id: 'es-ES-Standard-A', name: 'Spanish - Female' },
    { id: 'fr-FR-Standard-A', name: 'French - Female' },
    { id: 'de-DE-Standard-A', name: 'German - Female' },
    { id: 'it-IT-Standard-A', name: 'Italian - Female' },
    { id: 'ja-JP-Standard-A', name: 'Japanese - Female' },
  ];
  
  // Handle text-to-speech conversion
  const handleConvert = () => {
    if (!text.trim()) {
      alert('Please enter some text to convert');
      return;
    }
    
    // In a real implementation, this would call a TTS API
    // For this demo, we're using the browser's built-in speech synthesis
    setIsPlaying(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;
    
    // Find a voice that matches the selected voice ID as closely as possible
    const availableVoices = window.speechSynthesis.getVoices();
    const voiceMatch = availableVoices.find(v => 
      v.lang === voice.substring(0, 5) && 
      (voice.includes('Female') ? v.name.includes('Female') : true)
    );
    
    if (voiceMatch) {
      utterance.voice = voiceMatch;
    }
    
    utterance.onend = () => {
      setIsPlaying(false);
    };
    
    window.speechSynthesis.speak(utterance);
  };
  
  // Handle stop playing
  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };
  
  // Handle download (in a real implementation, this would download the audio file)
  const handleDownload = () => {
    // This is a placeholder. In a real implementation, you would:
    // 1. Call a TTS API that returns an audio file
    // 2. Create a download link for the audio file
    alert('In a real implementation, this would download the audio file.');
  };
  
  return (
    <Container>
      <ToolHeader>
        <h1>Text to Speech Converter</h1>
        <p>Convert your text to natural-sounding speech in multiple languages and voices</p>
      </ToolHeader>
      
      <ToolSection>
        <TextArea 
          placeholder="Enter your text here... (up to 5000 characters)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={5000}
        />
        
        <CharacterCount>
          {text.length} / 5000 characters
        </CharacterCount>
        
        <OptionsGrid>
          <OptionGroup>
            <label htmlFor="voice-select">Voice:</label>
            <select 
              id="voice-select"
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
            >
              {voices.map(voice => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </OptionGroup>
          
          <OptionGroup>
            <label htmlFor="rate-slider">Speed:</label>
            <RangeContainer>
              <input 
                id="rate-slider"
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
              />
              <RangeValue>{rate}x</RangeValue>
            </RangeContainer>
          </OptionGroup>
          
          <OptionGroup>
            <label htmlFor="pitch-slider">Pitch:</label>
            <RangeContainer>
              <input 
                id="pitch-slider"
                type="range" 
                min="0.5" 
                max="2" 
                step="0.1" 
                value={pitch}
                onChange={(e) => setPitch(parseFloat(e.target.value))}
              />
              <RangeValue>{pitch}</RangeValue>
            </RangeContainer>
          </OptionGroup>
        </OptionsGrid>
        
        <ButtonGroup>
          {!isPlaying ? (
            <ActionButton primary onClick={handleConvert}>
              <i className="fas fa-play"></i> Convert & Play
            </ActionButton>
          ) : (
            <ActionButton danger onClick={handleStop}>
              <i className="fas fa-stop"></i> Stop
            </ActionButton>
          )}
          
          <ActionButton onClick={handleDownload} disabled={!text.trim()}>
            <i className="fas fa-download"></i> Download MP3
          </ActionButton>
        </ButtonGroup>
      </ToolSection>
      
      <ToolSection>
        <h2>How to Use</h2>
        <ol>
          <li>Enter or paste your text in the text area above</li>
          <li>Select your preferred voice, speed, and pitch</li>
          <li>Click "Convert & Play" to hear the speech</li>
          <li>Click "Download MP3" to save the audio file</li>
        </ol>
        
        <h2>Features</h2>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon className="fas fa-globe" />
            <FeatureTitle>Multiple Languages</FeatureTitle>
            <FeatureDescription>
              Support for English, Spanish, French, German, Italian, Japanese, and more
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-user" />
            <FeatureTitle>Natural Voices</FeatureTitle>
            <FeatureDescription>
              High-quality, natural-sounding voices for realistic speech
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-sliders-h" />
            <FeatureTitle>Customizable</FeatureTitle>
            <FeatureDescription>
              Adjust speed and pitch to get the perfect sound
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon className="fas fa-download" />
            <FeatureTitle>Downloadable</FeatureTitle>
            <FeatureDescription>
              Save the generated speech as an MP3 file
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </ToolSection>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ToolHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
  }
`;

const ToolSection = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--text-color);
  }
  
  ol {
    padding-left: 1.5rem;
    margin-bottom: 2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
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
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
  }
`;

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  
  input[type="range"] {
    flex: 1;
    margin-right: 1rem;
  }
`;

const RangeValue = styled.span`
  min-width: 40px;
  text-align: center;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button<{ primary?: boolean; danger?: boolean }>`
  background-color: ${props => 
    props.primary ? 'var(--primary-color)' : 
    props.danger ? '#dc3545' : 
    '#f0f0f0'};
  color: ${props => 
    props.primary || props.danger ? 'white' : 
    'var(--text-color)'};
  border: none;
  border-radius: var(--border-radius);
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  
  i {
    margin-right: 0.5rem;
  }
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FeatureCard = styled.div`
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

const FeatureIcon = styled.i`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

export default TextToSpeech;
