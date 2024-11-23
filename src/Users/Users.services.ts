import { Injectable } from '@nestjs/common';
//import { user } from '../schemas/types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';
import { CreateFolderDto } from './dto/Folder.dto';
import { CreateWordDto } from './dto/Word.dto';
import { IDates, ISettings, IUser } from 'src/schemas/types';
import GetLevels from 'src/utils/Levels';
import { CreateStoryDto } from './dto/Story.dto';

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

  async getSingleFolder(id: string, folderName: string) {
    const selectedFolder = await this.userModel
      .findOne({ uid: id })
      .then((res: IUser) => {
        const myFolder = res.folders.find((folder) => {
          if (folder.folderName == folderName) {
            return true;
          }
        });
        return myFolder;
      });
    console.log('selected Folder', selectedFolder);
    return selectedFolder;
  }

  async getFolderByReferenceCode(id: string, referenceCode: string) {
    const selectedFolder = await this.userModel
      .findOne({ uid: id })
      .then((res: IUser) => {
        const myFolder = res.folders.find((folder) => {
          if (folder.referenceID == referenceCode) {
            return true;
          }
        });
        return myFolder;
      });
    console.log('selected Folder', selectedFolder);
    return selectedFolder;
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

  createUserStory(id: string, newStory: CreateStoryDto) {
    //console.log(newFolder);
    this.userModel
      .updateOne({ uid: id }, { $push: { stories: newStory } })
      .then(() => {
        console.log('Pomyślnie nadpisano historie!');
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

  updateUserInfo(id: string, userName: string) {
    this.userModel
      .updateOne({ uid: id }, { $set: { userName: userName } })
      .then(() => {
        console.log('Pomyślnie nadpisano nazwe uzytkownika!');
      });
  }

  updateUserDates(id: string, dates: IDates) {
    let lastLogin: Date;
    const today = new Date();
    const practiceDate: Date = new Date(dates.practiceDate);
    console.log(dates);
    if (dates.onLogin) {
      lastLogin = new Date();
      this.userModel
        .updateOne({ uid: id }, { $set: { lastLogin: lastLogin } })
        .then(() => {
          console.log('Pomyślnie nadpisano date logowania!');
        });
    } else {
      //If during practice
      console.log(practiceDate.getDate());
      console.log(today.getDate());
      //IF LAST PRACTICE DAY IS NOT TODAY
      if (practiceDate.getDate() != today.getDate()) {
        //CALCULATE DAY AFTER PRACTICE DAY
        console.log('OSTATNIO CWICZONE:', practiceDate.getDate());
        console.log('DZISIAJ', today.getDate());
        const yesterdayDate = new Date(today);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        //IF PRACTICED YESTERDAY
        if (practiceDate.getDate() === yesterdayDate.getDate()) {
          console.log('Wczoraj ćwiczyłeś');
          this.userModel
            .updateOne(
              { uid: id },
              {
                $set: {
                  practiceDate: new Date(),
                  streak: dates.currentStreak + 1,
                },
              },
            )
            .then(() => {
              console.log('Pomyślnie nadpisano date ćwiczeń!');
            });
        } else {
          console.log('Wczoraj nie ćwiczyłeś');
          this.userModel
            .updateOne(
              { uid: id },
              { $set: { practiceDate: new Date(), streak: 1 } },
            )
            .then(() => {
              console.log('Pomyślnie nadpisano date ćwiczeń!');
            });
        }
      }
    }
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
    console.log('SŁOWA DO DODANIA:', newWords);
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

  //UPDATE WORD IN STORY
  updateWordInStory(
    id: string,
    storyID: number,
    wordInStoryID: number,
    word: { id: number; word: string; known: number },
  ) {
    const wordID = parseInt(wordInStoryID.toString());
    let knownStatus = 0;

    if (word.known === 0) {
      knownStatus = 1;
    } else if (word.known === 1) {
      knownStatus = 2;
    } else if (word.known === 2) {
      knownStatus = 3;
    } else {
      knownStatus = 0;
    }

    this.userModel
      .updateOne(
        { uid: id },
        {
          $set: {
            'stories.$[e1].words.$[e2].known': knownStatus,
          },
        },
        {
          arrayFilters: [{ 'e1.id': storyID }, { 'e2.id': wordID }],
          new: true,
        },
      )
      .then((e) => {
        console.log('Zaaktualizowano');
      })
      .catch((err) => {
        console.log('BLAD:', err);
      });
  }

  updateDefaultVoice(id: string, folderId: string, voice: string) {
    this.userModel
      .updateOne(
        { uid: id },
        {
          $set: {
            'folders.$[item].defaultVoice': voice,
          },
        },
        {
          new: true,
          arrayFilters: [{ 'item.id': { $in: folderId } }],
        },
      )
      .then(() => {
        console.log('Zaaktualizowano głos słówek DEFAULT!');
      });
  }

  updateSecondaryVoice(id: string, folderId: string, voice: string) {
    this.userModel
      .updateOne(
        { uid: id },
        {
          $set: {
            'folders.$[item].defaultVoiceReversed': voice,
          },
        },
        {
          new: true,
          arrayFilters: [{ 'item.id': { $in: folderId } }],
        },
      )
      .then(() => {
        console.log('Zaaktualizowano głos słówek SECONDARY!');
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
      .updateOne({ uid: id }, { $pull: { folders: { id: folder.id } } })
      .then(() => {
        console.log('Pomyślnie usunieto folder!');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
