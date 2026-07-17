import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MoreView from '../../src/views/MoreView.vue';
import { ThemeService } from '../../src/services/ThemeService';

vi.mock('../../src/services/ThemeService', () => ({
  ThemeService: {
    THEME_COLORS: ['#ff0000', '#00ff00', '#0000ff'],
    setTheme: vi.fn()
  }
}));

describe('MoreView.vue', () => {
  it('renders settings headers and items', () => {
    const wrapper = mount(MoreView, {
      global: {
        stubs: {
          MoreHeader: true,
          SettingsGroup: true,
          SettingItem: true,
          BizBottomSheet: true
        }
      }
    });

    // Check if groups are present in the template (checking by component name if stubbed might be tricky, let's just check the wrapper)
    // Actually since they are stubbed, we can find them
    expect(wrapper.findComponent({ name: 'MoreHeader' }).exists()).toBe(true);
    const groups = wrapper.findAllComponents({ name: 'SettingsGroup' });
    expect(groups.length).toBe(4); // Calendar Setting, Data & Tool, Support Us, អំពីកម្មវិធី
  });
});
