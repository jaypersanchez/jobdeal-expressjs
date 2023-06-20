import { Module } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApplicantsController } from './applicants.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ApplicantsService, PrismaService],
  controllers: [ApplicantsController]
})
export class ApplicantsModule {}
