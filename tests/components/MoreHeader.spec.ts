import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MoreHeader from '../../src/components/MoreHeader.vue';

describe('MoreHeader.vue', () => {
  it('renders title and subtitle props', () => {
    const wrapper = mount(MoreHeader, {
      props: {
        title: 'Settings',
        subtitle: 'Manage your app preferences'
      }
    });

    expect(wrapper.text()).toContain('Settings');
    expect(wrapper.text()).toContain('Manage your app preferences');
    expect(wrapper.text()).toContain('Upgrade to PRO');
  });
});
