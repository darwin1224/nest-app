import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export interface CurrentUserOptions {
  required?: boolean;
}

export const CurrentUser: (
  options?: CurrentUserOptions,
) => ParameterDecorator = createParamDecorator(
  (options: CurrentUserOptions = {}, { user }: Request) => {
    if (options.required && !user) {
      throw new UnauthorizedException('You don\'t have any user state');
    }
    return user;
  },
);
