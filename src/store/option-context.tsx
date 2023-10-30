import React from "react";
import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../components/Field/utils/field.interface";

type ActionData = IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[];
export interface Action<T> {
  type: string;
  data: T
}
interface IOptionContext {
  options: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[];
  dispatchOption: React.Dispatch<Action<IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[]>>;
}

const OptionContext = React.createContext<IOptionContext>({
  options: [],
  dispatchOption: () => ({ type: "", data: [] as ActionData }),
});

export default OptionContext;