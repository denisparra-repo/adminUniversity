import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataRoles',
  standalone: true
})
export class DataRolesPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const roleObj: any = {
      admin: 'Administrador',
      teacher: 'Docente',
      student: 'Estudiante'
    }
    return value.split(',').map( (e:string) => roleObj[e]).join();
  }

}
