import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Controller('Jobs')
export class JobsController {
  constructor(private readonly JobsService: JobsService) {}

  @Post()
  create(@Body() data: CreateJobDto) {
    data.user = {
      connect: { id: 1 }
    }
    if (data.categoryIds) {
      // data.categories = {
      //   connect: { ids: data.categoryIds }
      // }
    }
    delete data.categoryIds;
    return this.JobsService.create(data);
  }

  @Get()
  findAll() {
    return this.JobsService.findAll({});
  }

  @Get(':query')
  search(
    @Param('query') query: string,
  ) {
    return this.JobsService.findAll({
      where: {
        OR: [
          {
            title: { contains: query },
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
    return this.JobsService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateJobDto) {
    if (data.categoryIds) {
      // data.categories = {
      //   connect: { ids: data.categoryIds }
      // }
    }
    delete data.categoryIds;
    return this.JobsService.update({ id: +id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.JobsService.remove({ id: +id });
  }
}
