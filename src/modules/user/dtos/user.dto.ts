import { User } from '@app/modules/user/models/user';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto implements Partial<User> {
  @IsNotEmpty()
  @IsString()
  @Length(4, 50)
  public name: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30)
  public role_user: string;
}
