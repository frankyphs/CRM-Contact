import React, { useState } from "react";
import { Icon, Label, Stack } from "@fluentui/react";
import { AddColumnKanbanProps } from "./utils/Interface";

const AddColumn: React.FC<AddColumnKanbanProps> = (props) => {
  const [bcAddColumn, setBcAddColumn] = useState<string>("#ffffff");

  return (
    <Stack
      horizontal={props.columnOrientation === "horizontal"}
      tokens={{
        childrenGap: props.columnOrientation === "horizontal" ? 5 : undefined,
      }}
      horizontalAlign="center"
      verticalAlign="center"
      styles={{
        root: {
          border: "2px dashed #454545",
          padding: 10,
          cursor: "pointer",
          backgroundColor: bcAddColumn,
        },
      }}
      onMouseEnter={() => setBcAddColumn("#eeeeee")}
      onMouseLeave={() => setBcAddColumn("#ffffff")}
      onClick={props.onAddColumnClick}
    >
      <Label styles={{ root: { cursor: "pointer" } }}>
        <Icon iconName="Add" />
      </Label>
      <Label styles={{ root: { cursor: "pointer", textAlign: "center" } }}>
        Add Column
      </Label>
    </Stack>
  );
};

export default AddColumn;
