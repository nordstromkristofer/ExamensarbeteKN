

export interface User {
  employeeId: string,
  userName: string;
  id: number;
  member: string;
  comment: string;
  title: string;
  subtitle?: string;
  img?: string;
  days: { date: dayjs.Dayjs; class: string | string[]; }[];
  startDate: string,
  endDate: string
  matchingSystem: string
}


export interface dayBook {
  day: { date1: dayjs.Dayjs; class: string | string[]; }[];
  employee: string;
}


export interface AbsentRequest {

  id: number,
  dateOfChange: string,
  startDate: string,
  endDate: string,
  member: string,
  employeeId: string,
  presence: number,
  site: string,
  progress: number,
  approved: number,
  type: number,
  comment: string,
  attachement: string,
  date: string,
  find: any

}

import dayjs from 'dayjs';

export interface Day {
  title: string;
  value: number;
  date: dayjs.Dayjs;
  key: string;
  class: string | string[];
  headerClass: string | string[];
  left: number;
}

export interface Directions {
  left: number;
  right: number;
}



export interface User {
  id: number;
  member: string;
  comment: string;
  title: string;
  subtitle?: string;
  img?: string;
  days: { date: dayjs.Dayjs; class: string | string[]; }[];
}

export interface Resource {

  id: number;
  title: string;
  subtitle?: string; //"group"
  img?: string;
  days: { date: dayjs.Dayjs; class: string | string[]; }[];
}

export interface RowClickEvent {
  event: MouseEvent;
  row: Resource;
}

export interface DayClickEvent {
  event: MouseEvent;
  row: Resource;
  date: dayjs.Dayjs;
}

export interface HeaderClickEvent {
  event: MouseEvent;
  date: dayjs.Dayjs;
}

