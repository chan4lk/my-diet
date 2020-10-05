import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kilo' })
export class KiloFormaterPipe implements PipeTransform {
  transform(value: any): string {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(1) + 'B';
    }
    if (value >= 1e6) {
      return (value / 1e6).toFixed(1) + 'M';
    }
    if (value >= 1e3) {
      return (value / 1e3).toFixed(1) + 'K';
    }
    return value.toString();
  }
}
