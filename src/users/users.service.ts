import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityNotFoundError } from 'src/errors/entity-not-found-error';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Gledson Lucas Medina',
      email: 'gledson@gmail.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const currentMaxId = this.users[this.users.length - 1]?.id || 0;
    const id = currentMaxId + 1;
    const user: User = {
      id,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const findUserById: User = this.users.find((user) => user.id === id);
    if (!findUserById) {
      throw new EntityNotFoundError(`User with #${id} was not found.`);
    }
    return findUserById;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user: User = this.findOne(id);

    const newUser = {
      ...user,
      ...updateUserDto,
    };
    const index = this.users.indexOf(user);
    this.users[index] = newUser;

    return newUser;
  }

  remove(id: number) {
    const user = this.findOne(id);
    const index = this.users.indexOf(user);

    this.users.splice(index, 1);
  }
}
