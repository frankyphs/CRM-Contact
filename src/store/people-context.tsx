import React from "react";
import { IDataSourceBasic } from "../data";
type ActionData = IDataSourceBasic[]
export interface Action<T> {
  type: string;
  data: T
}

interface IDataContext {
  data: IDataSourceBasic[]
  dispatchData: React.Dispatch<Action<IDataSourceBasic[]>>;
}

const DataContext = React.createContext<IDataContext>({
  data: [],
  dispatchData: () => ({ type: "", data: [] as ActionData }),
});

export default DataContext;