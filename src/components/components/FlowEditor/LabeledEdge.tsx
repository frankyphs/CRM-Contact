import React, { useEffect, useRef, useState } from "react";
import { ITextField, TextField } from "@fluentui/react";
import { BaseEdge, Edge, EdgeLabelRenderer, EdgeProps, MarkerType, getSmoothStepPath, useReactFlow } from "reactflow";

const LabeledEdge: React.FunctionComponent<EdgeProps> = (props) => {
  const reactFlow = useReactFlow();
  const editFieldRef = useRef<ITextField>(null);

  const [edgePath, labelX, labelY] = getSmoothStepPath(props);

  const [edgeLabel, setEdgeLabel] = useState<string>("");

  useEffect(() => {
    setEdgeLabel(props.label?.toString()!);
  }, [props.label]);

  const handleFieldChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    setEdgeLabel(newValue ?? '');
  }

  const handleFieldSave = () => {
    if (edgeLabel) {
      reactFlow.setEdges(previous => previous.map(previousEdge => previousEdge.id === props.id ?
        { ...previousEdge, label: edgeLabel, data: { ...previousEdge.data, isEditing: false } }
        : previousEdge));
      setEdgeLabel("");
    } else {
      reactFlow.setEdges(previous => previous.map(previousEdge => previousEdge.id === props.id ?
        { ...previousEdge, data: { ...previousEdge.data, isEditing: false } }
        : previousEdge));
      setEdgeLabel("");
    }
  }

  const handleFieldBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    handleFieldSave();
  }

  const handleFieldKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleFieldSave();
    }

    if (event.key === "Escape") {
      reactFlow.setEdges(previous => previous.map(previousEdge => previousEdge.id === props.id ?
        { ...previousEdge, data: { ...previousEdge.data, isEditing: false } }
        : previousEdge));
      setEdgeLabel("");
    }
  }

  useEffect(() => {
    if (editFieldRef && editFieldRef.current) {
      if (props.data.isEditing) {
        editFieldRef.current.focus();
      }
    }
  }, [props.data?.isEditing]);

  return (
    <>
      <BaseEdge
        {...props}
        path={edgePath}
      />
      {props.label &&
        <EdgeLabelRenderer>
          <div
            className="nodrag nopan"
            style={{
              position: 'absolute',
              padding: "2px 4px",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: '#fff',
              fontFamily: "Segoe UI",
              fontSize: "12px"
            }}
          >
            {props.data.isEditing ?
              <TextField borderless
                value={edgeLabel}
                componentRef={editFieldRef}
                styles={{
                  field: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: `${edgeLabel.length}ch`,
                    minWidth: "1ch",
                    fontSize: "12px",
                    padding: 0,
                    textOverflow: "unset",
                    textAlign: "center"
                  }
                }}
                onChange={handleFieldChange}
                onKeyDown={handleFieldKeyDown}
                onBlur={handleFieldBlur}
              />
              :
              props.label
            }
          </div>
        </EdgeLabelRenderer>
      }
    </>
  );
}

export default LabeledEdge;