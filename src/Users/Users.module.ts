import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/User.schema';
import { UserService } from './Users.services';
import { UsersController } from './Users.controller';
import { SettingsService } from './Settings/settings.service';
import { SettingsController } from './Settings/settings.controller';
import { FoldersService } from './Folders/folders.service';
import { FoldersController } from './Folders/folders.controller';
import { StoriesController } from './Stories/stories.controller';
import { StoriesService } from './Stories/stories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [
    UsersController,
    StoriesController,
    SettingsController,
    FoldersController,
  ],
  providers: [UserService, StoriesService, SettingsService, FoldersService],
})
export class UserModule {}
