/**
 * ចំណុចប្រទាក់សម្រាប់ទីតាំងអាកាសធាតុ (Interface for Weather Location)
 */
export interface WeatherLocation {
  /** លេខសម្គាល់ទីតាំង (Location ID) */
  id: number;
  /** ឈ្មោះទីតាំង (Location name) */
  name: string;
  /** សីតុណ្ហភាព (Temperature) */
  temp: string;
  /** រូបភាពតំណាង (Background image URL) */
  image: string;
  /** ស្ថានភាពអាកាសធាតុ (Weather condition emoji) */
  weather: string;
}

/**
 * ការកំណត់រចនាសម្ព័ន្ធទីតាំង (Static location configurations)
 */
const LOCATIONS_CONFIG = [
  { id: 1, name: 'ភ្នំពេញ', lat: 11.5564, lon: 104.9282, image: 'https://images.unsplash.com/photo-1581451528825-968b5ce53b75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'សៀមរាប', lat: 13.3611, lon: 103.8606, image: 'https://images.unsplash.com/photo-1560961803-057d2a5a544b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'ព្រះសីហនុ', lat: 10.6253, lon: 103.5234, image: 'https://images.unsplash.com/photo-1596700685934-45300d075217?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
];

/**
 * បំប្លែងលេខកូដអាកាសធាតុទៅជារូបតំណាង (Map WMO weather code to emoji)
 * @param code លេខកូដអាកាសធាតុ (Weather code from API)
 */
const mapWeatherCodeToEmoji = (code: number): string => {
  if (code === 0) return '☀️'; // មេឃស្រឡះ (Clear sky)
  if (code === 1 || code === 2 || code === 3) return '⛅'; // មានពពកខ្លះ (Partly cloudy)
  if (code >= 45 && code <= 48) return '🌫️'; // អ័ព្ទ (Fog)
  if (code >= 51 && code <= 67) return '🌧️'; // ភ្លៀងរលឹម (Drizzle / Rain)
  if (code >= 71 && code <= 86) return '❄️'; // ព្រិល (Snow)
  if (code >= 95 && code <= 99) return '⛈️'; // ព្យុះផ្គររន្ទះ (Thunderstorm)
  return '☁️'; // លំនាំដើម (Default fallback)
};

/**
 * សេវាកម្មសម្រាប់ទាញយកទិន្នន័យអាកាសធាតុ (Service for fetching weather data)
 */
export class WeatherService {
  /**
   * ទាញយកទិន្នន័យអាកាសធាតុបច្ចុប្បន្នដោយប្រើ Open-Meteo API ឥតគិតថ្លៃ។
   */
  static async getLocations(): Promise<WeatherLocation[]> {
    try {
      const fetchPromises = LOCATIONS_CONFIG.map(async (loc) => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true`);
        const data = await res.json();
        
        const temp = data.current_weather?.temperature ? Math.round(data.current_weather.temperature) : 'NA';
        const code = data.current_weather?.weathercode ?? -1;
        const emoji = mapWeatherCodeToEmoji(code);

        return {
          id: loc.id,
          name: loc.name,
          temp: `${temp}°C`,
          image: loc.image,
          weather: emoji
        };
      });

      return await Promise.all(fetchPromises);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Fallback in case of network error
      return LOCATIONS_CONFIG.map(loc => ({
        id: loc.id,
        name: loc.name,
        temp: 'NA',
        image: loc.image,
        weather: '?'
      }));
    }
  }
}
