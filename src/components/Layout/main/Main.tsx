import React, { ReactNode } from "react";
import "./main.css";

interface IMainProps {
  menu?: ReactNode;
  section?: ReactNode;
}

const Main: React.FC<IMainProps> = (props) => {
  return (
    <div className="main-container">
      <div className="main-menu">{props.menu}</div>
      <div className="main-section">{props.section}</div>
    </div>
  );
};

export default Main;
