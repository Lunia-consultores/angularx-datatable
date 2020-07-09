import {Component, OnInit} from '@angular/core';
import {DatatableSettings} from '../../projects/angularx-datatable/src/lib/datatable-settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
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
        apellidos: 'Cerezuela'
      },
      {
        id: 2,
        nombre: 'Jaime',
        apellidos: 'Molero'
      },
      {
        id: 3,
        nombre: 'Jose',
        apellidos: 'García'
      },
      {
        id: 4,
        nombre: 'Tomi',
        apellidos: 'Picha'
      },
      {
        id: 5,
        nombre: 'Black',
        apellidos: 'Coronel'
      },
      {
        id: 6,
        nombre: 'Juanfra',
        apellidos: 'Sanchez Aldeguer'
      }
    ];

  }
}
