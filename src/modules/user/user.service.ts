import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { CreateUserDto, UpdateUserDto } from './models/user.dto';
import { seedUsers } from 'src/utils/db/seed/user-seed';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async updateOne(id: string, dto: UpdateUserDto) {
    return this.userModel.update(dto, {
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async login(email: string) {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async seed(): Promise<void> {
    for await (const user of seedUsers) {
      const found = await this.userModel.findOne({
        where: {
          email: user.email,
        },
      });
      if (found) {
        continue;
      }
      await this.create(user);
    }
  }
}
