export class DateFormatService {
  static padZeroToTime(date: Date) {
    return [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
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

  static setNoOfStopsString(noOfStops: number): string {
    return noOfStops == 0 ? 'non-stop' : `${noOfStops} stops`;
  }
}
