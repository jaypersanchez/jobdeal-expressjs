import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Request() _req, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.usersService.findAll({});
  }

  @Public()
  @Get(':query')
  search(@Param('query') query: string) {
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
      },
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id: +id });
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (req.user.id !== +id) {
      return { message: 'You can update your profile only', statusCode: 403 };
    }

    if (file) {
      data.avatar = file.path;
      delete data.file;
    }
    return this.usersService.update({ id: +id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id: +id });
  }
}
