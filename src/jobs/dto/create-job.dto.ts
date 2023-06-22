import { ApiProperty } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  lat?: string;

  @ApiProperty({ required: false })
  lng?: string;

  @ApiProperty({
    type: 'array',
    required: false,
    items: {
      type: 'integer',
    }
  })
  categoryIds?: number[];

  
  @ApiProperty({
    type: 'array',
    required: false,
    items: {
      type: 'file',
      format: 'binary',
    }
  })
  files?: Express.Multer.File[]

  images: string[];

  categories: object;

  user: object;
}
