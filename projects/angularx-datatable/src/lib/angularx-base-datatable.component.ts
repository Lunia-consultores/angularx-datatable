import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ColumnSettings, DatatableSettings} from './datatable-settings.model';
import {NgbdSortableHeaderDirective, SortEvent} from './ngbd-sortable-header.directive';
import {DomSanitizer} from '@angular/platform-browser';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {SaveTableConfigurationService} from './save-table-configuration.service';
import {CurrencyPipe, DatePipe, DecimalPipe, SlicePipe} from '@angular/common';

@Component({
  selector: 'lib-angularx-base-datatable',
  template: '',
})
export class AngularxBaseDatatableComponent implements OnInit, AfterViewInit {

  @Input() settings: DatatableSettings;
  @Output() checkBoxChanged = new EventEmitter<any>();
  @ViewChild('table', {static: false}) table;
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  public uuid = this.uuidv4();
  public page = 1;
  public searchForm: UntypedFormGroup;
  public tableData = [];
  public originalTableData = [];
  private sortDirection = '';
  private sortColumn = '';
  public elementosAMostrar = 0;
  public elementosAMostrarSelect: number[] = [];
  public allSelected = false;
  public optionSelected: number | string = undefined;

  get data(): any {
    return this.tableData;
  }

  @Input()
  set data(val) {
    if (val) {
      this.originalTableData = val;
      const checkedRows = this.getCheckedRows();
      this.tableData = val;
      this.checkOriginalTableRows(checkedRows);
      if (this.sortColumn === '') {
        this.sortColumn = this.settings.columns[0].property;
      }

      this.calcularElementosAMostrarSelect();

      if (this.optionSelected !== undefined) {
        this.cambiarNumeroColumnasAMostrar(this.optionSelected);
      }

      if (!this.saveTableConfiguration.getTableConfig(this.settings.table_uuid)) {
        this.saveTableConfiguration.createTableConfig(this.settings.table_uuid);
      }
      this.applyTableSettings();
    }
  }

  private applyTableSettings(): void {
    if (!this.settings.enable_save_conf) {
      this.filtrarOrdenar();
    } else {
      setTimeout(() => {
          this.applySavedSort();
          this.applySavedPage();
        },
        0);
    }

    this.setColumnsAsVisible();
    this.hideCheckboxes();

    if (this.searchForm && this.hayFiltros()) {
      this.applyFilters();
    }
    this.sortHiddenColumns();
    this.sortByDefaultShortColumnProperty();
    this.initColumnVisivility();
  }

