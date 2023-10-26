import {
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
  SortDirection,
  TableColumnId,
  TableFeaturesState,
  TableRowId,
} from "@fluentui/react-components";

/**
 * Represents a table based on Fluent UI V9 with various configuration options.
 */
export interface ITableV9 {
  /**
   * An array of default columns to be displayed in the table.
   */
  defaultColumns?: ITableV9Column[];

  /**
   * The default data source to populate the table.
   */
  defaultDataSource?: any[];

  /**
   * An array of columns to be displayed in the table.
   */
  columns?: ITableV9Column[];

  /**
   * The data source to populate the table.
   */
  dataSource?: any[];

  /**
   * The sorting configuration for the table.
   */
  sort?: ISort;

  /**
   * A callback function to handle changes in sorting.
   * @param sort - The sorting configuration.
   */
  onSortChange?: (sort?: ISort) => void;

  /**
   * The column to group data by.
   */
  groupBy?: string;

  /**
   * A callback function to handle changes in the grouping column.
   * @param prevGroupBy - The previous grouping column.
   * @param newGroupBy - The new grouping column.
   */
  onGroupByChange?: (prevGroupBy?: string, newGroupBy?: string) => void;

  /**
   * Specifies whether the columns in the table can be resized.
   * @default true
   */
  resizable?: boolean;

  /**
   * A callback function to handle column resizing.
   * @param columnKey - The key of the resized column.
   * @param width - The new width of the column.
   */
  onResizeColumn?: (columnKey?: string, width?: number) => void;

  /**
   * Specifies whether the columns in the table can be reordered.
   * @default false
   */
  reorderColumnEnabled?: boolean;

  /**
   * A callback function to handle column reordering.
   * @param newColumns - The updated array of columns.
   * @param column - The column being reordered.
   */
  onReorderColumn?: (
    newColumns?: ITableV9Column[],
    column?: ITableV9Column
  ) => void;

  /**
   * A callback function to handle showing/hiding columns.
   * @param newColumns - The updated array of columns.
   * @param column - The column to show/hide.
   * @param mode - The mode for showing/hiding columns.
   */
  onShowHideColumn?: (
    newColumns?: ITableV9Column[],
    column?: ITableV9Column,
    mode?: ShowHideMode
  ) => void;

  /**
   * Specifies the selection mode for the table.
   * @default undefined
   * @enum {"single" | "multiselect"}
   */
  selectionMode?: "single" | "multiselect";

  /**
   * Specifies whether subtle selection styles should be applied.
   */
  subtleSelection?: boolean;

  /**
   * An array of selected row indices in the table.
   */
  selectedRowsIndex?: number[];

  /**
   * A callback function to handle changes in selected row indices.
   * @param rowsIndex - The array of selected row indices.
   */
  onSelectedRowsIndexChange?: (rowsIndex?: number[]) => void;

  /**
   * Specifies whether a menu to show/hide columns is enabled.
   * @default false
   */
  menuShowColumnEnabled?: boolean;

  /**
   * Specifies whether a menu to group data source columns is enabled.
   * @default false
   */
  menuGroupDataSourceEnabled?: boolean;

  /**
   * Specifies whether a menu to add columns is enabled.
   * @default false
   */
  menuAddColumnEnabled?: boolean;

  /**
   * Specifies whether the table is in a loading state.
   * @default false
   */
  loading?: boolean;

  /**
   * Specifies whether adding new rows is enabled.
   * @default false
   */
  addRowEnabled?: boolean;

  /**
   * A callback function to handle adding new rows.
   * @param newRows - The updated array of rows.
   * @param newRow - The new row to be added.
   * @param groupItem - The group item to which the new row belongs.
   */
  onAddRowClick?: (newRows?: any[], newRow?: any, groupItem?: string) => void;

  /**
   * A callback function to handle row click events.
   * @param row - The clicked row data.
   */
  onRowClick?: (row?: any) => void;

  /**
   * A callback function to handle header cell click events.
   * @param column - The clicked column.
   */
  onHeaderCellClick?: (column?: ITableV9Column) => void;

  /**
   * A callback function to handle adding new columns.
   * @param newColumn - The new column to be added.
   */
  onAddColumnClick?: (newColumn?: ITableV9Column) => void;
}

/**
 * Represents a column configuration for a table based on Fluent UI V9.
 */
export interface ITableV9Column {
  /**
   * The unique key identifier for the column.
   */
  key: string;

  /**
   * The label or header text for the column.
   */
  label: string;

  /**
   * The data index associated with the column. If provided, it specifies the property
   * in the data source that corresponds to this column.
   */
  dataIndex?: string;

  /**
   * Specifies whether the column should be hidden.
   */
  hidden?: boolean;

  /**
   * The minimum width of the column in pixels.
   */
  minWidth?: number;

