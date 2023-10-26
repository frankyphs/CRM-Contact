import React from "react";
import {
  Menu,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { MenuShowColumnTableProps } from "./utils/Interface";

const MenuShowHideColumn: React.FC<MenuShowColumnTableProps> = (props) => {
  return (
    <Menu
      checkedValues={props.checkedValues}
      onCheckedValueChange={props.onCheckedValueChange}
    >
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Show Column</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuGroup>
            <MenuGroupHeader>SHOW FIELDS</MenuGroupHeader>
            {props.checkedValues["show"].map((checkedValue) => {
              return (
                <MenuItemCheckbox
                  name="show"
                  key={checkedValue}
                  value={checkedValue}
                >
                  {checkedValue}
                </MenuItemCheckbox>
              );
            })}
          </MenuGroup>
          <MenuDivider />
          <MenuGroup>
            <MenuGroupHeader>FIELDS IN THE LIST</MenuGroupHeader>
            {props.uncheckedValues["hidden"].map((uncheckedValue) => {
              return (
                <MenuItemCheckbox
                  name="hidden"
                  key={uncheckedValue}
                  value={uncheckedValue}
                >
                  {uncheckedValue}
                </MenuItemCheckbox>
              );
            })}
          </MenuGroup>
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default MenuShowHideColumn;
