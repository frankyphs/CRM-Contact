import { ReactNode } from "react";

export interface INavigationProps {
  headerNav?: ReactNode;
  bodyNav?: ReactNode;
  footerNav?: ReactNode;
  content?: ReactNode;
}

export interface IContentProps {
  header?: ReactNode;
  main?: ReactNode;
}

export interface IMainProps {
  menu?: ReactNode;
  section?: ReactNode;
}

export interface ISectionProps {
  sidebar?: ReactNode;
  content?: ReactNode;
}
