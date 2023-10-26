import React from "react";
import {
  Button,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components";
import { SettingTableButtonProps } from "./utils/Interface";
import MenuShowHideColumn from "./MenuShowHideColumn";
import MenuGroupBy from "./MenuGroupBy";
import MenuAddColumn from "./MenuAddColumn";

const SettingButton: React.FC<SettingTableButtonProps> = (props) => {
  return (
    <div style={{ minWidth: 100, alignSelf: "end" }}>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Button>Settings</Button>
        </MenuTrigger>

        <MenuPopover>
          <MenuList>
            {props.menuShowColumnEnabled && (
              <MenuShowHideColumn
                key="showhide"
                {...props.showColumnTableProps}
              />
            )}
            {props.menuGroupDataSourceEnabled && (
              <MenuGroupBy key="groupby" {...props.groupByTableProps} />
            )}
            {props.menuAddColumnEnabled && (
              <MenuAddColumn key={"addcolumn"} {...props.addColumnProps} />
            )}
          </MenuList>
        </MenuPopover>
      </Menu>
    </div>
  );
};

export default SettingButton;
