import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() data: CreateCategoryDto) {
    data.user = {
      connect: { id: req.user.id }
    }
    if (data.parentId) {
      data.parent = {
        connect: { id: data.parentId }
      }
    }
    delete data.parentId;
    return this.categoriesService.create(data);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll({});
  }

  @Get(':query')
  search(
    @Param('query') query: string,
  ) {
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
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne({ id: +id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
    if (data.parentId) {
      data.parent = {
        connect: { id: data.parentId }
      }
    }
    delete data.parentId;
    return this.categoriesService.update({ id: +id }, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove({ id: +id });
  }
}
