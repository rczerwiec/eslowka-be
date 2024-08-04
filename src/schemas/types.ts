export interface IWord {
  id: number;
  folderId: number;
  word: string;
  translation: string;
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
  id: number;
  userName: string;
  folders: IFolder[];
}
