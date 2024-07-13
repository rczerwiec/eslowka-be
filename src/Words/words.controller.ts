import { Controller, Get, Param } from '@nestjs/common';
import { WordService } from './words.service';
import { Word } from '../wordType';

@Controller('words')
export class WordController {
  constructor(private readonly wordService: WordService) {}

  @Get()
  getAllUserWords(): Word[] {
    return this.wordService.getAllWords();
  }
  @Get('getById/:folderId')
  getSpecificFolderWords(@Param('folderId') folderId: number): Word[] {
    const FolderID = +folderId;

    return this.wordService.getSpecificFolderWords(FolderID);
  }
}
