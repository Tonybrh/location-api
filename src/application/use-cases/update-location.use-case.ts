import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(id: string, data: Partial<Location>): Promise<Location> {
    return await this.localRepository.update(id, data);
  }
}
