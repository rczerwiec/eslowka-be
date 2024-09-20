import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFolder, ISettings, IWord } from './types';

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
    default: {
      language: 'polish',
      darkmode: false,
      wordsPerTraining: 5,
    },
    type: SettingsSchema,
  })
  settings: ISettings;
}

export const UserSchema = SchemaFactory.createForClass(User);