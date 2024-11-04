import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileRequest {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '081234567890',
  })
  @IsString()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({
    example: 'Jl. Mastrip',
  })
  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @ApiProperty({
    example: 'Jember',
  })
  @IsString()
  @IsNotEmpty()
  readonly placeOfBirth: string;

  @ApiProperty({
    example: new Date(),
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly dateOfBirth: Date;
}
