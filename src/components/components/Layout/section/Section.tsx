import "./section.css";
import React, { ReactNode } from "react";

interface ISectionProps {
  sidebar?: ReactNode;
  content?: ReactNode;
}

const Section: React.FC<ISectionProps> = (props) => {
  return (
    <div className="section-container">
      <div className="section-sidebar">{props.sidebar}</div>
      <div className="section-content">{props.content}</div>
    </div>
  );
};

export default Section;
