import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ZodiacAnimalCard from '../../src/components/ZodiacAnimalCard.vue';

describe('ZodiacAnimalCard.vue', () => {
  it('renders primary zodiac animal properly', () => {
    const wrapper = mount(ZodiacAnimalCard, {
      props: {
        zodiacYear: 'រោង' // Dragon
      }
    });

    expect(wrapper.text()).toContain('រោង');
    expect(wrapper.text()).toContain('🐉');
  });

  it('renders both primary and secondary zodiac animals', () => {
    const wrapper = mount(ZodiacAnimalCard, {
      props: {
        zodiacYear: 'រោង',
        zodiacSecondary: 'ម្សាញ់' // Snake
      }
    });

    expect(wrapper.text()).toContain('រោង');
    expect(wrapper.text()).toContain('🐉');
    expect(wrapper.text()).toContain('ម្សាញ់');
    expect(wrapper.text()).toContain('🐍');
    expect(wrapper.text()).toContain('x'); // Separator
  });
});
