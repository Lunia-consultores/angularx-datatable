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
        is_lerdo: true,
        telefono: '634033415',
      },
      {
        id: 2,
        nombre: 'Jaime',
        apellidos: 'Molero',
         is_lerdo: false,
        telefono: '968553568',

      },
      {
        id: 3,
        nombre: 'Jose',
        apellidos: 'García',
         is_lerdo: true,
        telefono: '968554422',

      },
      {
        id: 4,
        nombre: 'Tomi',
        apellidos: 'Picha',
         is_lerdo: false,
        telefono: '658993355',

      },
      {
        id: 5,
        nombre: 'Black',
        apellidos: null,
         is_lerdo: true,
        telefono: '587412356',

      },
      {
        id: 6,
        nombre: 'Juanfra',
        apellidos: 'Sanchez Aldeguer',
        is_lerdo: false,
        telefono: '699858784',

      }
    ];
  }
}
