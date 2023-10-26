import React, { memo } from "react";

import { Handle, NodeProps, Position } from "reactflow";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";

import { ICustomRenderNodeData } from "../utils/Interfaces";

const styles = mergeStyleSets({
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "175px",
    minHeight: "40px",
    border: "1px solid black",
    backgroundColor: "white",
    fontSize: "14px",
    fontFamily: "Segoe UI"
  },
  text: {
    cursor: "pointer",
    wordBreak: "break-all",
    padding: "0 8px"
  }
});


export default memo<NodeProps<ICustomRenderNodeData>>(props => {
  const defaultRenderer = (props?: NodeProps<ICustomRenderNodeData>) => (
    <div>{props?.data.label}</div>
  )

  return (
    <div className={styles.wrapper}>
      <Handle
        type="target"
        position={Position.Left}
      />
      
      <Handle
        type="source"
        style={{zIndex: 1}}
        position={Position.Right}
      />

      {props.data.onRender?.(props, defaultRenderer) ?? defaultRenderer(props)}
    </div>
  );
});