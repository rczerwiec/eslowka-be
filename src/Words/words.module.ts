import { Module } from '@nestjs/common';
import { WordController } from './words.controller';
import { WordService } from './words.service';

@Module({
  imports: [],
  controllers: [WordController],
  providers: [WordService],
})
export class WordsModule {}
