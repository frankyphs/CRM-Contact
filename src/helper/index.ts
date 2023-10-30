import { useContext } from "react"
import OptionContext from "../store/option-context";
export function getLabelFromId(id: string) {
  const optionContext = useContext(OptionContext);
  const { options } = optionContext;
  const option = options.find(option => option.id === id);
  return option ? option.label : id;
}
