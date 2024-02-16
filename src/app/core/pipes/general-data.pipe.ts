import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'generalData'
})
export class GeneralDataPipe implements PipeTransform {

  transform(value: string): string {
    return value && value.trim() !== '' ? value : 'N/D';
  }

}
