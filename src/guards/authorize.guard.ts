import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizeGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;
    return this.matchRoles(
      roles,
      context.switchToHttp().getRequest().user.role_user,
    );
  }

  private matchRoles(roles: string[], userRole: string): boolean {
    if (roles.indexOf(userRole) === -1) {
      throw new ForbiddenException('You are now allowed to access this route');
    }
    return true;
  }
}
