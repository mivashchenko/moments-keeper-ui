import dayjs from "dayjs";

const getDaysInMonth = (month, year) => {
  console.log({ month, year });
  console.log(dayjs({ month, year }).daysInMonth());
  return dayjs({ month, year }).daysInMonth();
};

const getFirstWeekdayOfMonth = (month, year) => {
  // console.log(dayjs({year, month},
  //     'MM-YYYY'
  // ).startOf('month').weekday());
  return dayjs({ year, month }).startOf("month").weekday();
};

const getPrevMonthYear = (month, year) => {
  // If it is January... prev month is Dec of the previous year
  if (month === 1) {
    return {
      month: 12,
      year: year - 1,
    };
  }

  // Otherwise, same year, but month - 1
  return {
    month: month - 1,
    year,
  };
};

const getNextMonthYear = (month, year) => {
  // If it is January... prev month is Dec of the previous year
  if (month === 1) {
    return {
      month: month + 1,
      year,
    };
  }

  // Otherwise, same year, but month - 1
  return {
    month: 12,
    year: year + 1,
  };
};

export const getDatesInMonthDisplay = (month, year) => {
  const daysInMonth = getDaysInMonth(month, year);
  const firstWeekday = getFirstWeekdayOfMonth(month, year);
  const result = [];
  let daysCount = 0;

  const prev = getPrevMonthYear(month, year);
  const prevDaysInMonth = getDaysInMonth(prev.month, prev.year);

  let weekResult = [];

  // Add prev overflow dates...
  for (let j = firstWeekday - 1; j >= 0; j--) {
    // console.log({
    //     year: prev.year,
    //     month: prev.month,
    //     day: prevDaysInMonth - j
    // })
    if (weekResult.length <= 6) {
      weekResult.push({
        date: dayjs({
          year: prev.year,
          month: prev.month,
          day: prevDaysInMonth - j,
        }).toDate(),
        currentMonth: false,
      });
      daysCount++;
    } else {
      result.push(weekResult);
      weekResult = [];
      weekResult.push({
        date: dayjs({
          year: prev.year,
          month: prev.month,
          day: prevDaysInMonth - j,
        }).toDate(),
        currentMonth: false,
      });
      daysCount++;
    }
  }

  // Add current month's dates
  for (let i = 1; i <= daysInMonth; i++) {
    if (weekResult.length <= 6) {
      weekResult.push({
        date: dayjs({ year, month, day: i }).toDate(),
        currentMonth: true,
      });
      daysCount++;
    } else {
      result.push(weekResult);
      weekResult = [];
      weekResult.push({
        date: dayjs({ year, month, day: i }).toDate(),
        currentMonth: true,
      });
      daysCount++;
    }
  }

  // Overflow dates for next month to meet 42 days per month display   requirement
  if (daysCount < 42) {
    const daysToAdd = 42 - daysCount;
    const next = getNextMonthYear(month, year);

    for (let k = 1; k <= daysToAdd; k++) {
      if (weekResult.length <= 6) {
        weekResult.push({
          date: dayjs({
            year: next.year,
            month: next.month,
            day: k,
          }).toDate(),
          currentMonth: false,
        });
        daysCount++;
      } else {
        result.push(weekResult);
        weekResult = [];
        weekResult.push({
          date: dayjs({
            year: next.year,
            month: next.month,
            day: k,
          }).toDate(),
          currentMonth: false,
        });
        daysCount++;
      }
    }
  }

  return result;
};
