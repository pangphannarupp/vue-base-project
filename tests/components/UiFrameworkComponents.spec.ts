import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { 
  BizBottomSheet, 
  BizNoResult, 
  BizSegment, 
  BizSegmentButton, 
  BizYearPickerSheet 
} from '@phanna/ui-framework';

describe('@phanna/ui-framework Components', () => {
  it('renders BizBottomSheet', () => {
    const wrapper = mount(BizBottomSheet, {
      props: { modelValue: true } // Usually v-model controls visibility
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizNoResult', () => {
    const wrapper = mount(BizNoResult, {
      props: {
        title: 'Empty',
        subtitle: 'No data'
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizSegment and BizSegmentButton', () => {
    const wrapper = mount(BizSegment, {
      props: { modelValue: 'tab1' },
      slots: {
        default: `<BizSegmentButton value="tab1">Tab 1</BizSegmentButton>`
      },
      global: {
        components: { BizSegmentButton }
      }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent(BizSegmentButton).exists()).toBe(true);
  });

  it('renders BizYearPickerSheet', () => {
    const wrapper = mount(BizYearPickerSheet, {
      props: { 
        modelValue: true, 
        initialYear: 2024 
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
