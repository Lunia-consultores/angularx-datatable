import { Injectable } from '@angular/core';
import {DatatableSettings} from './datatable-settings.model';

@Injectable({
  providedIn: 'root'
})
export class SaveTableConfigurationService {

  constructor() { }

  public getSortConfiguration(tableSettings: DatatableSettings): any {
    const config = [];
    tableSettings.columns.forEach( columna => {
      config.push({
        column: columna.property,
        direction: columna.direction
      });
    });
    return config;
  }
}
