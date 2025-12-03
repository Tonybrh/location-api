// src/infrastructure/http/controllers/location.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateLocationDto } from '../../../application/dtos/create-location.dto';
import { UpdateLocationDto } from '../../../application/dtos/update-location.dto';
import { LocationResponseDto } from '../../../application/dtos/location-response.dto';
import { CreateLocationUseCase } from '../../../application/use-cases/create-location.use-case';
import { ListLocationsUseCase } from '../../../application/use-cases/list-locations.use-case';
import { GetLocationByIdUseCase } from '../../../application/use-cases/get-location-by-id.use-case';
import { UpdateLocationUseCase } from '../../../application/use-cases/update-location.use-case';
import { DeleteLocationUseCase } from '../../../application/use-cases/delete-location.use-case';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(
    private readonly createLocationUseCase: CreateLocationUseCase,
    private readonly getAllLocationsUseCase: ListLocationsUseCase,
    private readonly getLocationByIdUseCase: GetLocationByIdUseCase,
    private readonly updateLocationUseCase: UpdateLocationUseCase,
    private readonly deleteLocationUseCase: DeleteLocationUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo local' })
  @ApiResponse({
    status: 201,
    description: 'Local criado com sucesso',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async create(@Body() dto: CreateLocationDto): Promise<LocationResponseDto> {
    const location = await this.createLocationUseCase.execute(dto);
    return LocationResponseDto.fromEntity(location);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os locais' })
  @ApiResponse({
    status: 200,
    description: 'Lista de locais retornada com sucesso',
    type: [LocationResponseDto],
  })
  async findAll(): Promise<LocationResponseDto[]> {
    const locations = await this.getAllLocationsUseCase.execute();
    return LocationResponseDto.fromEntities(locations);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar local por ID' })
  @ApiParam({ name: 'id', description: 'ID do local' })
  @ApiResponse({
    status: 200,
    description: 'Local encontrado',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Local não encontrado' })
  async findById(@Param('id') id: string): Promise<LocationResponseDto> {
    const location = await this.getLocationByIdUseCase.execute(id);
    return LocationResponseDto.fromEntity(location);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um local' })
  @ApiParam({ name: 'id', description: 'ID do local' })
  @ApiResponse({
    status: 200,
    description: 'Local atualizado com sucesso',
    type: LocationResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Local não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateLocationDto,
  ): Promise<LocationResponseDto> {
    const location = await this.updateLocationUseCase.execute(id, dto);
    return LocationResponseDto.fromEntity(location);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um local' })
  @ApiParam({ name: 'id', description: 'ID do local' })
  @ApiResponse({ status: 204, description: 'Local deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Local não encontrado' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteLocationUseCase.execute(id);
  }
}
