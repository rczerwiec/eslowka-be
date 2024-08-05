import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IFolder } from 'src/schemas/types';

export class CreateUserDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  uid: string;

  @IsString()
  userName: string;

  folders?: IFolder[];
}
