import { Injectable } from '@nestjs/common';
import { user, Word } from '../wordType';

@Injectable()
export class WordService {
  getAllWords(): Word[] {
    return user.folders[0].words;
  }

  getSpecificFolderWords(folderId: number): Word[] {
    return user.folders[folderId].words;
  }

  addWord(word: Partial<Word>, folderId: string): Word | any {
    const newID =
      user.folders[folderId].words[user.folders[folderId].words.length - 1].id +
      1;

    const newWord: Word = {
      id: newID,
      word: word.word,
      translation: word.translation,
    };
    user.folders[folderId].words.push(newWord);
  }
}
