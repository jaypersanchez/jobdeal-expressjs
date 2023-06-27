import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';

@ApiBearerAuth()
@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly ApplicantsService: ApplicantsService) {}

  @Post()
  create(@Request() req, @Body() data: CreateApplicantDto) {
    data.user = {
      connect: { id: data.userId },
    };
    data.job = {
      connect: { id: data.jobId },
    };
    delete data.userId;
    delete data.jobId;
    return this.ApplicantsService.create(data);
  }

  @Get()
  findAll() {
    return this.ApplicantsService.findAll({});
  }

  @Get(':query')
  search(@Param('query') query: string) {
    return this.ApplicantsService.findAll({
      where: {
        OR: [
          {
            user: {
              firstName: { contains: query },
            },
          },
          {
            user: {
              lastName: { contains: query },
            },
          },
        ],
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ApplicantsService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateApplicantDto) {
    return this.ApplicantsService.update({ id: +id }, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ApplicantsService.remove({ id: +id });
  }
}
