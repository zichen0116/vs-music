import React, { useState, useRef, useEffect } from 'react';
import MacDesktop from './components/MacDesktop';
import VSCodeEditor from './components/VSCodeEditor';
import { parseLrc } from './utils/lrcParser';
import { AppState, FileData, LyricLine } from './types';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.DESKTOP);
  const [fileData, setFileData] = useState<FileData>({
    musicUrl: null,
    lyricsText: null,
    musicName: 'Beginning_To_Understand.ts'
  });
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initial volume
    if(audioRef.current) {
        audioRef.current.volume = 0.5;
    }

    // Auto-load resources from studio folder
    const loadResources = async () => {
      try {
        // Fetch lyrics
        const lyricsRes = await fetch('studio/lyrics.lrc');
        if (!lyricsRes.ok) throw new Error("Failed to load lyrics");
        const lyricsText = await lyricsRes.text();
        
        // Use relative path for music in studio folder
        const musicUrl = 'studio/music.mp3';
        
        setFileData({
          musicUrl,
          lyricsText,
          musicName: 'Beginning_To_Understand.ts'
        });

        const parsed = parseLrc(lyricsText);
        setLyrics(parsed);
      } catch (error) {
        console.error("Error loading resources:", error);
      }
    };

    loadResources();
  }, []);

  const startExperience = () => {
    if (!fileData.musicUrl || !fileData.lyricsText) {
        // If files haven't loaded yet, do nothing
        return;
    }

    setAppState(AppState.OPENING_VSCODE);
    
    // Simulate loading delay for effect
    setTimeout(() => {
      setAppState(AppState.CODING);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
    }, 2000);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden relative">
      {/* Global Audio Element */}
      {fileData.musicUrl && (
        <audio 
          ref={audioRef}
          src={fileData.musicUrl}
          onTimeUpdate={handleTimeUpdate}
        />
      )}

      {/* Layers */}
      
      {/* Desktop Layer */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${appState === AppState.CODING ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <MacDesktop 
          onOpenVSCode={startExperience}
          filesReady={!!fileData.musicUrl && !!fileData.lyricsText}
          appState={appState}
        />
      </div>

      {/* Opening Animation Layer */}
      {appState === AppState.OPENING_VSCODE && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-transparent">
        </div>
      )}

      {/* VS Code Layer */}
      {appState === AppState.CODING && (
        <div className="absolute inset-0 z-30 animate-slide-up">
           <VSCodeEditor 
             lyrics={lyrics}
             currentTime={currentTime}
             duration={duration}
             fileName={fileData.musicName}
           />
        </div>
      )}
    </div>
  );
};

export default App;