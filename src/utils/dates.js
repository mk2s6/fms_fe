import moment from 'moment';

moment.updateLocale('en', {
  week: {
    dow: 1, // Monday is the first day of the week.
  },
});

export const allWeekDays = () => moment.weekdays(true).map((day, i) => ({ key: i, value: day, label: day }));

export const shortWeekDay = day => moment().day(day).format('ddd');
