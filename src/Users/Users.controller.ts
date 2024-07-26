import {
  Body,
  Controller,
  Delete,
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

  @Get(':id/folders')
  async getUserFolders(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser.folders;
  }
  

  @Get(':id/folders/:folderId/words')
  async getUserFolderWords(
    @Param('id') id: string,
    @Param('folderId') folderId: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    if (!findUser.folders[folderId].words === undefined) {
      return [];
    }
    return findUser.folders[folderId].words;
  }

  @Get(':id/folders/:folderId/randomWords')
  async getRandomWordsArray(
    @Param('id') id: string,
    @Param('folderId') folderId: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    if (!findUser.folders[folderId].words === undefined) {
      return [];
    }
    // eslint-disable-next-line prefer-const
    let folderWords = findUser.folders[folderId].words;
    let currentIndex = folderWords.length;

    while (currentIndex != 0) {
      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [folderWords[currentIndex], folderWords[randomIndex]] = [
        folderWords[randomIndex],
        folderWords[currentIndex],
      ];
    }
    console.log(folderWords);
    return folderWords;
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
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.usersService.createUserFolderWord(id, newWordDto);
  }

  @Patch(':id/word/status')
  updateWordStatus(@Param('id') id: string, @Body() newWordDto: CreateWordDto) {
    console.log(newWordDto);
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.usersService.updateWord(id, newWordDto);
  }

  @Patch(':id/words')
  createUserFolderWords(
    @Param('id') id: string,
    @Body() newWordsDto: CreateWordDto[],
  ) {
    console.log(newWordsDto);
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);
    return this.usersService.createUserFolderWords(id, newWordsDto);
  }

  @Delete(':id/word')
  deleteUserFolderWord(
    @Param('id') id: string,
    @Body() wordToDelete: CreateWordDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException(`User not found (valid id)`, 404);

    return this.usersService.deleteUserFolderWord(id, wordToDelete);
  }
}
