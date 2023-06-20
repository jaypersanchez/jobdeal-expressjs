import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  zip?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  country?: string;

  @ApiProperty()
  locale?: string;

  @ApiProperty()
  avatar?: string;

  @ApiProperty()
  lat?: string;

  @ApiProperty()
  lng?: string;

  @ApiProperty()
  timezone?: string;
}