export interface Word {
  id: number;
  word: string;
  translation: string;
}

export interface Folder {
  id: number;
  folderName: string;
  words: Word[];
}

export interface User {
  id: number;
  userName: string;
  folders: Folder[];
}

export const user: User = {
  id: 0,
  userName: 'Tomasz',
  folders: [
    {
      id: 0,
      folderName: 'Jedzenie',
      words: [
        {
          id: 0,
          word: 'Egg',
          translation: 'Jajko',
        },
        {
          id: 1,
          word: 'Bread',
          translation: 'Chleb',
        },
        {
          id: 1,
          word: 'xd',
          translation: 'xddd',
        },
        {
          id: 1,
          word: 'sadasdas',
          translation: 'xddd',
        },
      ],
    },
    {
      id: 1,
      folderName: 'Zwierzęta',
      words: [
        {
          id: 0,
          word: 'Koń',
          translation: 'Horse',
        },
        {
          id: 1,
          word: 'Dog',
          translation: 'Pies',
        },
      ],
    },
    {
      id: 2,
      folderName: 'Owoce',
      words: [
        {
          id: 0,
          word: 'Apple',
          translation: 'Jabłko',
        },
      ],
    },
  ],
};
