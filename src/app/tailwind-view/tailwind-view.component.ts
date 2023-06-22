import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableSettings} from '../../../projects/angularx-datatable/src/lib/datatable-settings.model';
import {DataService} from '../data.service';
import {
  AngularxDatatableTailwindComponent
} from '../../../projects/angularx-datatable/src/lib/angularx-datatable-tailwind/angularx-datatable-tailwind.component';

@Component({
  selector: 'app-tailwind-view',
  templateUrl: './tailwind-view.component.html',
  styleUrls: ['./tailwind-view.component.css']
})
export class TailwindViewComponent implements OnInit {
  @ViewChild('angularxDatatableComponent', {static: true}) angularxDatatableComponent: AngularxDatatableTailwindComponent;
  public title = 'datable';
  public data;
  public data2;
  public tableSettings: DatatableSettings = {
    title: '',
    table_uuid: 'tabla_app_component',
    enable_save_conf: false,
    showTotalRow: true,
    enableColumnFilters: true,
    columns: [
      {
        name: 'Línea',
        property: 'numero_linea',
        totalize: true,
        type: 'currency'
      },
      {
        name: 'Nombre',
        property: 'nombre',
      },
      {
        name: 'Fecha',
        property: 'fecha',
        type: 'date'
      },
      {
        name: 'Fecha nombre de columna largo',
        property: 'fecha',
        type: 'date'
      },
      {
        name: 'Notas',
        nameInnerHtml: '<span class="c-pointer text-primary"><i class="fas fa-user"></i></span>',
        property: 'telefono',
        type: 'custom',
        customContent: (row) => {
          return `<span class="text-green-600"><i class="fa fa-check"></i></span>`;
        }
      },
      {
        name: 'Telefono',
        property: 'telefono',
        type: 'custom',
        customContent: (row) => {
          return `<span>${row.telefono}</span>`;
        },
        callback: (row) => {
          alert('callback funcionando');
        }
      },
      {
        name: 'Notas',
        nameInnerHtml: '<span class="c-pointer text-primary"><i class="fas fa-user"></i></span>',
        nameInnerHtmlTitle: 'Usuario registrado',
        classes: 'text-center',
        property: 'telefono',
        type: 'custom',
        customContent: (row) => {
          return `<span class="text-green-600"><i class="fa fa-check"></i></span>`;
        }
      }
    ],
    rowActions: [
      {
        name: 'Modificar',
        callback: (row) => {
        },
      },
    ],
    rowStyles: [
      {
        classes: 'bg-red-200',
        dataField: 'nombre',
        callback: (row) => {
          return row.nombre === 'Miguel';
        }
      },
    ],
    tableActions: [
      {
        name: 'Borrar',
        classes: 'text-red-600 pr-2',
        icon: 'fas fa-trash',
        callback: (rows) => {
        },
      },
      {
        name: 'Imprimir',
        classes: 'text-cyan-600 pr-2',
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
    pageSize: 15,
    classes: '',
    showchecksColumn: true,
    cursorPointerRow: true,
    totalizeSelectedRows: true,
  };
  public tableSettings2: DatatableSettings = {
    title: '',
    table_uuid: 'tabla_app_component2',
    enable_save_conf: true,
    columns: [
      {
        name: 'Línea',
        property: 'numero_linea',
      },
      {
        name: 'Nombre',
        property: 'nombre',
        type: 'anchor'
      },
      {
        name: 'Apellidos',
        property: 'apellidos',
      },
      {
        name: 'Fecha nombre de columna largo',
        property: 'fecha',
        type: 'date'
      },
      {
        name: 'Telefono',
        property: 'telefono',
        type: 'custom',
        customContent: (row) => {
          return `<span>${row.telefono}</span>`;
        }
      },
      {
        name: 'Notas',
        nameInnerHtml: '<span class="c-pointer text-primary"><i class="fas fa-user"></i></span>',
        nameInnerHtmlTitle: 'Usuario vinculado',
        classes: 'text-center',
        property: 'telefono',
        type: 'custom',
        customContent: (row) => {
          return `<span class="text-green-600"><i class="fa fa-check"></i></span>`;
        }
      }
    ],
    rowActions: [
      {
        name: 'Modificar',
        classes: 'p-1 text-white-900 border border-yellow-300 rounded-lg bg-yellow-400 sm:text-xs focus:ring-yellow-500 focus:border-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:placeholder-yellow-400 dark:text-white dark:focus:ring-yellow-500 dark:focus:border-yellow-500',
        callback: (row) => {
        },
      },
    ],
    tableActions: [
      {
        name: 'Borrar',
        classes: 'text-red-600 pr-2',
        icon: 'fas fa-trash',
        callback: (rows) => {
        },
      },
      {
        name: 'Imprimir',
        classes: 'text-cyan-600 pr-2',
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
    labelRadioButtonColumn: '',
    usePagination: false
  };

  constructor(private dataService: DataService) {
  }

  public ngOnInit(): void {
    this.data = [];
    setTimeout(() => {
      this.data = this.dataService.getTrabajadores();
    }, 1000);
    this.data2 = this.dataService.getTrabajadores();
  }

  public refrescarListado(): void {
    this.data = this.dataService.getTrabajadores();
  }

  public checkBoxChanged(): void {
    console.log(this.angularxDatatableComponent.getSelectedRows());
  }
}