  /**
   * The width of the column in pixels.
   */
  width?: number;

  /**
   * A custom comparison function used for sorting the column data. It takes two
   * values (a and b) and should return a number indicating their relative order.
   */
  compare?: (a: any, b: any) => number;

  /**
   * A function to customize the rendering of the column's header cell. It should return
   * a JSX element.
   * @returns The rendered header cell element.
   */
  onRenderHeaderCell?: () => JSX.Element;

  /**
   * A function to customize the rendering of the column's data. It receives the data
   * associated with the cell and can return any value to be rendered.
   * @param data - The data to be rendered in the cell.
   * @returns The rendered content for the cell.
   */
  onRenderDataSource?: (data?: any) => any;
}

/**
 * Represents sorting options for a data set.
 */
export interface ISort {
  /**
   * The direction in which the data should be sorted.
   * @default "ascending"
   * @enum {"ascending" | "descending"}
   */
  sortDirection?: "ascending" | "descending";

  /**
   * The name of the column by which the data should be sorted.
   */
  sortColumn?: string;
}

/**
 * Represents a mode for showing or hiding elements.
 * @typedef {"show" | "hide"} ShowHideMode
 */
type ShowHideMode = "show" | "hide";

export interface LoadingStateTableProps {
  colspan: number;
}

export interface AddRowTableProps {
  colspan: number;
  onAddRowClick?: (
    e?: React.MouseEvent,
    newRows?: any[],
    newRow?: any,
    groupItem?: string
  ) => void;
}

export interface TableGroupHeaderCellProps {
  colspan: number;
  label: string;
}

export interface HeaderRowProps {
  columnsData: ITableV9Column[];
  selectionMode?: "single" | "multiselect";
  checked: boolean | "mixed";
  onColumnMove: (dragIndex: number, hoverIndex: number) => void;
  columnSizing_unstable: TableFeaturesState<any>["columnSizing_unstable"];
  reorderColumnEnabled: boolean;
  headerSortProps: (columnId: TableColumnId) => {
    onClick: (e: React.MouseEvent) => void;
    sortDirection: SortDirection | undefined;
  };
  onHeaderCellClick?: (
    event?: React.MouseEvent,
    column?: ITableV9Column
  ) => void;
  toggleAllRows: (e: React.MouseEvent) => void;
}

export interface HeaderTableCellProps {
  column: ITableV9Column;
  index: number;
  onColumnMove: (dragIndex: number, hoverIndex: number) => void;
  reorderColumnEnabled: boolean;
  onRenderHeaderCell?: (column?: ITableV9Column) => JSX.Element;
  onHeaderCellClick?: (
    event?: React.MouseEvent,
    column?: ITableV9Column
  ) => void;
}

export interface HeaderCellWrapperProps {
  column: ITableV9Column;
  index: number;
  onColumnMove: (dragIndex: number, hoverIndex: number) => void;
  columnSizing_unstable: TableFeaturesState<any>["columnSizing_unstable"];
  reorderColumnEnabled: boolean;
  headerSortProps: (columnId: TableColumnId) => {
    onClick: (e: React.MouseEvent) => void;
    sortDirection: SortDirection | undefined;
  };
  onHeaderCellClick?: (
    event?: React.MouseEvent,
    column?: ITableV9Column
  ) => void;
}

export interface BodyRowProps {
  item: any;
  index: number;
  selected: boolean;
  appearance: "none" | "brand";
  columnsData: ITableV9Column[];
  selectionMode?: "single" | "multiselect";
  subtleSelection?: boolean;
  columnSizing_unstable: TableFeaturesState<any>["columnSizing_unstable"];
  rowId: TableRowId;
  onRowClick: (e: React.MouseEvent, rowId: TableRowId, item: any) => void;
}

export interface SettingTableButtonProps {
  menuShowColumnEnabled?: boolean;
  showColumnTableProps: MenuShowColumnTableProps;

  menuGroupDataSourceEnabled?: boolean;
  groupByTableProps: MenuGroupByTableProps;

  menuAddColumnEnabled?: boolean;
  addColumnProps: MenuAddColumnProps;
}

export interface MenuAddColumnProps {
  onAddColumnClick: () => void;
}

export interface MenuShowColumnTableProps {
  checkedValues: Record<string, string[]>;
  uncheckedValues: Record<string, string[]>;
  onCheckedValueChange: (
    e: MenuCheckedValueChangeEvent,
    data: MenuCheckedValueChangeData
  ) => void;
}

export interface MenuGroupByTableProps {
  groupByList: string[];
  groupBy: Record<string, string[]>;
  onGroupByChange: (
    e: MenuCheckedValueChangeEvent,
    data: MenuCheckedValueChangeData
  ) => void;
}
