import { describe, it, expect, vi, beforeEach, afterEach, Mock } from 'vitest';
import { WeatherService } from '../../src/services/WeatherService';

describe('WeatherService', () => {
  const mockFetch = vi.fn();
  
  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it('should return weather data on successful fetch', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({
        current_weather: {
          temperature: 32.5,
          weathercode: 0
        }
      })
    });

    const locations = await WeatherService.getLocations();

    expect(locations).toHaveLength(3); // 3 static locations
    expect(locations[0].temp).toBe('33°C');
    expect(locations[0].weather).toBe('☀️'); // emoji for code 0
  });

  it('should fallback to default data on fetch error', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    const locations = await WeatherService.getLocations();

    expect(locations).toHaveLength(3);
    expect(locations[0].temp).toBe('NA');
    expect(locations[0].weather).toBe('?');
  });

  it('should fallback if API returns unexpected data structure', async () => {
    mockFetch.mockResolvedValue({
      json: () => Promise.resolve({
        unexpected_data: true // Missing current_weather
      })
    });

    const locations = await WeatherService.getLocations();
    expect(locations[0].temp).toBe('NA°C');
    expect(locations[0].weather).toBe('☁️');
  });
});
