import { Injectable } from '@nestjs/common';
//import { user } from '../schemas/types';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/User.dto';
import { IDates } from 'src/schemas/types';
import GetLevels from 'src/utils/Levels';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const newUser = new this.userModel(createUserDto);

    return newUser.save();
  }

  getUserById(id: string) {
    return this.userModel.findOne({ uid: id });
  }

  getAllUsers() {
    return this.userModel.find();
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
}
