import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SettingItem from '../../src/components/SettingItem.vue';

describe('SettingItem.vue', () => {
  it('renders props.label and props.icon properly', () => {
    const label = 'My Setting';
    const icon = '<svg>Icon</svg>';
    
    const wrapper = mount(SettingItem, {
      props: { label, icon }
    });

    expect(wrapper.text()).toContain(label);
    expect(wrapper.html()).toContain(icon);
  });
});
