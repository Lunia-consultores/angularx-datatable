import {Component, OnInit} from '@angular/core';
import {DatatableSettings} from '../../projects/angularx-datatable/src/lib/datatable-settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'datable';
  public data;
  public tableSettings: DatatableSettings = {
    title: '',
    columns: [
      {
        name: 'Nombre',
        property: 'nombre',
      },
      {
        name: 'Apellidos',
        property: 'apellidos',
      },
      {
        name: 'Telefono',
        property: 'telefono',
        type: 'custom',
        customContent: (row) => {
          return `<span>${row.telefono}</span>`;
        }
      }
    ],
    rowActions: [
      {
        name: 'Modificar',
        classes: 'btn-warning',
        callback: (row) => {
        },
      },
    ],
    tableActions: [
      {
        name: 'Borrar',
        classes: 'btn btn-link text-danger',
        icon: 'fas fa-trash',
        callback: (rows) => {
        },
      },
      {
        name: 'Imprimir',
        classes: 'btn btn-link text-dark',
        icon: 'fas fa-print',
        callback: (rows) => {
        },
      },
    ],
    pageSize: 10,
    classes: 'table-sm table-striped',
    showchecksColumn: true,
    enableColumnFilters: true
  };

  ngOnInit(): void {
    this.data = [
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
