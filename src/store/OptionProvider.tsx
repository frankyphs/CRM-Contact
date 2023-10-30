import { useReducer } from "react";
import OptionContext from "./option-context";
import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../components/Field/utils/field.interface";
import { defaultOption } from "../data";

export interface OptionState {
  options: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[]
}

export interface Action<T> {
  type: string;
  data: T
}

export interface ProviderProps {
  children: React.ReactNode;
}

const defaultOptionState = { options: defaultOption }

const optionReducer: React.Reducer<OptionState, Action<IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[]>> = (
  state: OptionState = defaultOptionState,
  action: Action<IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[]>
): OptionState => {
  if (action.type === "GET") {
    return {
      ...state,
      options: action.data,
    };
  } else if (action.type === "ADD") {
    return {
      ...state,
      options: action.data,
    };
  }

  return defaultOptionState;
};

export const addOptionAction = (data: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[]) => ({
  type: "ADD",
  data,
});

const OptionProvider: React.FC<ProviderProps> = ({ children }) => {
  const [optionState, dispatchOptionAction] = useReducer(
    optionReducer,
    defaultOptionState
  );

  const optionContext = {
    options: optionState.options,
    dispatchOption: dispatchOptionAction,
  };

  return (
    <OptionContext.Provider value={optionContext}>{children}</OptionContext.Provider>
  );
};

export default OptionProvider;
