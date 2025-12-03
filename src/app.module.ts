// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocationController } from './infrastructure/http/controllers/location.controller';
import { PrismaService } from './infrastructure/database/prisma/prisma.service';
import { PrismaLocationRepository } from './infrastructure/database/repositories/prisma-location.repository';
import { CreateLocationUseCase } from './application/use-cases/create-location.use-case';
import { ListLocationsUseCase } from './application/use-cases/list-locations.use-case';
import { GetLocationByIdUseCase } from './application/use-cases/get-location-by-id.use-case';
import { UpdateLocationUseCase } from './application/use-cases/update-location.use-case';
import { DeleteLocationUseCase } from './application/use-cases/delete-location.use-case';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
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
export class AppModule {}
