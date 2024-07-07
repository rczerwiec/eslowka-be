import { Module } from '@nestjs/common';
import { WordController } from './app.controller';
import { WordService } from './app.service';

@Module({
  imports: [],
  controllers: [WordController],
  providers: [WordService],
})
export class AppModule {}
