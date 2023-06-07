import dayjs from 'dayjs';
import { DateFormatPipe } from '../date-format.pipe';


export interface dayBook {
  dateOfChange: Date;
  startDate: Date;
  endDate: Date;
  member: string | null;
  presence: number;
  site: string | null;
  progress: number;
  approved: number;
  type: number;
  comment: string | null;
}

export interface SystemModel {
  dateOfChange: Date,
  startDate: string,
  endDate: string,
  member: string,
  approved: number,
  type: number,
  comment: string,
}






export interface dayInfo {
  day: any;
  employee: string;
}
