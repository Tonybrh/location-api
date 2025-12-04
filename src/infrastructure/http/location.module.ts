// src/infrastructure/http/location.module.ts
import { Module } from '@nestjs/common';
import { LocationController } from './controllers/location.controller';
import { PrismaService } from '../services/prisma.service';
import { PrismaLocationRepository } from '../repositories/prisma-location.repository';
import { CreateLocationUseCase } from '../../application/use-cases/create-location.use-case';
import { ListLocationsUseCase } from '../../application/use-cases/list-locations.use-case';
import { GetLocationByIdUseCase } from '../../application/use-cases/get-location-by-id.use-case';
import { UpdateLocationUseCase } from '../../application/use-cases/update-location.use-case';
import { DeleteLocationUseCase } from '../../application/use-cases/delete-location.use-case';

@Module({
  controllers: [LocationController],
  providers: [
    PrismaService,
    {
      provide: 'ILocationRepository',
      useClass: PrismaLocationRepository,
    },
    CreateLocationUseCase,
    ListLocationsUseCase,
    GetLocationByIdUseCase,
    UpdateLocationUseCase,
    DeleteLocationUseCase,
  ],
})
export class LocationModule {}
