import { DateFormatService } from './date-format.service';
describe('Travel time display', () => {
 it('formats afternoon and overnight travel without negative durations', () => {
  expect(DateFormatService.padZeroToTime('16:30:00')).toBe('16:30');
  expect(DateFormatService.calculateDuration('23:30:00','01:15:00')).toBe('1 h 45 m');
 });
});
