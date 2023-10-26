import React, { memo } from "react"

import { Handle, NodeProps, Position } from "reactflow";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

import { IStartNodeData } from "../utils/Interfaces";

const styles = mergeStyleSets({
  startNode: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100px !important",
    minHeight: "30px",
    border: "1px solid black",
    borderRadius: "20px !important",
    backgroundColor: "white",
    fontSize: "14px",
    fontFamily: "Segoe UI"
  }
});

export default memo<NodeProps<IStartNodeData>>(props => {

  return (
    <div className={styles.startNode}>
      <Handle
        type="source"
        style={{zIndex: 1}}
        position={Position.Right}
      />

      <div>
        {props.data.label ?? "Start"}
      </div>
    </div>
  );
});