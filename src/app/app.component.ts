import {Component, OnInit} from '@angular/core';
import {DatatableSettings} from '../../projects/angularx-datatable/src/lib/datatable-settings.model';
import {DataService} from './data.service';

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
        name: 'Línea',
        property: 'numero_linea',
      },
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
    rowsStyles:
      {
        callback: (row) => {
              return 'table-danger';
        }
      }
    ,
    pageSize: 2,
    classes: 'table-sm table-striped',
    showchecksColumn: true,
    enableColumnFilters: true,
    usePagination: false,
    saveTAbleStatus: true
    // defaultShortColumn: {
    //   property: 'numero_linea',
    //   direction: 'asc'
    // }
  };


  constructor(private dataService: DataService) { }

  public ngOnInit(): void {
    this.data = this.dataService.getTrabajadores();
  }

  public refrescarListado(): void {
    this.data = this.dataService.getTrabajadores();
  }
}
