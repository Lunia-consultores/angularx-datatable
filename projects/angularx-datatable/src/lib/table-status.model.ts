import {SortColumn} from './datatable-settings.model';

export interface ColumnVisibility {
  property: string;
}

export interface TableStatus {
  page: number;
  sort: any;
  columns_visibility: ColumnVisibility[];
}
