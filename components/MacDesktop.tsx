import React, { useState } from 'react';
import { AppState } from '../types';

interface MacDesktopProps {
  onOpenVSCode: () => void;
  onOpenSetup?: () => void;
  filesReady: boolean;
  appState: AppState;
}

const MacDesktop: React.FC<MacDesktopProps> = ({ onOpenVSCode, onOpenSetup, filesReady, appState }) => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon);
    if (icon === 'vscode') {
      onOpenVSCode();
    } else if (icon === 'folder') {
       if (onOpenSetup) onOpenSetup();
    }
  };

  return (
    <div 
      className="absolute inset-0 bg-cover bg-center overflow-hidden"
      style={{ 
        backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop")', // Abstract Mac-like wallpaper
      }}
    >
      {/* Menu Bar */}
      <div className="h-8 bg-white/20 backdrop-blur-md flex items-center px-4 justify-between text-white text-sm shadow-sm z-50 relative">
        <div className="flex items-center space-x-4">
          <span className="font-bold"></span>
          <span className="font-semibold">Finder</span>
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Go</span>
          <span>Window</span>
          <span>Help</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="absolute top-12 right-8 flex flex-col items-end space-y-6">
        <div 
          className="group flex flex-col items-center cursor-pointer w-24"
          onClick={() => handleIconClick('folder')}
          onDoubleClick={() => handleIconClick('folder')}
        >
          <div className={`w-16 h-16 bg-blue-400 rounded-lg shadow-lg flex items-center justify-center mb-1 transition-opacity duration-500 ${!filesReady ? 'opacity-50' : 'opacity-100'}`}>
             <svg className="w-10 h-10 text-blue-100" fill="currentColor" viewBox="0 0 20 20">
               <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
             </svg>
          </div>
          <span className={`text-white text-xs font-medium drop-shadow-md px-2 py-1 rounded ${activeIcon === 'folder' ? 'bg-blue-600' : 'bg-transparent'}`}>
            Resources
          </span>
          {!filesReady && <span className="text-gray-300 text-[10px] mt-1">Loading...</span>}
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl flex items-end space-x-4 hover:scale-105 transition-transform duration-300 z-40">
        
        {/* Finder */}
        <div className="w-12 h-12 bg-transparent rounded-xl shadow-sm flex items-center justify-center cursor-pointer hover:-translate-y-2 transition-transform duration-200">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png" alt="Finder" className="w-full h-full object-contain drop-shadow-md" />
        </div>

        {/* VS Code */}
        <div 
          className={`w-12 h-12 bg-transparent rounded-xl shadow-sm flex items-center justify-center cursor-pointer hover:-translate-y-2 transition-transform duration-200 relative ${!filesReady ? 'opacity-50 grayscale cursor-not-allowed' : ''} ${appState === AppState.OPENING_VSCODE ? 'animate-bounce' : ''}`}
          onClick={() => filesReady && handleIconClick('vscode')}
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" alt="VS Code" className="w-full h-full object-contain drop-shadow-md" />
          {filesReady && <div className="absolute -bottom-2 w-1 h-1 bg-black rounded-full"></div>}
        </div>

        {/* Safari */}
        <div className="w-12 h-12 bg-transparent rounded-xl shadow-sm flex items-center justify-center cursor-pointer hover:-translate-y-2 transition-transform duration-200">
             <img src="https://upload.wikimedia.org/wikipedia/commons/5/52/Safari_browser_logo.svg" alt="Safari" className="w-full h-full object-contain drop-shadow-md" />
        </div>

        {/* Separator */}
        <div className="w-px h-10 bg-white/30 mx-2"></div>
        
        {/* Trash */}
         <div className="w-12 h-12 bg-gray-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:-translate-y-2 transition-transform duration-200 overflow-hidden">
             <img src="https://picsum.photos/id/40/100/100" alt="trash" className="opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default MacDesktop;