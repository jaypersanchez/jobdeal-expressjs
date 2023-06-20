import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApplicantsService } from 'src/applicants/applicants.service';
import { Applicant } from '@prisma/client';
import { ApplyJobDto } from './dto/apply-job.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService, private readonly applicantsService: ApplicantsService) {}

  @Post()
  create(@Request() req, @Body() data: CreateJobDto) {
    data.user = {
      connect: { id: req.user.id }
    }
    if (data.categoryIds) {
      // data.categories = {
      //   connect: { ids: data.categoryIds }
      // }
    }
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove({ id: +id });
  }

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
