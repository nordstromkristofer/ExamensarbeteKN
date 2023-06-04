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


export interface HeaderClickEvent {
  event: MouseEvent;
  date: dayjs.Dayjs;
}
