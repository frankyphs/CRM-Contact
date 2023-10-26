import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Label } from "@fluentui/react-components";
import { ArrowSort16Regular } from "@fluentui/react-icons";
import { HeaderTableCellProps } from "./utils/Interface";

const HeaderCell: React.FC<HeaderTableCellProps> = (props) => {
  const index = props.index;

  const [, ref] = useDrag({
    type: "COLUMN",
    item: { index },
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        props.onColumnMove(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      key={props.column.key}
      ref={props.reorderColumnEnabled ? (node) => ref(drop(node)) : null}
      style={{ width: "100%" }}
      onClick={(e) => props.onHeaderCellClick?.(e, props.column)}
    >
      <Label
        style={{
          cursor: props.reorderColumnEnabled ? "move" : "default",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        {props.column.onRenderHeaderCell ? (
          props.column.onRenderHeaderCell()
        ) : (
          <>
            {props.column.compare && <ArrowSort16Regular />}
            {props.column.label}
          </>
        )}
      </Label>
    </div>
  );
};

export default HeaderCell;
