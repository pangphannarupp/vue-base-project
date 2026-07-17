import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconMore from '../../../src/components/icons/IconMore.vue';

describe('IconMore.vue', () => {
  it('renders SVG icon', () => {
    const wrapper = mount(IconMore);
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
