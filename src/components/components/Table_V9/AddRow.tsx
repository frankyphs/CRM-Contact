import React, { useState } from "react";
import { Label, TableCell, TableRow } from "@fluentui/react-components";
import { AddRowTableProps } from "./utils/Interface";

const AddRow: React.FC<AddRowTableProps> = (props) => {
  const [bgColor, setBgColor] = useState("#ffffff");

  return (
    <TableRow>
      <TableCell
        colSpan={props.colspan}
        style={{
          height: 32,
          backgroundColor: "#ffffff",
        }}
      >
        <div
          style={{
            width: 70,
            backgroundColor: bgColor,
            cursor: "pointer",
            padding: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 3,
          }}
          onMouseEnter={() => setBgColor("#dddddd")}
          onMouseLeave={() => setBgColor("#ffffff")}
          onClick={props.onAddRowClick}
        >
          <Label style={{ cursor: "pointer" }} size="small">
            + New Row
          </Label>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AddRow;
