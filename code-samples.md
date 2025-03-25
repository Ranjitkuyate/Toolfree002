# Enhanced Respiratory Tool Website - Code Samples

This document provides key code samples for the main features implemented in the enhanced respiratory tool website.

## Table of Contents
1. [Baby Name Generator](#baby-name-generator)
2. [Google Gemini AI Integration](#google-gemini-ai-integration)
3. [Advanced Image Compressor](#advanced-image-compressor)
4. [Enhanced Video Editor](#enhanced-video-editor)
5. [SEO Optimization](#seo-optimization)

## Baby Name Generator

### Core Name Generation Logic
```typescript
// Generate baby names by combining letters from parents' names
const generateNames = () => {
  if (!fatherName || !motherName) {
    setError('Please enter both parents\' names');
    return;
  }
  
  setIsGenerating(true);
  setError('');
  
  // Get letters from both parent names
  const fatherLetters = fatherName.toLowerCase().replace(/[^a-z]/g, '').split('');
  const motherLetters = motherName.toLowerCase().replace(/[^a-z]/g, '').split('');
  
  // Get unique letters from both names
  const allLetters = [...new Set([...fatherLetters, ...motherLetters])];
  
  // Generate names using the combined letters
  const names: BabyName[] = [];
  
  // Create combinations of letters to form names
  for (let length = 3; length <= 8; length++) {
    for (let i = 0; i < 10; i++) {
      let name = '';
      for (let j = 0; j < length; j++) {
        const randomIndex = Math.floor(Math.random() * allLetters.length);
        name += allLetters[randomIndex];
      }
      
      // Capitalize first letter
      name = name.charAt(0).toUpperCase() + name.slice(1);
      
      // Assign gender and origin (simplified for demo)
      const gender = Math.random() > 0.5 ? 'boy' : 'girl';
      const origins = ['English', 'French', 'Spanish', 'Italian', 'German', 'Greek', 'Hebrew', 'Arabic', 'Indian', 'Japanese', 'Chinese'];
      const origin = origins[Math.floor(Math.random() * origins.length)];
      
      // Add to names array if not already present
      if (!names.some(n => n.name === name)) {
        names.push({
          name,
          gender,
          origin,
          length: name.length <= 4 ? 'short' : name.length <= 6 ? 'medium' : 'long'
        });
      }
    }
  }
  
  setGeneratedNames(names);
  setIsGenerating(false);
};
```

### Filtering Names
```typescript
// Filter names based on selected criteria
const filteredNames = useMemo(() => {
  return generatedNames.filter(name => {
    // Filter by gender
    if (genderFilter !== 'any' && name.gender !== genderFilter) {
      return false;
    }
    
    // Filter by length
    if (lengthFilter !== 'any' && name.length !== lengthFilter) {
      return false;
    }
    
    return true;
  });
}, [generatedNames, genderFilter, lengthFilter]);
```

## Google Gemini AI Integration

### API Integration
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with your API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get a generative model
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// Generate content
const generateContent = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
```

### Component Implementation
```typescript
const AIIntegration = () => {
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-pro');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitPrompt = async () => {
    if (!apiKey) {
      setError('Please enter your API key');
      return;
    }

    if (!prompt) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const genModel = genAI.getGenerativeModel({ model });

      const result = await genModel.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err) {
      setError(`Error generating content: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Container>
      <ToolHeader>
        <h1>AI Tools powered by Google Gemini</h1>
        <p>Access powerful AI capabilities to generate text, solve problems, and get creative assistance</p>
      </ToolHeader>
      
      {/* Component UI implementation */}
    </Container>
  );
};
```

## Advanced Image Compressor

### Compression Logic
```typescript
import Compressor from 'compressorjs';

// Compress a single image
const compressImage = (file: File): Promise<{original: File, compressed: Blob, url: string}> => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality / 100,
      maxWidth,
      maxHeight,
      mimeType: 'auto',
      convertSize: 5000000, // Convert to JPEG if larger than 5MB
      checkOrientation: true,
      success(result) {
        const url = URL.createObjectURL(result);
        resolve({
          original: file,
          compressed: result,
          url
        });
      },
      error(err) {
        reject(err);
      }
    });
  });
};

// Compress all selected images
const compressAllImages = async () => {
  if (selectedFiles.length === 0) {
    alert('Please select at least one image to compress');
    return;
  }

  setIsCompressing(true);
  setCompressProgress(0);
  setCompressedFiles([]);

  try {
    const results = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const result = await compressImage(selectedFiles[i]);
      results.push(result);
      setCompressProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
    }
    setCompressedFiles(results);
  } catch (error) {
    console.error('Error compressing images:', error);
    alert('An error occurred while compressing images');
  } finally {
    setIsCompressing(false);
    setCompressProgress(100);
  }
};
```

### Drag and Drop Implementation
```typescript
// Handle drag and drop
const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
}, []);

const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (e.dataTransfer.files) {
    const filesArray = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    setSelectedFiles(prev => [...prev, ...filesArray]);
  }
}, []);

// In JSX
<DropZone 
  onDragOver={handleDragOver}
  onDrop={handleDrop}
  onClick={() => document.getElementById('file-input')?.click()}
>
  <DropZoneIcon className="fas fa-cloud-upload-alt" />
  <DropZoneText>
    <strong>Drag & drop images here</strong>
    <span>or click to browse files</span>
  </DropZoneText>
  <input
    id="file-input"
    type="file"
    accept="image/*"
    multiple
    onChange={handleFileSelect}
    style={{ display: 'none' }}
  />
</DropZone>
```

## Enhanced Video Editor

### Video Processing Logic
```typescript
// Process video with selected options
const processVideo = () => {
  if (!selectedFile || !videoRef.current) {
    alert('Please select a video file first');
    return;
  }
  
  setIsProcessing(true);
  
  // In a real implementation, this would use a video processing library
  // For this demo, we'll simulate processing with a timeout
  setTimeout(() => {
    // Create a canvas element to process the video
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      alert('Could not create canvas context');
      setIsProcessing(false);
      return;
    }
    
    // Set canvas dimensions to match video
    canvas.width = videoRef.current!.videoWidth;
    canvas.height = videoRef.current!.videoHeight;
    
    // Draw the current frame to the canvas
    ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);
    
    // Apply filters
    if (brightness !== 100 || contrast !== 100 || saturation !== 100) {
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
    }
    
    // Add watermark if specified
    if (watermarkText) {
      ctx.font = 'bold 24px Arial';
      ctx.fillStyle = watermarkColor;
      ctx.globalAlpha = 0.7;
      
      const textWidth = ctx.measureText(watermarkText).width;
      const padding = 20;
      
      let x = 0;
      let y = 0;
      
      switch (watermarkPosition) {
        case 'top-left':
          x = padding;
          y = padding + 24;
          break;
        case 'top-right':
          x = canvas.width - textWidth - padding;
          y = padding + 24;
          break;
        case 'bottom-left':
          x = padding;
          y = canvas.height - padding;
          break;
        case 'bottom-right':
          x = canvas.width - textWidth - padding;
          y = canvas.height - padding;
          break;
      }
      
      ctx.fillText(watermarkText, x, y);
      ctx.globalAlpha = 1.0;
    }
    
    // Convert canvas to data URL
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    // In a real implementation, we would process the entire video
    // For this demo, we'll just show a still frame with the applied effects
    setProcessedVideoSrc(dataUrl);
    setIsProcessing(false);
  }, 2000);
};
```

### Timeline Implementation
```typescript
// Timeline component for video trimming
<TimelineContainer>
  <Timeline>
    <TimelineProgress style={{ width: `${(startTime / videoDuration) * 100}%` }} />
    <TimelineProgress 
      style={{ 
        left: `${(startTime / videoDuration) * 100}%`,
        width: `${((endTime - startTime) / videoDuration) * 100}%` 
      }} 
      selected 
    />
  </Timeline>
  <TimeMarkers>
    <TimeMarker>00:00</TimeMarker>
    <TimeMarker>{formatTime(videoDuration / 2)}</TimeMarker>
    <TimeMarker>{formatTime(videoDuration)}</TimeMarker>
  </TimeMarkers>
</TimelineContainer>

<TimeControls>
  <TimeControl>
    <label>Start Time:</label>
    <TimeInput
      type="range"
      min="0"
      max={videoDuration}
      step="0.1"
      value={startTime}
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        if (value < endTime) {
          setStartTime(value);
        }
      }}
    />
    <TimeValue onClick={() => seekVideo(startTime)}>
      {formatTime(startTime)}
    </TimeValue>
  </TimeControl>
  
  <TimeControl>
    <label>End Time:</label>
    <TimeInput
      type="range"
      min="0"
      max={videoDuration}
      step="0.1"
      value={endTime}
      onChange={(e) => {
        const value = parseFloat(e.target.value);
        if (value > startTime) {
          setEndTime(value);
        }
      }}
    />
    <TimeValue onClick={() => seekVideo(endTime)}>
      {formatTime(endTime)}
    </TimeValue>
  </TimeControl>
</TimeControls>
```

## SEO Optimization

### SEO Component
```typescript
import React from 'react';
import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogImage?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/images/og-image.jpg',
}) => {
  const siteUrl = 'https://toolsfree.online';
  const canonicalUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Structured data for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'ToolsFree Online',
            url: siteUrl,
            description: 'Free online tools for everyone',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </Head>
  );
};

export default SEO;
```

### Usage in Pages
```typescript
// Example usage in a page
import SEO from '@/components/SEO';

const BabyNameGeneratorPage = () => {
  return (
    <>
      <SEO 
        title="Baby Name Generator | ToolsFree Online"
        description="Generate unique baby names by combining letters from parents' names. Find the perfect name for your baby with our free online tool."
        keywords="baby name generator, name combiner, unique baby names, parent name combination"
        canonical="/tools/baby-name-generator"
      />
      <BabyNameGenerator />
    </>
  );
};

export default BabyNameGeneratorPage;
```
