export interface IWord {
  id: number;
  folderId: number;
  word: string;
  translation: string;
  note: string;
  repeated: number;
  known: number;
  streak: number;
  reverseStreak: number;
}

export interface IFolder {
  id: number;
  folderName: string;
  words: IWord[];
  currentProgress: number;
  maxProgress: number;
}

export interface IUser {
  uid: string;
  id: string;
  userName: string;
  email: string;
  folders: IFolder[];
  settings: ISettings;
  experience: number;
  level: number;
  streak: number;
  joined: Date;
  lastLogin: Date;
  practiceDate: Date;
}

export interface ISettings {
  language: string;
  darkmode: boolean;
  wordsPerTraining: number;
}

export interface IDates {
  practiceDate: Date;
  onLogin: boolean;
  currentStreak: number;
}

export interface IStory {
  id: number;
  language: r ;
  level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1';
  title: string;
  words: { word: string; known: boolean }[];
  wordAmount: number;
  wordKnownAmount: number;
}
