import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MoreView from '../../src/views/MoreView.vue';

// Mock UI Framework
vi.mock('@phanna/ui-framework', () => ({
  BizCollapsingToolbar: { template: '<div><slot name="title"></slot><slot></slot></div>' },
  BizSegment: { template: '<div><slot></slot></div>', props: ['modelValue'] },
  BizSegmentButton: { template: '<button><slot></slot></button>', props: ['value'] },
  BizColorPickerSheet: { template: '<div class="mock-sheet"></div>', props: ['modelValue'] },
  BizColorPickerAlert: { template: '<div class="mock-alert"></div>', props: ['modelValue'] },
  BizColorPickerIsland: { template: '<div class="mock-island"></div>', props: ['modelValue'] },
  BizBottomSheet: { template: '<div><slot></slot></div>', props: ['modelValue'] },
  BizDynamicIsland: { template: '<div><slot name="minimal"></slot><slot name="expanded-body"></slot></div>', props: ['modelValue', 'state', 'wrapperClass'] }
}));

vi.mock('../../src/services/ThemeService', () => ({
  ThemeService: {
    getCurrentColor: vi.fn(() => '#e53935'),
    THEME_COLORS: ['#e53935']
  }
}));

vi.mock('../../src/services/SettingsService', () => ({
  SettingsService: {
    popupStyle: { value: 'sheet' },
    setPopupStyle: vi.fn(),
    firstDayOfWeek: { value: 0 }
  }
}));

vi.mock('../../src/components/WeekStartPicker.vue', () => ({
  default: { name: 'WeekStartPicker', template: '<div class="mock-week-picker"></div>' }
}));

describe('MoreView.vue', () => {
  it('renders the title', () => {
    const wrapper = mount(MoreView);
    expect(wrapper.find('h1').text()).toBe('ប្រតិទិនឆ្លាតវៃ');
  });

  it('renders color picker when popup style is sheet', () => {
    const wrapper = mount(MoreView);
    expect(wrapper.find('.mock-sheet').exists()).toBe(true);
    expect(wrapper.find('.mock-alert').exists()).toBe(false);
  });
});
