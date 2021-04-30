import {SortColumn} from './datatable-settings.model';

export interface ColumnVisibility {
  property: string;
}

export interface TableStatus {
  sort: any;
  columns_visibility: ColumnVisibility[];
}
