import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../../domain/entities/location.entity';

export class LocationResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Cristo Redentor' })
  name: string;

  @ApiProperty({
    example: 'Estátua icônica localizada no topo do Morro do Corcovado',
  })
  description: string;

  @ApiProperty({ example: -22.951916 })
  latitude: number;

  @ApiProperty({ example: -43.210487 })
  longitude: number;

  @ApiProperty({
    example: 'https://bucket.s3.amazonaws.com/locations/image.jpg',
  })
  imageUrl: string;

  constructor(location: Location) {
    this.id = location.id;
    this.name = location.name;
    this.description = location.description;
    this.latitude = location.latitude;
    this.longitude = location.longitude;
    this.imageUrl = location.imageUrl;
  }

  static fromEntity(location: Location): LocationResponseDto {
    return new LocationResponseDto(location);
  }

  static fromEntities(locations: Location[]): LocationResponseDto[] {
    return locations.map((location) => new LocationResponseDto(location));
  }
}
