import { Injectable } from '@angular/core';
import {TableStatus} from './table-status.model';

@Injectable({
  providedIn: 'root'
})
export class SaveTableConfigurationService {

  constructor() { }

  public getTableConfig(): TableStatus {
    return JSON.parse(localStorage.getItem('table'));
  }

  public createTableConfig(): void {
    localStorage.setItem('table', JSON.stringify({
      sort: [],
      columns_visibility: []
    } as TableStatus));
  }

  public getSortConfig(): TableStatus {
    const tableConfig = JSON.parse(localStorage.getItem('table'));
    if (tableConfig) {
      return tableConfig;
    } else {
      return {} as TableStatus;
    }
  }

  public saveTableSortStatus(columna, direccion): void {
    const tableStatus = this.getSortConfig();
    tableStatus.sort = {column: columna, direction: direccion};
    localStorage.setItem('table', JSON.stringify(tableStatus));
  }

}
