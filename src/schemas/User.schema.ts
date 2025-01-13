import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFolder, ISettings, IStory } from './types';
import { randomUUID } from 'crypto';
import GetStories from 'src/utils/DefaultData';

@Schema({ _id: false })
export class SettingsSchemaDefinition {
  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  darkmode: boolean;

  @Prop({ required: true })
  wordsPerTraining: number;
}

const SettingsSchema = SchemaFactory.createForClass(SettingsSchemaDefinition);

@Schema()
export class FolderSchemaDefinition {
  @Prop({ unique: false })
  id: number;

  @Prop({ required: true })
  folderName: string;

  @Prop({ default: [] })
  words: [];

  @Prop({ default: 0 })
  currentProgress: number;

  @Prop({ default: 0 })
  maxProgress: number;

  @Prop({
    default: 'Microsoft Ryan Online (Natural) - English (United Kingdom)',
  })
  defaultVoice: string;

  @Prop({
    default: 'Microsoft Ryan Online (Natural) - English (United Kingdom)',
  })
  defaultVoiceReversed: string;

  @Prop({ required: true })
  referenceID: string;
}

const FolderSchema = SchemaFactory.createForClass(FolderSchemaDefinition);

@Schema()
export class StorySchemaDefinition {
  @Prop({ unique: false })
  id: number;

  @Prop({ required: true })
  language: string;
  
  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  title: string;

  @Prop({ default: [] })
  words: [];

  @Prop({ default: 0 })
  wordAmount: number;

  @Prop({ default: 0 })
  wordKnownAmount: number;
}

const StorySchema = SchemaFactory.createForClass(StorySchemaDefinition);

@Schema()
export class User {
  @Prop({ unique: false })
  id: string;

  @Prop({ unique: false })
  uid: string;

  @Prop({ default: 'Użytkownik' })
  userName: string;

  @Prop({ required: true })
  email: string;

  @Prop({
    default: [
      {
        id: 0,
        folderName: 'Domyślny Folder',
        words: [
          {
            id: 0,
            folderId: 0,
            word: 'One',
            translation: 'Jeden',
            note: 'tłumaczenie liczby 1',
            repeated: 0,
            known: 0,
            streak: 0,
            reverseStreak: 0,
          },
          {
            id: 1,
            folderId: 0,
            word: 'Two',
            translation: 'Dwa',
            note: 'tłumaczenie liczby dwa',
            repeated: 0,
            known: 0,
            streak: 0,
            reverseStreak: 0,
          },
          {
            id: 2,
            folderId: 0,
            word: 'Three',
            translation: 'Trzy',
            note: 'tłumaczenie liczby trzy',
            repeated: 0,
            known: 0,
            streak: 0,
            reverseStreak: 0,
          },
        ],
        currentProgress: 0,
        maxProgress: 0,
        referenceID: randomUUID(),
        defaultVoice:
          'Microsoft Ryan Online (Natural) - English (United Kingdom)',
        defaultVoiceReversed: 'Microsoft Paulina - Polish (Poland)',
      },
    ],
    type: [FolderSchema],
  })
  folders: IFolder[];

  @Prop({
    default: GetStories(),
    type: [StorySchema],
  })
  stories: IStory[];

  @Prop({
    default: {
      language: 'polish',
      darkmode: false,
      wordsPerTraining: 5,
    },
    type: SettingsSchema,
  })
  settings: ISettings;

  @Prop({ default: 0 })
  experience: number;

  @Prop({ default: 0 })
  level: number;

  @Prop({ default: 'Free' })
  accountType: string;

  @Prop({ default: 1 })
  streak: number;

  @Prop({ default: new Date() })
  joined: Date;

  @Prop({ default: new Date() })
  lastLogin: Date;

  @Prop({ default: new Date() })
  practiceDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);