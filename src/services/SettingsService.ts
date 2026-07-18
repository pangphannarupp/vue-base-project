import { ref } from 'vue';

const firstDayOfWeek = ref(1);
const popupStyle = ref('sheet'); // 'sheet', 'alert', 'island'

const WEEK_START_KEY = 'app_week_start';
const POPUP_STYLE_KEY = 'app_popup_style';

export class SettingsService {
  static init() {
    const val = localStorage.getItem(WEEK_START_KEY);
    if (val) {
      firstDayOfWeek.value = parseInt(val, 10);
    }
    
    const styleVal = localStorage.getItem(POPUP_STYLE_KEY);
    if (styleVal) {
      popupStyle.value = styleVal;
    }
  }

  static get firstDayOfWeek() {
    return firstDayOfWeek;
  }

  static setFirstDayOfWeek(day: number) {
    firstDayOfWeek.value = day;
    localStorage.setItem(WEEK_START_KEY, day.toString());
  }

  static get popupStyle() {
    return popupStyle;
  }

  static setPopupStyle(style: string) {
    popupStyle.value = style;
    localStorage.setItem(POPUP_STYLE_KEY, style);
  }
}
