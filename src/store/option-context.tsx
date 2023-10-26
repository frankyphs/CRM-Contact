import React from "react";
// import { IOptionsPersona, IOptionsDropdown, IOptionsTag } from "@kitameraki/teamswork-library/dist/components/Field/utils/field.interface";
import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../components/components/Field/utils/field.interface";

type ActionData = IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[];
export interface Action<T> {
  type: string;
  data: T
}



interface IOptionContext {
  options: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[];
  dispatchOption: React.Dispatch<Action<object[]>>;
}

const OptionContext = React.createContext<IOptionContext>({
  options: [],
  dispatchOption: () => ({ type: "", data: [] as ActionData }), // Menggunakan tipe ActionData yang sesuai
});

export default OptionContext;