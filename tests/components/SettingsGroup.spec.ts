import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SettingsGroup from '../../src/components/SettingsGroup.vue';

describe('SettingsGroup.vue', () => {
  it('renders title prop and slot content', () => {
    const wrapper = mount(SettingsGroup, {
      props: {
        title: 'Appearance'
      },
      slots: {
        default: '<div class="slotted-content">Theme Options</div>'
      }
    });

    expect(wrapper.text()).toContain('Appearance');
    
    const slotted = wrapper.find('.slotted-content');
    expect(slotted.exists()).toBe(true);
    expect(slotted.text()).toBe('Theme Options');
  });
});