  constructor(public sanitized: DomSanitizer,
              public saveTableConfiguration: SaveTableConfigurationService,
              private datePipe: DatePipe,
              private formBuilder: UntypedFormBuilder,
              private currencyPipe: CurrencyPipe,
              private decimalPipe: DecimalPipe,
              private slicePipe: SlicePipe) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
        this.applySavedSort();
        this.applySavedPage();
      },
      0);
  }

  public ngOnInit(): void {

    if (this.settings.usePagination === undefined) {
      this.settings.usePagination = true;
    }

    this.calcularElementosAMostrarSelect();

    if (this.settings.cursorPointerRow === undefined) {
      this.settings.cursorPointerRow = false;
    }
    this.setSearchForm();
  }

  public ocultarColumna(property: string): boolean {
    const column = this.settings.columns.find(x => {
      return x.property === property;
    });
    if (column) {
      return !column.show;
    }
  }

  private checkSelectAll(): void {
    const columnsChecked = this.tableData.filter(column => column.checked === true);
    this.settings.someSelectedRows = columnsChecked.length > 0;

    if (columnsChecked.length === this.tableData.length) {
      this.searchForm.patchValue({checkSelectAll: true});
    } else {
      this.searchForm.patchValue({checkSelectAll: false});
    }
    if (columnsChecked.length === 0) {
      this.searchForm.patchValue({checkSelectAll: false});
    }
  }

  public selectRow($event, field): void {
    field.checked = $event.target.checked;
    this.checkSelectAll();
    this.obtenerTotalColumna(field)
    this.checkBoxChanged.emit();
  }

  public selectRowRadioButtonSelected($event, selectedRow): void {
    this.tableData.forEach(row => {
        row.checked = false;
    });
    selectedRow.checked = $event.target.checked;
    window.dispatchEvent(new CustomEvent('RadioButtonSelected', {detail: selectedRow}));
  }

  public selectAll($event): void {
    this.tableData.forEach(row => {
      if (row.checkable) {
        row.checked = $event.target.checked;
      }
    });
    this.checkBoxChanged.emit();
  }

  public onSort({column, direction}: SortEvent): void {
    this.sortDirection = direction;
    this.sortColumn = column;
    this.filtrarOrdenar();
    this.sortHiddenColumns();
  }

  private compare(v1, v2): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  private sort(tableData: any[], column: string, direction: string): any[] {

    if (this.headers) {
      this.resetSort();
    }
    this.saveTableConfiguration.saveTableSortStatus(this.settings.table_uuid, column, direction);

    return [...tableData].sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      if (direction === 'asc') {
        return res;
      }
      if (direction === 'desc') {
        return -res;
      }
      if (direction === '') {
        return 0;
      }
    });
  }

  private sortHiddenColumns(): void {
    if (this.settings.hiddenSortColumns) {
      this.settings.hiddenSortColumns.forEach((column) => {
        this.tableData = this.sort(this.tableData, column.property, column.direction);
      });
    }
  }

  private sortByDefaultShortColumnProperty(): void {
    if (this.settings.defaultShortColumn) {
      this.tableData = this.sort(this.tableData, this.settings.defaultShortColumn.property, 'asc');
    }
  }

  private resetSort(): void {
    this.headers.forEach(header => {
      if (header.sortable !== this.sortColumn) {
        header.reset();
      }
    });
  }

  private resetAllSort(): void {
    this.headers.forEach(header => {
      header.reset();
    });
  }

  private resetColumnVisivility(): void {
    this.settings.columns.forEach(column => {
      column.show = true;
    });
  }

  public getColumnByProperty(property: string): ColumnSettings {
    return this.settings.columns.find(x => x.property === property);
  }

  private setColumnsAsVisible(): void {
    this.settings.columns.forEach(column => {
      if (column.show === false) {
      } else {
        column.show = true;
      }
    });
  }

  public getCheckedRowsNumber(): number {
    return this.tableData.filter(row => row.checked).length;
  }

  public getSelectedRows(): number[] {
    const selected = [] as number[];
    this.tableData.forEach(row => {
      if (row.checked && row.checkable) {
        selected.push(row);
      }
    });
    return selected;
  }

  public uuidv4(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16 || 0);
      const v = c === 'x' ? r : (r && 0x3 || 0x8);
      return v.toString(16);
    });
  }

  public getRowClass(row): string {
    let classes = '';
    if (this.settings.rowStyles) {
      for (const rowStyle of this.settings.rowStyles) {
        if (rowStyle.callback(row)) {
          classes = classes + ' ' + rowStyle.classes;
        }
      }
      return classes;
    }
    return '';
  }

  public hideCheckboxes(): void {
    this.tableData.forEach(row => {
      if (this.settings.columnCheckExceptions) {
        this.settings.columnCheckExceptions.forEach(exception => {
          row.checkable = true;
        });
      } else {
        row.checkable = true;
      }
    });
  }

  public rowClick(row: any): any {
    if (this.settings.rowClick) {
      return this.settings.rowClick(row);
    } else {
      return;
    }
  }

  public getActionVisivility(action, row): () => void | boolean {
    if (action.visible) {
      return action.visible(row);
    } else {
      return () => true;
    }
  }

  private setSearchForm(): void {
    this.searchForm = this.formBuilder.group({checkSelectAll: false});
    this.settings.columns.forEach(column => {
      this.searchForm.addControl(column.property, this.formBuilder.control(null));
    });

    this.searchForm.valueChanges.subscribe((value) => {
      this.filtrarOrdenar();
    });
  }

  private filtrarOrdenar(): void {
    if (this.sortDirection === '') {
      this.tableData = this.originalTableData;
    }
    const filteredData = this.applyFilters();
    this.tableData = this.sort(filteredData, this.sortColumn, this.sortDirection);
  }

  public hayFiltros(): boolean {
    let hayFiltros = false;
    this.settings.columns.forEach(column => {
      if (this.searchForm.get(column.property).value && this.searchForm.get(column.property).value !== '') {
        hayFiltros = true;
      }
    });
    return hayFiltros;
  }

  public applyFilters(): any {
    let data = this.originalTableData;
    if (this.searchForm) {
      const filterValue = this.searchForm.value;
      this.settings.columns.forEach(column => {
        if (filterValue[column.property]) {
          if (column.type === 'number') {
            data = data.filter(x => {
              return ((x[column.property] ? x[column.property].toString() : '').includes(filterValue[column.property].toString()));
            });
          } else if (column.type === 'date') {
            data = data.filter(x => {
              return ((x[column.property] ? this.datePipe.transform(x[column.property], 'dd/MM/yyyy') : '')
                .toLowerCase().includes(filterValue[column.property].toLowerCase()));
            });
          } else {
            data = data.filter(x => {
              return ((x[column.property] ? x[column.property] : '').toLowerCase().includes(filterValue[column.property].toLowerCase()));
            });
          }
        }
      });
    }
    return data;
  }

  private getCheckedRows(): any[] {
    return this.tableData.filter(row => row.checked === true);
  }

  private checkOriginalTableRows(originalcheckedRows: any[]): void {
    this.tableData.forEach(tableDataRow => {
      originalcheckedRows.forEach(row => {
        if (tableDataRow[this.getUniqueId()] === row[this.getUniqueId()]) {
          tableDataRow.checked = true;
        }
      });
    });
  }

  private getUniqueId(): any {
    if (this.settings.rowUniqueId === undefined) {
      return 'id';
    }
    return this.settings.rowUniqueId;
  }

  private applySavedSort(): void {
    const sortConfig = this.saveTableConfiguration.getSortConfig(this.settings.table_uuid);
    this.headers.forEach(header => {
      if (sortConfig.sort && sortConfig.sort.column === header.sortable) {
        header.updateStatus(sortConfig.sort.direction);
      }
    });
  }

  private applySavedPage(): void {

    const sortConfig = this.saveTableConfiguration.getTableConfig(this.settings.table_uuid);

    if (sortConfig.page) {
      this.page = sortConfig.page;
    }
  }

  public showColumnChange($event: any, columnProperty: string): void {
    const columnasNovisibles = [];

    this.getNoVisibleColumns().forEach(noVIsible => {
      if (noVIsible.property !== columnProperty) {
        columnasNovisibles.push({property: noVIsible.property});
      }
    });
    if (!$event) {

      columnasNovisibles.push({property: columnProperty});
    }
    this.saveTableConfiguration.saveTableColumnVisibility(this.settings.table_uuid, columnasNovisibles);
  }

  private initColumnVisivility(): void {
    const columns = this.saveTableConfiguration.getTableConfig(this.settings.table_uuid).columns_visibility;
    columns.forEach(column => {
      const columnSettings = this.settings.columns.find(columna => columna.property === column.property);
      columnSettings.show = false;
    });
  }

  public getNoVisibleColumns(): any {
    return this.settings.columns.filter(column => !column.show);
  }

  public resetTableSavedConfig(): void {
    this.saveTableConfiguration.clearConfig(this.settings.table_uuid);
    this.resetAllSort();
    this.searchForm.reset();
    this.tableData = this.originalTableData;
    this.sortColumn = null;
    this.applyTableSettings();
    this.resetColumnVisivility();
    this.resetPage();
  }

  public obtenerTotalColumna(columna: ColumnSettings) {

    const propiedadColumna = columna.property;
    let totalesResultados = 0;
    let totalesResultadosSelected = 0;
    let totalesResultadosSelectedFormateado = null;

    if (columna.totalizeWhen) {
      this.tableData.forEach(row => {
        if (columna.totalizeWhen(row)) {
          totalesResultados += row[propiedadColumna];
          if (this.settings.totalizeSelectedRows) {
            if (row.checked) {
              totalesResultadosSelected += row[propiedadColumna];
            }
          }
        }
      });
    } else {
      this.tableData.forEach(row => {
        totalesResultados += row[propiedadColumna];
        if (this.settings.totalizeSelectedRows) {
          if (row.checked) {
            totalesResultadosSelected += row[propiedadColumna];
          }
        }
      });
    }
    switch (columna.type) {
      case 'number':
        // @ts-ignore
        totalesResultados = this.decimalPipe.transform(totalesResultados, '0.0-2');
        if (this.settings.totalizeSelectedRows && totalesResultadosSelected > 0) {
          // @ts-ignore
          totalesResultadosSelectedFormateado = this.decimalPipe.transform(totalesResultadosSelected, '0.0-2');
        }
        break;
      case 'currency':
        // @ts-ignore
        totalesResultados = this.currencyPipe.transform(totalesResultados, 'EUR');
        if (this.settings.totalizeSelectedRows && totalesResultadosSelected > 0) {
          // @ts-ignore
          totalesResultadosSelectedFormateado = this.currencyPipe.transform(totalesResultadosSelected, 'EUR');
        }
        break;
    }

    if (this.settings.totalizeSelectedRows && totalesResultadosSelected > 0) {
        return totalesResultados + ' (Seleccionado: ' + totalesResultadosSelectedFormateado + ')';
    }

    return totalesResultados;
  }

  public storeActivePage(): void {
    this.saveTableConfiguration.saveTableActivePage(this.settings.table_uuid, this.page);
  }

  private resetPage(): void {
    this.page = 1;
  }

  public callback(column: ColumnSettings, row: any): void {
    if (column.callback !== undefined) {
      column.callback(row);
    }
  }

  public cambiarNumeroColumnasAMostrar(numeroPaginas): void {
    if (numeroPaginas === 'all') {
      this.optionSelected = numeroPaginas;
      this.elementosAMostrar = this.tableData.length;
      this.allSelected = true;
    } else {
      this.optionSelected = numeroPaginas;
      this.elementosAMostrar = numeroPaginas;
      this.allSelected = false;
    }
  }

  private calcularElementosAMostrarSelect() {
    this.elementosAMostrar = this.settings.pageSize;
    this.elementosAMostrarSelect = [];
    for (let i = 0; i < 4; i++) {
      this.elementosAMostrarSelect.push(this.settings.pageSize * (2 ** i));
    }
  }
}
