import { Injectable, Inject } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';
import { UpdateLocationDto } from '../dtos/update-location.dto';
import { LOCATION_REPOSITORY } from '../../shared/tokens/injection-tokens';
import { S3UploadService } from '../../infrastructure/services/s3-upload.service';

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: ILocationRepository,
    private readonly s3UploadService: S3UploadService,
  ) {}

  async execute(
    id: string,
    dto: UpdateLocationDto,
    image?: Express.Multer.File,
  ): Promise<Location> {
    let imageUrl: string | undefined;

    if (image) {
      const existingLocation = await this.locationRepository.findById(id);
      if (existingLocation?.imageUrl) {
        await this.s3UploadService.deleteFile(existingLocation.imageUrl);
      }

      imageUrl = (await this.s3UploadService.uploadFile(
        image,
        'locations',
      )) as string;
    }

    return await this.locationRepository.update(id, {
      ...dto,
      ...(imageUrl && { imageUrl }),
    });
  }
}
