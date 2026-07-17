import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconWeather from '../../../src/components/icons/IconWeather.vue';

describe('IconWeather.vue', () => {
  it('renders SVG icon', () => {
    const wrapper = mount(IconWeather);
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
