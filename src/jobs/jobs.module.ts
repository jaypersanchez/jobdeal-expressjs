import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicantsService } from 'src/applicants/applicants.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, PrismaService, ApplicantsService]
})
export class JobsModule {}
