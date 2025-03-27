import React from 'react';
import styled from 'styled-components';
import Layout from '@/components/layout/Layout'; // Corrected path
import SEO from '@/components/SEO';
import TextToSpeech from '@/components/tools/text/TextToSpeech';
import AdBanner from '@/components/AdBanner';

const TextToSpeechPage = () => {
  return (
    <Layout>
      <SEO 
        title="Text to Speech Converter | ToolsFree Online"
        description="Convert your text to natural-sounding speech in multiple languages and voices with our free online Text to Speech tool."
        keywords="text to speech, tts, voice generator, speech synthesis, text to audio, free text to speech"
        canonical="/tools/text/text-to-speech"
      />
      
      <AdBanner position="top" size="large" />
      
      <TextToSpeech />
      
      <AdBanner position="bottom" size="large" />
    </Layout>
  );
};

export default TextToSpeechPage;
