export interface Holiday {
  id: string;
  day: string;
  dayName: string;
  eventName: string;
  isGreen?: boolean;
}

export interface MonthHolidays {
  monthName: string;
  events: Holiday[];
}

export class HolidayService {
  /**
   * Retrieves a list of Khmer public holidays grouped by month for a specific year.
   * Note: Lunar holidays (Khmer New Year, Pchum Ben, Water Festival, etc.) are approximated 
   * for the given year in this static dataset.
   */
  static getHolidays(year: number): MonthHolidays[] {
    return [
      {
        monthName: `${year} មករា`,
        events: [
          { id: 'jan-1', day: '01', dayName: 'ព្រហ', eventName: 'ទិវាចូលឆ្នាំសកល', isGreen: false },
          { id: 'jan-7', day: '07', dayName: 'ពុធ', eventName: 'ទិវាជ័យជម្នះលើរបបប្រល័យពូជសាសន៍', isGreen: false }
        ]
      },
      {
        monthName: `${year} កុម្ភៈ`,
        events: [
          { id: 'feb-2', day: '02', dayName: 'ច័ន្ទ', eventName: 'ពិធីបុណ្យមាឃបូជា', isGreen: true },
          { id: 'feb-14', day: '14', dayName: 'សៅរ៍', eventName: 'ថ្ងៃបុណ្យនៃក្តីស្រលាញ់', isGreen: true }
        ]
      },
      {
        monthName: `${year} មីនា`,
        events: [
          { id: 'mar-8', day: '08', dayName: 'អាទិត្យ', eventName: 'ទិវានារីអន្តរជាតិ', isGreen: false }
        ]
      },
      {
        monthName: `${year} មេសា`,
        events: [
          { id: 'apr-14', day: '14', dayName: 'អង្គារ', eventName: 'ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ', isGreen: true },
          { id: 'apr-15', day: '15', dayName: 'ពុធ', eventName: 'ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ', isGreen: true },
          { id: 'apr-16', day: '16', dayName: 'ព្រហ', eventName: 'ពិធីបុណ្យចូលឆ្នាំថ្មី ប្រពៃណីជាតិ', isGreen: true }
        ]
      },
      {
        monthName: `${year} ឧសភា`,
        events: [
          { id: 'may-1', day: '01', dayName: 'សុក្រ', eventName: 'ទិវាពលកម្មអន្តរជាតិ', isGreen: false },
          { id: 'may-14', day: '14', dayName: 'ព្រហ', eventName: 'ព្រះរាជពិធីបុណ្យចម្រើនព្រះជន្ម ព្រះមហាក្សត្រ', isGreen: false },
          { id: 'may-24', day: '24', dayName: 'អាទិត្យ', eventName: 'ពិធីបុណ្យវិសាខបូជា', isGreen: true }
        ]
      },
      {
        monthName: `${year} កញ្ញា`,
        events: [
          { id: 'sep-24', day: '24', dayName: 'ព្រហ', eventName: 'ពិធីបុណ្យភ្ជុំបិណ្ឌ', isGreen: true }
        ]
      },
      {
        monthName: `${year} តុលា`,
        events: [
          { id: 'oct-15', day: '15', dayName: 'ព្រហ', eventName: 'ទិវាប្រារព្ធពិធីគោរពព្រះវិញ្ញាណក្ខន្ធ ព្រះបរមរតនកោដ្ឋ', isGreen: false },
          { id: 'oct-29', day: '29', dayName: 'ព្រហ', eventName: 'ព្រះរាជពិធីគ្រងព្រះបរមរាជសម្បត្តិ', isGreen: false }
        ]
      },
      {
        monthName: `${year} វិច្ឆិកា`,
        events: [
          { id: 'nov-9', day: '09', dayName: 'ច័ន្ទ', eventName: 'ទិវាបុណ្យឯករាជ្យជាតិ', isGreen: false },
          { id: 'nov-22', day: '22', dayName: 'អាទិត្យ', eventName: 'ព្រះរាជពិធីបុណ្យអុំទូក', isGreen: true }
        ]
      }
    ];
  }
}
