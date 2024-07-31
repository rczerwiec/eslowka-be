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

  createUserFolderWords(id: string, newWords: CreateWordDto[]) {
    this.userModel
      .findByIdAndUpdate(
        id,
        {
          $push: {
            'folders.$[item].words': {
              $each: newWords
                .filter((word) => {
                  if (word.translation == '' || word.word == '') return false;
                  return true;
                })
                .map((word) => {
                  return word;
                }),
            },
          },
        },
        { arrayFilters: [{ 'item.id': { $in: newWords[0].folderId } }] },
      )
      .then(() => {
        console.log('Pomyślnie dodano słowa!');
      });
  }

  updateWord(id: string, newWordDto: CreateWordDto) {
    this.userModel
      .findByIdAndUpdate(
        id,
        {
          $set: {
            'folders.$[e1].words.$[e2].known': newWordDto.known,
            'folders.$[e1].words.$[e2].repeated': newWordDto.repeated,
            'folders.$[e1].words.$[e2].streak': newWordDto.streak,
            'folders.$[e1].words.$[e2].reverseStreak': newWordDto.reverseStreak,
          },
        },
        {
          arrayFilters: [
            { 'e1.id': newWordDto.folderId },
            { 'e2.id': newWordDto.id },
          ],
          new: true,
        },
      )
      .then(() => {
        console.log('Pomyślnie zmieniono status!');
      })
      .catch((err) => {
        console.log('BLAD:', err);
      });
  }

  deleteUserFolderWord(id: string, wordToDelete: CreateWordDto) {
    console.log(id, wordToDelete);

    this.userModel
      .findByIdAndUpdate(
        id,
        { $pull: { 'folders.$[item].words': wordToDelete } },
        { arrayFilters: [{ 'item.id': { $in: wordToDelete.folderId } }] },
      )
      .then(() => {
        console.log('Pomyślnie usnieto słowo!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// {_id: "class_a", students: {$elemMatch: {_id: {$in: ["1a", "1b"]}}}},
// {$push: {"students.$[item].grades": "A+"}},
// {arrayFilters: [{"item._id": {$in: ["1a", "1b"]}}], upsert: true}
