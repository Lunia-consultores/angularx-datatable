import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ColumnSettings, DatatableSettings} from './datatable-settings.model';
import {NgbdSortableHeaderDirective, SortEvent} from './ngbd-sortable-header.directive';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'lib-angularx-datatable',
  templateUrl: 'angularx-datatable.component.html',
  styles: []
})

export class AngularxDatatableComponent implements OnInit {

  @Input() settings: DatatableSettings;
  @ViewChild('table', {static: false}) table;
  public tableData = [];
  public originalTableData = [];
  private sortDirection = '';
  private sortColumn = '';

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
      this.tableData = this.sort(val, this.sortColumn, this.sortDirection);

      this.setColumnsAsVisible();
      this.hideCheckboxes();

      if (this.searchForm && this.hayFiltros()) {
        this.applyFilters();
      }

    }

  }

  public uuid = this.uuidv4();
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  public page = 1;
  public searchForm: FormGroup;

  constructor(public sanitized: DomSanitizer,
              private formBuilder: FormBuilder) {
  }

  public ngOnInit(): void {
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
    if (columnsChecked.length > 0) {
      this.settings.someSelectedRows = true;
    } else {
      this.settings.someSelectedRows = false;
    }

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
  }

  public selectAll($event): void {
    this.tableData.forEach(row => {
      if (row.checkable) {
        row.checked = $event.target.checked;
      }
    });
  }

  public onSort({column, direction}: SortEvent): void {
    this.applyFilters();
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.tableData = this.sort(this.tableData, column, direction);
  }

  private compare(v1, v2): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  private sort(tableData: any[], column: string, direction: string): any[] {
    this.sortDirection = direction;
    this.sortColumn = column;
    if (this.sortDirection === '') {
      this.setColumnDirection();
      return this.tableData;
    } else {
      this.setColumnDirection();
      return [...tableData].sort((a, b) => {
        const res = this.compare(a[this.sortColumn], b[this.sortColumn]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  private resetSort(): void {
    this.settings.columns.forEach(column => {
      column.direction = '';
    });
  }

  private setColumnDirection(): void {
    const column = this.getColumnByProperty(this.sortColumn);
    column.direction = this.sortDirection;
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

    const selectedRowsNumber = this.tableData.filter(row => row.checked).length;


    return selectedRowsNumber;
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
    if (this.settings.rowsStyles) {
      classes = this.settings.rowsStyles.callback(row);
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
      this.applyFilters();
    });
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

  public applyFilters(): void {
    const filterValue = this.searchForm.value;
    this.tableData = this.originalTableData;
    this.settings.columns.forEach(column => {
      if (filterValue[column.property]) {
        this.tableData = this.tableData.filter(x => {
          return ((x[column.property] ? x[column.property] : '').toLowerCase().includes(filterValue[column.property].toLowerCase()));
        });
      }
    });

    this.tableData = this.sort(this.tableData, this.sortColumn, this.sortDirection);

  }

  private getCheckedRows(): any[] {
    return this.tableData.filter(row => row.checked === true);
  }

  private checkOriginalTableRows(originalcheckedRows: any[]) {
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
}
