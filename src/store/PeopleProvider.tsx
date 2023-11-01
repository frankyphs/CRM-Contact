import { useReducer } from "react";
import DataContext from "./people-context";
import { IDataSourcePeople } from "../data";

export interface DataState {
  data: IDataSourcePeople[]
}

export interface Action<T> {
  type: string;
  data: T
}

export interface ProviderProps {
  children: React.ReactNode;
}

const defaultDataState = {
  data: []
  // defaultPeople
};

const dataReducer: React.Reducer<DataState, Action<IDataSourcePeople[]>> = (
  state: DataState = defaultDataState,
  action: Action<IDataSourcePeople[]>
): DataState => {
  if (action.type === "GET") {
    return {
      ...state,
      data: action.data,
    };
  } else if (action.type === "ADD") {
    return {
      ...state,
      data: action.data,
    };
  }

  return defaultDataState;
};

export const addDataAction = (data: IDataSourcePeople[]) => ({
  type: "ADD",
  data,
});

const DataProvider: React.FC<ProviderProps> = ({ children }) => {
  const [dataState, dispatchDataAction] = useReducer(
    dataReducer,
    defaultDataState
  );

  const dataContext = {
    data: dataState.data,
    dispatchData: dispatchDataAction,
  };

  return (
    <DataContext.Provider value={dataContext}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
