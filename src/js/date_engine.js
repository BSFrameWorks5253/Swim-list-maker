// ==============================================================================
// AQUAFLOW PRO - SMART DATE GENERATOR & SCHEDULING ENGINE
// ==============================================================================

class DateEngine {
  static MONTH_ABBR = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  static getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  static getDatesForDayOfWeek(year, monthIndex, dayOfWeek) {
    const dates = [];
    const date = new Date(year, monthIndex, 1);
    
    while (date.getDay() !== dayOfWeek) {
      date.setDate(date.getDate() + 1);
    }
    
    while (date.getMonth() === monthIndex) {
      const dayNum = date.getDate();
      const monthAbbr = DateEngine.MONTH_ABBR[monthIndex];
      dates.push(`${DateEngine.getOrdinal(dayNum)} ${monthAbbr}`);
      date.setDate(date.getDate() + 7);
    }
    
    return dates;
  }

  static calculateSchedule(state) {
    let dates = [];

    if (state.useCustomDates && state.customDates && state.customDates.length > 0) {
      dates = [...state.customDates];
    } else {
      const year = state.year || 2026;
      const month = state.month !== undefined ? state.month : 6;
      const dayOfWeek = state.dayOfWeek !== undefined ? state.dayOfWeek : 6;
      dates = DateEngine.getDatesForDayOfWeek(year, month, dayOfWeek);
    }

    if (state.excludedDates && state.excludedDates.trim()) {
      const excludes = state.excludedDates
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 0);

      if (excludes.length > 0) {
        dates = dates.filter(d => {
          const lowerD = d.toLowerCase();
          return !excludes.some(ex => lowerD.includes(ex) || ex.includes(lowerD));
        });
      }
    }

    return dates;
  }
}

window.DateEngine = DateEngine;
window.getOrdinal = DateEngine.getOrdinal;
window.getDatesForDayOfWeek = DateEngine.getDatesForDayOfWeek;
