import React, { ReactNode } from "react";
import "./navigation.css";

interface INavigationProps {
  headerNav?: ReactNode;
  bodyNav?: ReactNode;
  footerNav?: ReactNode;
  content?: ReactNode;
}

const Navigation: React.FC<INavigationProps> = (props) => {
  return (
    <div className="navigation-container">
      <nav className="nav-container">
        <header className="nav-header">{props.headerNav}</header>
        <div className="nav-content">{props.bodyNav}</div>
        <footer className="nav-footer">{props.footerNav}</footer>
      </nav>
      <div className="content">{props.content}</div>
    </div>
  );
};

export default Navigation;
