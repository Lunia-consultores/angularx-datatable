export interface DatatableSettings {
  title?: string;
  classes?: string;
  pageSize: number;
  columns: ColumnSettings[];
  rowStyles?: RowStyle[];
  showchecksColumn: boolean;
  columnCheckExceptions?: any[];
  rowActions?: any[];
  rowClick?: any;
  tableActions?: any[];
  someSelectedRows?: boolean;
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

export interface RowStyle {
  classes: string;
  dataField: string;
  callback: any;
}

export interface IconCase {
  id: number;
  class: string;
  icon: string;
}
