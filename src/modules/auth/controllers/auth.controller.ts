import { CurrentUser } from '@app/decorators/current-user.decorator';
import { AuthenticateGuard } from '@app/guards/authenticate.guard';
import { LoginDto } from '@app/modules/auth/dtos/login.dto';
import { JwtPayload } from '@app/modules/auth/strategies/auth.strategy';
import { UserService } from '@app/modules/user/services/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly user: UserService,
    private readonly jwt: JwtService,
  ) {}

  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginDto: LoginDto): Promise<any> {
    try {
      const authenticatedUser = await this.user.getUserByUsernameAndPassword(
        loginDto,
      );
      if (!authenticatedUser) {
        throw new UnauthorizedException('Authentication failed');
      }
      return { token: this.jwt.sign(classToPlain(authenticatedUser)) };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }

  @Get('credentials')
  @UseGuards(AuthenticateGuard)
  public getCredential(
    @CurrentUser({ required: true }) user: JwtPayload,
  ): JwtPayload {
    return user;
  }
}
