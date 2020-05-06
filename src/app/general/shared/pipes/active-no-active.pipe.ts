import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeNoActive'
})
export class ActiveNoActivePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return value ? 'Activo' : 'Inactivo';
  }
}
