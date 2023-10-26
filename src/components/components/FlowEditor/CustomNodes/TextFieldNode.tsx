import React, { memo, useState, useRef, useEffect } from "react"

import { Handle, NodeProps, Position } from "reactflow";
import { useBoolean } from "@fluentui/react-hooks";
import { mergeStyleSets } from "@fluentui/react/lib/Styling";
import { ITextField, TextField } from "@fluentui/react/lib/TextField";

import { ITextFieldNodeData } from "../utils/Interfaces";

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
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    wordBreak: "break-all",
    padding: "0 8px"
  }
});

export default memo<NodeProps<ITextFieldNodeData>>(props => {
  const [isEditing, {setTrue: startEditing, setFalse: stopEditing}] = useBoolean(false);
  const [textFieldValue, setTextFieldValue] = useState<string>(props.data.label);

  const inputRef = useRef<ITextField>(null);

  const handleTextFieldChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    setTextFieldValue(newValue ?? "");
  }

  const handleTextFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Enter" && textFieldValue) {
      props.data.onChange(props.id, textFieldValue);
      stopEditing();
    }
  }

  const handleTextFieldBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (textFieldValue) {
      props.data.onChange(props.id, textFieldValue);
      stopEditing();
    }
  }

  const handleLabelClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log()
    startEditing();
  }

  const defaultRenderer = (props?: NodeProps<ITextFieldNodeData>) => (
    <span>{props?.data.label}</span>
  )

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing, inputRef]);

  return (
    <div className={styles.wrapper}>
      {props.targetPosition &&
        <Handle
          type="target"
          position={props.targetPosition as Position}
        />
      }

      {props.sourcePosition &&
        <Handle
          type="source"
          style={{zIndex: 1}}
          position={props.sourcePosition as Position}
        />
      }

      {isEditing ?
        <TextField
          autoAdjustHeight
          borderless
          resizable={false}
          componentRef={inputRef}
          styles={{
            root: {padding: "0 8px", overflow: "hidden", width: "175px", minHeight: "40px"},
            field: {padding: 0, textAlign: "center", fontSize: "14px", display: "flex", alignItems: "center", minHeight: "40px"},
            fieldGroup: {minHeight: "unset"}
          }}
          value={textFieldValue}
          onChange={handleTextFieldChange}
          onKeyDown={handleTextFieldKeyDown}
          onBlur={handleTextFieldBlur}
        />
        :
        <div
          className={styles.text}
          onDoubleClick={handleLabelClick}
        >
          {props.data.onRender?.(props, defaultRenderer) ?? defaultRenderer(props)}
        </div>
      }
    </div>
  );
});