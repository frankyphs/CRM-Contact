import React from "react";
import { INavigationProps } from "./utils";

const Navigation: React.FC<INavigationProps> = (props) => {
  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
      }}
    >
      <nav
        style={{
          height: "100%",
          width: "70px",
          position: "sticky",
          backgroundColor: "#211c52",
          overflowX: "hidden",
          alignContent: "center",
        }}
      >
        <header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            top: "0px",
            height: "70px",
            color: "#fff",
            zIndex: 1,
          }}
        >
          {props.headerNav}
        </header>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {props.bodyNav}
        </div>
        <footer
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "sticky",
            bottom: 0,
            height: "70px",
            color: "#fff",
          }}
        >
          {props.footerNav}
        </footer>
      </nav>
      <div
        style={{
          flex: 1,
          top: 0,
          right: 0,
          width: "100%",
          height: "100vh",
          zIndex: 0,
          backgroundColor: "#dbdbdb",
          overflow: "auto"
        }}
      >
        {props.content}
      </div>
    </div>
  );
};

export default Navigation;
