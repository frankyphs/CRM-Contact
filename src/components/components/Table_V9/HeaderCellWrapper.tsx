import React from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  TableHeaderCell,
} from "@fluentui/react-components";
import HeaderCell from "./HeaderCell";
import { HeaderCellWrapperProps } from "./utils/Interface";

const HeaderCellWrapper: React.FC<HeaderCellWrapperProps> = (props) => {
  return (
    <Menu openOnContext key={props.column.key}>
      <MenuTrigger>
        <TableHeaderCell
          key={props.column.key}
          tabIndex={props.index}
          {...props.columnSizing_unstable.getTableHeaderCellProps(
            props.column.key
          )}
          {...(props.column.compare && props.headerSortProps(props.column.key))}
        >
          <HeaderCell
            index={props.index}
            column={props.column}
            key={props.column.key}
            onColumnMove={props.onColumnMove}
            onHeaderCellClick={props.onHeaderCellClick}
            reorderColumnEnabled={props.reorderColumnEnabled}
            onRenderHeaderCell={props.column.onRenderDataSource}
          />
        </TableHeaderCell>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem
            onClick={props.columnSizing_unstable.enableKeyboardMode(
              props.column.key
            )}
          >
            Keyboard Column Resizing
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default HeaderCellWrapper;
