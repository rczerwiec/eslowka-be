import { Controller, Get } from '@nestjs/common';
import { WordService } from './app.service';
import { Word } from './wordType';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  getAllUserWords(): Word[] {
    return this.wordService.getAllWords();
  }
}
