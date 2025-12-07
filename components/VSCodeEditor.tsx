import React, { useEffect, useRef, useState } from 'react';
import { LyricLine } from '../types';
import CodeLine from './CodeLine';

interface VSCodeEditorProps {
  lyrics: LyricLine[];
  currentTime: number;
  duration: number;
  fileName: string;
}

const VSCodeEditor: React.FC<VSCodeEditorProps> = ({ lyrics, currentTime, duration, fileName }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [displayedLyrics, setDisplayedLyrics] = useState<LyricLine[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  // Sync lyrics with time
  useEffect(() => {
    // Find last lyric that has appeared
    const currentLyricIndex = lyrics.findIndex(l => l.time > currentTime) - 1;
    const actualIndex = currentLyricIndex === -2 ? lyrics.length - 1 : currentLyricIndex; // -2 means not found (passed all), so last index

    if (actualIndex >= 0) {
      setActiveIndex(actualIndex);
      // Show all lyrics up to current index + maybe 1 future for smooth look, 
      // but "World Execute Me" usually types them out.
      // Let's just show up to current index.
      setDisplayedLyrics(lyrics.slice(0, actualIndex + 1));
    } else {
        setDisplayedLyrics([]);
        setActiveIndex(-1);
    }
  }, [currentTime, lyrics]);

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLyrics.length]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-[#d4d4d4] overflow-hidden animate-fade-in">
      {/* Title Bar */}
      <div className="h-8 bg-[#3c3c3c] flex items-center justify-center relative select-none">
        <span className="text-sm text-gray-300">Beginning To Understand - Visual Studio Code</span>
        <div className="absolute left-2 flex space-x-2">
           <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
           <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
           <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 space-y-6">
           <div className="w-6 h-6 border-l-2 border-white cursor-pointer opacity-100"></div> {/* Explorer Icon Faked */}
           <div className="w-6 h-6 border-2 border-dashed border-gray-500 rounded opacity-50"></div>
           <div className="w-6 h-6 border rounded-full border-gray-500 opacity-50"></div>
        </div>

        {/* Sidebar */}
        <div className="w-60 bg-[#252526] flex flex-col text-sm border-r border-black/20 hidden md:flex">
          <div className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-gray-500">Explorer</div>
          <div className="mt-2">
            <div className="px-2 py-1 flex items-center text-gray-300 font-bold cursor-pointer hover:bg-[#2a2d2e]">
               <span className="mr-2">▼</span> PROJECT
            </div>
            <div className="pl-6 py-1 flex items-center text-[#519aba] bg-[#37373d] cursor-pointer">
              <span className="mr-2 text-yellow-400">TS</span> {fileName || 'app.ts'}
            </div>
             <div className="pl-6 py-1 flex items-center text-gray-400 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="mr-2 text-yellow-400">TS</span> utils.ts
            </div>
            <div className="pl-6 py-1 flex items-center text-gray-400 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="mr-2 text-purple-400">JSON</span> package.json
            </div>
             <div className="pl-6 py-1 flex items-center text-gray-400 hover:bg-[#2a2d2e] cursor-pointer">
              <span className="mr-2 text-gray-400">#</span> README.md
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="h-9 bg-[#2d2d2d] flex items-center overflow-x-auto">
            <div className="h-full bg-[#1e1e1e] flex items-center px-4 border-t-2 border-blue-500 text-white min-w-fit cursor-pointer">
              <span className="mr-2 text-yellow-400 text-xs">TS</span> 
              <span className="text-sm">{fileName || 'app.ts'}</span>
              <span className="ml-2 hover:bg-gray-600 rounded-full p-0.5">×</span>
            </div>
             <div className="h-full bg-[#2d2d2d] flex items-center px-4 text-gray-400 min-w-fit cursor-pointer hover:bg-[#252526]">
               <span className="mr-2 text-xs">TS</span>
              <span className="text-sm">utils.ts</span>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="h-6 bg-[#1e1e1e] flex items-center px-4 text-xs text-gray-500 border-b border-white/5">
            src &gt; components &gt; {fileName || 'app.ts'}
          </div>

          {/* Code Content */}
          <div className="flex-1 relative overflow-hidden flex">
            {/* Line Numbers */}
            <div className="w-12 bg-[#1e1e1e] text-[#858585] text-right pr-4 pt-2 select-none text-sm md:text-base font-mono">
               {displayedLyrics.map((_, i) => (
                 <div key={i} className="leading-relaxed my-1">{i + 1}</div>
               ))}
               <div className="leading-relaxed my-1">{displayedLyrics.length + 1}</div>
            </div>

            {/* Code */}
            <div 
              ref={scrollRef}
              className="flex-1 p-2 pt-2 vscode-scroll overflow-y-auto scroll-smooth pb-20"
            >
              {displayedLyrics.map((line, index) => (
                <CodeLine key={index} line={line} active={index === activeIndex} />
              ))}
              <div className="animate-pulse w-2 h-5 bg-white inline-block ml-2 align-middle mt-1"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#007acc] text-white flex items-center px-3 text-xs justify-between">
        <div className="flex space-x-4">
           <span>main*</span>
           <span>0 errors, 0 warnings</span>
        </div>
        <div className="flex space-x-4">
           <span>Ln {displayedLyrics.length + 1}, Col 1</span>
           <span>UTF-8</span>
           <span>TypeScript React</span>
           <span>Prettier</span>
        </div>
      </div>
    </div>
  );
};

export default VSCodeEditor;