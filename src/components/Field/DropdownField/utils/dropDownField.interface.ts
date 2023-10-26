import { PresenceBadgeStatus } from "@fluentui/react-components"
import { BaseFieldProps, FieldEventProps } from "../../utils/field.interface"

export interface DropdownOption {
  id?: string
  key?: string
  label: string
}

export interface PersonaOption extends DropdownOption {
  data?: {
    status?: PresenceBadgeStatus
    secondaryText?: string
    icon?: string
  }
}

export interface TagOption extends DropdownOption {
  data?: {
    color?: string
  }
}

export interface DropDownFieldProps extends Omit<BaseFieldProps, 'saveOnEnter'| 'saveOnBlur'>, Omit<FieldEventProps<string[]>, "onValidate"> {
  type?: "dropdown" | "persona" | "tags"

  // Input Text and Placeholder
  placeholder?: string
  placeholderSearch?: string

  // Options and Selection
  options?: (DropdownOption | PersonaOption | TagOption)[]
  defaultSelectedOptions?: string[]
  selectedOptions?: string[]
  multiSelect?: boolean

  // Action Text and Callbacks
  addText?: string
  clearText?: string
  onClear?: (selectedOptions: string[]) => void
  onDeleteTag?: (selectedOptions: string[]) => void
  onOptionChange?: (newValue: DropdownOption[]) => void
}