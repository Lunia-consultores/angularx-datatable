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
        numero_linea: 6,
      },
      {
        id: 2,
        nombre: 'Jaime',
        apellidos: 'Molero',
         is_lerdo: false,
        telefono: '968553568',
        numero_linea: 1,

      },
      {
        id: 3,
        nombre: 'Jose',
        apellidos: 'García',
         is_lerdo: true,
        telefono: '968554422',
        numero_linea: 2,

      },
      {
        id: 4,
        nombre: 'Tomi',
        apellidos: 'Picha',
         is_lerdo: false,
        telefono: '658993355',
        numero_linea: 3,

      },
      {
        id: 5,
        nombre: 'Black',
        apellidos: null,
         is_lerdo: true,
        telefono: '587412356',
        numero_linea: 4,

      },
      {
        id: 6,
        nombre: 'Juanfra',
        apellidos: 'Sanchez Aldeguer',
        is_lerdo: false,
        telefono: '699858784',
        numero_linea: 5,

      }
    ];
  }
}
