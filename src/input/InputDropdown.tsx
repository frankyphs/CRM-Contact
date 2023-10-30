import { useState, useEffect, useContext } from "react"
import { IValueDropdown } from "../utils/Interfaces";
import OptionContext from "../store/option-context";
import DropdownField from "../components/Field/DropdownField/DropdownField";
import { IOptionsDropdown, IOptionsPersona, IOptionsTag } from "../components/Field/utils/field.interface";
import { addOptionAction } from "../store/OptionProvider";

export const InputDropdown = (props: IValueDropdown) => {
  const [value, setValue] = useState<string[]>([props.data])
  const [cancelData, setCancelData] = useState<string>()

  const optionContext = useContext(OptionContext);
  const { options, dispatchOption } = optionContext;

  useEffect(() => {
    setCancelData(props.data)
  }, [])

  useEffect(() => {
    setValue([props.data])
  }, [props.data])

  // if user delete an options on row 2, and the deleted options is on row 1, the row 1 automatically have undefined label
  useEffect(() => {
    if (!options.some(option => option.id === value[0])) {
      props.onChange("")
    }
  }, [options]);

  const handleNameChange = (newValue: string[]) => {
    setValue(newValue);
  };

  const handleSave = (newValue: string[]) => {
    props.onChange(newValue[0])
    setCancelData(newValue[0])
  }

  const handleCancel = () => {
    cancelData && setValue([cancelData])
  }
  const handleOptionChange = (newValue: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[]) => {
    dispatchOption(addOptionAction(newValue));
  };

  const handleOnClear = () => {
    setValue([""])
  }

  const handleOnDeleteTag = (newValue: string[]) => {
    setValue(newValue)
  }

  return (
    <DropdownField type={props.type} selectedOptions={value} onChange={handleNameChange} options={options} onSave={handleSave} onCancel={handleCancel} onOptionChange={handleOptionChange} onClear={handleOnClear} onDeleteTag={handleOnDeleteTag} />
  )
}
