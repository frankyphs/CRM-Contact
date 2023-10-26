import React from "react";
import { TableRow, TableSelectionCell } from "@fluentui/react-components";
import HeaderCellWrapper from "./HeaderCellWrapper";
import { HeaderRowProps, ITableV9Column } from "./utils/Interface";

const HeaderRow: React.FC<HeaderRowProps> = (props) => {
  return (
    <TableRow style={{ backgroundColor: "#eeeeee" }}>
      {props.selectionMode && (
        <TableSelectionCell
          checked={props.checked}
          onClick={props.toggleAllRows}
          hidden={props.selectionMode !== "multiselect"}
          type={props.selectionMode === "single" ? "radio" : "checkbox"}
        />
      )}
      {props.columnsData.map((column: ITableV9Column, index: number) => {
        if (column.hidden) return;
        return (
          <HeaderCellWrapper
            index={index}
            column={column}
            key={column.key}
            onColumnMove={props.onColumnMove}
            headerSortProps={props.headerSortProps}
            onHeaderCellClick={props.onHeaderCellClick}
            columnSizing_unstable={props.columnSizing_unstable}
            reorderColumnEnabled={
              props.reorderColumnEnabled === true ? true : false
            }
          />
        );
      })}
    </TableRow>
  );
};

export default HeaderRow;
