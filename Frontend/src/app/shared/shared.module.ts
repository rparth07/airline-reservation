import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { DecimalFormatterPipe } from './pipes/decimal-formatter.pipe';

@NgModule({
  declarations: [CustomCurrencyPipe, DecimalFormatterPipe],
  imports: [CommonModule],
  exports: [CustomCurrencyPipe, DecimalFormatterPipe],
  providers: [CurrencyPipe],
})
export class SharedModule {}
