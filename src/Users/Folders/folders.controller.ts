import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { UserService } from '../Users.services';
import { CreateFolderDto } from '../dto/Folder.dto';
import { CreateWordDto } from '../dto/Word.dto';

@Controller('folders')
export class FoldersController {
  constructor(
    private folderService: FoldersService,
    private usersService: UserService,
  ) {}

  //GETTERS================================================

  //GET ALL FOLDERS FOR USER
  @Get(':id/folders')
  async getUserFolders(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found2', 404);
    return findUser.folders;
  }

  //GET FOLDER BY REFERENCE CODE
  @Get('getByReferenceCode/:referenceCode/referenceCode/reference')
  async getFolderByReferenceCode(
    @Param('referenceCode') referenceCode: string,
  ) {
    const userID = referenceCode.slice(0, -9);
    const findUser = await this.usersService.getUserById(userID);
    if (!findUser) throw new HttpException('User not foundXD', 404);

    return this.folderService.getFolderByReferenceCode(userID, referenceCode);
  }

  //GET SINGLE FOLDER BY NAME (FOR USER)
  @Get(':id/:folderName')
  async getSingleFolder(
    @Param('id') id: string,
    @Param('folderName') folderName: string,
  ) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found5', 404);

    return this.folderService.getSingleFolder(id, folderName);
  }

  //GET ALL WORDS IN FOLDER
  @Get(':id/folders/:folderId/words')
  async getAllWordsInFolder(
    @Param('id') id: string,
    @Param('folderId') folderId: number,
  ) {
    const wordsInFolder = this.folderService.getAllWordsInFolder(id, folderId);
    return wordsInFolder;
  }

  //GET SINGLE WORD FROM FOLDER
  @Get(':id/:folderId/:wordId')
  async getSingleWord(
    @Param('id') id: string,
    @Param('folderId') folderId: string,
    @Param('wordId') wordId: string,
  ) {
    const findUser = await this.usersService.getUserById(id);
    if (!findUser) throw new HttpException('User not found4', 404);
    return findUser.folders[folderId].words[wordId];
  }

  //GET RANDOM WORDS FROM FOLDER (FOR USER)
  @Get(':id/folders/:folderId/randomWords')
  async getRandomFolderWords(
    @Param('id') id: string,
    @Param('folderId') folderId: number,
  ) {
    const randomWordsInFolder = this.folderService.getRandomFolderWords(
      id,
      folderId,
    );

    return randomWordsInFolder;
  }

  //PATCHING================================================

  //CREATE NEW FOLDER FOR USER
  @Patch(':id')
  createFolder(@Param('id') id: string, @Body() newFolderDto: CreateFolderDto) {
    return this.folderService.createFolder(id, newFolderDto);
  }

  //CREATE WORD IN FOLDER
  @Patch(':id/word')
  createWordInFolder(
    @Param('id') id: string,
    @Body() newWordDto: { newWord: CreateWordDto; folderId: number },
  ) {
    if (newWordDto.newWord.word == '' || newWordDto.newWord.translation == '')
      throw new HttpException(`Word cannot be empty`, 999);
    return this.folderService.createWordInFolder(id, newWordDto);
  }

  //CREATE MULTIPLE WORDS
  @Patch(':id/words')
  createMultipleWordsInFolder(
    @Param('id') id: string,
    @Body() newWordsDto: CreateWordDto[],
  ) {
    return this.folderService.createMultipleWordsInFolder(id, newWordsDto);
  }

  //UPDATE DEFAULT VOICE FOR FOLDER
  @Patch(':id/:folderId/defaultVoice')
  updateFolderDefaultVoice(
    @Param('id') id: string,
    @Param('folderId') folderID: string,
    @Body() voice: { voice: string },
  ) {
    return this.folderService.updateFolderDefaultVoice(
      id,
      folderID,
      voice.voice,
    );
  }

  //UPDATE FOLDER NAME
  @Patch(':id/:folderId/rename')
  updateFolderName(
    @Param('id') id: string,
    @Param('folderId') folderID: string,
    @Body() newName: { newName: string },
  ) {
    return this.folderService.updateFolderName(id, folderID, newName.newName);
  }

  //UPDATE SECONDARY VOICE FOR FOLDER
  @Patch(':id/:folderId/secondaryVoice')
  updateFolderSecondaryVoice(
    @Param('id') id: string,
    @Param('folderId') folderID: string,
    @Body() voice: { voice: string },
  ) {
    return this.folderService.updateFolderSecondaryVoice(
      id,
      folderID,
      voice.voice,
    );
  }

  //UPDATE WORD DETAILS
  @Patch(':id/word/details')
  updateWordDetails(
    @Param('id') id: string,
    @Body() newWordDto: CreateWordDto,
  ) {
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.folderService.updateWordDetails(id, newWordDto);
  }

  //UPDATE STREAK AND STATUS FOR WORD IN FOLDER
  @Patch(':id/word/status')
  updateWordStatusAndStreak(
    @Param('id') id: string,
    @Body() newWordDto: CreateWordDto,
  ) {
    if (newWordDto.word == '' || newWordDto.translation == '')
      throw new HttpException(`Empty data`, 999);
    return this.folderService.updateWordStatusAndStreak(id, newWordDto);
  }

  //DELETEING================================================

  //DELETE SINGLE WORD IN FOLDER
  @Delete(':id/word')
  deleteWordInFolder(
    @Param('id') id: string,
    @Body() wordToDelete: CreateWordDto,
  ) {
    return this.folderService.deleteWordInFolder(id, wordToDelete);
  }

  //DELETE FOLDER FOR USER
  @Delete(':id/folder')
  deleteUserFolder(
    @Param('id') id: string,
    @Body() folderToDelete: CreateFolderDto,
  ) {
    return this.folderService.deleteFolder(id, folderToDelete);
  }
}
