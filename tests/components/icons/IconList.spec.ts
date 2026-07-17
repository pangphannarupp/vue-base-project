import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import IconList from '../../../src/components/icons/IconList.vue';

describe('IconList.vue', () => {
  it('renders SVG icon', () => {
    const wrapper = mount(IconList);
    expect(wrapper.find('svg').exists()).toBe(true);
  });
});
