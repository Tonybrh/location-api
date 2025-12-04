import { Injectable, Inject } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { LOCATION_REPOSITORY } from '../../shared/tokens/injection-tokens';
import { S3UploadService } from '../../infrastructure/services/s3-upload.service';

@Injectable()
export class CreateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
    private readonly s3UploadService: S3UploadService,
  ) {}

  async execute(
    dto: CreateLocationDto,
    image: Express.Multer.File,
  ): Promise<Location> {
    const imageUrl = (await this.s3UploadService.uploadFile(
      image,
      'locations',
    )) as string;

    const location = Location.create({
      name: dto.name,
      description: dto.description,
      latitude: dto.latitude,
      longitude: dto.longitude,
      imageUrl,
    });

    return await this.locationRepository.create(location);
  }
}
