import React from "react";
import {
  Menu,
  MenuItem,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { MenuGroupByTableProps } from "./utils/Interface";
import { TitleCase } from "./utils/Helper";

const MenuGroupBy: React.FC<MenuGroupByTableProps> = (props) => {
  return (
    <Menu
      checkedValues={props.groupBy}
      onCheckedValueChange={props.onGroupByChange}
    >
      <MenuTrigger disableButtonEnhancement>
        <MenuItem>Group By</MenuItem>
      </MenuTrigger>

      <MenuPopover>
        <MenuList>
          <MenuItemRadio name="groupby" value="none">
            None
          </MenuItemRadio>
          {props.groupByList.map((item) => {
            return (
              <MenuItemRadio name="groupby" value={item} key={item}>
                {TitleCase(item)}
              </MenuItemRadio>
            );
          })}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};

export default MenuGroupBy;
