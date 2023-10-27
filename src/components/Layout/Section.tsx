import React from "react";
import { ISectionProps } from "./utils";

const Section: React.FC<ISectionProps> = (props) => {
  return (
    <div style={{ display: "flex", height: "100%", overflow: "auto" }}>
      <div
        style={{
          overflow: "auto",
          boxSizing: "border-box",
          width: "500px",
        }}
      >
        {props.sidebar}
      </div>
      <div
        style={{
          overflow: "auto",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {props.content}
      </div>
    </div>
  );
};

export default Section;
