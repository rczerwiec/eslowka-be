import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './Users.services';
import { CreateUserDto } from './dto/User.dto';
import { IDates } from 'src/schemas/types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UserService) {}

  //CREATE=============================================================

  //CREATE USER
  @Post('/signup')
  @UsePipes(new ValidationPipe())
  createUsers(@Body() createUserDto: CreateUserDto) {
    // console.log(createUserDto);

    return this.usersService.createUser(createUserDto);
  }

  //GETTERS============================================================

  //GET USER BY ID
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.usersService.getUserById(id);
    console.log(findUser);
    if (!findUser) throw new HttpException('User not found1', 404);
    return findUser;
  }

  //GET ALL USERS
  @Get()
  async getUsers() {
    //console.log('IM HERE');
    const allUsers = await this.usersService.getAllUsers();
    //console.log(allUsers);
    return allUsers;
  }

  //PATCHING============================================================

  //UPDATE USER STATS
  @Patch(':id/userStatsUpdate')
  updateUserStats(
    @Param('id') id: string,
    @Body() data: { experience: number },
  ) {
    console.log('EXP W CONTROLERZE:', data);
    return this.usersService.updateUserStats(id, data.experience);
  }

  //UPDATE USER INFO
  @Patch(':id/userInfo')
  updateUserInfo(@Param('id') id: string, @Body() data: { userName: string }) {
    console.log(data.userName);
    return this.usersService.updateUserInfo(id, data.userName);
  }

  //UPDATE USER DATE
  @Patch(':id/dates')
  updateUserDates(@Param('id') id: string, @Body() dates: IDates) {
    return this.usersService.updateUserDates(id, dates);
  }
}
