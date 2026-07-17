import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WeatherCard from '../../src/components/WeatherCard.vue';

describe('WeatherCard.vue', () => {
  it('renders weather location props properly', () => {
    const mockLocation = {
      id: 1,
      name: 'ភ្នំពេញ',
      temp: '32°C',
      image: 'https://example.com/image.jpg',
      weather: '☀️'
    };

    const wrapper = mount(WeatherCard, {
      props: {
        location: mockLocation
      }
    });

    expect(wrapper.text()).toContain('ភ្នំពេញ');
    expect(wrapper.text()).toContain('32°C');
    expect(wrapper.text()).toContain('☀️');

    const card = wrapper.find('.weather-card');
    expect(card.attributes('style')).toContain('https://example.com/image.jpg');
  });

  it('renders correctly when no image is provided', () => {
    const mockLocation = {
      id: 2,
      name: 'សៀមរាប',
      temp: '30°C',
      image: '',
      weather: '☁️'
    };

    const wrapper = mount(WeatherCard, {
      props: {
        location: mockLocation
      }
    });

    expect(wrapper.text()).toContain('សៀមរាប');
    const card = wrapper.find('.weather-card');
    expect(card.attributes('style')).toContain('url("")');
  });
});
