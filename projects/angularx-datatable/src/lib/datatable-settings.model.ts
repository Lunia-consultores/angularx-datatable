

export interface DatatableSettings {
  rowUniqueId?: any;
  title?: string;
  classes?: string;
  pageSize: number;
  columns: ColumnSettings[];
  rowsStyles?: RowsStyles;
  showchecksColumn: boolean;
  columnCheckExceptions?: any[];
  rowActions?: any[];
  rowClick?: any;
  tableActions?: TableActions[];
  someSelectedRows?: boolean;
  enableColumnFilters?: boolean;
  hiddenSortColumns?: HiddenSortColumn[];
}

export interface ColumnSettings {
  visible?: boolean;
  name: string;
  classes?: string;
  property: string;
  type?: 'currency' | 'icon' | 'date' | 'anchor' | 'html' | 'custom';
  direction?: string;
  show?: boolean;
  anchorUrl?: string;
  callback?: any;
  iconCases?: IconCase[];
  width?: string;
  customContent?: any;
}

export interface RowsStyles {
  callback: any;
}

export interface IconCase {
  id: number;
  class: string;
  icon: string;
}

export interface TableActions {
  name: string;
  visible?: boolean;
  classes: string;
  icon: string;
  callback: any;
}

export interface HiddenSortColumn {
  name: string;
  direction: string;
}
