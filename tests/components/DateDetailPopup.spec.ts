import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DateDetailPopup from '../../src/components/DateDetailPopup.vue';

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

// Mock child components
vi.mock('../../src/components/KhmerDateCard.vue', () => ({
  default: { name: 'KhmerDateCard', template: '<div class="mock-khmer-card"></div>', props: ['date', 'khmerDateInfo'] }
}));
vi.mock('../../src/components/ZodiacAnimalCard.vue', () => ({
  default: { name: 'ZodiacAnimalCard', template: '<div class="mock-zodiac-card"></div>', props: ['zodiacYear', 'zodiacSecondary'] }
}));

describe('DateDetailPopup.vue', () => {
  const defaultProps = {
    modelValue: true,
    popupStyle: 'sheet',
    selectedDate: new Date('2026-07-18'),
    khmerDateInfo: { zodiacYear: 'មមី', stem: 'ឆស័ក', lunarYear: '2570', lunarDay: '៤ កើត', lunarMonth: 'ស្រាពណ៍' },
    WEEKDAYS: ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍']
  };

  it('renders sheet popup when popupStyle is sheet', () => {
    const wrapper = mount(DateDetailPopup, { props: defaultProps });
    expect(wrapper.findComponent({ name: 'BizBottomSheet' }).exists()).toBe(true);
    expect(wrapper.find('.date-large').text()).toContain('18 សៅរ៍');
  });

  it('renders alert popup when popupStyle is alert', () => {
    const wrapper = mount(DateDetailPopup, { props: { ...defaultProps, popupStyle: 'alert' } });
    expect(wrapper.find('.custom-alert-overlay').exists()).toBe(true);
    expect(wrapper.find('.date-large').text()).toContain('18 សៅរ៍');
  });

  it('renders island popup when popupStyle is island', () => {
    const wrapper = mount(DateDetailPopup, { props: { ...defaultProps, popupStyle: 'island' } });
    expect(wrapper.findComponent({ name: 'BizDynamicIsland' }).exists()).toBe(true);
  });
});
