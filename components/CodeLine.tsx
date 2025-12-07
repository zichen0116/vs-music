import React from 'react';
import { LyricLine } from '../types';

const CodeLine: React.FC<{ line: LyricLine; active: boolean }> = ({ line, active }) => {
  const renderContent = () => {
    const { codeSnippet, type } = line;
    if (!codeSnippet) return null;

    // Rudimentary syntax highlighting based on pre-defined type or regex
    switch (type) {
      case 'comment':
        return <span className="text-[#6a9955] italic">{codeSnippet}</span>;
      case 'log':
        // console.log("text")
        return (
          <span>
            <span className="text-[#9cdcfe]">console</span>
            <span className="text-[#d4d4d4]">.</span>
            <span className="text-[#dcdcaa]">log</span>
            <span className="text-[#d4d4d4]">(</span>
            <span className="text-[#ce9178]">{codeSnippet.match(/"(.*?)"/)?.[0] || '""'}</span>
            <span className="text-[#d4d4d4]">);</span>
          </span>
        );
      case 'var':
        // const x = "text";
        return (
          <span>
            <span className="text-[#569cd6]">const</span>
            <span className="text-[#d4d4d4]"> </span>
            <span className="text-[#4fc1ff]">memory</span>
            <span className="text-[#d4d4d4]"> = </span>
            <span className="text-[#ce9178]">{codeSnippet.match(/"(.*?)"/)?.[0] || '""'}</span>
            <span className="text-[#d4d4d4]">;</span>
          </span>
        );
      case 'func':
         // Multi-line output handled by whitespace preservation in parent
         return (
            <span>
                <span className="text-[#569cd6]">function</span>
                <span className="text-[#dcdcaa]"> understand</span>
                <span className="text-[#d4d4d4]">() {'{'}</span>
                <br />
                <span className="text-[#c586c0] pl-4">yield </span>
                <span className="text-[#ce9178]">{codeSnippet.match(/"(.*?)"/)?.[0] || '""'}</span>
                <span className="text-[#d4d4d4]">;</span>
                <br />
                <span className="text-[#d4d4d4]">{'}'}</span>
            </span>
         );
      case 'class':
         return (
             <span>
                 <span className="text-[#569cd6]">class </span>
                 <span className="text-[#4ec9b0]">Emotion </span>
                 <span className="text-[#569cd6]">extends </span>
                 <span className="text-[#4ec9b0]">Heart </span>
                 <span className="text-[#d4d4d4]">{'{'}</span>
                 <br />
                 <span className="text-[#569cd6] pl-4">constructor</span>
                 <span className="text-[#d4d4d4]">() {'{'}</span>
                 <br />
                 <span className="text-[#569cd6] pl-8">super</span>
                 <span className="text-[#d4d4d4]">(</span>
                 <span className="text-[#ce9178]">{codeSnippet.match(/"(.*?)"/)?.[0] || '""'}</span>
                 <span className="text-[#d4d4d4]">);</span>
                 <br />
                 <span className="text-[#d4d4d4] pl-4">{'}'}</span>
                 <br />
                 <span className="text-[#d4d4d4]">{'}'}</span>
             </span>
         );
       case 'error':
         return (
             <span>
                 <span className="text-[#c586c0]">throw </span>
                 <span className="text-[#569cd6]">new </span>
                 <span className="text-[#4ec9b0]">Error</span>
                 <span className="text-[#d4d4d4]">(</span>
                 <span className="text-[#ce9178]">{codeSnippet.match(/"(.*?)"/)?.[0] || '""'}</span>
                 <span className="text-[#d4d4d4]">);</span>
             </span>
         );
      default:
        return <span className="text-[#d4d4d4]">{codeSnippet}</span>;
    }
  };

  return (
    <div className={`font-mono text-sm md:text-base leading-relaxed my-1 ${active ? 'bg-[#2c313a] border-l-2 border-blue-500 pl-2' : 'pl-[10px]'} transition-all duration-200`}>
      {renderContent()}
    </div>
  );
};

export default CodeLine;