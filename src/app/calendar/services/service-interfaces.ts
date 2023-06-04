import dayjs from 'dayjs';

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
