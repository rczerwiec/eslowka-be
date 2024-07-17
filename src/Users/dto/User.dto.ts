import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IFolder } from 'src/schemas/types';

export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  userName: string;

  folders?: IFolder[];
}
