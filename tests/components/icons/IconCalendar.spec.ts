import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconCalendar from '../../../src/components/icons/IconCalendar.vue';

describe('IconCalendar.vue', () => {
  it('renders SVG icon', () => {
    const wrapper = mount(IconCalendar);
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
