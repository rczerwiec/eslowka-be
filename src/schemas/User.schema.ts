import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IFolder } from './types';

@Schema()
export class User {
  @Prop({ unique: true })
  id: number;

  @Prop({ required: true })
  userName: string;

  @Prop({ default: [] })
  folders: IFolder[];
}

export const UserSchema = SchemaFactory.createForClass(User);
