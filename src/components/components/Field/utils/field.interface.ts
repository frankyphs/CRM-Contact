import { PresenceBadgeStatus } from "@fluentui/react-components"

export type LabelType = {
  label?: string
  saveLabel?: string
  cancelLabel?: string
}

export type SizeType = "small" | "medium" | "large"

export type ValidationStateType = "error" | "none" | "success" | "warning"

export interface BaseFieldProps extends FieldStylingProps, FieldValidationProps {
  id?: string
  className?: string

  editOnClickEnabled?: boolean
  hideActionButtons?: boolean | undefined
  isEditing?: boolean | undefined
  saveDisabled?: boolean | undefined
  label?: string | LabelType
  saveOnEnter?: boolean
  saveOnBlur?: boolean
}

interface FieldStylingProps {
  actionButtonPosition?: "bottom" | "right" | undefined
  labelPosition?: "top" | "left" | undefined
  size?: "small" | "medium" | "large" | undefined
  style?: React.CSSProperties
  description?: string | undefined

  required?: boolean | undefined
  disabled?: boolean | undefined
}

interface FieldValidationProps {
  validationMessage?: string | undefined
  currentValidationState?: (value: boolean) => void
}

export interface FieldEventProps<T> {
  onEditButtonClick?: () => void
  onSave?: (value: T) => void
  onCancel?: (value: T) => void
  onChange?: (value: T) => void
  onValidate?: (value: T) => string | undefined
}

// DROPDOWNN

export interface IOptionsDropdown {
  id?: string
  key?: string
  label: string
}

export interface IOptionsPersona {
  id?: string
  key?: string
  label: string
  data?: {
    status?: PresenceBadgeStatus
    secondaryText?: string
    icon?: string
  }
}

export interface IOptionsTag {
  id?: string
  key?: string
  label: string
  data?: {
    color?: string
  }
}

export interface IFieldDropdown {
  label?: string
  addText?: string
  clearText?: string
  saveText?: string
  cancelText?: string
  placeholderSearch?: string
  placeholder?: string
  defaultSelectedOptions?: string[]
  selectedOptions?: string[]
  options?: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[]
  multiSelect?: boolean
  type?: "dropdown" | "persona" | "tags"
  orientation?: "vertical" | "horizontal"
  isEditing?: boolean
  onEditClick?: () => void
  onChange?: (selectedOptions: string[]) => void
  onSave?: (selectedOptions: string[]) => void
  onCancel?: (selectedOptions: string[]) => void
  onClear?: (selectedOptions: string[]) => void
  onDeleteTag?: (selectedOptions: string[]) => void
  onOptionChange?: (newValue: IOptionsDropdown[]) => void
  // onRenderOption?: (option: IOptionsDropdown) => JSX.Element
  // onRenderSelectedOption?: (option: string[]) => JSX.Element
  size?: "small" | "medium" | "large"
}
