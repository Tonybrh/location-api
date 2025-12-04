import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { LOCATION_REPOSITORY } from '../../shared/tokens/injection-tokens';

@Injectable()
export class DeleteLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.localRepository.delete(id);
  }
}
