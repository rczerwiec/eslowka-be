import { Body, Controller, Get, Post } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { Folder } from '../wordType';

@Controller('folders')
export class FoldersController {
  constructor(private readonly folderService: FoldersService) {}

  @Get()
  getAllFolders(): Folder[] {
    return this.folderService.getAllFolders();
  }
  @Post()
  addFolder(@Body() newFolder: Partial<Folder>): Folder[] {
    return this.folderService.addFolder(newFolder);
  }
}
