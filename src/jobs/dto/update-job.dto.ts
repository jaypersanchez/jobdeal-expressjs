import { PartialType } from '@nestjs/swagger';
import { CreateJobDto } from './create-job.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  address: string;

  @ApiProperty()
  lat: string;

  @ApiProperty()
  lng: string;

  @ApiProperty()
  categoryIds?: number[];

  categories: object;
}
