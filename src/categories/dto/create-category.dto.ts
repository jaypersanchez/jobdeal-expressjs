import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  parentId?: number;

  parent: object;

  user: object;

  @ApiProperty()
  color?: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image?: string;
}