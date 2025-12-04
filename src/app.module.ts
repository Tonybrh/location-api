// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocationController } from './infrastructure/http/controllers/location.controller';
import { PrismaService } from './infrastructure/services/prisma.service';
import { PrismaLocationRepository } from './infrastructure/repositories/prisma-location.repository';
import { S3UploadService } from './infrastructure/services/s3-upload.service';
import { CreateLocationUseCase } from './application/use-cases/create-location.use-case';
import { ListLocationsUseCase } from './application/use-cases/list-locations.use-case';
import { GetLocationByIdUseCase } from './application/use-cases/get-location-by-id.use-case';
import { UpdateLocationUseCase } from './application/use-cases/update-location.use-case';
import { DeleteLocationUseCase } from './application/use-cases/delete-location.use-case';
import { LOCATION_REPOSITORY } from './shared/tokens/injection-tokens';

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
    S3UploadService,
    {
      provide: LOCATION_REPOSITORY,
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
