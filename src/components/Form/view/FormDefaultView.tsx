import { useContext, useState } from "react"
import { FormContext, FormContextType } from "../Form"
import {
  FormFieldEditState,
  FormFieldType,
  FormFieldValidationState,
  FormValueType,
} from "../utils/form.interface"
import InputField from "../../Field/InputField/InputField"
import MonetaryField from "../../Field/MonetaryField/MonetaryField"
import DropdownField from "../../Field/DropdownField/DropdownField"
import { generateFieldState } from "../utils/form.helper"
import { MonetaryValueType } from "../../Field/MonetaryField/utils/monetaryField.interface"
import { DateTimeRangeFieldValueType } from "../../Field/DateTimeRangeField/utils/dateTimeRangeField.interface"
import DateTimeRangeField from "../../Field/DateTimeRangeField/DateTimeRangeField"
import ActionButtonContainer from "../../Field/CommonComponents/ActionButtonContainer"

type FieldValueType = string | DateTimeRangeFieldValueType | MonetaryValueType | string[]

const FormDefaultView = () => {
  const { isFormBulkEdit, internalValue, internalFieldList, handleBulkEditState, updateFormValue } =
    useContext(FormContext) as FormContextType

  const [fieldsEditState, setFieldsEditState] = useState<FormFieldEditState>(() =>
    generateFieldState(internalFieldList, false)
  )
  const [isFormValidValues, setIsFormValidValues] = useState<FormFieldValidationState>(() =>
    generateFieldState(internalFieldList, true)
  )
  const [originalFormValue, setOriginalFormValue] = useState<FormValueType>(internalValue)
  const [isSaveFormDisabled, setIsSaveFormDisabled] = useState(true)

  const onChangeField = (fieldId: string, value: FieldValueType) => {
    setIsSaveFormDisabled(false)

    const temp = { ...internalValue.customField }
    temp[fieldId] = value

    const updatedValue = {
      ...internalValue,
      [fieldId]: value,
      customField: temp,
    }

    updateFormValue(updatedValue)
  }

  const onSaveForm = () => {
    const saveDisabled = Object.values(isFormValidValues).includes(false)
    setIsSaveFormDisabled(saveDisabled)

    if (saveDisabled) return

    updateFormValue(internalValue)
    setOriginalFormValue(internalValue)

    const editState = { ...fieldsEditState }
    for (const fieldId in editState) {
      editState[fieldId] = false
    }
    setFieldsEditState(editState)
    handleBulkEditState(false)

    setIsSaveFormDisabled(true)
  }

  const onCancelForm = () => {
    updateFormValue(originalFormValue)

    const editState = { ...fieldsEditState }
    for (const fieldId in editState) {
      editState[fieldId] = false
    }

    setFieldsEditState(editState)
    handleBulkEditState(false)

    setIsSaveFormDisabled(true)
  }

  const onSaveField = (fieldId: string, value: FieldValueType) => {
    const temp = { ...internalValue.customField }
    temp[fieldId] = value

    const updatedValue = {
      ...internalValue,
      [fieldId]: value,
      customField: temp,
    }

    console.log("SAVED VALUES", updatedValue)

    updateFormValue(updatedValue)
    setOriginalFormValue(updatedValue)

    const editState = { ...fieldsEditState }
    editState[fieldId] = false
    setFieldsEditState(editState)
  }

  const onCancelField = (fieldId: string) => {
    const temp = { ...internalValue.customField }
    temp[fieldId] = originalFormValue?.customField[fieldId]

    const updatedValue = {
      ...internalValue,
      [fieldId]: originalFormValue[fieldId],
      customField: temp,
    }

    updateFormValue(updatedValue)

    const editState = { ...fieldsEditState }
    editState[fieldId] = false
    setFieldsEditState(editState)
  }

  const onClearDropdownField = (fieldId: string) => {
    const temp = { ...internalValue.customField }
    temp[fieldId] = []

    const updatedValue = {
      ...internalValue,
      [fieldId]: [],
      customField: temp,
    }

    updateFormValue(updatedValue)
  }

  const trackFieldValidaiton = (fieldId: string, value: boolean) => {
    const validationstate = { ...isFormValidValues }
    validationstate[fieldId] = value

    setIsFormValidValues(validationstate)
  }

  const editButtonOnClick = (fieldId: string) => {
    const editState = { ...fieldsEditState }
    editState[fieldId] = true
    setFieldsEditState(editState)
  }

  // ! NEED TYPING
  const renderField = (field: FormFieldType) => {
    const commonFieldProps = {
      label: field.label,
      hideActionButtons: isFormBulkEdit,
      // labelPosition: "left" as "left" | "top",
      isEditing: !!!isFormBulkEdit ? fieldsEditState[field.id] : isFormBulkEdit,
      value: internalValue?.[field.id] || internalValue?.customField?.[field.id],
      validationState: (value: boolean) => trackFieldValidaiton(field.id, value),
      onEditButtonClick: () => editButtonOnClick(field.id),
      onSave: (value: FieldValueType) => onSaveField(field.id, value),
      onCancel: (_: FieldValueType) => onCancelField(field.id),
      onChange: (value: FieldValueType) => onChangeField(field.id, value),
    }

    switch (field.type) {
      case "text":
      case "number":
      case "email":
      case "url":
      case "tel":
      case "date":
      case "time":
      case "datetime-local":
        return <InputField {...commonFieldProps} type={field.type} />
      case "date-range":
      case "time-range":
      case "datetime-range":
        return <DateTimeRangeField {...commonFieldProps} type={field.type} />
      case "monetary":
        return <MonetaryField {...commonFieldProps} />
      case "dropdown":
      case "persona":
      case "tags":
        return (
          <DropdownField
            {...commonFieldProps}
            type={field.type}
            selectedOptions={internalValue?.[field.id] || internalValue?.customField?.[field.id]}
            // @ts-ignore
            disableCustomization
            multiSelect={field.multiSelect}
            options={field.options}
            onClear={() => onClearDropdownField(field.id)}
          />
        )
    }
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: 4 }}>
      {internalFieldList.map((field, index) => (
        <div key={index}>{renderField(field)}</div>
      ))}

      {isFormBulkEdit && (
        <div style={{ marginTop: 12 }}>
          <ActionButtonContainer
            saveDisabled={isSaveFormDisabled}
            onSave={onSaveForm}
            onCancel={onCancelForm}
          />
        </div>
      )}
    </div>
  )
}

export default FormDefaultView
