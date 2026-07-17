import { describe, it, expect, vi } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import WeatherView from '../../src/views/WeatherView.vue';
import { WeatherService } from '../../src/services/WeatherService';

// Mock WeatherService
vi.mock('../../src/services/WeatherService', () => ({
  WeatherService: {
    getLocations: vi.fn()
  }
}));

describe('WeatherView.vue', () => {
  it('renders loading state initially', () => {
    (WeatherService.getLocations as any).mockReturnValue(new Promise(() => {}));
    
    const wrapper = mount(WeatherView);
    expect(wrapper.text()).toContain('កំពុងផ្ទុកទិន្នន័យ...');
  });

  it('renders weather locations after loading', async () => {
    (WeatherService.getLocations as any).mockResolvedValue([
      { id: 1, name: 'ភ្នំពេញ', temp: '32°C', image: '', weather: '☀️' }
    ]);

    const wrapper = mount(WeatherView);
    await flushPromises();

    expect(wrapper.text()).not.toContain('កំពុងផ្ទុកទិន្នន័យ...');
    expect(wrapper.text()).toContain('ភ្នំពេញ');
    expect(wrapper.text()).toContain('32°C');
  });

  it('renders empty container if no locations returned', async () => {
    (WeatherService.getLocations as any).mockResolvedValue([]);

    const wrapper = mount(WeatherView);
    await flushPromises();

    expect(wrapper.text()).not.toContain('កំពុងផ្ទុកទិន្នន័យ...');
    const cards = wrapper.findAll('.cards-container > *');
    expect(cards.length).toBe(0);
  });
});
