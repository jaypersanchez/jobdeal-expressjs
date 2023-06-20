import { ApiProperty } from '@nestjs/swagger';

export class CreateApplicantDto {
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
