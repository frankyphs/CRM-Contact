import React from "react";
import { MenuItem } from "@fluentui/react-components";
import { MenuAddColumnProps } from "./utils/Interface";

const MenuAddColumn: React.FC<MenuAddColumnProps> = (props) => {
  return <MenuItem onClick={props.onAddColumnClick}>Add Column</MenuItem>;
};

export default MenuAddColumn;
