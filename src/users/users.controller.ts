import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Request() _req, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll({});
  }

  @Get(':query')
  search(
    @Param('query') query: string,
  ) {
    return this.usersService.findAll({
      where: {
        OR: [
          {
            firstName: { contains: query },
          },
          {
            lastName: { contains: query },
          },
        ],
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update({ id: +id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id });
  }
}
