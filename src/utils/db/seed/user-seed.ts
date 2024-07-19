import { CreateUserDto } from 'src/modules/user/models/user.dto';

export const seedUsers: CreateUserDto[] = [
  {
    username: 'John Doe',
    email: 'john.doe@only-crm.com',
    password: 'password123',
  },
  {
    username: 'Jane Smith',
    email: 'jane.smith@only-crm.com',
    password: 'password456',
  },
  {
    username: 'Alex Forth',
    email: 'alex.forthh@only-crm.com',
    password: 'password456',
  },
  {
    username: 'Jane Zane',
    email: 'jane.zane@only-crm.com',
    password: 'password456',
  },
  // Add more user objects here
];
