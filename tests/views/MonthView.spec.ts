import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MonthView from '../../src/views/MonthView.vue';
import { useRouter } from 'vue-router';
import { HolidayService } from '../../src/services/HolidayService';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

vi.mock('../../src/services/HolidayService', () => ({
  HolidayService: {
    getHolidays: vi.fn()
  }
}));

describe('MonthView.vue', () => {
  it('renders correctly and shows no events', () => {
    (useRouter as any).mockReturnValue({
      push: vi.fn()
    });

    (HolidayService.getHolidays as any).mockReturnValue([]);

    const wrapper = mount(MonthView, {
      global: {
        stubs: {
          BizKhmerCalendar: true,
          BizBottomSheet: true,
          BizNoResult: true,
          EventItem: true,
          KhmerDateCard: true,
          ZodiacAnimalCard: true
        }
      }
    });

    expect(wrapper.text()).toContain('ព្រឹត្តិការណ៍');
    // Ensure BizNoResult gets rendered if we have no events
    expect(wrapper.findComponent({ name: 'BizNoResult' }).exists()).toBe(true);
  });

  it('renders events correctly if HolidayService returns events for the selected month', () => {
    const now = new Date();
    const KHMER_MONTHS = ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'];
    const currentMonthStr = `${now.getFullYear()} ${KHMER_MONTHS[now.getMonth()]}`;

    (HolidayService.getHolidays as any).mockReturnValue([
      {
        monthName: currentMonthStr,
        events: [
          { id: '1', day: '15', dayName: 'ច័ន្ទ', eventName: 'Test Event 1', isGreen: false },
          { id: '2', day: '16', dayName: 'អង្គារ', eventName: 'Test Event 2', isGreen: true }
        ]
      }
    ]);

    const wrapper = mount(MonthView, {
      global: {
        stubs: {
          BizKhmerCalendar: true,
          BizBottomSheet: true,
          BizNoResult: true,
          EventItem: true,
          KhmerDateCard: true,
          ZodiacAnimalCard: true
        }
      }
    });

    expect(wrapper.findComponent({ name: 'BizNoResult' }).exists()).toBe(false);
    const eventItems = wrapper.findAllComponents({ name: 'EventItem' });
    expect(eventItems.length).toBe(2);
    expect(eventItems[0].props('eventName')).toBe('Test Event 1');
  });
});
