export interface DatatableSettings {
  table_uuid?: string;
  enable_save_conf?: boolean;
  rowUniqueId?: any;
  title?: string;
  classes?: string;
  pageSize: number;
  columns: ColumnSettings[];
  rowsStyles?: RowsStyles;
  showchecksColumn: boolean;
  showRadioButtonColumn?: boolean;
  labelRadioButtonColumn?: string;
  columnCheckExceptions?: any[];
  rowActions?: any[];
  rowStyles?: RowStyle[];
  rowClick?: any;
  tableActions?: TableActions[];
  someSelectedRows?: boolean;
  enableColumnFilters?: boolean;
  showTotalRow?: boolean;
  hiddenSortColumns?: SortColumn[];
  usePagination?: boolean;
  defaultSortColumnIndex?: number;
  defaultShortColumn?: SortColumn;
  cursorPointerRow?: boolean;
}

export interface ColumnSettings {
  visible?: boolean;
  name: string;
  nameInnerHtml?: string;
  nameInnerHtmlTitle?: string;
  classes?: string;
  property: string;
  type?: 'currency' | 'icon' | 'date' | 'anchor' | 'html' | 'custom' | 'number';
  direction?: string;
  totalize?: boolean;
  totalizeWhen?: any;
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

export interface SortColumn {
  property: string;
  direction: string;
}

export interface RowStyle {
  classes: string;
  dataField: string;
  callback: any;
}
