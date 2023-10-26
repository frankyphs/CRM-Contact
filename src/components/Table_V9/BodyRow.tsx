import React from "react";
import {
  TableCell,
  TableRow,
  TableSelectionCell,
} from "@fluentui/react-components";
import { BodyRowProps, ITableV9Column } from "./utils/Interface";

const BodyRow: React.FC<BodyRowProps> = (props) => {
  return (
    <TableRow
      key={props.index}
      tabIndex={props.index}
      appearance={props.appearance}
      onClick={(e) => props.onRowClick(e, props.rowId, props.item)}
    >
      {/* Selection Cell */}
      {props.selectionMode && (
        <TableSelectionCell
          checked={props.selected}
          subtle={props.subtleSelection}
          type={props.selectionMode === "single" ? "radio" : "checkbox"}
        />
      )}

      {/* Table Cell */}
      {props.columnsData.map((column: ITableV9Column, index: number) => {
        if (column.hidden) return;
        return (
          <TableCell
            key={index}
            {...props.columnSizing_unstable.getTableCellProps(column.key)}
          >
            {column.onRenderDataSource
              ? column.onRenderDataSource(props.item)
              : props.item[column.dataIndex || ""]}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default BodyRow;
