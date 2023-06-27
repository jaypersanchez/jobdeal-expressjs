import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @Post()
  create(@Request() req, @Body() data: CreateCategoryDto) {
    data.user = {
      connect: { id: req.user.id },
    };
    if (data.parentId) {
      data.parent = {
        connect: { id: data.parentId },
      };
    }
    delete data.parentId;
    return this.categoriesService.create(data);
  }

  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll({});
  }

  @Public()
  @Get(':query')
  search(@Param('query') query: string) {
    return this.categoriesService.findAll({
      where: {
        OR: [
          {
            name: { contains: query },
          },
          {
            description: { contains: query },
          },
        ],
      },
    });
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id: +id });
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    if (data.parentId) {
      data.parent = {
        connect: { id: data.parentId },
      };
    }
    delete data.parentId;
    return this.categoriesService.update({ id: +id }, data);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove({ id: +id });
  }
}
