import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import KhmerDateCard from '../../src/components/KhmerDateCard.vue';
import type { IKhmerDate } from '@phanna/ui-framework/dist/KhmerDate';

describe('KhmerDateCard.vue', () => {
  it('renders dates correctly', () => {
    const mockDate = new Date(2024, 0, 1); // Jan 1, 2024 (Monday)
    const mockKhmerDateInfo: IKhmerDate = {
      lunarDay: '១ កើត',
      lunarMonth: 'បុស្ស',
      zodiacYear: 'រោង',
      stem: 'ឆស័ក',
      lunarYear: '២៥៦៧',
      animal: 'នាគ', // Added just in case
      countDay: 1,
      totalDayOfMonth: 30,
      phase: 1
    };

    const wrapper = mount(KhmerDateCard, {
      props: {
        date: mockDate,
        khmerDateInfo: mockKhmerDateInfo
      }
    });

    // Check if lunar info is rendered
    expect(wrapper.text()).toContain('ថ្ងៃច័ន្ទ ១ កើត ខែបុស្ស ឆ្នាំរោង ឆស័ក ព.ស. ២៥៦៧');
    
    // Check if gregorian info is rendered
    // toKhmerNumber(1) -> '១', toKhmerNumber(2024) -> '២០២៤'
    expect(wrapper.text()).toContain('ត្រូវនឹង ថ្ងៃទី១ ខែមករា ឆ្នាំ២០២៤');
  });
});
