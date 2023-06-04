import { SystemService } from '../services/system.service';
import { Component, OnInit } from '@angular/core';
import dayjs, { Dayjs } from 'dayjs';
import { UserService } from '../services/user-service';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { dayInfo, dayBook } from './row-generator-interfaces';
import isBetween from 'dayjs/plugin/isBetween';
import { AbsentRequest } from '../services/service-interfaces';
dayjs.extend(isBetween);
dayjs.extend(dayOfYear);

@Component({
  selector: 'row-generator',
  templateUrl: './row-generator.component.html',
  styleUrls: ['./row-generator.scss']
})
export class RowGeneratorComponent implements OnInit {
  dayBook: dayBook;
  rows: any[];
  selectedRow: any;
  matchingValues: any[];
  bookedDays: { [key: string]: boolean } = {};
  requests: AbsentRequest[];
  systemServiceLoaded: boolean = false;

  constructor(
    private user: UserService,
  ) { }

  ngOnInit(): void {
    this.user.getUsers().subscribe((data) => {
      this.rows = data;
    });

  }
}
