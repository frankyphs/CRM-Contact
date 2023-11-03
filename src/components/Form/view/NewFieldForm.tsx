import {
  Label,
  Subtitle2,
  tokens,
  makeStyles,
  shorthands,
  Switch,
  SwitchOnChangeData,
} from "@fluentui/react-components"

// import {
//   TextT24Filled,
//   NumberSymbol24Regular,
//   CalendarLtr24Filled,
//   CalendarClock24Filled,
//   Clock24Filled,
//   Link24Filled,
//   PersonMail24Filled,
//   PersonPhone24Filled,
//   Money24Filled,
//   ChevronCircleDown24Filled,
//   PersonCircle24Filled,
//   Tag24Filled,
// } from "@fluentui/react-icons"

import React, { ChangeEvent, useState } from "react"
import { FormFieldType } from "../utils/form.interface"
import ActionButtonContainer from "../../Field/CommonComponents/ActionButtonContainer"
import {
  DropdownOption,
  PersonaOption,
  TagOption,
} from "../../Field/DropdownField/utils/dropDownField.interface"
import DropdownField from "../../Field/DropdownField/DropdownField"
import { generateRandomId } from "../utils/form.helper"
import InputField from "../../Field/InputField/InputField"

// const fieldTypeIcons = {
//   Text: TextT24Filled,
//   Number: NumberSymbol24Regular,
//   Date: CalendarLtr24Filled,
//   "Datetime-local": CalendarClock24Filled,
//   Time: Clock24Filled,
//   Url: Link24Filled,
//   Email: PersonMail24Filled,
//   Tel: PersonPhone24Filled,
//   "Date-range": CalendarLtr24Filled,
//   "Datetime-range": CalendarClock24Filled,
//   "Time-range": Clock24Filled,
//   Monetary: Money24Filled,
//   Dropdown: ChevronCircleDown24Filled,
//   Persona: PersonCircle24Filled,
//   Tags: Tag24Filled,
// }

const createNewFieldFormStyles = makeStyles({
  container: {
    // ...shorthands.border("1px", "solid", "#d1d1d1"),
    // ...shorthands.borderRadius("4px"),
    ...shorthands.padding("12px"),
    // backgroundColor: tokens.colorNeutralBackground2,
  },
  formWrapper: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXS,
    marginTop: tokens.spacingVerticalXS,
  },
  fieldWrapper: {
    display: "grid",
    gridRowGap: tokens.spacingVerticalXS,
  },
  buttonWrapper: {
    marginTop: "12px",
  },
  saveButton: {},
  cancelButton: {
    marginLeft: "6px",
  },
})

const fieldTypeOptions: DropdownOption[] = [
  { id: "email", label: "Email" },
  { id: "date", label: "Date" },
  { id: "date-range", label: "Date Range" },
  { id: "datetime-local", label: "Date Time Local" },
  { id: "datetime-range", label: "Date Time Range" },
  { id: "dropdown", label: "Dropdown" },
  { id: "monetary", label: "Monetary" },
  { id: "number", label: "Number" },
  { id: "persona", label: "Persona" },
  { id: "tags", label: "Tags" },
  { id: "tel", label: "Phone Number" },
  { id: "text", label: "Text" },
  { id: "time", label: "Time" },
  { id: "time-range", label: "Time Range" },
  { id: "url", label: "Url" },
]

interface NewFieldForm {
  onSave: (value: FormFieldType) => void
  onCancel: () => void
}

type FieldType = "number" | "email" | "date" | "date-range" | "datetime-local" | "datetime-range" | "dropdown" | "monetary" | "persona" | "tags" | "tel" | "text" | "time" | "time-range" | "url"

const defaultFieldData: FormFieldType = { id: "", label: "", type: "text", category: "custom" }

const NewFieldForm: React.FC<NewFieldForm> = (props) => {
  const c = createNewFieldFormStyles()
  const [newFieldData, setNewFieldData] = useState<FormFieldType>(defaultFieldData)
  const [newFieldOptions, setNewFieldOptions] = useState<DropdownOption[] | PersonaOption[] | TagOption[]>([])
  const [labelValidationMessage, setLabelValidationMessage] = useState<string>("")

  const handleOnChangeLabel = (data: string) => {
    if (labelValidationMessage) setLabelValidationMessage("")

    setNewFieldData({ ...newFieldData, label: data })
  }

  const handleOnChangeType = (value: string[]) => {
    setNewFieldData({ ...newFieldData, type: value[0] as FieldType })
  }

  const handleAddOptions = (value: DropdownOption[] | PersonaOption[] | TagOption[]) => {
    setNewFieldOptions(value)
  }

  const handleDropdownMultiSelect = (_ev: ChangeEvent<HTMLInputElement>, data: SwitchOnChangeData) => {
    const temp = { ...newFieldData }
    if (temp.type === "dropdown" || temp.type === "persona" || temp.type === "tags") {
      temp.multiSelect = data.checked
    }

    setNewFieldData(temp)
  }

  const handleFormOnSave = () => {
    if (newFieldData.label.length < 1) {
      setLabelValidationMessage("Label is required")
      return
    }

    const newField = {
      ...newFieldData,
      id: generateRandomId(),
    }

    if (["dropdown", "persona", "tags"].includes(newField.type)) {
      newField.options = newFieldOptions;
    }

    props.onSave && props.onSave(newField)
  }

  const handleFormOnCancel = () => {
    props.onCancel && props.onCancel()
  }

  return (
    <div className={c.container}>
      <Subtitle2>ADD FORM_LABEL FIELD</Subtitle2>
      <div className={c.formWrapper}>
        <div className={c.fieldWrapper}>
          <Label required htmlFor="type">
            Field name
          </Label>
          <InputField
            isEditing
            hideActionButtons
            saveOnEnter
            onChange={handleOnChangeLabel}
            validationMessage={labelValidationMessage}
          />
        </div>

        <div className={c.fieldWrapper}>
          <Label required htmlFor="type">
            Field type
          </Label>
          <DropdownField
            isEditing
            hideActionButtons
            // @ts-ignore
            disableCustomization
            disableClear
            type="dropdown"
            selectedOptions={[newFieldData.type]}
            options={fieldTypeOptions}
            onChange={handleOnChangeType}
          />
        </div>

        {(newFieldData.type === "dropdown" ||
          newFieldData.type === "persona" ||
          newFieldData.type === "tags") && (
            <div className={c.fieldWrapper}>
              <Label required htmlFor="options">
                Field Options
              </Label>
              <DropdownField
                hideActionButtons
                type={newFieldData.type}
                multiSelect
                isEditing
                placeholder="Create Options"
                options={newFieldOptions}
                onOptionChange={handleAddOptions}
              />
              <Switch label="Multi Option Select" onChange={handleDropdownMultiSelect} />
            </div>
          )}
      </div>
      <ActionButtonContainer
        onSave={handleFormOnSave}
        onCancel={handleFormOnCancel}
        style={{ marginTop: 12 }}
      />
    </div>
  )
}

export default NewFieldForm
