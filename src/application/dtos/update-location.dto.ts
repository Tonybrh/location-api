import { PartialType, OmitType, ApiProperty } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';

export class UpdateLocationDto extends PartialType(
  OmitType(CreateLocationDto, ['image'] as const),
) {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Nova imagem do local (opcional)',
  })
  image?: Express.Multer.File;
}
