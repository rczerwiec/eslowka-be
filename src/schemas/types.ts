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
}

export interface ISettings {
  language: string;
  darkmode: boolean;
  wordsPerTraining: number;
}
