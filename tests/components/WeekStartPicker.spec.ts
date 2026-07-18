import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import WeekStartPicker from '../../src/components/WeekStartPicker.vue';
import { SettingsService } from '../../src/services/SettingsService';

// Mock UI Framework components
vi.mock('@phanna/ui-framework', () => ({
  BizBottomSheet: {
    name: 'BizBottomSheet',
    template: '<div><slot></slot></div>',
    props: ['modelValue']
  },
  BizDynamicIsland: {
    name: 'BizDynamicIsland',
    template: '<div><slot name="minimal"></slot><slot name="expanded-body"></slot></div>',
    props: ['modelValue', 'state', 'wrapperClass']
  }
}));

// Mock SettingsService
vi.mock('../../src/services/SettingsService', () => ({
  SettingsService: {
    firstDayOfWeek: { value: 0 },
    setFirstDayOfWeek: vi.fn()
  }
}));

describe('WeekStartPicker.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    modelValue: true,
    popupStyle: 'alert'
  };

  it('renders correctly', () => {
    const wrapper = mount(WeekStartPicker, { props: defaultProps });
    expect(wrapper.find('.picker-title').text()).toBe('ជ្រើសរើសថ្ងៃផ្តើមនៃសប្តាហ៍');
  });

  it('calls SettingsService and emits when a day is selected', async () => {
    const wrapper = mount(WeekStartPicker, { props: defaultProps });
    
    // Find the Monday button (index 0 is Monday, index 1 is Sunday based on template order)
    const buttons = wrapper.findAll('.setting-select-btn');
    await buttons[0].trigger('click'); // Click Monday

    expect(SettingsService.setFirstDayOfWeek).toHaveBeenCalledWith(1);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
  });
});
