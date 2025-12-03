import { Location } from '../entities/location.entity';

export interface ILocationRepository {
  create(
    local: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Location>;
  findAll(): Promise<Location[]>;
  findById(id: string): Promise<Location | null>;
  update(id: string, local: Partial<Location>): Promise<Location>;
  delete(id: string): Promise<void>;
}

export const ILocationRepository = Symbol('ILocationRepository');