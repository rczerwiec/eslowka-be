import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWordDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  folderId: number;

  @IsString()
  word: string;

  @IsString()
  note: string;

  @IsString()
  translation: string;

  @IsNumber()
  repeated: number;

  @IsNumber()
  known: number;

  @IsNumber()
  streak: number;

  @IsNumber()
  reverseStreak: number;
}
