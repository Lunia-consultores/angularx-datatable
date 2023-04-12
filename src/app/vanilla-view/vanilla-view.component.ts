import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AngularxDatatableBootstrapComponent
} from '../../../projects/angularx-datatable/src/lib/angularx-datatable-bootstrap/angularx-datatable-bootstrap.component';
import {DatatableSettings} from '../../../projects/angularx-datatable/src/lib/datatable-settings.model';
import {DataService} from '../data.service';

@Component({
  selector: 'app-vanilla-view',
  templateUrl: './vanilla-view.component.html',
  styleUrls: ['./vanilla-view.component.css']
})
export class VanillaViewComponent implements OnInit {

  @ViewChild('angularxDatatableComponent', {static: true}) angularxDatatableComponent: AngularxDatatableBootstrapComponent;
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
        totalizeWhen: (row) => {
          return row.nombre === 'Tomi';
        },
        type: 'number'
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
          return `<span class="text-success"><i class="fa fa-check"></i></span>`;
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
          return `<span class="text-success"><i class="fa fa-check"></i></span>`;
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
        classes: 'table-danger',
        dataField: 'nombre',
        callback: (row) => {
          return row.nombre === 'Miguel';
        }
      },
    ],
    tableActions: [
      {
        name: 'Borrar',
        classes: 'text-danger',
        icon: 'fas fa-trash',
        callback: (rows) => {
        },
      },
      {
        name: 'Imprimir',
        classes: 'text-info',
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
    cursorPointerRow: true
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
          return `<span class="text-success"><i class="fa fa-check"></i></span>`;
        }
      }
    ],
    rowActions: [
      {
        name: 'Modificar',
        classes: 'btn btn-sm btn-warning',
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
    showRadioButtonColumn: true,
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
