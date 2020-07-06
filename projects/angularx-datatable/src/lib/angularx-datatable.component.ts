import {Component, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ColumnSettings, DatatableSettings} from './datatable-settings.model';
import {NgbdSortableHeaderDirective, SortEvent} from './ngbd-sortable-header.directive';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'lib-angularx-datatable',
  templateUrl: 'angularx-datatable.component.html',
  styles: [
  ]
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
      if (this.sortColumn === '') {
        this.sortColumn = this.settings.columns[0].property;
      }
      this.tableData = this.sort(val, this.sortColumn, this.sortDirection);

      this.setColumnsAsVisible();
      this.hideCheckboxes();
      this.checkSelectAll();
    }

  }

  public uuid = this.uuidv4();
  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;
  public page = 1;
  public pageSize = 15;
  public selectAllCheck = false;

  constructor(public sanitized: DomSanitizer) {
    console.log(this.settings);
  }

  public ngOnInit(): void {
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
      this.selectAllCheck = true;
    } else {
      this.selectAllCheck = false;
    }
    if (columnsChecked.length === 0) {
      this.selectAllCheck = false;
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
      return this.originalTableData;
    } else {
      this.setColumnDirection();
      return [...tableData].sort((a, b) => {
        const res = this.compare(a[this.sortColumn], b[this.sortColumn]);
        return direction === 'asc' ? res : -res;
      });
    }
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
}
