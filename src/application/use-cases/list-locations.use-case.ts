import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';
import { LOCATION_REPOSITORY } from 'src/shared/tokens/injection-tokens';

@Injectable()
export class ListLocationsUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(): Promise<Location[]> {
    return await this.localRepository.findAll();
  }
}
