import React, { ChangeEvent } from 'react';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilesUploaded: (music: File, lyrics: File) => void;
  hasMusic: boolean;
  hasLyrics: boolean;
}

const SetupModal: React.FC<SetupModalProps> = ({ isOpen, onClose, onFilesUploaded, hasMusic, hasLyrics }) => {
  const [musicFile, setMusicFile] = React.useState<File | null>(null);
  const [lyricsFile, setLyricsFile] = React.useState<File | null>(null);

  if (!isOpen) return null;

  const handleMusicChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setMusicFile(e.target.files[0]);
  };

  const handleLyricsChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setLyricsFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (musicFile && lyricsFile) {
      onFilesUploaded(musicFile, lyricsFile);
      onClose();
    }
  };

  const isReady = (!!musicFile || hasMusic) && (!!lyricsFile || hasLyrics);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#ececec] w-[500px] rounded-lg shadow-2xl border border-gray-300 overflow-hidden text-gray-800 font-sans">
        {/* Window Header */}
        <div className="bg-[#e4e4e4] h-8 flex items-center px-3 border-b border-gray-300 space-x-2">
           <div className="flex space-x-2">
             <div onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 border border-red-600 cursor-pointer hover:bg-red-600"></div>
             <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600"></div>
             <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600"></div>
           </div>
           <div className="flex-1 text-center text-xs font-semibold text-gray-500">Project Setup - Finder</div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="flex items-center space-x-4">
             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">📂</div>
             <div>
               <h2 className="text-xl font-bold">Load Resources</h2>
               <p className="text-sm text-gray-500">Please provide the source files for the visualization.</p>
             </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Music File (.mp3)</label>
              <div className="flex items-center justify-between">
                <span className="text-sm truncate max-w-[200px]">{musicFile ? musicFile.name : (hasMusic ? 'Loaded' : 'No file selected')}</span>
                <input 
                  type="file" 
                  accept=".mp3,audio/*" 
                  onChange={handleMusicChange} 
                  className="text-xs text-transparent w-24 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Lyrics File (.lrc)</label>
              <div className="flex items-center justify-between">
                <span className="text-sm truncate max-w-[200px]">{lyricsFile ? lyricsFile.name : (hasLyrics ? 'Loaded' : 'No file selected')}</span>
                <input 
                  type="file" 
                  accept=".lrc,.txt" 
                  onChange={handleLyricsChange}
                   className="text-xs text-transparent w-24 file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <button 
              disabled={!musicFile || !lyricsFile}
              onClick={handleSave}
              className={`px-6 py-2 rounded-md font-medium text-sm transition-colors shadow-sm ${
                musicFile && lyricsFile 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Apply & Ready
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupModal;