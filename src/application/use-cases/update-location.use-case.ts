import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';
import { LOCATION_REPOSITORY } from '../../shared/tokens/injection-tokens';

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(id: string, data: Partial<Location>): Promise<Location> {
    return await this.localRepository.update(id, data);
  }
}
