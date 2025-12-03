import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';

@Injectable()
export class DeleteLocalUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(id: string): Promise<void> {
    await this.localRepository.delete(id);
  }
}
