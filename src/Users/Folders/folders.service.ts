import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/schemas/types';
import { User } from 'src/schemas/User.schema';
import { CreateFolderDto } from '../dto/Folder.dto';
import { CreateWordDto } from '../dto/Word.dto';

@Injectable()
export class FoldersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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
    return selectedFolder;
  }

  async getAllWordsInFolder(id: string, folderId: number) {
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
    return selectedFolder;
  }

  async getRandomFolderWords(id: string, folderId: number) {
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

  createFolder(id: string, newFolder: CreateFolderDto) {
    //console.log(newFolder);
    this.userModel
      .updateOne({ uid: id }, { $push: { folders: newFolder } })
      .then(() => {
        console.log('Pomyślnie nadpisano folder!');
      });
  }

  createWordInFolder(
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

  createMultipleWordsInFolder(id: string, newWords: CreateWordDto[]) {
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

  updateFolderDefaultVoice(id: string, folderId: string, voice: string) {
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

  updateFolderName(id: string, folderId: string, newName: string) {
    this.userModel
      .updateOne(
        { uid: id },
        {
          $set: {
            'folders.$[item].folderName': newName,
          },
        },
        {
          new: true,
          arrayFilters: [{ 'item.id': { $in: folderId } }],
        },
      )
      .then(() => {
        console.log('Pomyślnie zmieniono nazwę folderu!');
      });
  }

  updateFolderSecondaryVoice(id: string, folderId: string, voice: string) {
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

  deleteWordInFolder(id: string, wordToDelete: CreateWordDto) {
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

  deleteFolder(id: string, folder: CreateFolderDto) {
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

  //UTILS======================================================================

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
}
