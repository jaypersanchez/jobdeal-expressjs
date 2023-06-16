import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  parentId?: number;

  parent: object;

  @ApiProperty()
  color?: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image?: string;
}
