// Define the Tool interface
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  url: string;
  isNew?: boolean;
}

// Define the updated tools array with new tools added
export const tools: Tool[] = [
  {
    id: 'text-to-speech',
    name: 'Text to Speech',
    description: 'Convert text to natural-sounding speech',
    icon: 'fas fa-volume-up',
    category: 'text',
    url: '/tools/text/text-to-speech',
  },
  {
    id: 'speech-to-text',
    name: 'Speech to Text',
    description: 'Convert speech to text with high accuracy',
    icon: 'fas fa-microphone',
    category: 'text',
    url: '/tools/text/speech-to-text',
  },
  {
    id: 'text-translator',
    name: 'Text Translator',
    description: 'Translate text between multiple languages',
    icon: 'fas fa-language',
    category: 'text',
    url: '/tools/text/text-translator',
  },
  {
    id: 'all-in-one-downloader',
    name: 'All-in-One Downloader',
    description: 'Download videos from YouTube, Facebook, Instagram, and more',
    icon: 'fas fa-download',
    category: 'video',
    url: '/tools/video/all-in-one-downloader',
  },
  {
    id: 'enhanced-video-editor',
    name: 'Enhanced Video Editor',
    description: 'Edit videos with professional tools - trim, add watermarks, apply filters',
    icon: 'fas fa-film',
    category: 'video',
    url: '/tools/video/enhanced-video-editor',
    isNew: true,
  },
  {
    id: 'video-compressor',
    name: 'Video Compressor',
    description: 'Compress videos while maintaining quality',
    icon: 'fas fa-compress',
    category: 'video',
    url: '/tools/video/video-compressor',
  },
  {
    id: 'image-converter',
    name: 'Image Converter',
    description: 'Convert images between different formats',
    icon: 'fas fa-exchange-alt',
    category: 'image',
    url: '/tools/image/image-converter',
  },
  {
    id: 'advanced-image-compressor',
    name: 'Advanced Image Compressor',
    description: 'Compress images while maintaining quality',
    icon: 'fas fa-compress-arrows-alt',
    category: 'image',
    url: '/tools/image/advanced-image-compressor',
    isNew: true,
  },
  {
    id: 'image-editor',
    name: 'Image Editor',
    description: 'Edit images with filters, effects, and more',
    icon: 'fas fa-edit',
    category: 'image',
    url: '/tools/image/image-editor',
  },
  {
    id: 'pdf-converter',
    name: 'PDF Converter',
    description: 'Convert files to and from PDF format',
    icon: 'fas fa-file-pdf',
    category: 'document',
    url: '/tools/document/pdf-converter',
  },
  {
    id: 'pdf-compressor',
    name: 'PDF Compressor',
    description: 'Reduce PDF file size while maintaining quality',
    icon: 'fas fa-compress',
    category: 'document',
    url: '/tools/document/pdf-compressor',
  },
  {
    id: 'pdf-merger',
    name: 'PDF Merger',
    description: 'Combine multiple PDF files into one',
    icon: 'fas fa-object-group',
    category: 'document',
    url: '/tools/document/pdf-merger',
  },
  {
    id: 'baby-name-generator',
    name: 'Baby Name Generator',
    description: 'Generate unique baby names by combining letters from parents\' names',
    icon: 'fas fa-baby',
    category: 'utility',
    url: '/tools/baby-name-generator',
    isNew: true,
  },
  {
    id: 'ai-tools',
    name: 'AI Tools',
    description: 'Access powerful AI tools powered by Google Gemini',
    icon: 'fas fa-robot',
    category: 'utility',
    url: '/ai-tools',
    isNew: true,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate strong and secure passwords',
    icon: 'fas fa-key',
    category: 'utility',
    url: '/tools/utility/password-generator',
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    description: 'Create QR codes for websites, text, and more',
    icon: 'fas fa-qrcode',
    category: 'utility',
    url: '/tools/utility/qr-code-generator',
  },
];

// Define tool categories
export const categories = [
  {
    id: 'text',
    name: 'Text Tools',
    icon: 'fas fa-font',
  },
  {
    id: 'video',
    name: 'Video Tools',
    icon: 'fas fa-video',
  },
  {
    id: 'image',
    name: 'Image Tools',
    icon: 'fas fa-image',
  },
  {
    id: 'document',
    name: 'Document Tools',
    icon: 'fas fa-file-alt',
  },
  {
    id: 'utility',
    name: 'Utility Tools',
    icon: 'fas fa-tools',
  },
];

// Helper function to get tools by category
export const getToolsByCategory = (categoryId: string): Tool[] => {
  return tools.filter(tool => tool.category === categoryId);
};

// Helper function to get a tool by ID
export const getToolById = (toolId: string): Tool | undefined => {
  return tools.find(tool => tool.id === toolId);
};

// Helper function to get new tools
export const getNewTools = (): Tool[] => {
  return tools.filter(tool => tool.isNew);
};

// Helper function to get popular tools (for demo purposes, just return a subset)
export const getPopularTools = (): Tool[] => {
  return [
    getToolById('text-to-speech')!,
    getToolById('all-in-one-downloader')!,
    getToolById('advanced-image-compressor')!,
    getToolById('pdf-converter')!,
    getToolById('baby-name-generator')!,
    getToolById('ai-tools')!,
  ];
};
