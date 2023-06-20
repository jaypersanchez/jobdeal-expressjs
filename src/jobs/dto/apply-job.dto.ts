import { ApiProperty } from '@nestjs/swagger';

export class ApplyJobDto {
  @ApiProperty()
  coverLetter: string;

  @ApiProperty()
  price: number;
}
