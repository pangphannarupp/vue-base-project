import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { 
  BizButton, 
  BizInput, 
  BizTextField, 
  BizCheckbox,
  BizSwitch,
  BizSelect
} from '@phanna/ui-framework';

describe('@phanna/ui-framework Common Components', () => {
  it('renders BizButton', () => {
    const wrapper = mount(BizButton, {
      slots: { default: 'Click Me' }
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain('Click Me');
  });

  it('renders BizInput', () => {
    const wrapper = mount(BizInput, {
      props: { placeholder: 'Enter text' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizTextField', () => {
    const wrapper = mount(BizTextField, {
      props: { label: 'Username' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizCheckbox', () => {
    const wrapper = mount(BizCheckbox, {
      props: { modelValue: false, label: 'Accept Terms' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizSwitch', () => {
    const wrapper = mount(BizSwitch, {
      props: { modelValue: true }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizSelect', () => {
    const wrapper = mount(BizSelect, {
      props: { 
        options: [{ label: 'Option 1', value: '1' }] 
      }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
