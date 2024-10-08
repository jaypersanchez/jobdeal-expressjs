import {
  Controller,
  Body,
  Request,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Public } from './public.decorator';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req, @Body() _data: LoginDto) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  register(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
