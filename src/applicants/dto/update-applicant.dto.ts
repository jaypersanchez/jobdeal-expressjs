import { PartialType } from '@nestjs/swagger';
import { CreateApplicantDto } from './create-applicant.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  jobId: number;

  @ApiProperty()
  coverLetter: string;

  @ApiProperty()
  price: number;

  job: object;

  user: object;
}
