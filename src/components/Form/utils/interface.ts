import { PresenceBadgeStatus } from "@fluentui/react-components"

// enum labelPosition {
//   top = "Top",
//   left = "Left",
// }

export interface IFieldBaseProps<T = any> {
  // Style related props
  /**
   * Optional class name that is added to the container of the component.
   */
  classname?: string
  /**
   * Styling to be added on top of the base styling, TBD
   */
  styles?: object
  /**
   * Theme applied to the component
   */
  theme?: any
  /**
   * Whether or not the field is required.
   */
  required?: boolean
  /**
   * The label of the field to be rendered
   */
  label?: string
  /**
   * The position of the label relative to the field
   */
  labelPosition?: "top" | "left" | "right" | "bottom"

  /**
   * Property to control whether the field is being edited or not
   */
  isEditing?: boolean

  // behavior related props
  /**
   * Whether the field will enter edit mode when it is clicked
   */
  enableEditOnClick?: boolean
  /**
   * Whether to call the onSave function and exit edit mode when focus is list
   */
  saveOnBlur?: boolean

  // Value related props
  /**
   * Value of the field, use this to use the component controlled
   */
  value?: T
  /**
   * Initial value of the field
   */
  defaultValue?: T
  /**
   * Callback for when the value of the field changes
   */
  onChange?: (newValue: T) => void
  /**
   * Callback for when the cancel button is clicked
   */
  onCancel?: (prevValue: T) => void
  /**
   * Callback for when the save button is clicked
   */
  onSave?: (value: T) => void
  /**
   * Text to be rendered when the field is empty
   */
  placeholder?: string

  // Validation related props
  /**
   * Whether the value of the field is invalid or not,
   */
  invalid?: boolean
  /**
   * Error message to be rendered, if this property has a value, 'invalid' will be overriden to true
   */
  errorMessage?: string | JSX.Element
  /**
   * Callback for field validation, it is called onSave, returns the errorMessage to be rendered
   */
  onValidate?: (input: T) => string | JSX.Element

  // Renderer related props
  /**
   * Optional custom renderer for label
   */
  onRenderLabel?: (label: string) => JSX.Element
  /**
   * Optional custom renderer for the input field
   */
  onRenderInput?: (value: T) => JSX.Element
  /**
   * Optional custom rendered for the save button
   */
  onRenderSaveButton?: () => JSX.Element
  /**
   * Optional custom renderer for the cancel button
   */
  onRenderCancelButton?: () => JSX.Element
  /**
   * Optional custom renderer for the edit button
   */
  onRenderEditButton?: () => JSX.Element
}

export interface ITextField extends IFieldBaseProps<string> {
  autoComplete?: boolean
  borderless?: boolean
  multiline?: boolean
  underlined?: boolean
  /**
   * Whether to call the onSave function and exit edit mode when enter is pressed while editing
   */
  saveOnEnterPressed?: boolean
  validateOnFocusIn?: boolean
  validateOnFocusOut?: boolean
}


export interface IOptionsDropdown {
  id?: string,
  key?: string,
  label: string,
}

export interface IOptionsPersona {
  id?: string,
  key?: string,
  label: string,
  data?: {
    status?: PresenceBadgeStatus,
    secondaryText?: string,
    icon?: string
  }
}

export interface IOptionsTag {
  id?: string,
  key?: string,
  label: string,
  data?: {
    color?: string
  }
}

export interface IFieldDropdown {
  label?: string,
  addText?: string,
  clearText?: string,
  saveText?: string,
  cancelText?: string,
  placeholderSearch?: string,
  placeholder?: string,
  defaultSelectedOptions?: string[],
  selectedOptions?: string[],
  options?: IOptionsDropdown[] | IOptionsPersona[] | IOptionsTag[],
  multiSelect?: boolean
  type?: "dropdown" | "persona" | "tags"
  orientation?: "vertical" | "horizontal"
  isEditing?: boolean,
  onEditClick?: () => void,
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

/** ======================================== FORM FIELD LAYOUT ======================================== */

/**
 * Represents the layout configuration for a field in a form.
 */
export interface IFieldLayout {
  /**
   * Indicates whether the field is in editing mode.
   */
  isEditing?: boolean;

  /**
   * Specifies the position of the label relative to the field.
   * - "top" places the label above the field.
   * - "left" places the label to the left of the field.
   */
  labelPosition?: "top" | "left";

  /**
   * Specifies the position of buttons associated with the field.
   * - "bottom" places buttons below the field.
   * - "right" places buttons to the right of the field.
   */
  buttonPosition?: "bottom" | "right";

  /**
   * Specifies the alignment of buttons when they are placed below the field.
   * - "baseline" aligns buttons along their baseline.
   * - "end" aligns buttons at the end of the field.
   */
  buttonAlign?: "baseline" | "end";

  /**
   * The JSX element representing the field component.
   */
  fieldComponent: JSX.Element;

  /**
   * The JSX element representing the save button.
   */
  saveButton: JSX.Element;

  /**
   * The JSX element representing the edit button.
   */
  editButton: JSX.Element;

  /**
   * The JSX element representing the cancel button.
   */
  cancelButton: JSX.Element;

  /**
   * An optional custom label JSX element for the field.
   */
  customLabel?: JSX.Element;
}


/**
 * Interface for the properties of a form text field component.
 * Extends the base field properties for customization.
 */
export interface IFormTextFieldProps extends IFieldBaseProps<string> {
  /**
   * The current value of the text field.
   */
  value?: string;

  /**
   * An error message to display when the field is in an error state.
   * This can be a string or a JSX element.
   */
  errorMessage?: string | JSX.Element;

  /**
   * A description or additional information to display below the field.
   */
  description?: string;

  /**
   * The position of any action buttons relative to the field.
   * Can be either "bottom" or "right."
   */
  actionButtonPosition?: "bottom" | "right";

  /**
   * The alignment of action buttons, if present.
   * Can be either "start" or "end."
   */
  actionButtonAlignment?: "start" | "end";

  /**
   * Specifies when validation should occur.
   * Can be triggered on "save" or "change."
   */
  validateOn?: "save" | "change";

  /**
   * Indicates whether a border should be displayed around the field.
   */
  isBorder?: boolean;
  /**
   * Indicates whether a border should be readonly.
   */
  readonly?: boolean;

  /**
   * Indicates whether a border should be disabled.
   */
  disabled?: boolean;

  /**
   * Indicates whether the field should be displayed with an underline.
   */
  isUnderlined?: boolean;

  /**
   * Enables editing mode when the field is clicked.
   */
  enableEditOnClick?: boolean;

  /**
   * Specifies whether pressing the "Enter" key should trigger a save action.
   */
  saveOnEnter?: boolean;

  /**
   * Custom rendering function for the label.
   * Takes a set of properties and returns a JSX element.
   */
  onRenderCustomLabel?: (props: any) => JSX.Element;

  /**
   * Custom validation function to determine if the field is in an error state.
   * Takes the field's current value and returns an error message or JSX element, or undefined if there's no error.
   */
  onUseValidation?: (value: string) => string | JSX.Element | undefined;
}
