import React from "react";
import { Checkmark20Regular } from "@fluentui/react-icons";

interface CircleProps {
  color: string;
  selected: boolean;
  onClick: () => void;
}

export const CircleColor: React.FC<CircleProps> = (props) => {
  const circleStyle = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: props.color,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <div style={circleStyle} onClick={props.onClick}>
      {props.selected && <Checkmark20Regular style={{ color: "#fff" }} />}
    </div>
  );
};