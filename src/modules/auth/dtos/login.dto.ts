import { User } from '@app/modules/user/models/user';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto implements Partial<User> {
  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}
