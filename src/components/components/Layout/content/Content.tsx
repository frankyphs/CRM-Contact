import React, { ReactNode } from "react";
import "./content.css";

interface IContent {
  header?: ReactNode;
  main?: ReactNode;
}

const Content: React.FC<IContent> = (props) => {
  return (
    <div className="content-container">
      <div className="content-header">{props.header}</div>
      <div className="content-main">{props.main}</div>
    </div>
  );
};

export default Content;
