import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appCurrencyMask]',
  standalone: true,
})
export class CurrencyMaskDirective {

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private control: NgControl
  ) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input) return;

    const numeric = input.value
      .replace(/\D/g, '')
      .replace(/^0+/, '');

    const numberValue = Number(numeric) / 100;

    this.control.control?.setValue(numberValue, {
      emitEvent: false
    });

    input.value = this.format(numberValue);
  }

  @HostListener('blur')
  onBlur(): void {
    const value = this.control.control?.value ?? 0;
    this.el.nativeElement.value = this.format(value);
  }

  private format(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}