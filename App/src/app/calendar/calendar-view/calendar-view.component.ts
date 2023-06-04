import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef,
  HostListener, Input, NgZone, OnInit, TemplateRef, ViewChild,
} from '@angular/core';

import { holidays } from './holidays';


import { User, AbsentRequest, Day } from '../calendar-interfaces';
import { UserService } from '../services/user-service';
import { MatPaginator } from '@angular/material/paginator';
import { CalendarScrollComponent, scrollNumbers, scrollThreshold, positionToDate, getKey } from './calendar-scroll.component';
import { calenderInputs } from './calendar-view-inputs';
import { SystemService } from '../services/system.service';

import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import { debounce, throttle } from 'lodash-es';

dayjs.extend(minMax);
dayjs.extend(dayOfYear);


class ResourceViewTitleDirective {
  constructor(public template: TemplateRef<any>) { }
}

class ResourceViewRowDirective {
  constructor(public template: TemplateRef<any>) { }
}

@Component({
  selector: 'row-gen-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class CalendarViewComponent implements OnInit, AfterViewInit {
  selected: number = 0; // Initialize the selected property
  requests: AbsentRequest[];
  systemServiceLoaded: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private user: UserService,
    private scrl: CalendarScrollComponent,
    private systemService: SystemService,
  ) {
    this.scrl.checkScrollableThresholdHit = debounce(this._checkScrollableThresholdHit.bind(this), 250);
    this.scrl.updateRange = throttle(this._updateRange.bind(this), 250);
    dayjs.extend(minMax);
  }


  name: string = 'reader';
  searchText: string;

  allUsers: User[] = [];
  filteredUsers: User[] = [];
  matchingValues: any[];
  allRequests: AbsentRequest[] = [];
  users: User[];
  selectedRowIndex: number = -1;

  @Input()
  startDate = calenderInputs.startDate;
  maxDate = calenderInputs.maxDate;
  minDate = calenderInputs.minDate;
  infiniteScroll = calenderInputs.infiniteScroll;
  customDays = calenderInputs.customDays;
  sideContainerWidth = calenderInputs.sideContainerWidth;
  date: Date;

  @Input()
  set rows(value: User[]) {
    this._classes = {};
    this._rows = value.map((row) => {
      this._classes[row.id] = {};
      if (row.days) {
        row.days.forEach((day) => {
          const key = getKey(day.date);
          this._classes[row.id][key] = day.class;
        });
      }
      return row;
    });
  }
  get rows(): User[] {
    return this._rows;
  }


  @Input()
  getRedDayFn = (date: dayjs.Dayjs): string | string[] => {
    const dateString = date.format('YYYY-MM-DD');
    const holiday = holidays.find(h => h.date === dateString);
    if (holiday) {
      return 'holiday';
    }
  };



  @Input()
  getClassFn: (date: dayjs.Dayjs) => string | string[] = (date) => {
    const d = date.day();
    if (d === 6 || d === 0) {
      return 'weekend';
    }
  };

  @Input()
  getHeaderClassFn: (date: dayjs.Dayjs) => any = (date) => {
    return { 'today': date.isSame(this.scrl._today, 'day'), 'start-of-month': date.date() === 1 };
  }

  @Input()
  getDayValueFn: (date: dayjs.Dayjs) => any = (date) => {
    return date.date();
  }

  @Input()
  getDayHeaderFn: (date: dayjs.Dayjs) => any = (date) => date.format('dd')[0];



  @ViewChild('scrollHeader', { static: true }) scrollHeader: ElementRef<HTMLElement>;
  @ViewChild('scrollBody', { static: true }) scrollBody: ElementRef<HTMLElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  pageSize = 25;
  pageIndex = 0;
  pageLength: number;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100, 250];


  private _classes: { [rowId: number]: { [key: string]: any } } = {};
  days: Day[] = [];
  to: dayjs.Dayjs;
  from: dayjs.Dayjs;
  private _rows: User[] = [];



  @ContentChild(ResourceViewRowDirective) rowTemplate: ResourceViewRowDirective;
  @ContentChild(ResourceViewTitleDirective) titleTemplate: ResourceViewTitleDirective;



  createDays(): void {
    let current = this.scrl._scrollableFrom;
    this.days = [];

    let left = 0;
    while (current < this.scrl._scrollableTo) {
      const key = getKey(current);
      const day = {
        title: this.getDayHeaderFn(current),
        value: this.getDayValueFn(current),
        key,
        date: current,
        headerClass: this.getHeaderClassFn(current),
        class: this._dateClass(current),
        left
      };

      this.days.push(day);
      left += scrollNumbers.dayWidth;
      current = current.add(1, 'day');
    }

    // Check if selected index is within the range of days array
    if (this.selected >= 0 && this.selected < this.days.length) {
      this.days[this.selected].class += ' selected-date-class';
    }
  }



  ngAfterViewInit(): void {
    this.centerOn(this.startDate, 'auto');
    this.cdr.detectChanges();
    this.paginator.page.subscribe(
      (event) => console.log(event)
    );
  }



  ngOnInit(): void {
    this.user.getUsers().subscribe(users => {
      this.systemService.getRequests().subscribe(systems => {
        this.allUsers = users; // Save all users in the component
        this.matchingValues = systems; // Save all systems in the component 

        this.pageLength = this.rows.length;

        this.createDays();
        const { scrollLeft, clientWidth } = this.scrollBody.nativeElement;
        this._updateRange(scrollLeft, scrollLeft + clientWidth);
        this.scrl._referenceScrollLeft = this.dateToPosition(scrollThreshold.referenceDate);
        this.zone.runOutsideAngular(() => {
          this.scrollBody.nativeElement.addEventListener('scroll', this.onBodyScroll.bind(this));
        });
      });
    });
  }

  _isMatchingRow(employeeId: string, date: dayjs.Dayjs): boolean {
    const matchingValue = this.matchingValues.find(value => value.member === employeeId);
    if (matchingValue) {
      const startDate = dayjs(matchingValue.startDate).startOf('day');
      const endDate = dayjs(matchingValue.endDate).startOf('day');
      return date.isBetween(startDate, endDate, null, '[]');
    }
    return false;
  }

  _isSelectedDate(date: dayjs.Dayjs): boolean {
    return this.days[this.selected]?.date?.isSame(date, 'day') || false;
  }



  _dateClass(date: dayjs.Dayjs): string[] {
    const classes: string[] = [];
    if (date.day() === 6 || date.day() === 0) {
      classes.push('weekend');
    }
    const dateString = date.format('YYYY-MM-DD');
    const holiday = holidays.find(h => h.date === dateString);
    if (holiday) {
      classes.push('holiday');
    }
    this.rows.forEach(row => {
      const matchingValue = this.matchingValues.find(value => value.member === row.employeeId);
      if (matchingValue) {
        const startDate = dayjs(matchingValue.startDate).startOf('day');
        const endDate = dayjs(matchingValue.endDate).startOf('day');
        if (date.isBetween(startDate, endDate, null, '[]')) {
          classes.push('matching-date-class');

        }
        if (matchingValue.approved === 1) {
          classes.push('approved');

        } else if (matchingValue.approved === 0) {
          classes.push('not-approved');
        }
      }
    });
    if (this.days[this.selected]?.date && date.isSame(this.days[this.selected].date, 'day')) {
      classes.push('selected-date-class');
    }
    return classes;
  }




  _isApproved(employeeId: string, date: dayjs.Dayjs): boolean {
    const matchingValue = this.matchingValues.find(value => value.member === employeeId);
    return matchingValue && matchingValue.approved === 1 && date.isBetween(dayjs(matchingValue.startDate), dayjs(matchingValue.endDate), null, '[]');
  }

  _isNotApproved(employeeId: string, date: dayjs.Dayjs): boolean {
    const matchingValue = this.matchingValues.find(value => value.member === employeeId);
    return matchingValue && matchingValue.approved === 0 && date.isBetween(dayjs(matchingValue.startDate), dayjs(matchingValue.endDate), null, '[]');
  }

  selectedTeam: string = '0';
  refreshTable(): void {
    this.rows = [...this.allUsers];
    this.pageIndex = 0;
  }

  filterTeam(selectedTeam): void {
    this.user.getUsersByTeam(selectedTeam).subscribe((data) => {
      this.allUsers = data;
      this.rows = data;
      this.refreshTable();
    });
  }

  getUserName(member: string): string {
    const user = this.users?.find(user => user.employeeId === member);
    return user ? user.userName : member;
  }


  _getDateClasses(row: User, day: Day): any {
    return (this._classes[row.id][day.key] || '') + (day.class ? ' ' + day.class : '');
  }











  //------------SCROLLING-----------------------------------------------------------------------------

  onBodyScroll(event: Event): void {
    const { scrollLeft, clientWidth } = this.scrollBody.nativeElement;
    this.scrollHeader.nativeElement.scrollLeft = scrollLeft;

    this.scrl.checkScrollableThresholdHit(scrollLeft, clientWidth);
    this.scrl.updateRange(scrollLeft, scrollLeft + clientWidth);
  }

  _checkScrollableThresholdHit(scrollLeft, clientWidth): void {
    if (scrollLeft - this.scrl._referenceScrollLeft < scrollThreshold.leftThreshold) {
      console.debug('left threshold hit');
      this._expandScrollableRange(this.scrl._scrollableLeft - scrollNumbers.scrollWidth, this.scrl._scrollableRight);
    }

    if (scrollLeft + clientWidth - this.scrl._referenceScrollLeft > scrollThreshold.rightThreshold) {
      console.debug('right threshold hit');
      this._expandScrollableRange(this.scrl._scrollableLeft, this.scrl._scrollableRight + scrollNumbers.scrollWidth);
    }
  }

  _expandScrollableRange(scrollableLeft: number, scrollableRight: number): void {
    const scrollableLeftChange = this.scrl._scrollableLeft - scrollableLeft;

    this.scrl._scrollableLeft = scrollableLeft;
    this.scrl._scrollableRight = scrollableRight;

    this.scrl._scrollableFrom = this.minDate && !this.infiniteScroll ?
      dayjs.max(positionToDate(this.scrl._scrollableLeft), this.minDate) : positionToDate(this.scrl._scrollableLeft);
    this.scrl._scrollableTo = this.maxDate && !this.infiniteScroll ?
      dayjs.min(positionToDate(this.scrl._scrollableRight), this.maxDate) : positionToDate(this.scrl._scrollableRight);
    scrollThreshold.leftThreshold = this.scrl._scrollableLeft + scrollNumbers.scrollDelta;
    scrollThreshold.rightThreshold = this.scrl._scrollableRight - scrollNumbers.scrollDelta;

    this.scrollBody.nativeElement.scrollLeft += scrollableLeftChange;
    this.scrollHeader.nativeElement.scrollLeft = this.scrollBody.nativeElement.scrollLeft;

    this.createDays();
    this.cdr.detectChanges();

    this.scrl._referenceScrollLeft = this.dateToPosition(scrollThreshold.referenceDate);
  }

  _updateRange(left: number, right: number): void {
    const startIndex = Math.floor(left / scrollNumbers.dayWidth);
    const endIndex = Math.floor(right / scrollNumbers.dayWidth) - 1;

    const from = this.days[startIndex].date;
    const to = this.days[endIndex].date;

    this.from = from;
    this.to = to;

    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    const { scrollLeft, clientWidth } = this.scrollBody.nativeElement;
    this.scrl.checkScrollableThresholdHit(scrollLeft, clientWidth);
    this.scrl.updateRange(scrollLeft, scrollLeft + clientWidth);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 550) {
      let element = document.getElementById('headerstyle');
      element.classList.add('sticky');
    } else {
      let element = document.getElementById('headerstyle');
      element.classList.remove('sticky');
    }
  }


  dateToPosition(date: dayjs.Dayjs): number {
    const diff = date.diff(this.scrl._scrollableFrom, 'day');
    return this.days[diff].left;
  }


  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  centerOn(date: dayjs.Dayjs, behavior: ScrollBehavior = 'smooth'): void {
    const { clientWidth } = this.scrollBody.nativeElement;
    const left = this.dateToPosition(date);
    this.scrollBody.nativeElement.scrollTo({
      left: left + scrollNumbers.dayWidth / 2 - clientWidth / 2.0,
      behavior
    });
  }

  trackById(index, item): any {
    return item.id;
  }

  trackByKey(index, item): any {
    return item.key;
  }


  //---------------------------------------------------------------------------------------------



}
















