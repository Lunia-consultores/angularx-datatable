import { Injectable } from '@angular/core';
import {TableStatus} from './table-status.model';

@Injectable({
  providedIn: 'root'
})
export class SaveTableConfigurationService {

  constructor() { }

  public getTableConfig(tableUuid: string): TableStatus {
    return JSON.parse(localStorage.getItem(tableUuid));
  }

  public createTableConfig(tableUuid: string): void {
    localStorage.setItem(tableUuid, JSON.stringify({
      sort: [],
      columns_visibility: []
    } as TableStatus));
  }

  public getSortConfig(tableUuid: string): TableStatus {
    const tableConfig = JSON.parse(localStorage.getItem(tableUuid));
    if (tableConfig) {
      return tableConfig;
    } else {
      return {} as TableStatus;
    }
  }

  public saveTableSortStatus(tableUuid: string, columna, direccion): void {
    const tableStatus = this.getSortConfig(tableUuid);
    tableStatus.sort = {column: columna, direction: direccion};
    localStorage.setItem(tableUuid, JSON.stringify(tableStatus));
  }

  public saveTableColumnVisibility(tableUuid: string, columnsVisivility): void {
    const tableStatus = this.getSortConfig(tableUuid);
    tableStatus.columns_visibility = columnsVisivility;
    localStorage.setItem(tableUuid, JSON.stringify(tableStatus));
  }

  public clearConfig(tableUuid: string): void {
    localStorage.removeItem(tableUuid);
    this.createTableConfig(tableUuid);
  }
}
