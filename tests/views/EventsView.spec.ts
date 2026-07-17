import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import EventsView from '../../src/views/EventsView.vue';
import { HolidayService } from '../../src/services/HolidayService';

vi.mock('../../src/services/HolidayService', () => ({
  HolidayService: {
    getHolidays: vi.fn()
  }
}));

describe('EventsView.vue', () => {
  it('renders events correctly', () => {
    (HolidayService.getHolidays as any).mockReturnValue([
      {
        monthName: '2026 មករា',
        events: [
          { id: '1', day: '01', dayName: 'ព្រហ', eventName: 'ចូលឆ្នាំសកល', isGreen: false }
        ]
      }
    ]);

    const wrapper = mount(EventsView, {
      global: {
        stubs: {
          BizSegment: true,
          BizSegmentButton: true,
          BizYearPickerSheet: true,
          EventItem: true
        }
      }
    });

    expect(wrapper.text()).toContain('ព្រឹត្តិការណ៍');
    expect(wrapper.text()).toContain('2026 មករា');
  });
});
