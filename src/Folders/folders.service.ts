import { Injectable } from '@nestjs/common';
import { user, Folder } from '../wordType';

@Injectable()
export class FoldersService {
  getAllFolders(): Folder[] {
    return user.folders;
  }
}
