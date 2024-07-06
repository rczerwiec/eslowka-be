import { Module } from '@nestjs/common';
import { WordController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [WordController],
  providers: [AppService],
})
export class AppModule {}
