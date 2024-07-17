import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './Users.services';
import { CreateUserDto } from './dto/User.dto';
import mongoose from 'mongoose';
import { CreateFolderDto } from './dto/Folder.dto';
import { CreateWordDto } from './dto/Word.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.usersService.createUser(createUserDto);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @Patch(':id')
  createUserFolder(
    @Param('id') id: string,
    @Body() newFolderDto: CreateFolderDto,
  ) {
    console.log(newFolderDto);
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);
    return this.usersService.createUserFolder(id, newFolderDto);
  }

  @Patch(':id/word')
  createUserFolderWord(
    @Param('id') id: string,
    @Body() newWordDto: CreateWordDto,
  ) {
    console.log(newWordDto);
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);
    return this.usersService.createUserFolderWord(id, newWordDto);
  }
}
