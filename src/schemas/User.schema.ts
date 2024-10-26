import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFolder, ISettings, IStory, IWord } from './types';

@Schema({_id: false})
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
}

const FolderSchema = SchemaFactory.createForClass(FolderSchemaDefinition);

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

  @Prop([FolderSchema])
  folders: IFolder[];

  @Prop({
    default: [
      {
        id: 0,
        language: 'english',
        level: 'b2',
        title: 'Testowa b2',
        words: [{ word: 'pieruny', known: false }],
        wordAmount: 1,
        wordKnownAmount: 0,
      },
      {
        id: 1,
        language: 'english',
        level: 'a1',
        title: 'Testowa a1',
        words: [{ word: 'pierun', known: false }],
        wordAmount: 1,
        wordKnownAmount: 0,
      },
    ],
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