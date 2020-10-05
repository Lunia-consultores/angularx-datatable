import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getTrabajadores(): any[] {
    return [
      {
        id: 1,
        nombre: 'Miguel',
        apellidos: 'Cerezuela',
        telefono: '634033415',
      },
      {
        id: 2,
        nombre: 'Jaime',
        apellidos: 'Molero',
        telefono: '968553568',

      },
      {
        id: 3,
        nombre: 'Jose',
        apellidos: 'García',
        telefono: '968554422',

      },
      {
        id: 4,
        nombre: 'Tomi',
        apellidos: 'Picha',
        telefono: '658993355',

      },
      {
        id: 5,
        nombre: 'Black',
        apellidos: null,
        telefono: '587412356',

      },
      {
        id: 6,
        nombre: 'Juanfra',
        apellidos: 'Sanchez Aldeguer',
        telefono: '699858784',

      }
    ];
  }
}
