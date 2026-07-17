import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EventItem from '../../src/components/EventItem.vue';

describe('EventItem.vue', () => {
  it('renders props properly', () => {
    const wrapper = mount(EventItem, {
      props: {
        day: '15',
        dayName: 'ច័ន្ទ',
        eventName: 'ពិធីបុណ្យ',
        isGreen: true
      }
    });

    expect(wrapper.text()).toContain('15');
    expect(wrapper.text()).toContain('ច័ន្ទ');
    expect(wrapper.text()).toContain('ពិធីបុណ្យ');
    
    const daySpan = wrapper.find('.day');
    expect(daySpan.classes()).toContain('text-green');
  });

  it('renders without dayName and isGreen properly', () => {
    const wrapper = mount(EventItem, {
      props: {
        day: '10',
        eventName: 'Test Event',
      }
    });

    expect(wrapper.text()).toContain('10');
    expect(wrapper.text()).toContain('Test Event');
    
    const daySpan = wrapper.find('.day');
    expect(daySpan.classes()).not.toContain('text-green');
  });

  it('handles day prop passed as a number', () => {
    const wrapper = mount(EventItem, {
      props: {
        day: 25,
        eventName: 'Number Event',
      }
    });

    expect(wrapper.text()).toContain('25');
    expect(wrapper.text()).toContain('Number Event');
  });
});
