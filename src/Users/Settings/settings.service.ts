import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISettings } from 'src/schemas/types';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  updateSettings(id: string, settingsToUpdate: ISettings) {
    this.userModel
      .updateOne({ uid: id }, { $set: { settings: settingsToUpdate } })
      .then(() => {
        console.log('Pomyślnie nadpisano ustawienia!');
      });
  }
}
