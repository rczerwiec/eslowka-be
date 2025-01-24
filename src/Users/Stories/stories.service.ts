import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateStoryDto } from '../dto/Story.dto';

@Injectable()
export class StoriesService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createStory(id: string, newStory: CreateStoryDto) {
    this.userModel
      .updateOne({ uid: id }, { $push: { stories: newStory } })
      .then(() => {
        console.log('Pomyślnie utworzono nową historię!');
      });
  }

  removeStory(id: string, storyToDelete: CreateStoryDto) {
    this.userModel
      // eslint-disable-next-line prettier/prettier
      .updateOne({ uid: id }, { $pull: { stories: { id: storyToDelete.id } } })
      .then(() => {
        console.log('Pomyślnie usunieto historyjke!');
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        console.log('Zaaktualizowano pojedyncze słowo w historyjce');
      })
      .catch((err) => {
        console.log('BLAD:', err);
      });
  }
}
