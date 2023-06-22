import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ApplicantsService } from 'src/applicants/applicants.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/jobs',
        filename: function (_req, file, cb) {
          cb(null, `${new Date().getTime()}_${file.originalname}`) //Appending .jpg
        },
      })
    })
  ],
  controllers: [JobsController],
  providers: [JobsService, PrismaService, ApplicantsService]
})
export class JobsModule {}
