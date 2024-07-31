import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFolder, IWord } from './types';

@Schema()
export class WordSchemaDefinition {
  @Prop({ unique: true })
  id: number;

  folderId: number;

  word: string;

  translation: string;

  repeated: number;

  known: number;

  streak: number;

  reverseStreak: number;

}

const WordSchema = SchemaFactory.createForClass(WordSchemaDefinition);

@Schema()
export class FolderSchemaDefinition {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true })
  folderName: string;

  @Prop({ default: [] })
  words: [];
}

const FolderSchema = SchemaFactory.createForClass(FolderSchemaDefinition);

@Schema()
export class User {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true })
  userName: string;

  @Prop([FolderSchema])
  folders: IFolder[];
}

export const UserSchema = SchemaFactory.createForClass(User);