import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  language: 'german' | 'english' | 'french';

  @IsString()
  level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1';

  @IsString()
  title: string;

  words: { word: string; known: boolean }[];

  @IsNumber()
  wordAmount: number;

  @IsNumber()
  wordKnownAmount: number;
}
