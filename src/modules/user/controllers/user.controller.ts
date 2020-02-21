import { Roles } from '@app/decorators/roles.decorator';
import { AuthenticateGuard } from '@app/guards/authenticate.guard';
import { AuthorizeGuard } from '@app/guards/authorize.guard';
import { ResourceCollectionInterceptor } from '@app/interceptors/resource-collection.interceptor';
import { UserDto } from '@app/modules/user/dtos/user.dto';
import { User } from '@app/modules/user/models/user';
import { UserService } from '@app/modules/user/services/user.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
@UseGuards(AuthenticateGuard, AuthorizeGuard)
export class UserController {
  public constructor(private readonly user: UserService) {}

  @Get()
  @Roles('admin')
  @UseInterceptors(ResourceCollectionInterceptor)
  public async index(@Req() req: Request): Promise<User[]> {
    try {
      return await this.user.getAllUser();
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get(':id')
  @Roles('admin')
  public async show(@Param('id') id: number): Promise<User> {
    try {
      const data = await this.user.getUserById(id);
      if (!data) throw new NotFoundException('User not found');
      return data;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Post()
  @Roles('admin')
  public async store(@Body() userDto: UserDto): Promise<User> {
    try {
      return await this.user.insertUser(userDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Put(':id')
  @Roles('admin')
  public async update(
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ): Promise<User> {
    try {
      const data = await this.user.getUserById(id);
      if (!data) throw new NotFoundException('User not found');
      await this.user.updateUser(id, userDto);
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Delete(':id')
  @Roles('admin')
  public async destroy(@Param('id') id: number): Promise<User> {
    try {
      const data = await this.user.getUserById(id);
      if (!data) throw new NotFoundException('User not found');
      await this.user.deleteUser(id);
      return data;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
