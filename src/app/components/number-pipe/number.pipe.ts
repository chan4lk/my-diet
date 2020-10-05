import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'kilo' })
export class KiloFormaterPipe implements PipeTransform {
  transform(value: any): string {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(2) + 'B';
    }
    if (value >= 1e6) {
      return (value / 1e6).toFixed(2) + 'M';
    }
    if (value >= 1e3) {
      return (value / 1e3).toFixed(2) + 'K';
    }
    return value.toFixed(2).toString();
  }
}
