import { Injectable } from '@nestjs/common';
//import { user } from '../schemas/types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';
import { CreateFolderDto } from './dto/Folder.dto';
import { CreateWordDto } from './dto/Word.dto';
import { IUser } from 'src/schemas/types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //CREATE USER============================================================
  createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  //GETTERS============================================================
  getUserById(id: string) {
    return this.userModel.findOne({ uid: id });
  }


  //PATCHING============================================================
  createUserFolder(id: string, newFolder: CreateFolderDto) {
    //console.log(newFolder);
    this.userModel
      .updateOne({ uid: id }, { $push: { folders: newFolder } })
      .then(() => {
        console.log('Pomyślnie nadpisano folder!');
      });
  }

  createUserFolderWord(id: string, newWord: CreateWordDto) {
    console.log(id, newWord);
    this.userModel
      .updateOne(
        { uid: id },
        { $push: { 'folders.$[item].words': newWord } },
        { arrayFilters: [{ 'item.id': { $in: newWord.folderId } }] },
      )
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log('Pomyślnie dodano słowo!');
        this.calculateProgress(id, newWord.folderId);
      });
  }

  //UTILS - CALCULATE PROGRESS
  calculateProgress = (userId: string, folderId: number) => {
    this.userModel.findOne({ uid: userId }).then((res: IUser) => {
      let currentProgress = 0;
      console.log(res.folders[folderId].words);
      res.folders[folderId].words.map((word) => {
        if (word.known === 2) {
          currentProgress++;
        } else if (word.known === 1) {
          currentProgress += 0.5;
        }
      });
      this.userModel
        .updateOne(
          { uid: userId },
          {
            $set: {
              'folders.$[item].maxProgress': res.folders[folderId].words.length,
              'folders.$[item].currentProgress': currentProgress,
            },
          },
          {
            new: true,
            arrayFilters: [{ 'item.id': { $in: folderId } }],
          },
        )
        .then(() => {
          console.log('Zaaktualizowano progress!');
        }); 
    });
  };

  createUserFolderWords(id: string, newWords: CreateWordDto[]) {
    this.userModel
      .updateOne(
        { uid: id },
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
        {
          new: true,
          arrayFilters: [{ 'item.id': { $in: newWords[0].folderId } }],
        },
      )
      .then(() => {
        console.log('Pomyślnie dodano słowa!');
        this.calculateProgress(id, newWords[0].folderId);
      });
  }

  //UPDATE WORD
  updateWordStatusAndStreak(id: string, newWordDto: CreateWordDto) {
    this.userModel
      .updateOne(
        { uid: id },
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
        this.calculateProgress(id, newWordDto.folderId);
      })
      .catch((err) => {
        console.log('BLAD:', err);
      });
  }

  updateWordDetails(id: string, newWordDto: CreateWordDto) {
    this.userModel
      .updateOne(
        { uid: id },
        {
          $set: {
            'folders.$[e1].words.$[e2].word': newWordDto.word,
            'folders.$[e1].words.$[e2].translation': newWordDto.translation,
            'folders.$[e1].words.$[e2].note': newWordDto.note,
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
      .catch((err) => {
        console.log('BLAD:', err);
      });
  }

  deleteUserFolderWord(id: string, wordToDelete: CreateWordDto) {
    console.log(id, wordToDelete);

    this.userModel
      .updateOne(
        { uid: id },
        { $pull: { 'folders.$[item].words': wordToDelete } },
        { arrayFilters: [{ 'item.id': { $in: wordToDelete.folderId } }] },
      )
      .then(() => {
        console.log('Pomyślnie usnieto słowo!');
        this.calculateProgress(id, wordToDelete.folderId);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
