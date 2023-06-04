import {
  Day,
  Resource
} from './calendar-view-interfaces'


import dayjs from 'dayjs';

const startDate: dayjs.Dayjs = dayjs().startOf('day');
const maxDate: dayjs.Dayjs = dayjs().startOf('year').add(12, 'month');
const minDate: dayjs.Dayjs = dayjs().startOf('year').add(6, 'month');
const infiniteScroll = true;
const customDays = {};
const sideContainerWidth = '200px';

const _classes: { [rowId: number]: { [key: string]: any } } = {};
const days: Day[] = [];
to: dayjs.Dayjs;
from: dayjs.Dayjs;
const _rows: Resource[] = [];


export const calenderInputs = {
  startDate: startDate,
  maxDate,
  minDate,
  infiniteScroll,
  customDays,
  sideContainerWidth
}

export function setCalendarDates(month?: number) {
  const startDate = dayjs().startOf('day');
  const minDate = dayjs().month(month).startOf('month');
  const maxDate = dayjs().month(month).endOf('month');
  return { startDate, minDate, maxDate };
}








