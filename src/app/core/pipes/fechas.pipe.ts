import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechas',
})
export class FechasPipe implements PipeTransform {
  transform(fecha: string | undefined): string {
    if (fecha && fecha.length > 0) {
      const parsingDate = new Date(fecha);

      const dia = parsingDate.getDate();
      const mes = parsingDate.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
      const anio = parsingDate.getFullYear();

      const formattedDate = `${dia.toString().padStart(2, '0')}/${mes
        .toString()
        .padStart(2, '0')}/${anio}`;

      return formattedDate;
    }

    return 'N/D';
  }
}
