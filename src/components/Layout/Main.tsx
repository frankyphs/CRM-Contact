import React from "react";
import { IMainProps } from "./utils";

const Main: React.FC<IMainProps> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ height: "auto" }}>{props.menu}</div>
      <div style={{ display: "flex", flex: 1, overflow: "auto" }}>
        {props.section}
      </div>
    </div>
  );
};

export default Main;
