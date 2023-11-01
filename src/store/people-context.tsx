import React from "react";
import { IDataSourcePeople } from "../data";
type ActionData = IDataSourcePeople[]
export interface Action<T> {
  type: string;
  data: T
}

interface IDataContext {
  data: IDataSourcePeople[]
  dispatchData: React.Dispatch<Action<IDataSourcePeople[]>>;
}

const DataContext = React.createContext<IDataContext>({
  data: [],
  dispatchData: () => ({ type: "", data: [] as ActionData }),
});

export default DataContext;