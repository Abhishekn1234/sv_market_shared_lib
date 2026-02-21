
import { Controller, Get, Query } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Controller('geolocation')
export class GeolocationController {
  constructor(private readonly geolocationService: GeolocationService) {}


  @Get('forward')
  async getCoordinates(@Query('address') address: string) {
    if (!address) return { error: 'Address query is required' };

    const coordinates = await this.geolocationService.getCoordinates(address);
    if (!coordinates) return { error: 'Location not found' };

    return coordinates;
  }

  // Reverse geocoding: coordinates → address
  @Get('reverse')
  async getAddress(@Query('lat') lat: string, @Query('lon') lon: string) {
    if (!lat || !lon) return { error: 'Latitude and longitude are required' };

    const address = await this.geolocationService.getAddress(
      parseFloat(lat),
      parseFloat(lon),
    );

    if (!address) return { error: 'Unable to fetch address' };
    return { address };
  }
}