import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Applicant, Prisma } from '@prisma/client';

@Injectable()
export class ApplicantsService {
  constructor(private prisma: PrismaService) {}
  
  async create(data: Prisma.ApplicantCreateInput): Promise<Applicant> {
    return this.prisma.applicant.create({
      data,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ApplicantWhereUniqueInput;
    where?: Prisma.ApplicantWhereInput;
    orderBy?: Prisma.ApplicantOrderByWithRelationInput;
  }): Promise<Applicant[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.applicant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    where: Prisma.ApplicantWhereUniqueInput,
  ): Promise<Applicant | null> {
    return this.prisma.applicant.findUnique({
      where,
    });
  }

  async update(where: Prisma.ApplicantWhereUniqueInput, data: Prisma.ApplicantUpdateInput): Promise<Applicant> {
    return this.prisma.applicant.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ApplicantWhereUniqueInput): Promise<Applicant> {
    return this.prisma.applicant.delete({
      where,
    });
  }
}
