import { User } from '@app/modules/user/models/user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload extends User {
  iat: number;
  exp: number;
}

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '123456',
    });
  }

  public validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
