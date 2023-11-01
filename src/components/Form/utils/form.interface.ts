import {
  DropdownOption,
  PersonaOption,
  TagOption,
} from "../../Field/DropdownField/utils/dropDownField.interface"
import { BaseFieldProps } from "../../Field/utils/field.interface"

export type FormFieldType = {
  id: string
  label: string
  category: "default" | "custom"
  options?: DropdownOption[] | PersonaOption[] | TagOption[]
  multiSelect?: boolean
  [key: string]: any
  type:
    | "text"
    | "number"
    | "date"
    | "datetime-local"
    | "url"
    | "email"
    | "time"
    | "tel"
    | "date-range"
    | "time-range"
    | "datetime-range"
    | "monetary"
    | "dropdown"
    | "persona"
    | "tags"
}

export type FormValueType = {
  [key: string]: any
  customField: {
    [key: string]: any
  }
}

export type FormFieldEditState = {
  [fieldId: string]: boolean
}

export type FormFieldValidationState = {
  [fieldId: string]: boolean
}

export interface FormProps extends BaseFieldProps {
  fieldList: FormFieldType[]
  value?: FormValueType
  defaultValue?: FormValueType
  formLabel?: string
}
