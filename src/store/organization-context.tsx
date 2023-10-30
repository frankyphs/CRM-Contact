import React from "react";
import { IDataSourceBasic } from "../data";

type ActionData = IDataSourceBasic[]

export interface Action<T> {
  type: string;
  data: T
}

interface IOrganizationContext {
  organization: IDataSourceBasic[]
  dispatchOrganization: React.Dispatch<Action<IDataSourceBasic[]>>;
}

const OrganizationContext = React.createContext<IOrganizationContext>({
  organization: [],
  dispatchOrganization: () => ({ type: "", data: [] as ActionData }),
});

export default OrganizationContext;