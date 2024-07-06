import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Word } from './wordType';

@Controller('words')
export class WordController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllWords(): Word[] {
    return [];
  }
}
