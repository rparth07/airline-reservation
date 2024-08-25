import { CurrencyPipe } from '@angular/common';
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom_currency',
})
export class CustomCurrencyPipe implements PipeTransform {
  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: string, countryCode: string = 'INR'): string {
    return this.currencyPipe.transform(value, countryCode)!;
  }
}
