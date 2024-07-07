import { Injectable } from '@nestjs/common';
import { user, Word } from './wordType';

@Injectable()
export class WordService {
  getAllWords(): Word[] {
    return user.folders[0].words;
  }
}
