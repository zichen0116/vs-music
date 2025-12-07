export interface LyricLine {
  time: number;
  text: string;
  codeSnippet?: string;
  type: 'comment' | 'log' | 'var' | 'func' | 'class' | 'error';
}

export interface FileData {
  musicUrl: string | null;
  lyricsText: string | null;
  musicName: string;
}

export enum AppState {
  DESKTOP = 'DESKTOP',
  OPENING_VSCODE = 'OPENING_VSCODE',
  CODING = 'CODING',
}