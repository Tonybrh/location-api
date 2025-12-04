import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @ApiProperty({ example: 'Cristo Redentor', description: 'Nome do local' })
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  @MinLength(3, { message: 'Nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({
    example: 'Estátua icônica localizada no topo do Morro do Corcovado',
    description: 'Descrição do local',
  })
  @IsString()
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  description: string;

  @ApiProperty({ example: -22.951916, description: 'Latitude do local' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Latitude deve ser um número' })
  @Min(-90, { message: 'Latitude mínima é -90' })
  @Max(90, { message: 'Latitude máxima é 90' })
  latitude: number;

  @ApiProperty({ example: -43.210487, description: 'Longitude do local' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Longitude deve ser um número' })
  @Min(-180, { message: 'Longitude mínima é -180' })
  @Max(180, { message: 'Longitude máxima é 180' })
  longitude: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Arquivo de imagem do local',
  })
  image: Express.Multer.File;
}
