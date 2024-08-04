import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IWord } from 'src/schemas/types';

export class CreateFolderDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  folderName: string;

  words?: IWord[];

  @IsNumber()
  currentProgress: number;

  @IsNumber()
  maxProgress: number;
}
