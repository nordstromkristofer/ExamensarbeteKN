import { ChangeDetectorRef, Component, EventEmitter, HostListener, NgZone, Output } from '@angular/core';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import dayOfYear from 'dayjs/plugin/dayOfYear';

dayjs.extend(minMax);
dayjs.extend(dayOfYear);

const _scrollableLeft = -1200;
const _scrollableRight = 1200;
const startDate = dayjs().startOf('day');

export const scrollNumbers = {
  dayWidth: 40,
  scrollDelta: 200,
  scrollWidth: 4006,
};

export const scrollThreshold = {
  leftThreshold: _scrollableLeft + scrollNumbers.scrollDelta,
  rightThreshold: _scrollableRight - scrollNumbers.scrollDelta,
  referenceDate: startDate,
};

export const getKey = (value) => {
  return value.format('DDMMYYYY');
};

const minDate = dayjs().startOf('year').add(6, 'month');
const maxDate = dayjs().startOf('year').add(12, 'month');

export const positionToDate = (x) => {
  const numDays = Math.floor(x / scrollNumbers.dayWidth);
  return scrollThreshold.referenceDate.add(numDays, 'day');
};

const infiniteScroll = true;
const customDays = {};
const sideContainerWidth = '200px';

export const calendarMeasure = {
  startDate,
  maxDate,
  minDate,
  infiniteScroll,
  customDays,
  sideContainerWidth,
};

@Component({
  template: '',
})
export class CalendarScrollComponent {
  @Output() scrollEvent = new EventEmitter();

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    if (window.pageYOffset > 550) {
      const element = document.getElementById('headerstyle');
      element.classList.add('sticky');
    } else {
      const element = document.getElementById('headerstyle');
      element.classList.remove('sticky');
    }
    this.scrollEvent.emit(e);
  }

  constructor(public cdr: ChangeDetectorRef, private zone: NgZone) {
    this._referenceDate = this.startDate;
    this._scrollableLeft = -1200;
    this._scrollableRight = 1200;
    this._scrollableFrom = this.positionToDate(this._scrollableLeft);
    this._scrollableTo = this.positionToDate(this._scrollableRight);
    this._scrollableLeftThreshold = this._scrollableLeft + scrollNumbers.scrollDelta;
    this._scrollableRightThreshold = this._scrollableRight - scrollNumbers.scrollDelta;
  }

  positionToDate(x) {
    const numDays = Math.floor(x / scrollNumbers.dayWidth);
    return this._referenceDate.add(numDays, 'day');
  }

  startDate = dayjs().startOf('day');
  _rows = [];
  _classes = {};
  days = [];
  to;
  from;
  _today = dayjs();
  _referenceDate;
  _referenceScrollLeft;
  _scrollableFrom;
  _scrollableTo;
  _scrollableLeft;
  _scrollableRight;
  left;
  right;
  event;
  _scrollableLeftThreshold;
  _scrollableRightThreshold;
  checkScrollableThresholdHit;
  updateRange;
}


