import { Injectable } from '@nestjs/common';
//import { user } from '../schemas/types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';
import { CreateFolderDto } from './dto/Folder.dto';
import { CreateWordDto } from './dto/Word.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  getUserById(id: string) {
    return this.userModel.findById(id);
  }

  createUserFolder(id: string, newFolder: CreateFolderDto) {
    console.log(newFolder);
    this.userModel
      .findByIdAndUpdate(id, { $push: { folders: newFolder } })
      .then(() => {
        console.log('Pomyślnie nadpisano folder!');
      });
  }

  createUserFolderWord(id: string, newWord: CreateWordDto) {
    console.log(newWord);

    this.userModel
      .findByIdAndUpdate(
        id,
        { $push: { 'folders.$[item].words': newWord } },
        { arrayFilters: [{ 'item.id': { $in: newWord.folderId } }] },
      )
      .then(() => {
        console.log('Pomyślnie dodano słowo!');
      });
  }
}

// {_id: "class_a", students: {$elemMatch: {_id: {$in: ["1a", "1b"]}}}},
// {$push: {"students.$[item].grades": "A+"}},
// {arrayFilters: [{"item._id": {$in: ["1a", "1b"]}}], upsert: true}
