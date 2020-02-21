import { AuthController } from '@app/modules/auth/controllers/auth.controller';
import { AuthStrategy } from '@app/modules/auth/strategies/auth.strategy';
import { UserModule } from '@app/modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: '123456',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  providers: [AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
