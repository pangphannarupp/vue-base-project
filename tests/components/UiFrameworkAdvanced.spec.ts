import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { 
  BizAppBar, 
  BizBottomNav, 
  BizActionCard, 
  BizInfoCard,
  BizUserCard,
  BizSkeleton,
  BizToast,
  BizRadio
} from '@phanna/ui-framework';

describe('@phanna/ui-framework Advanced Components', () => {
  it('renders BizAppBar', () => {
    const wrapper = mount(BizAppBar, {
      props: { title: 'Navigation' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizBottomNav', () => {
    const wrapper = mount(BizBottomNav);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizActionCard', () => {
    const wrapper = mount(BizActionCard, {
      props: { title: 'Action', subtitle: 'Description' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizInfoCard', () => {
    const wrapper = mount(BizInfoCard, {
      props: { title: 'Information' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizUserCard', () => {
    const wrapper = mount(BizUserCard, {
      props: { name: 'John Doe' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizSkeleton', () => {
    const wrapper = mount(BizSkeleton);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizToast', () => {
    const wrapper = mount(BizToast, {
      props: { message: 'Success!' }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('renders BizRadio', () => {
    const wrapper = mount(BizRadio, {
      props: { label: 'Option 1', value: '1' }
    });
    expect(wrapper.exists()).toBe(true);
  });
});
