import { IColumn, IColumnDragDropDetails, IDetailsColumnRenderTooltipProps } from "@fluentui/react"
import { JSONSchema7 } from "./SchemaInterface"

export interface ITableColumn {
  /**
   * Unique key as the column identity
   */
  key: string

  /**
   * A string to show at column header
   */
  name: string

  /**
   * A field name to pull object from
   */
  fieldName?: string

  /**
   * The minimal width of the column
   */
  minWidth?: number

  /**
   * Text alignment in cell
   */
  textAlign?: "start" | "center" | "end"

  /**
   * Is the column hidden (for column visibility feature)
   * @default false
   */
  hidden?: boolean

  /**
   * Is the column visibility can be toggled (for column visibility feature)
   * @default false
   */
  toggleable?: boolean

  /**
   * Options for filter field schema array, enum
   */
  filterOptions?: any[]

  /**
   * Callback for when user click column header for sorting
   * @param sort New active sorting: "asc" or "desc"
   * @param column Sorted column
   * @returns void
   */
  onSortClick?: (order: "desc" | "asc", column: IColumn) => void

  /**
   * Callback for when user changed filter field
   * @param value New value of the column filter field
   * @param column Filtered column
   * @returns void
   */
  onFilterChange?: (value: string, column: IColumn) => void

  /**
   * Callback for column custom renderer
   * @param row Current cell row data
   * @param column Current cell column data
   * @returns value to be rendered in cell
   */
  onRenderCell?: (row: any, column: IColumn) => any
}

export interface ITableProps {
  /**
   * A JSON Schema for table render type based on
   */
  schema: JSONSchema7,

  /**
   * Items to be rendered in table
   */
  items: any[],

  /**
   * Set which columns to render based on the item
   */
  columns: ITableColumn[],

  /**
   * Theme for the table
   */
  theme?: string

  /**
   * Callback for when user resized the column
   * @param newWidth New column width
   * @param column Resized column
   * @returns void
   */
  onColumnResize?: (newWidth: number, column: IColumn) => void

  /**
   * Callback for when user reordered a column
   * @param dragDropDetails The before index, and after index
   * @param column Reordered column
   * @returns void
   */
  onColumnDrop?: (dragDropDetails: IColumnDragDropDetails, column: IColumn) => void

  /**
   * Callback for when user toggling column visibility
   * @param state The toggle state true/false
   * @param column Toggled column
   * @returns void
   */
  onColumnToggle?: (state: boolean, column: IColumn) => void

  /**
   * Callback for when user double clicks row
   * @param row The double clicked row
   * @returns void
   */
  onRowDoubleClick?: (row: any) => any
}

export interface ITableDataTypes {
  /**
   * A key to define the type of the value in column, is used to conditionally render the value
   */
  cellType: "string" | "string.date" | "datetime" | "boolean" | "persona" | "array.string" | "array.date" | "array.persona"

  /**
   * Key to define the type of the filter type, is used to conditionally render column filter
   */
  filterFieldType: "text" | "number" | "datepicker" | "select.string" | "select.boolean" | "peoplepicker"
}

export interface IDetailsHeaderTooltipProps {
  tooltipProps: IDetailsColumnRenderTooltipProps
}

export interface IUser {
  /**
   * Unique ID of the user
   */
  id: string

  /**
   * Name of the user
   */
  name: string

  /**
   * Email of the user
   */
  email: string
}


export interface IValueComponent {
  data: string
  onChange: (newValue: string) => void
  onClickNavRouter?: boolean
  type: "number" | "time" | "text" | "date" | "datetime-local" | "url" | "email" | "tel" | undefined
}

export interface IValueDropdown {
  data: string
  onChange: (newValue: string) => void
  type: "tags" | "persona" | "dropdown"
}
