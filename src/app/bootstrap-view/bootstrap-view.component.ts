import {Component, OnInit, ViewChild} from '@angular/core';
import {
  AngularxDatatableBootstrapComponent
} from '../../../projects/angularx-datatable/src/lib/angularx-datatable-bootstrap/angularx-datatable-bootstrap.component';
import {DatatableSettings} from '../../../projects/angularx-datatable/src/lib/datatable-settings.model';
import {DataService} from '../data.service';

@Component({
  selector: 'app-bootstrap-view',
  templateUrl: './bootstrap-view.component.html',
  styleUrls: ['./bootstrap-view.component.css']
})
export class BootstrapViewComponent implements OnInit {

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
        type: 'currency'
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
        name: 'Fecha',
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
        name: 'Telefono nombre columna largo',
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
    totalizeSelectedRows: true,
    rowActions: [
      {
        name: 'Modificar',
        classes: 'btn-warning',
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
    pageSize: 15,
    classes: 'table-sm table-striped table table-hover',
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
    pageSize: 15,
    classes: 'table-sm table-striped',
    showchecksColumn: true,
    usePagination: false
  };

  constructor(private dataService: DataService) {
  }

  async ngOnInit() {
    const trabajadores = this.dataService.getTrabajadores();
    trabajadores.forEach((row) => {
      row.telefono = 'cargando...';
    });
    this.data = trabajadores;
    await this.cargarTelefono();
    this.data2 = this.dataService.getTrabajadores();
  }

  public refrescarListado(): void {
    this.data = this.dataService.getTrabajadores();
  }

  public checkBoxChanged(): void {
    console.log(this.angularxDatatableComponent.getSelectedRows());
  }

  private async cargarTelefono(): Promise<void> {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    //solo debe cargar los elementos de la página actual


    for (let row of this.data) {
      row.telefono = 'cargando...';
      await delay(800); // wait 2 seconds
      row.telefono = '634033415';
    }
  }
}
