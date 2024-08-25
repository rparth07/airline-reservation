import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalFormatter',
})
export class DecimalFormatterPipe implements PipeTransform {
  transform(value: number, numberOfDigitAfterDecimal: number = 2): string {
    return (Math.round(value * 100) / 100).toFixed(numberOfDigitAfterDecimal);
  }
}
