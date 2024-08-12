import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFolder, IWord } from './types';

@Schema()
export class WordSchemaDefinition {
  id: number;

  folderId: number;

  word: string;

  translation: string;

  repeated: number;

  known: number;

  streak: number;

  reverseStreak: number;

  note: string;

}

const WordSchema = SchemaFactory.createForClass(WordSchemaDefinition);

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
}

export const UserSchema = SchemaFactory.createForClass(User);