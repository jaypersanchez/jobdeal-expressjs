import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApplicantsService } from 'src/applicants/applicants.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService, private readonly applicantsService: ApplicantsService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files'))
  create(@Request() req, @Body() data: CreateJobDto, @UploadedFiles() files: Express.Multer.File[]) {
    console.log(data)
    data.price = +data.price;
    data.user = {
      connect: { id: req.user.id }
    }
    if (data.categoryIds) {
      data.categories = {
        connect: { id: +data.categoryIds[0] }
      }
    }
    data.images = files.map(image => image.path);
    delete data.files
    delete data.categoryIds;
    return this.jobsService.create(data);
  }

  @Get()
  findAll() {
    return this.jobsService.findAll({});
  }

  @Get(':query')
  search(
    @Param('query') query: string,
  ) {
    return this.jobsService.findAll({
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
    return this.jobsService.findOne({ id: +id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateJobDto) {
    if (data.categoryIds) {
      // data.categories = {
      //   connect: { ids: data.categoryIds }
      // }
    }
    delete data.categoryIds;
    return this.jobsService.update({ id: +id }, data);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove({ id: +id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/apply')
  async apply(@Request() req, @Param('id') id: string, @Body() data: ApplyJobDto) {
    const job = await this.jobsService.findOne({id: +id});
    if (req.user.id === job.id) {
      return { message: 'You can\'t apply for the job you posted', 'statusCode': 400 }
    }
    return this.applicantsService.create({ 
      user: {
        connect: {
          id: req.user.id,
        }
      },
      job: {
        connect: {
          id: +id
        }
      },
      coverLetter: data.coverLetter,
      price: data.price
     });
  }
}
