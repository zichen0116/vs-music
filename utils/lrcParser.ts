import { LyricLine } from '../types';

// Templates for converting lyrics into code
const codeTemplates = [
  (text: string) => `console.log("${text}");`,
  (text: string) => `const memory = "${text}";`,
  (text: string) => `if (feeling) {\n  return "${text}";\n}`,
  (text: string) => `// ${text}`,
  (text: string) => `throw new Error("${text}");`,
  (text: string) => `function understand() {\n  yield "${text}";\n}`,
  (text: string) => `await new Promise(resolve => resolve("${text}"));`,
  (text: string) => `class Emotion extends Heart {\n  constructor() {\n    super("${text}");\n  }\n}`,
  (text: string) => `import { ${text.replace(/\s+/g, '')} } from 'past';`,
  (text: string) => `export const reality = "${text}";`
];

// Helper to determine code type for syntax highlighting
const getCodeType = (snippet: string): LyricLine['type'] => {
  if (snippet.startsWith('//')) return 'comment';
  if (snippet.includes('console.log')) return 'log';
  if (snippet.includes('throw')) return 'error';
  if (snippet.includes('class')) return 'class';
  if (snippet.includes('function')) return 'func';
  return 'var';
};

export const parseLrc = (lrcContent: string): LyricLine[] => {
  const lines = lrcContent.split('\n');
  const regex = /^\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
  
  const parsed: LyricLine[] = [];

  lines.forEach((line, index) => {
    const match = line.match(regex);
    if (match) {
      const minutes = parseInt(match[1], 10);
      const seconds = parseInt(match[2], 10);
      const milliseconds = parseInt(match[3], 10);
      const text = match[4].trim();
      
      const totalTime = minutes * 60 + seconds + milliseconds / (match[3].length === 3 ? 1000 : 100);
      
      if (text) {
        // Deterministic generation based on index
        const templateIndex = index % codeTemplates.length;
        const snippet = codeTemplates[templateIndex](text);
        
        parsed.push({
          time: totalTime,
          text,
          codeSnippet: snippet,
          type: getCodeType(snippet)
        });
      }
    }
  });

  return parsed.sort((a, b) => a.time - b.time);
};