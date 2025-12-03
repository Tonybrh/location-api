import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';

@Injectable()
export class GetLocationByIdUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(id: string): Promise<Location> {
    const local = await this.localRepository.findById(id);

    if (!local) {
      throw new NotFoundException(`Local com ID ${id} não encontrado`);
    }

    return local;
  }
}
