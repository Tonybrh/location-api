import { Inject, Injectable } from '@nestjs/common';
import { ILocationRepository } from '../../domain/repositories/location.repository.interface';
import { Location } from '../../domain/entities/location.entity';

@Injectable()
export class ListLocalsUseCase {
  constructor(
    @Inject(ILocationRepository)
    private readonly localRepository: ILocationRepository,
  ) {}

  async execute(): Promise<Location[]> {
    return await this.localRepository.findAll();
  }
}
