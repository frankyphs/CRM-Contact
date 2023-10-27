import React from "react";
import { IContentProps } from "./utils";

const Content: React.FC<IContentProps> = (props) => {
  return (
    <div style={{ top: 0, right: 0, width: "inherit", height: "inherit" }}>
      <div
        style={{
          display: "flex",
          boxSizing: "border-box",
          alignItems: "center",
          position: "sticky",
          height: "70px",
          top: 0,
          right: 0,
          backgroundColor: "#fff",
        }}
      >
        {props.header}
      </div>
      <div
        style={{
          position: "relative",
          boxSizing: "border-box",
          height: "calc(100% - 70px)",
          width: "100%",
        }}
      >
        {props.main}
      </div>
    </div>
  );
};

export default Content;
