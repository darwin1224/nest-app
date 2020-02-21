import { LoginDto } from '@app/modules/auth/dtos/login.dto';
import { UserDto } from '@app/modules/user/dtos/user.dto';
import { User } from '@app/modules/user/models/user';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  public constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  public getAllUser(): Promise<User[]> {
    return this.user.find();
  }

  public getUserById(id: number): Promise<User> {
    return this.user.findOne(id);
  }

  public insertUser(userDto: UserDto): Promise<User> {
    return this.user.save(userDto);
  }

  public updateUser(id: number, userDto: UserDto): Promise<UpdateResult> {
    return this.user.update(id, userDto);
  }

  public deleteUser(id: number): Promise<DeleteResult> {
    return this.user.delete(id);
  }

  public getUserByUsernameAndPassword({
    username,
    password,
  }: LoginDto): Promise<User> {
    return this.user.findOne({ username, password });
  }
}
