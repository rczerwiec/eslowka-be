import { Injectable } from '@nestjs/common';
import { user, Folder } from '../wordType';

@Injectable()
export class FoldersService {
  addFolder(folder: Partial<Folder>): Folder | any {
    const newID = user.folders[user.folders.length - 1].id + 1;
    const newFolder: Folder = {
      id: newID,
      folderName: folder.folderName,
      words: [],
    };
    user.folders.push(newFolder);
  }
  getAllFolders(): Folder[] {
    return user.folders;
  }
}
