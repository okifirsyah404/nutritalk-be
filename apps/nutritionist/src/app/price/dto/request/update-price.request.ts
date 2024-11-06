import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdatePriceRequest {
  @ApiProperty({
    example: 50_000,
  })
  @Min(50_000)
  @IsInt({})
  @IsNotEmpty()
  online: number;

  @ApiProperty({
    example: 50_000,
  })
  @Min(50_000)
  @IsInt({})
  @IsNotEmpty()
  offline: number;
}
