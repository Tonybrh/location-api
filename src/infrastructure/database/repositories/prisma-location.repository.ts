import { Injectable, NotFoundException } from '@nestjs/common';
import { ILocationRepository } from '../../../domain/repositories/location.repository.interface';
import { Location } from '../../../domain/entities/location.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrismaLocationRepository implements ILocationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(location: Location): Promise<Location> {
    const created = await this.prisma.location.create({
      data: {
        id: location.id,
        name: location.name,
        description: location.description,
        latitude: location.latitude,
        longitude: location.longitude,
        imageUrl: location.imageUrl,
      },
    });

    return new Location(
      created.id,
      created.name,
      created.description,
      created.latitude,
      created.longitude,
      created.imageUrl,
    );
  }

  async findAll(): Promise<Location[]> {
    const locations = await this.prisma.location.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return locations.map(
      (loc) =>
        new Location(
          loc.id,
          loc.name,
          loc.description,
          loc.latitude,
          loc.longitude,
          loc.imageUrl,
        ),
    );
  }

  async findById(id: string): Promise<Location | null> {
    const location = await this.prisma.location.findUnique({
      where: { id },
    });

    if (!location) return null;

    return new Location(
      location.id,
      location.name,
      location.description,
      location.latitude,
      location.longitude,
      location.imageUrl,
    );
  }

  async update(
    id: string,
    data: Partial<Omit<Location, 'id'>>,
  ): Promise<Location> {
    try {
      const updated = await this.prisma.location.update({
        where: { id },
        data,
      });

      return new Location(
        updated.id,
        updated.name,
        updated.description,
        updated.latitude,
        updated.longitude,
        updated.imageUrl,
      );
    } catch (error) {
      throw new NotFoundException(`Location com ID ${id} não encontrado`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prisma.location.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Location com ID ${id} não encontrado`);
    }
  }
}
