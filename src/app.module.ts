import { Module } from '@nestjs/common';
import { FoldersModule } from './Folders/folders.module';
import { WordsModule } from './Words/words.module';

@Module({
  imports: [FoldersModule, WordsModule],
})
export class AppModule {}
