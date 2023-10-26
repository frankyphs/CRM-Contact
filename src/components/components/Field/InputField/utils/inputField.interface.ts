import { Slot } from "@fluentui/react-utilities"
import { BaseFieldProps, FieldEventProps } from "../../utils/field.interface"

export interface InputFieldProps extends BaseFieldProps, FieldEventProps<string> {
  contentBefore?: Slot<"span">
  contentAfter?: Slot<"span">
  validateOn?: "save" | "change"
  value?: string
  defaultValue?: string
  placeholder?: string
  type?: "text" | "number" | "date" | "datetime-local" | "url" | "email" | "time" | "tel"
  appearance?:
    | "outline"
    | "underline"
    | "filled-darker"
    | "filled-lighter"
    | "filled-darker-shadow"
    | "filled-lighter-shadow"
}
