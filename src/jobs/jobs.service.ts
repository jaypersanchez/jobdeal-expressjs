import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Job, Prisma } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
  
  async create(data: Prisma.JobCreateInput): Promise<Job> {
    return this.prisma.job.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.JobWhereUniqueInput;
    where?: Prisma.JobWhereInput;
    orderBy?: Prisma.JobOrderByWithRelationInput;
  }): Promise<Job[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.job.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    where: Prisma.JobWhereUniqueInput,
  ): Promise<Job | null> {
    return this.prisma.job.findUnique({
      where,
    });
  }

  async update(where: Prisma.JobWhereUniqueInput, data: Prisma.JobUpdateInput): Promise<Job> {
    return this.prisma.job.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.JobWhereUniqueInput): Promise<Job> {
    return this.prisma.job.delete({
      where,
    });
  }
}
