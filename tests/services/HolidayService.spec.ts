import { describe, it, expect } from 'vitest';
import { HolidayService } from '../../src/services/HolidayService';

describe('HolidayService', () => {
  it('should return holidays for the specified year', () => {
    const year = 2024;
    const holidays = HolidayService.getHolidays(year);

    expect(holidays).toBeInstanceOf(Array);
    expect(holidays.length).toBeGreaterThan(0);

    const januaryHolidays = holidays.find(h => h.monthName === '2024 មករា');
    expect(januaryHolidays).toBeDefined();
    expect(januaryHolidays?.events.length).toBe(2);
    expect(januaryHolidays?.events[0].eventName).toBe('ទិវាចូលឆ្នាំសកល');
  });
});
