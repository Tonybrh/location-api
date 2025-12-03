import { v4 as uuid } from 'uuid';

export class Location {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly imageUrl: string;

  constructor(
    id: string,
    name: string,
    description: string,
    latitude: number,
    longitude: number,
    imageUrl: string,
  ) {
    if (!name || name.length < 3) {
      throw new Error(
        'Nome do local é obrigatório e deve ter mais de 3 caracteres.',
      );
    }
    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      throw new Error('Latitude inválida.');
    }

    this.id = id;
    this.name = name;
    this.description = description;
    this.latitude = latitude;
    this.longitude = longitude;
    this.imageUrl = imageUrl;
  }

  static create(data: {
    name: string;
    description: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
  }): Location {
    return new Location(
      uuid(),
      data.name,
      data.description,
      data.latitude,
      data.longitude,
      data.imageUrl,
    );
  }
}
