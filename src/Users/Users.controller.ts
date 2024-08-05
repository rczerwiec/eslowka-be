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

  //CREATE USER============================================================

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  createUsers(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);

    return this.usersService.createUser(createUserDto);
  }

  //GETTERS============================================================

  @Get(':id')
  async getUserById(@Param('id') id: string) {

    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @Get(':id/folders')
  async getUserFolders(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser.folders;
  } 

  @Get(':id/folders/:folderId/words')
  async getUserFolderWords(
    @Param('id') id: string,
    @Param('folderId') folderId: string,
  ) {

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
    let knownStatus = 0;
    //ADD ONLY 3 WORDS WITH STATUS "KNOWN" TO LIST
    const newFolders = folderWords
      .filter((word) => {
        if (knownStatus >= 3 && word.known === 2) {
          console.log('false');
          return false;
        } else {
          if (word.known === 2) {
            knownStatus++;
          }
          console.log('true');
          return true;
        }
      })
      .map((word) => {
        return word;
      });
    return newFolders.slice(0, 8);
  }

  //PATCHING============================================================

  @Patch(':id')
  createUserFolder(
    @Param('id') id: string,
    @Body() newFolderDto: CreateFolderDto,
  ) {
    console.log(newFolderDto);
    return this.usersService.createUserFolder(id, newFolderDto);
  }

  //UPDATE SINGLE WORD==================
  @Patch(':id/word')
  createUserFolderWord(
    @Param('id') id: string,
    @Body() newWordDto: CreateWordDto,
  ) {
    console.log(id); 
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.usersService.createUserFolderWord(id, newWordDto);
  }

  //UPDATE WORDS==================
  @Patch(':id/words')
  createUserFolderWords(
    @Param('id') id: string,
    @Body() newWordsDto: CreateWordDto[],
  ) {
    return this.usersService.createUserFolderWords(id, newWordsDto);
  }

  @Patch(':id/word/status')
  updateWord(@Param('id') id: string, @Body() newWordDto: CreateWordDto) {
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.usersService.updateWord(id, newWordDto);
  }


  @Delete(':id/word')
  deleteUserFolderWord(
    @Param('id') id: string,
    @Body() wordToDelete: CreateWordDto,
  ) {

    return this.usersService.deleteUserFolderWord(id, wordToDelete);
  }
}
