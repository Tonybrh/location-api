import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';

@Injectable()
export class CreateLocationUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(
    data: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Location> {
    return await this.localRepository.create(data);
  }
}
