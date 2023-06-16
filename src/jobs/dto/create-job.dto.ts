import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
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

  user: object;
}
