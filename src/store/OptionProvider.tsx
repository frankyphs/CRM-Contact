
import { useReducer } from "react";
import OptionContext from "./option-context";
import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../components/Field/utils/field.interface";
// import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "@kitameraki/teamswork-library/dist/components/Field/utils/field.interface";

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

const defaultOptionState = {
  options: [
    { id: "1", label: "religion", data: { color: "#FFF3DA" } },
    { id: "2", label: "education", data: { color: "#DFCCFB" } },
    { id: "3", label: "politic" },
    { id: "4", label: "social", data: { color: "#BC7AF9" } },
    { id: "5", label: "heritage" },
    { id: "6", label: "technology", data: { color: "#FF6969" } },
    { id: "7", label: "economy", data: { color: "#EE9322" } },
    { id: "8", label: "criminal" },
  ],
};



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
    // @ts-ignore
    <OptionContext.Provider value={optionContext}>{children}</OptionContext.Provider>
  );
};

export default OptionProvider;
