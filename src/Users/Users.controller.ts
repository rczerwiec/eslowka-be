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
import { CreateFolderDto } from './dto/Folder.dto';
import { CreateWordDto } from './dto/Word.dto';
import { IDates, ISettings } from 'src/schemas/types';
import { CreateStoryDto } from './dto/Story.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  //CREATE USER============================================================

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  createUsers(@Body() createUserDto: CreateUserDto) {
   // console.log(createUserDto);

    return this.usersService.createUser(createUserDto);
  }

  //GETTERS============================================================

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser;
  }

  @Get()
  async getUsers() {
    //console.log('IM HERE');
    const allUsers = await this.usersService.getAllUsers();
    //console.log(allUsers);
    return allUsers;
  }

  @Get(':id/folders')
  async getUserFolders(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser.folders;
  }

  @Get(':id/stories')
  async getUserStories(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    return findUser.stories;
  }

  @Get(':id/:folderId/:wordId')
  async getSingleWord(
    @Param('id') id: string,
    @Param('folderId') folderId: string,
    @Param('wordId') wordId: string,
  ) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    //console.log(id, folderId, wordId);
    return findUser.folders[folderId].words[wordId];
  }

  @Get(':id/:folderName')
  async getSingleFolder(
    @Param('id') id: string,
    @Param('folderName') folderName: string,
  ) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found', 404);
    //console.log(id, folderId, wordId);
    return this.usersService.getSingleFolder(id, folderName);
  }

  @Get(':id/folders/:folderId/words')
  async getUserFolderWords(
    @Param('id') id: string,
    @Param('folderId') folderId: number,
  ) {
    const wordsInFolder = this.usersService.getWordsInFolder(id, folderId);
    console.log(wordsInFolder);
    return wordsInFolder;
  }

  @Get(':id/folders/:folderId/randomWords')
  async getRandomWordsArray(
    @Param('id') id: string,
    @Param('folderId') folderId: number,
  ) {
    const randomWordsInFolder = this.usersService.getRandomWords(id, folderId);
    console.log('RANDOM WORDS:', randomWordsInFolder);
    return randomWordsInFolder;
  }

  //PATCHING============================================================

  @Patch(':id/userStatsUpdate')
  updateUserStats(
    @Param('id') id: string,
    @Body() data: { experience: number },
  ) {
    console.log('EXP W CONTROLERZE:', data);
    return this.usersService.updateUserStats(id, data.experience);
  }

  // @Patch(':id/userInfoUpdate')
  // updateUserInfo(@Param('id') id: string, @Body() newSettings: ISettings) {
  //   return this.usersService.updateUserSettings(id, newSettings);
  // }

  @Patch(':id')
  createUserFolder(
    @Param('id') id: string,
    @Body() newFolderDto: CreateFolderDto,
  ) {
    console.log(newFolderDto);
    return this.usersService.createUserFolder(id, newFolderDto);
  }

  @Patch(':id/story')
  createUserStory(
    @Param('id') id: string,
    @Body() newStoryDto: CreateStoryDto,
  ) {
    console.log(newStoryDto);
    return this.usersService.createUserStory(id, newStoryDto);
  }

  @Patch(':id/settings')
  updateUserSettings(@Param('id') id: string, @Body() newSettings: ISettings) {
    console.log(newSettings);
    return this.usersService.updateUserSettings(id, newSettings);
  }

  @Patch(':id/userInfo')
  updateUserInfo(@Param('id') id: string, @Body() data: { userName: string }) {
    console.log(data.userName); 
    return this.usersService.updateUserInfo(id, data.userName);
  }

  @Patch(':id/dates')
  updateUserDates(@Param('id') id: string, @Body() dates: IDates) {
    console.log("HERE I AM",dates)
    return this.usersService.updateUserDates(id, dates);
  }

  //UPDATE SINGLE WORD==================
  @Patch(':id/word')
  createUserFolderWord(
    @Param('id') id: string,
    @Body() newWordDto: { newWord: CreateWordDto; folderId: number },
  ) {
    console.log(newWordDto.newWord);
    if (newWordDto.newWord.word == '' || newWordDto.newWord.translation == '')
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
  updateWordStatusAndStreak(
    @Param('id') id: string,
    @Body() newWordDto: CreateWordDto,
  ) {
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.usersService.updateWordStatusAndStreak(id, newWordDto);
  }

  @Patch(':id/story/:storyId/:storyWordId')
  updateStoryWord(
    @Param('id') id: string,
    @Param('storyId') storyId: number,
    @Param('storyWordId') storyWordId: number,
    @Body() currentWord: { id: number; word: string; known: number },
  ) {
    console.log('STORYID:', storyId);
    console.log('STORY WORD ID:', storyWordId);
    return this.usersService.updateWordInStory(
      id,
      storyId,
      storyWordId,
      currentWord,
    );
  }

  @Patch(':id/word/details')
  updateWordDetails(
    @Param('id') id: string,
    @Body() newWordDto: CreateWordDto,
  ) {
    console.log('UpdateWordDetails');
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.usersService.updateWordDetails(id, newWordDto);
  }

  @Delete(':id/word')
  deleteUserFolderWord(
    @Param('id') id: string,
    @Body() wordToDelete: CreateWordDto,
  ) {
    return this.usersService.deleteUserFolderWord(id, wordToDelete);
  }

  @Delete(':id/folder')
  deleteUserFolder(
    @Param('id') id: string,
    @Body() folderToDelete: CreateFolderDto,
  ) {
    return this.usersService.deleteUserFolder(id, folderToDelete);
  }
}
