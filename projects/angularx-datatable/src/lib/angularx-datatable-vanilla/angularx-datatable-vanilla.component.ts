import {Component, Input, OnInit} from '@angular/core';
import {AngularxBaseDatatableComponent} from '../angularx-base-datatable.component';

interface Paginacion {
  paginas_a_mostrar: any[];
  siguiente_pagina: number;
  pagina_anterior: number;
  total_paginas: number;
  pagina_actual: number;
  elementos_por_pagina: number;
}

@Component({
  selector: 'lib-angularx-datatable-vanilla',
  templateUrl: './angularx-datatable-vanilla.component.html',
  styleUrls: ['./angularx-datatable-vanilla.component.css']
})
export class AngularxDatatableVanillaComponent extends AngularxBaseDatatableComponent implements OnInit {

  public dropdownColumnasVisibles: boolean = false as boolean;
  public paginacion = {} as Paginacion;


  set data(val: any) {
    super.data = val;
    this.calcularPaginacion();
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.calcularPaginacion();
  }

  public mostrarOcultarColumnas(): void {
    this.dropdownColumnasVisibles = !this.dropdownColumnasVisibles;
  }

  private calcularPaginacion(): void {
    this.paginacion.paginas_a_mostrar = [];
    this.paginacion.elementos_por_pagina = this.settings.pageSize;
    this.paginacion.pagina_actual = 1;
    const tieneUltimaPaginaIncompleta = this.tableData.length % this.paginacion.elementos_por_pagina !== 0;
    this.paginacion.total_paginas = Math.trunc((this.tableData.length / this.paginacion.elementos_por_pagina)) + (tieneUltimaPaginaIncompleta ? 1 : 0);
    this.navegarPagina(this.paginacion.pagina_actual);
  }


  public navegarPagina(pagina: any): void {
    if (!isNaN(pagina)) {
      this.recalcularPaginas(pagina);
      this.paginacion.pagina_actual = pagina;
      this.page = pagina;
      super.storeActivePage();
    }
  }

  private recalcularPaginas(pagina: any): void {
    const paginaInicial = Math.max(pagina - 2, 2);
    const paginaFinal = Math.min(pagina + 2, this.paginacion.total_paginas - 1);

    this.paginacion.paginas_a_mostrar = [];

    this.paginacion.paginas_a_mostrar.push(1);
    if (paginaInicial > 2) {
      this.paginacion.paginas_a_mostrar.push('...');
    }

    for (let i = paginaInicial; i <= paginaFinal; i++) {
      this.paginacion.paginas_a_mostrar.push(i);
    }

    if (paginaFinal < this.paginacion.total_paginas - 1) {
      this.paginacion.paginas_a_mostrar.push('...');
    }
    if (this.paginacion.total_paginas > 1) {
      this.paginacion.paginas_a_mostrar.push(this.paginacion.total_paginas);
    }
  }

  public siguientePagina(): void {
    if (this.paginacion.pagina_actual < this.paginacion.total_paginas) {
      this.paginacion.pagina_actual += 1;
      this.navegarPagina(this.paginacion.pagina_actual);
    }
    this.page = this.paginacion.pagina_actual;
  }

  public paginaAnterior(): void {
    if (this.paginacion.pagina_actual > 1) {
      this.paginacion.pagina_actual -= 1;
      this.navegarPagina(this.paginacion.pagina_actual);
    }
    this.page = this.paginacion.pagina_actual;
  }

  public cambiarNumeroColumnasAMostrar(numeroPaginas): void {

    const todosElementosSeleccionados = numeroPaginas === 'all';

    this.elementosAMostrar = todosElementosSeleccionados ? this.tableData.length : numeroPaginas;
    this.paginacion.elementos_por_pagina = todosElementosSeleccionados ? this.tableData.length : numeroPaginas;

    const tieneUltimaPaginaIncompleta = this.tableData.length % this.paginacion.elementos_por_pagina !== 0;
    this.paginacion.total_paginas = todosElementosSeleccionados ? 1 : Math.trunc((this.tableData.length / this.paginacion.elementos_por_pagina)) + (tieneUltimaPaginaIncompleta ? 1 : 0);

    if (todosElementosSeleccionados) {
      this.navegarPagina(1)
    } else if (this.paginacion.pagina_actual > this.paginacion.total_paginas) {
      this.navegarPagina(this.paginacion.total_paginas);
    } else {
      this.navegarPagina(this.paginacion.pagina_actual);
    }
  }
}
