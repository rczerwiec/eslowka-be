export interface IWord {
  id: number;
  folderId: number;
  word: string;
  translation: string;
  repeated: number;
  known: number;
}

export interface IFolder {
  id: number;
  folderName: string;
  words: IWord[];
}

export interface IUser {
  id: number;
  userName: string;
  folders: IFolder[];
}
