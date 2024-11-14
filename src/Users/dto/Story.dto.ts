import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  language: string;
  
  @IsString()
  level: string;

  @IsString()
  description: string;

  @IsString()
  title: string;

  words: { id: number; word: string; known: number }[];

  @IsNumber()
  wordAmount: number;

  @IsNumber()
  wordKnownAmount: number;
}
