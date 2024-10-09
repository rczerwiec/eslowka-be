import { Injectable } from '@nestjs/common';
//import { user } from '../schemas/types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';
import { CreateFolderDto } from './dto/Folder.dto';
import { CreateWordDto } from './dto/Word.dto';
import { ISettings, IUser } from 'src/schemas/types';
import GetLevels from 'src/utils/Levels';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //CREATE USER============================================================
  createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  //GETTERS============================================================
  getUserById(id: string) {
    return this.userModel.findOne({ uid: id });
  }

  getAllUsers() {
    return this.userModel.find();
  }

  async getWordsInFolder(id: string, folderId: number) {
    console.log(folderId);
    const test = await this.userModel
      .findOne({ uid: id })
      .then((res: IUser) => {
        //console.log(res.folders);
        const myFolder = res.folders.find((folder) => {
          console.log(folder.id, folderId);
          if (folder.id == folderId) {
            console.log(
              '----------------------------------------',
              folder.id,
              folderId,
            );
            return true;
          }
        });

        return myFolder;
      });
    return test.words;
  }

  async getRandomWords(id: string, folderId: number) {
    console.log(folderId);
    let userWordsPerTraining = 0;
    const myFolderWords = await this.userModel
      .findOne({ uid: id })
      .then((res: IUser) => {
        //console.log(res.folders);
        userWordsPerTraining = res.settings.wordsPerTraining;
        const myFolder = res.folders.find((folder) => {
          console.log(folder.id, folderId);
          if (folder.id == folderId) {
            console.log(
              '----------------------------------------',
              folder.id,
              folderId,
            );
            return true;
          }
        });

        return myFolder;
      });
    // eslint-disable-next-line prefer-const
    console.log('myfolderWords', myFolderWords);
    const folderWords = myFolderWords.words;
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
    return newFolders.slice(0, userWordsPerTraining);
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

  updateUserSettings(id: string, settingsToUpdate: ISettings) {
    //console.log(newFolder);
    this.userModel
      .updateOne({ uid: id }, { $set: { settings: settingsToUpdate } })
      .then(() => {
        console.log('Pomyślnie nadpisano ustawienia!');
      });
  }

  updateUserStats(id: string, experience: number) {
    let currentlevel = 0;
    const levels = GetLevels();
    levels.map((level) => {
      if (experience >= level.min && experience < level.max) {
        currentlevel = level.value;
      }
    });

    this.userModel
      .updateOne(
        { uid: id },
        { $set: { experience: experience, level: currentlevel } },
      )
      .then(() => {
        console.log('Pomyślnie nadpisano statystyki!');
      });
  }

  createUserFolderWord(
    id: string,
    data: { newWord: CreateWordDto; folderId: number },
  ) {
    this.userModel
      .updateOne(
        { uid: id },
        { $push: { 'folders.$[item].words': data.newWord } },
        { arrayFilters: [{ 'item.id': { $in: data.newWord.folderId } }] },
      )
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log('Pomyślnie dodano słowo!');
        this.calculateProgress(id, data.folderId);
      });
  }

  //UTILS - CALCULATE PROGRESS
  calculateProgress = (userId: string, folderId: number) => {
    this.userModel.findOne({ uid: userId }).then((res: IUser) => {
      let currentProgress = 0;
      let currentFolder;
      res.folders.find((folder) => {
        if (folder.id == folderId) {
          currentFolder = folder;
          folder.words.map((word) => {
            if (word.known === 2) {
              currentProgress++;
            } else if (word.known === 1) {
              currentProgress += 0.5;
            }
          });
        }
      });
      this.userModel
        .updateOne(
          { uid: userId },
          {
            $set: {
              'folders.$[item].maxProgress': currentFolder.words.length,
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
    console.log("SŁOWA DO DODANIA:",newWords); 
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

  deleteUserFolder(id: string, folder: CreateFolderDto) {
    console.log(id, folder);

    this.userModel
      // eslint-disable-next-line prettier/prettier
      .updateOne({ uid: id }, { $pull: { "folders": {id: folder.id} } })
      .then(() => {
        console.log('Pomyślnie usunieto folder!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
