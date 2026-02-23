// geolocation.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeolocationService {
  constructor(private readonly httpService: HttpService) {}

  // ✅ Forward Geocoding: Address → Coordinates
  async getCoordinates(address: string): Promise<{ lat: number; lng: number; display_name?: string } | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address,
  )}&limit=1&accept-language=en&addressdetails=1`;

  try {
    const response = await firstValueFrom(
      this.httpService.get<
        { lat: string; lon: string; display_name: string; address: any }[]
      >(url, { headers: { Accept: 'application/json' } }),
    );

    const data = response.data;
    console.log('Nominatim search result:', data);

    if (!data || data.length === 0) return null;

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display_name: data[0].display_name,
    };
  } catch (err) {
    console.error('Geocoding error:', err);
    return null;
  }
}

  // ✅ Reverse Geocoding: Coordinates → Address
  async getAddress(lat: number, lng: number): Promise<string | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&accept-language=en`;

    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(url, {
          headers: { Accept: 'application/json' },
        }),
      );

      const data = response.data;
      if (!data || !data.display_name) return null;

      return data.display_name;
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      return null;
    }
  }
  async getSuggestions(query: string): Promise<string[]> {
    if (!query) return [];
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&q=${encodeURIComponent(query)}`
      );
      const data: { display_name?: string }[] = await res.json();
      return data.map(d => d.display_name ?? '');
    } catch (error) {
      console.error('GeolocationService.getSuggestions error:', error);
      return [];
    }
  }
}