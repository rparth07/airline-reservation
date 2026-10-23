import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DomainConstants } from '../domain-constants';

@Injectable({ providedIn: 'root' })
export class DateFormatService {
  static padZeroToTime(timeString: string) {
    const momentTime = moment(timeString, 'HH:mm:ss');

    return [
      padTo2Digits(momentTime.hour()),
      padTo2Digits(momentTime.minute()),
    ].join(':');

    function padTo2Digits(num: number) {
      return num.toString().padStart(2, '0');
    }
  }

  static longDate(date: Date) {
    const day = date.toLocaleString('default', { day: '2-digit' });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.toLocaleString('default', { year: 'numeric' });
    return day + '-' + month + '-' + year;
  }

  static calculateDuration(
    departureTimeString: string,
    arrivalTimeString: string
  ): string {
    const departureTime = moment(departureTimeString, 'HH:mm:ss');
    const arrivalTime = moment(arrivalTimeString, 'HH:mm:ss');

    if (arrivalTime.isBefore(departureTime)) arrivalTime.add(1, 'day');
    const hour = this.getDifferenceByUnit(departureTime, arrivalTime, 'hours');
    const minute =
      this.getDifferenceByUnit(departureTime, arrivalTime, 'minutes') % 60;

    return `${hour} h ${minute} m`;
  }

  private static getDifferenceByUnit(
    starTime: moment.Moment,
    endTime: moment.Moment,
    unitOfTime: moment.unitOfTime.Diff
  ) {
    return endTime.diff(starTime, unitOfTime);
  }

  static convertDateStringToLocalDateFormat(
    dateString: string,
    dateformat: string = DomainConstants.QueryParamsDateFormat
  ) {
    var momentDate = moment(dateString, dateformat);

    return momentDate.toDate();
  }

  static getFormattedDate(date: string | Date, format: string): string {
    return moment(date).format(format);
  }
}
