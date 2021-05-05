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
        numero_linea: 6.003,
      },
      {
        id: 2,
        nombre: 'Jaime',
        apellidos: 'Cerezuela',
         is_lerdo: false,
        telefono: '968553568',
        numero_linea: 1.125,

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
        apellidos: 'Cerezuela',
         is_lerdo: false,
        telefono: '658993355',
        numero_linea: 3,

      },
      {
        id: 5,
        nombre: 'Black',
        apellidos: 'Cerezuela',
         is_lerdo: true,
        telefono: '587412356',
        numero_linea: 4,

      },
      {
        id: 6,
        nombre: 'Juanfra',
        apellidos: 'García',
        is_lerdo: false,
        telefono: '699858784',
        numero_linea: 5,

      },
      {
        id: 1,
        nombre: 'Miguel',
        apellidos: 'Cerezuela',
        is_lerdo: true,
        telefono: '634033415',
        numero_linea: 6.003,
      },
      {
        id: 2,
        nombre: 'Jaime',
        apellidos: 'Cerezuela',
         is_lerdo: false,
        telefono: '968553568',
        numero_linea: 1.125,

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
        apellidos: 'Cerezuela',
         is_lerdo: false,
        telefono: '658993355',
        numero_linea: 3,

      },
      {
        id: 5,
        nombre: 'Black',
        apellidos: 'Cerezuela',
         is_lerdo: true,
        telefono: '587412356',
        numero_linea: 4,

      },
      {
        id: 6,
        nombre: 'Juanfra',
        apellidos: 'García',
        is_lerdo: false,
        telefono: '699858784',
        numero_linea: 5,

      },
      {
        id: 1,
        nombre: 'Miguel',
        apellidos: 'Cerezuela',
        is_lerdo: true,
        telefono: '634033415',
        numero_linea: 6.003,
      },
      {
        id: 2,
        nombre: 'Jaime',
        apellidos: 'Cerezuela',
         is_lerdo: false,
        telefono: '968553568',
        numero_linea: 1.125,

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
        apellidos: 'Cerezuela',
         is_lerdo: false,
        telefono: '658993355',
        numero_linea: 3,

      },
      {
        id: 5,
        nombre: 'Black',
        apellidos: 'Cerezuela',
         is_lerdo: true,
        telefono: '587412356',
        numero_linea: 4,

      },
      {
        id: 6,
        nombre: 'Juanfra',
        apellidos: 'García',
        is_lerdo: false,
        telefono: '699858784',
        numero_linea: 5,

      }
    ];
  }
}
