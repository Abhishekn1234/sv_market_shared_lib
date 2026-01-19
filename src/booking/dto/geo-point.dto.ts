import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, ArrayMinSize, ArrayMaxSize, IsNumber } from 'class-validator';

export class GeoPointDTO {
  @ApiProperty({ example: 'Point' })
  @IsIn(['Point'])
  type: 'Point';

  @ApiProperty({
    example: [12.9716, 77.5946],
    description: '[longitude, latitude]'
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates: [number, number];
}
