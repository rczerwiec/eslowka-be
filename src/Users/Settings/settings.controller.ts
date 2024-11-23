import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UserService } from '../Users.services';
import { SettingsService } from './settings.service';
import { ISettings } from 'src/schemas/types';

@Controller('settings')
export class SettingsController {
  constructor(
    private settingsService: SettingsService,
    private usersService: UserService,
  ) {}

  //UPDATE SETTINGS
  @Patch(':id/settings')
  updateSettings(@Param('id') id: string, @Body() newSettings: ISettings) {
    return this.settingsService.updateSettings(id, newSettings);
  }
}
