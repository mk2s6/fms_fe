import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';
const displayDateFormat = 'llll';
const dateTimeFormat = 'DD-MM-YYYY HH:mm:ss';

export const formatDate = date => moment(date).format(dateFormat);
export const getLocalDateTime = timestamp => moment(new Date(timestamp)).format(dateTimeFormat);
export const formatDisplayDate = date => moment(date).format(displayDateFormat);
