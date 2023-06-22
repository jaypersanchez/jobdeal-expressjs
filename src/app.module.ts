import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { ApplicantsModule } from './applicants/applicants.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    JobsModule,
    AuthModule,
    ApplicantsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
