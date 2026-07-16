/**
 * ចំណុចប្រទាក់សម្រាប់ថ្ងៃឈប់សម្រាក (Interface for Holiday)
 */
export interface Holiday {
  /** លេខសម្គាល់តែមួយគត់ (Unique ID) */
  id: string;
  /** ថ្ងៃទី (Day number) */
  day: string;
  /** ឈ្មោះថ្ងៃ (Day name, e.g., ច័ន្ទ) */
  dayName: string;
  /** ឈ្មោះព្រឹត្តិការណ៍ ឬថ្ងៃឈប់សម្រាក (Event name) */
  eventName: string;
  /** កំណត់ពណ៌បៃតងសម្រាប់ថ្ងៃពិសេស (Flag for special green color) */
  isGreen?: boolean;
}

/**
 * ចំណុចប្រទាក់សម្រាប់ថ្ងៃឈប់សម្រាកតាមខែ (Interface for Holidays grouped by Month)
 */
export interface MonthHolidays {
  /** ឈ្មោះខែ (Month name) */
  monthName: string;
  /** បញ្ជីព្រឹត្តិការណ៍ក្នុងខែ (List of events in the month) */
  events: Holiday[];
}

/**
 * សេវាកម្មសម្រាប់ទាញយកទិន្នន័យថ្ងៃឈប់សម្រាក (Service for fetching holiday data)
 */
export class HolidayService {
  /**
   * ទាញយកបញ្ជីថ្ងៃឈប់សម្រាកជាតិខ្មែរ ដែលបានដាក់ជាក្រុមតាមខែ សម្រាប់ឆ្នាំជាក់លាក់ណាមួយ។
   * ចំណាំ៖ ថ្ងៃឈប់សម្រាកតាមចន្ទគតិ (ចូលឆ្នាំខ្មែរ ភ្ជុំបិណ្ឌ អុំទូក ។ល។) ត្រូវបានប៉ាន់ស្មាន 
   * សម្រាប់ឆ្នាំដែលបានផ្តល់ឱ្យនៅក្នុងទិន្នន័យថេរនេះ។
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
