import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './models/user.dto';
import { Public } from 'src/utils/auth/decorator/public.decorator';

@Controller('/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Post('')
  async createUser(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('email') email: string,
  ) {
    const body = { username, password, email };
    return await this.userService.create(body);
  }
  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body('username') username?: string,
    @Body('password') password?: string,
    @Body('email') email?: string,
  ) {
    return await this.userService.updateOne(id, { username, password, email });
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.remove(id);
  }

  @Public()
  @Post('/seed')
  async seedUsers() {
    return await this.userService.seed();
  }
}
