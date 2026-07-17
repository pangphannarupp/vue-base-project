import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import HelloWorld from '../../src/components/HelloWorld.vue';

describe('HelloWorld.vue', () => {
  it('renders standard hero sections', () => {
    const wrapper = mount(HelloWorld);

    expect(wrapper.text()).toContain('Get started');
    expect(wrapper.text()).toContain('Documentation');
    expect(wrapper.text()).toContain('Connect with us');
  });

  it('increments counter on click', async () => {
    const wrapper = mount(HelloWorld);
    
    const button = wrapper.find('button.counter');
    expect(button.text()).toContain('Count is 0');
    
    await button.trigger('click');
    expect(button.text()).toContain('Count is 1');
  });
});
