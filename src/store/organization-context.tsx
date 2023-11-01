import React from "react";
import { IDataSourceOrganization } from "../data";

type ActionData = IDataSourceOrganization[]

export interface Action<T> {
  type: string;
  data: T
}

interface IOrganizationContext {
  organization: IDataSourceOrganization[]
  dispatchOrganization: React.Dispatch<Action<IDataSourceOrganization[]>>;
}

const OrganizationContext = React.createContext<IOrganizationContext>({
  organization: [],
  dispatchOrganization: () => ({ type: "", data: [] as ActionData }),
});

export default OrganizationContext;